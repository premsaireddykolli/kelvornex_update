package com.kelvornex.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
    
    private boolean authenticated;
    private UserDTO user;
    private boolean roleSelectionRequired;
    private String tempToken;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserDTO {
        private Long id;
        private String name;
        private String role;
        private String profileLink;
        private String profilePictureUrl;
    }
}
