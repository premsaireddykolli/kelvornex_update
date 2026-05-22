package com.kelvornex.auth.service;

import com.kelvornex.auth.dto.LoginRequestDTO;
import com.kelvornex.auth.dto.LoginResponseDTO;
import com.kelvornex.auth.dto.SignupRequestDTO;
import com.kelvornex.auth.dto.GoogleLoginRequestDTO;
import com.kelvornex.auth.dto.CompleteOauthRoleRequestDTO;
import com.kelvornex.auth.entity.Role;
import com.kelvornex.auth.entity.User;
import com.kelvornex.auth.exception.EmailAlreadyExistsException;
import com.kelvornex.auth.exception.InvalidCredentialsException;
import com.kelvornex.auth.exception.UserNotFoundException;
import com.kelvornex.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.UUID;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final Map<String, TempGoogleUser> tempUserCache = new ConcurrentHashMap<>();

    @lombok.Data
    @lombok.Builder
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class TempGoogleUser {
        private String email;
        private String name;
        private String picture;
    }

    @Value("${google.clientId:}")
    private String googleClientId;

    public User register(SignupRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email is already registered: " + request.getEmail());
        }

        Role userRole;
        try {
            userRole = Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + request.getRole() + ". Must be STUDENT or ENTREPRENEUR");
        }

        String defaultPic = userRole == Role.STUDENT ?
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" :
                "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80";

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .profilePictureUrl(defaultPic)
                .build();

        return userRepository.save(user);
    }

    public LoginResponseDTO login(LoginRequestDTO request) {
        // a. Throw custom UserNotFoundException if email doesn't exist
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + request.getEmail()));

        // b. Throw custom InvalidCredentialsException if password hash doesn't match
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }

        // Upon successful login, return precise JSON DTO format
        LoginResponseDTO.UserDTO userDTO = LoginResponseDTO.UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .role(user.getRole().name())
                .profileLink("/profile/" + user.getId())
                .profilePictureUrl(user.getProfilePictureUrl())
                .build();

        return LoginResponseDTO.builder()
                .authenticated(true)
                .user(userDTO)
                .build();
    }

    public LoginResponseDTO googleLogin(GoogleLoginRequestDTO request) {
        String token = request.getToken();
        String tokenType = request.getTokenType();
        
        String email = null;
        String name = null;
        String picture = null;

        RestTemplate restTemplate = new RestTemplate();

        if ("access_token".equalsIgnoreCase(tokenType)) {
            // Retrieve profile from Google's Userinfo API
            String url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token;
            try {
                ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    Map<String, Object> body = response.getBody();
                    email = (String) body.get("email");
                    name = (String) body.get("name");
                    picture = (String) body.get("picture");
                    
                    Object emailVerifiedObj = body.get("email_verified");
                    boolean emailVerified = emailVerifiedObj instanceof Boolean ? (Boolean) emailVerifiedObj : Boolean.parseBoolean(String.valueOf(emailVerifiedObj));
                    if (!emailVerified) {
                        throw new InvalidCredentialsException("Google email address is not verified.");
                    }
                } else {
                    throw new InvalidCredentialsException("Failed to verify Google access token.");
                }
            } catch (Exception e) {
                throw new InvalidCredentialsException("Invalid Google access token or service error.");
            }
        } else if ("id_token".equalsIgnoreCase(tokenType)) {
            // Retrieve profile from Google's Tokeninfo API
            String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;
            try {
                ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    Map<String, Object> body = response.getBody();
                    
                    // Verify audience/clientId if configured and not placeholder
                    String aud = (String) body.get("aud");
                    if (googleClientId != null && !googleClientId.contains("placeholder") && !googleClientId.isEmpty()) {
                        if (!googleClientId.equals(aud)) {
                            throw new InvalidCredentialsException("Google ID Token client ID mismatch.");
                        }
                    }

                    email = (String) body.get("email");
                    name = (String) body.get("name");
                    picture = (String) body.get("picture");

                    Object emailVerifiedObj = body.get("email_verified");
                    boolean emailVerified = emailVerifiedObj instanceof Boolean ? (Boolean) emailVerifiedObj : Boolean.parseBoolean(String.valueOf(emailVerifiedObj));
                    if (!emailVerified) {
                        throw new InvalidCredentialsException("Google email address is not verified.");
                    }
                } else {
                    throw new InvalidCredentialsException("Failed to verify Google ID Token.");
                }
            } catch (Exception e) {
                throw new InvalidCredentialsException("Invalid Google ID Token or service error.");
            }
        } else {
            throw new IllegalArgumentException("Unsupported token type: " + tokenType);
        }

        if (email == null || email.isEmpty()) {
            throw new InvalidCredentialsException("Unable to retrieve email from Google profile.");
        }

        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;

        if (existingUser.isPresent()) {
            user = existingUser.get();
            // Update profile picture if Google provides one, and the user either has no profile picture,
            // is using a default seed/placeholder picture, or the Google picture url has changed,
            // while preserving any custom locally uploaded picture (which starts with "/").
            if (picture != null && !picture.isEmpty()) {
                String currentPic = user.getProfilePictureUrl();
                boolean isLocalUpload = currentPic != null && (currentPic.startsWith("/") || !currentPic.startsWith("http"));
                if (!isLocalUpload && (currentPic == null || !currentPic.equals(picture))) {
                    user.setProfilePictureUrl(picture);
                    userRepository.save(user);
                }
            }
        } else {
            // Register new user
            // Check if role is pre-selected (passed in request). If not, intercept for role selection!
            if (request.getRole() == null || request.getRole().trim().isEmpty()) {
                String tempToken = UUID.randomUUID().toString();
                tempUserCache.put(tempToken, TempGoogleUser.builder()
                        .email(email)
                        .name(name)
                        .picture(picture)
                        .build());
                
                return LoginResponseDTO.builder()
                        .authenticated(false)
                        .roleSelectionRequired(true)
                        .tempToken(tempToken)
                        .build();
            }

            Role role = Role.STUDENT;
            try {
                role = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                // fall back to STUDENT
            }

            if (picture == null || picture.isEmpty()) {
                picture = role == Role.STUDENT ?
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" :
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80";
            }

            if (name == null || name.isEmpty()) {
                name = email.split("@")[0];
            }

            user = User.builder()
                    .name(name)
                    .email(email)
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .role(role)
                    .profilePictureUrl(picture)
                    .build();
            user = userRepository.save(user);
        }

        LoginResponseDTO.UserDTO userDTO = LoginResponseDTO.UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .role(user.getRole().name())
                .profileLink("/profile/" + user.getId())
                .profilePictureUrl(user.getProfilePictureUrl())
                .build();

        return LoginResponseDTO.builder()
                .authenticated(true)
                .user(userDTO)
                .build();
    }

    public LoginResponseDTO completeOauthRole(CompleteOauthRoleRequestDTO request) {
        String tempToken = request.getTempToken();
        TempGoogleUser tempUser = tempUserCache.remove(tempToken);
        if (tempUser == null) {
            throw new InvalidCredentialsException("Temporary registration session has expired or is invalid. Please try again.");
        }

        Role role;
        try {
            role = Role.valueOf(request.getSelectedRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + request.getSelectedRole() + ". Must be STUDENT or ENTREPRENEUR");
        }

        String email = tempUser.getEmail();
        String name = tempUser.getName();
        String picture = tempUser.getPicture();

        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
            user.setRole(role);
            if (picture != null && !picture.isEmpty()) {
                user.setProfilePictureUrl(picture);
            }
            user = userRepository.save(user);
        } else {
            if (picture == null || picture.isEmpty()) {
                picture = role == Role.STUDENT ?
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" :
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80";
            }

            if (name == null || name.isEmpty()) {
                name = email.split("@")[0];
            }

            user = User.builder()
                    .name(name)
                    .email(email)
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .role(role)
                    .profilePictureUrl(picture)
                    .build();
            user = userRepository.save(user);
        }

        LoginResponseDTO.UserDTO userDTO = LoginResponseDTO.UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .role(user.getRole().name())
                .profileLink("/profile/" + user.getId())
                .profilePictureUrl(user.getProfilePictureUrl())
                .build();

        return LoginResponseDTO.builder()
                .authenticated(true)
                .user(userDTO)
                .build();
    }

    @org.springframework.transaction.annotation.Transactional
    public void deleteUserByEmail(String email) {
        userRepository.findByEmail(email).ifPresent(user -> userRepository.delete(user));
    }
}
