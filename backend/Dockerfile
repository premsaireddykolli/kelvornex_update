# Stage 1: Build the application
FROM maven:3.8.8-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy pom.xml and download dependencies for caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy src and build the package
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from Stage 1
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8085

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
