package com.kelvornex.auth;

import com.kelvornex.auth.entity.Role;
import com.kelvornex.auth.entity.User;
import com.kelvornex.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }

    @Bean
    public CommandLineRunner seedDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                // Seed Student
                User student = User.builder()
                        .name("Student User")
                        .email("student@example.com")
                        .password(passwordEncoder.encode("password123"))
                        .role(Role.STUDENT)
                        .profilePictureUrl("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80")
                        .build();
                userRepository.save(student);

                // Seed Entrepreneur
                User entrepreneur = User.builder()
                        .name("Entrepreneur User")
                        .email("entrepreneur@example.com")
                        .password(passwordEncoder.encode("password123"))
                        .role(Role.ENTREPRENEUR)
                        .profilePictureUrl("https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80")
                        .build();
                userRepository.save(entrepreneur);

                System.out.println("--- Seeded student@example.com / password123 (STUDENT) ---");
                System.out.println("--- Seeded entrepreneur@example.com / password123 (ENTREPRENEUR) ---");
            }
        };
    }
}
