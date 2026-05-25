# Kelvornex Update

Kelvornex is a collaborative platform designed for students and entrepreneurs.

## Features
- **Modern Authentication Flow**: Unified secure login with support for role selection (Student vs. Entrepreneur) and Google OAuth integration.
- **Robust OTP-based Password Reset**: Secure OTP (One-Time Password) generation, email delivery, verification, and password reset functionality.
- **Tailwind CSS Styling**: Premium, sleek, and responsive UI with modern typography and animations.
- **Spring Boot Backend**: Robust Java Spring Boot REST API for auth logic, database operations, and support mailing.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Spring Boot, Java 17, JPA/Hibernate, MySQL, Java Mail Sender

## Setup & Running

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Maven 3.x
- MySQL Database

### Environment Variables
Create a `.env` file in the root directory (already configured with a fallback):
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### Running the Backend
1. Configure your database settings in `backend/src/main/resources/application.properties`.
2. Run from the `backend` folder:
   ```bash
   mvn spring-boot:run
   ```

### Running the Frontend
1. Install dependencies from the root directory:
   ```bash
   npm install
   ```
2. Run Vite dev server:
   ```bash
   npm run dev
   ```
