package com.kelvornex.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoogleLoginRequestDTO {

    @NotBlank(message = "Google ID / Access Token is required")
    private String token;

    @NotBlank(message = "Token type is required")
    private String tokenType; // "id_token" or "access_token"

    private String role; // STUDENT or ENTREPRENEUR
}
