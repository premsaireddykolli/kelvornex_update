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
public class CompleteOauthRoleRequestDTO {

    @NotBlank(message = "Temporary token is required")
    private String tempToken;

    @NotBlank(message = "Selected role is required")
    private String selectedRole; // STUDENT or ENTREPRENEUR
}
