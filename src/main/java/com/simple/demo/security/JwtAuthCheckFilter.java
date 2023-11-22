package com.simple.demo.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.simple.demo.common.ErrorCode;
import com.simple.demo.common.JwtUtil;
import com.simple.demo.data.common.dto.BaseResult;
import com.simple.demo.service.MemberService;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Component
@WebFilter(urlPatterns = "/api")
public class JwtAuthCheckFilter extends OncePerRequestFilter {

    private final MemberService memberService;

    private final ObjectMapper mapper;

    @Value("${jwt.secret_key}")
    private String secretKey;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        String userName = "";
        if(request.getRequestURI().startsWith("/api")&& !request.getRequestURI().startsWith("/api/auth") )
        {
            log.info("start authentication check ==>"+ request.getRequestURL() +  "/" +  request.getRequestURI() );

            final String authentication = request.getHeader(HttpHeaders.AUTHORIZATION);
            if(authentication != null)  authentication.replace("Bearer ", "");

            boolean isSuccess = true;

            isSuccess = JwtUtil.validateToken(authentication,secretKey);


            if(isSuccess) {
                // 권한 부여
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userName, null, List.of(new SimpleGrantedAuthority("User")));

                // Detail에 넣어줌..
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                // 정상적인 필터과정을 거치도록 한다.
                filterChain.doFilter(request, response);
            }
            else
            {

                // 인증이 없으므로 권한없음을 처리한다.
                BaseResult baseResult = new BaseResult();
                baseResult.setCode(ErrorCode.USER_NO_PERMISSION.getCode());
                baseResult.setMessage(ErrorCode.USER_NO_PERMISSION.getMessage() );


                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                mapper.writeValue(response.getWriter(), baseResult);
            }

        }
        else
        {
            filterChain.doFilter(request, response);
        }


    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String[] excludePath = {"/css", "/static","/swagger-ui", "/v3/api-docs"};
        String path = request.getRequestURI();
        return Arrays.stream(excludePath).anyMatch(path::startsWith);
    }



}
