package com.smartinterview.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartinterview.portal.model.FreeCourse;
import com.smartinterview.portal.repository.FreeCourseRepository;

@RestController
@RequestMapping("/api/freecourses")
@CrossOrigin("*")
public class FreeCourseController {

    @Autowired
    private FreeCourseRepository repo;

    @PostMapping("/add")
    public FreeCourse addCourse(@RequestBody FreeCourse course) {
        return repo.save(course);
    }

    @GetMapping("/all")
    public List<FreeCourse> getAllCourses() {
        return repo.findAll();
    }
}