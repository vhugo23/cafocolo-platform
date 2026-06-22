# Build stage: compile the Spring Boot app using the Maven wrapper.
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw clean package -DskipTests


# Runtime stage: run only the built jar with Java.
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/cafocolo-api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]