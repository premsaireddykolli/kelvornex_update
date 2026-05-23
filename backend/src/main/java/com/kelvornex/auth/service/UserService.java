package com.kelvornex.auth.service;

import com.kelvornex.auth.dto.ProfileResponseDTO;
import com.kelvornex.auth.entity.User;
import com.kelvornex.auth.exception.UserNotFoundException;
import com.kelvornex.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ProfileResponseDTO getProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        String name = user.getName();
        String firstName = "";
        String lastName = "";
        if (name != null) {
            String[] parts = name.trim().split("\\s+", 2);
            firstName = parts[0];
            if (parts.length > 1) {
                lastName = parts[1];
            }
        }

        return ProfileResponseDTO.builder()
                .id(user.getId())
                .firstName(firstName)
                .lastName(lastName)
                .email(user.getEmail())
                .role(user.getRole().name())
                .profilePictureUrl(user.getProfilePictureUrl())
                .bio(user.getBio())
                .phoneNumber(user.getPhoneNumber())
                .location(user.getLocation())
                .linkedinUrl(user.getLinkedinUrl())
                .githubUrl(user.getGithubUrl())
                .skills(user.getSkills())
                .build();
    }

    public ProfileResponseDTO updateProfile(Long id, String firstName, String lastName, String bio, String phoneNumber, 
                                           String location, String linkedinUrl, String githubUrl, String skills, 
                                           MultipartFile file) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        user.setName((firstName.trim() + " " + lastName.trim()).trim());
        user.setBio(bio);
        user.setPhoneNumber(phoneNumber);
        user.setLocation(location);
        user.setLinkedinUrl(linkedinUrl);
        user.setGithubUrl(githubUrl);
        user.setSkills(skills);

        if (file != null && !file.isEmpty()) {
            try {
                // Resolve the public folder in the frontend relative to backend application path
                Path publicDir = Paths.get("..", "public").toAbsolutePath().normalize();
                if (!Files.exists(publicDir)) {
                    Files.createDirectories(publicDir);
                }

                String originalFilename = file.getOriginalFilename();
                String cleanFilename = originalFilename != null ? originalFilename.replaceAll("[^a-zA-Z0-9.-]", "_") : "avatar.jpg";
                String newFilename = "profile_" + id + "_" + System.currentTimeMillis() + "_" + cleanFilename;

                Path targetPath = publicDir.resolve(newFilename);
                Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

                // Set absolute path from public directory root
                user.setProfilePictureUrl("/" + newFilename);
            } catch (IOException e) {
                throw new RuntimeException("Failed to persist profile picture upload: " + e.getMessage(), e);
            }
        }

        User updatedUser = userRepository.save(user);

        // Map updated entity fields to ProfileResponseDTO
        String name = updatedUser.getName();
        String updatedFirstName = "";
        String updatedLastName = "";
        if (name != null) {
            String[] parts = name.trim().split("\\s+", 2);
            updatedFirstName = parts[0];
            if (parts.length > 1) {
                updatedLastName = parts[1];
            }
        }

        return ProfileResponseDTO.builder()
                .id(updatedUser.getId())
                .firstName(updatedFirstName)
                .lastName(updatedLastName)
                .email(updatedUser.getEmail())
                .role(updatedUser.getRole().name())
                .profilePictureUrl(updatedUser.getProfilePictureUrl())
                .bio(updatedUser.getBio())
                .phoneNumber(updatedUser.getPhoneNumber())
                .location(updatedUser.getLocation())
                .linkedinUrl(updatedUser.getLinkedinUrl())
                .githubUrl(updatedUser.getGithubUrl())
                .skills(updatedUser.getSkills())
                .build();
    }
}
