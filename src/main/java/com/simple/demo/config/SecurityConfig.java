package com.simple.demo.config;


import com.fasterxml.jackson.databind.ObjectMapper;
//import com.simple.demo.security.JwtAuthCheckFilter;
import com.simple.demo.security.JwtAuthCheckFilter;
import com.simple.demo.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthCheckFilter jwtAuthCheckFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .httpBasic(httpBasic -> httpBasic.disable())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize  -> authorize
                               // .requestMatchers("/api/**" ).authenticated()
                                        .anyRequest().permitAll()
                        // 그 외의 모든 요청은 인증 필요
                )
                .sessionManagement(sessionManagement ->
                        // 세션을 사용하지 않으므로 STATELESS 설정
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                ).addFilterBefore(jwtAuthCheckFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }




}
