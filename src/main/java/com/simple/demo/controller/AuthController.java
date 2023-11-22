package com.simple.demo.controller;


import com.simple.demo.data.common.dto.SingleResult;
import com.simple.demo.data.user.dto.LoginRequestT;
import com.simple.demo.service.MemberService;
//import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final MemberService memberService;

    //@PostMapping("token")
    @RequestMapping(value="token" , method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ResponseEntity<SingleResult<String>> createToken(@RequestBody LoginRequestT loginRequestT){
        return ResponseEntity.ok().body(memberService.login(loginRequestT));
    }
}
