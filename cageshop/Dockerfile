# Build stage
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests

# Final stage
FROM openjdk:17.0.1-jdk-slim
LABEL org.opencontainers.image.source="https://github.com/your/repo"

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
