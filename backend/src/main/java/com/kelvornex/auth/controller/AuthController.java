package com.kelvornex.auth.controller;

import com.kelvornex.auth.dto.LoginRequestDTO;
import com.kelvornex.auth.dto.LoginResponseDTO;
import com.kelvornex.auth.dto.SignupRequestDTO;
import com.kelvornex.auth.dto.GoogleLoginRequestDTO;
import com.kelvornex.auth.entity.User;
import com.kelvornex.auth.service.AuthService;
import com.kelvornex.auth.dto.CompleteOauthRoleRequestDTO;
import com.kelvornex.auth.dto.ForgotPasswordRequestDTO;
import com.kelvornex.auth.dto.VerifyOtpRequestDTO;
import com.kelvornex.auth.dto.ResetPasswordRequestDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@Valid @RequestBody SignupRequestDTO request) {
        User user = authService.register(request);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google")
    public ResponseEntity<LoginResponseDTO> googleLogin(@Valid @RequestBody GoogleLoginRequestDTO request) {
        LoginResponseDTO response = authService.googleLogin(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/complete-oauth-role")
    public ResponseEntity<LoginResponseDTO> completeOauthRole(@Valid @RequestBody CompleteOauthRoleRequestDTO request) {
        LoginResponseDTO response = authService.completeOauthRole(request);
        return ResponseEntity.ok(response);
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/reset-user")
    public ResponseEntity<String> resetUser(@org.springframework.web.bind.annotation.RequestParam String email) {
        authService.deleteUserByEmail(email);
        return ResponseEntity.ok("User deleted successfully: " + email);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequestDTO request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok("OTP sent to registered email successfully.");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@Valid @RequestBody VerifyOtpRequestDTO request) {
        authService.verifyOtp(request);
        return ResponseEntity.ok("OTP verified successfully.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequestDTO request) {
        authService.resetPassword(request);
        return ResponseEntity.ok("Password reset successfully.");
    }
}
