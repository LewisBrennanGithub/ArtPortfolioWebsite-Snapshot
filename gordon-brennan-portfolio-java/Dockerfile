# Use a base image with Java
FROM openjdk:11-jdk

# Install Maven
RUN apt-get update && \
    apt-get install -y maven

# Set the working directory
WORKDIR /app

# Copy the Maven project file
COPY pom.xml .

# Download the project dependencies
RUN mvn dependency:go-offline

# Copy the application source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/gordonbrennanportfolio-0.0.1-SNAPSHOT.jar"]