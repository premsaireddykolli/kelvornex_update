# Stage 1: Build the Spring Boot application using Maven
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the backend configuration files first to leverage Docker layer caching
COPY backend/pom.xml ./backend/
WORKDIR /app/backend
RUN mvn dependency:go-offline -B

# Copy the rest of your Java source files and build the package
WORKDIR /app
COPY backend/ ./backend/
WORKDIR /app/backend
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image using a lightweight JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the compiled JAR file from the build stage
COPY --from=build /app/backend/target/*.jar app.jar

# Spring Boot default port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]