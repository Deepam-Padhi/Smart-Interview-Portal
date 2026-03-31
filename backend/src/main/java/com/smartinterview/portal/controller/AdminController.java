package com.smartinterview.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartinterview.portal.model.*;
import com.smartinterview.portal.repository.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    QuestionRepository questionRepo;

    @Autowired
    FreeCourseRepository freeCourseRepo;

    @Autowired
    ResultRepository resultRepo;

    // Add Quiz Question
    @PostMapping("/add-question")
    public Question addQuestion(@RequestBody Question q){
        return questionRepo.save(q);
    }

    // Add Free Course
    @PostMapping("/add-free-course")
    public FreeCourse addFreeCourse(@RequestBody FreeCourse c){
        return freeCourseRepo.save(c);
    }

    // View All Results (Admin Dashboard)
    @GetMapping("/results")
    public List<Result> getAllResults(){
        return resultRepo.findAll();
    }
}