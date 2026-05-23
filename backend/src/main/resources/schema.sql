-- Table structure for table `users`
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `profile_picture_url` VARCHAR(1024) DEFAULT NULL,
    `bio` VARCHAR(500) DEFAULT NULL,
    `phone_number` VARCHAR(20) DEFAULT NULL,
    `location` VARCHAR(150) DEFAULT NULL,
    `linkedin_url` VARCHAR(255) DEFAULT NULL,
    `github_url` VARCHAR(255) DEFAULT NULL,
    `skills` VARCHAR(255) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_role CHECK (`role` IN ('STUDENT', 'ENTREPRENEUR'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add profile fields if they do not exist
ALTER TABLE `users` ADD COLUMN `bio` VARCHAR(500) DEFAULT NULL;
ALTER TABLE `users` ADD COLUMN `phone_number` VARCHAR(20) DEFAULT NULL;
ALTER TABLE `users` ADD COLUMN `location` VARCHAR(150) DEFAULT NULL;
ALTER TABLE `users` ADD COLUMN `linkedin_url` VARCHAR(255) DEFAULT NULL;
ALTER TABLE `users` ADD COLUMN `github_url` VARCHAR(255) DEFAULT NULL;
ALTER TABLE `users` ADD COLUMN `skills` VARCHAR(255) DEFAULT NULL;

-- Table structure for table `newsletter_subscriptions`
CREATE TABLE IF NOT EXISTS `newsletter_subscriptions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(150) UNIQUE NOT NULL,
    `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

