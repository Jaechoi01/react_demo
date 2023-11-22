package com.simple.demo.common;

import com.simple.demo.data.user.dto.UserDto;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;


@Slf4j
public class JwtUtil {

    public static String createJwt(UserDto user, String secretKey, Long ExpiredMillisecond)
    {
        Claims claims = Jwts.claims();
        claims.put("userId", user.getUser_id());
        claims.put("groupId", user.getGroup_id());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ExpiredMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey).compact();


    }

    // expire시간이 지난지만 체크하도록 합.. 잘못된 토큰 값이 온 경우.. 그냥 expired로 간주..
    public static boolean isExpired(String token, String secretKey)  {

        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                    .getBody().getExpiration().before(new Date());



    }


    public static boolean validateToken(String token, String secretKey) {
        Logger logger = LoggerFactory.getLogger(JwtUtil.class);
        try {
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            return true;
        } catch (SignatureException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다. " + token);
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다." + token);
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다." + token);
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다." + token);
        }
        return false;
    }
}
