package com.kelvornex.auth.controller;

import com.kelvornex.auth.dto.ProfileResponseDTO;
import com.kelvornex.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users/profile")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponseDTO> getProfile(@PathVariable Long id) {
        ProfileResponseDTO response = userService.getProfile(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProfileResponseDTO> updateProfile(
            @PathVariable Long id,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "linkedinUrl", required = false) String linkedinUrl,
            @RequestParam(value = "githubUrl", required = false) String githubUrl,
            @RequestParam(value = "skills", required = false) String skills,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture) {
        ProfileResponseDTO response = userService.updateProfile(
                id, firstName, lastName, bio, phoneNumber, location, linkedinUrl, githubUrl, skills, profilePicture);
        return ResponseEntity.ok(response);
    }
}
