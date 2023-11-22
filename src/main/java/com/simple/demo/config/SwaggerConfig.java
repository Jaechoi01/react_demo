package com.simple.demo.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;

import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
@OpenAPIDefinition(
        info = @Info(title = "Simple CS react Api",
                description = "Simple CS react Api",
                version = "v1"))

public class SwaggerConfig {

	@Bean
    public GroupedOpenApi SimpleCsOpenApi() {
        String[] paths = {"/api/**"};

        return GroupedOpenApi.builder()
                .group("SimpleCS react version API")
                .pathsToMatch(paths)
                .build();
    }


}
