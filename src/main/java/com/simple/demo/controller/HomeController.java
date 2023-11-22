package com.simple.demo.controller;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@SecurityRequirement(name="Bearer Authentication")
public class HomeController {

    @GetMapping("/api/home/hello")
    public List<String> hello()
    {
        return Arrays.asList("Hello" , " World");
    }


}
