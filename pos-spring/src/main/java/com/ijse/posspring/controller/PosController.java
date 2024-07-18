package com.ijse.posspring.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class PosController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello Spring Boot";
    }

}
