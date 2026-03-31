package com.smartinterview.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartinterview.portal.model.User;
import com.smartinterview.portal.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService service;

    // =========================
    // Register User
    // =========================
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        // If role is not provided, set default role USER
        if(user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        return service.register(user);
    }

    // =========================
    // Login User
    // =========================
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        User existingUser = service.login(user.getEmail(), user.getPassword());

        if(existingUser != null) {
            return existingUser;
        }

        return null;
    }

}