package com.kelvornex.auth.service;

import com.kelvornex.auth.dto.LoginRequestDTO;
import com.kelvornex.auth.dto.LoginResponseDTO;
import com.kelvornex.auth.dto.SignupRequestDTO;
import com.kelvornex.auth.dto.GoogleLoginRequestDTO;
import com.kelvornex.auth.dto.CompleteOauthRoleRequestDTO;
import com.kelvornex.auth.dto.ForgotPasswordRequestDTO;
import com.kelvornex.auth.dto.VerifyOtpRequestDTO;
import com.kelvornex.auth.dto.ResetPasswordRequestDTO;
import com.kelvornex.auth.entity.Role;
import com.kelvornex.auth.entity.User;
import com.kelvornex.auth.exception.EmailAlreadyExistsException;
import com.kelvornex.auth.exception.InvalidCredentialsException;
import com.kelvornex.auth.exception.UserNotFoundException;
import com.kelvornex.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import java.util.UUID;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    private final Map<String, TempGoogleUser> tempUserCache = new ConcurrentHashMap<>();
    private final Map<String, String> otpCache = new ConcurrentHashMap<>();

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

    @Value("${spring.mail.username:}")
    private String mailFrom;

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
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
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

    public LoginResponseDTO googleLogin(GoogleLoginRequestDTO request) {
        String token = request.getToken();
        String tokenType = request.getTokenType();

        String email = null;
        String name = null;
        String picture = null;

        RestTemplate restTemplate = new RestTemplate();

        if ("access_token".equalsIgnoreCase(tokenType)) {
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
            String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;
            try {
                ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    Map<String, Object> body = response.getBody();

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

        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;

        if (existingUser.isPresent()) {
            user = existingUser.get();
            if (picture != null && !picture.isEmpty()) {
                String currentPic = user.getProfilePictureUrl();
                boolean isLocalUpload = currentPic != null && (currentPic.startsWith("/") || !currentPic.startsWith("http"));
                if (!isLocalUpload && (currentPic == null || !currentPic.equals(picture))) {
                    user.setProfilePictureUrl(picture);
                    userRepository.save(user);
                }
            }
        } else {
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

    public void forgotPassword(ForgotPasswordRequestDTO request) {
        String email = request.getEmail().trim();
        userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("No account found with email: " + email));

        // Generate a 6-digit random OTP
        String otp = String.format("%06d", (int) (Math.random() * 1000000));
        otpCache.put(email, otp);

        // Log OTP to console as fallback
        System.out.println("\n==================================================");
        System.out.println("[OTP SERVICE] Generated OTP for " + email + ": " + otp);
        System.out.println("==================================================\n");

        // Send OTP via email
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(mailFrom, "Kelvornex");
            helper.setTo(email);
            helper.setSubject("Your Kelvornex Password Reset OTP");

            String htmlBody =
                "<!DOCTYPE html>" +
                "<html><head><meta charset='UTF-8'></head>" +
                "<body style='margin:0;padding:0;background:#F8F9FA;font-family:Arial,sans-serif;'>" +
                "<table width='100%' cellpadding='0' cellspacing='0' style='background:#F8F9FA;padding:40px 0;'>" +
                "<tr><td align='center'>" +
                "<table width='520' cellpadding='0' cellspacing='0' style='background:#FFFFFF;border:1px solid #E2E8F0;'>" +
                "<tr><td style='height:4px;background:#1A73E8;'></td></tr>" +
                "<tr><td style='padding:36px 40px 0 40px;'>" +
                "<p style='margin:0;font-size:22px;font-weight:800;color:#202124;letter-spacing:-0.5px;'>KELVORNEX</p>" +
                "</td></tr>" +
                "<tr><td style='padding:24px 40px 32px 40px;'>" +
                "<h1 style='margin:0 0 8px 0;font-size:20px;font-weight:700;color:#202124;'>Password Reset OTP</h1>" +
                "<p style='margin:0 0 28px 0;font-size:14px;color:#5F6368;line-height:1.6;'>" +
                "We received a request to reset your Kelvornex account password. " +
                "Use the OTP below to proceed. This code is valid for <strong>10 minutes</strong>.</p>" +
                "<div style='background:#F8F9FA;border:1px solid #E2E8F0;padding:24px;text-align:center;margin-bottom:28px;'>" +
                "<p style='margin:0 0 6px 0;font-size:11px;font-weight:700;color:#80868B;letter-spacing:2px;text-transform:uppercase;'>Your One-Time Password</p>" +
                "<p style='margin:0;font-size:40px;font-weight:900;color:#1A73E8;letter-spacing:12px;'>" + otp + "</p>" +
                "</div>" +
                "<p style='margin:0;font-size:13px;color:#5F6368;line-height:1.6;'>" +
                "If you did not request a password reset, you can safely ignore this email.</p>" +
                "</td></tr>" +
                "<tr><td style='padding:20px 40px;border-top:1px solid #F1F3F4;'>" +
                "<p style='margin:0;font-size:11px;color:#80868B;'>&copy; 2024 Kelvornex. All rights reserved.</p>" +
                "</td></tr>" +
                "</table></td></tr></table>" +
                "</body></html>";

            helper.setText(htmlBody, true);
            mailSender.send(message);
            System.out.println("[OTP SERVICE] Email sent successfully to: " + email);

        } catch (Exception e) {
            System.err.println("[OTP SERVICE] Failed to send email to " + email + ": " + e.getMessage());
            // OTP is still cached — flow continues even if email fails
        }
    }

    public boolean verifyOtp(VerifyOtpRequestDTO request) {
        String email = request.getEmail().trim();
        String otp = request.getOtp().trim();

        String cachedOtp = otpCache.get(email);
        if (cachedOtp == null || !cachedOtp.equals(otp)) {
            throw new InvalidCredentialsException("Invalid or expired OTP");
        }
        return true;
    }

    public void resetPassword(ResetPasswordRequestDTO request) {
        String email = request.getEmail().trim();
        String otp = request.getOtp().trim();
        String newPassword = request.getNewPassword();

        String cachedOtp = otpCache.get(email);
        if (cachedOtp == null || !cachedOtp.equals(otp)) {
            throw new InvalidCredentialsException("Invalid or expired OTP");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        otpCache.remove(email);
    }
}
