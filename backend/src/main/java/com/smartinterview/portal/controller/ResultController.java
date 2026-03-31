package com.smartinterview.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartinterview.portal.model.Result;
import com.smartinterview.portal.repository.ResultRepository;

import java.util.List;

@RestController
@RequestMapping("/api/result")
@CrossOrigin("*")
public class ResultController {

    @Autowired
    ResultRepository repo;

    // Save Result
    @PostMapping("/save")
    public Result saveResult(@RequestBody Result result){
        return repo.save(result);
    }

    // Get Result by User
    @GetMapping("/user/{userId}")
    public List<Result> getUserResults(@PathVariable Long userId){
        return repo.findByUserId(userId);
    }
}