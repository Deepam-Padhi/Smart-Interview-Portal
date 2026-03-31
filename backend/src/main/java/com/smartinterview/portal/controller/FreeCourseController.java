package com.smartinterview.portal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

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
@RequestMapping({"/api/freecourses", "/api/free-courses"})
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
        List<FreeCourse> courses = repo.findAll();
        if (courses.isEmpty()) {
            seedProviderCourses();
            courses = repo.findAll();
        }
        return courses;
    }

    @GetMapping
    public List<FreeCourse> getAllCoursesCompat() {
        List<FreeCourse> courses = repo.findAll();
        if (courses.isEmpty()) {
            seedProviderCourses();
            courses = repo.findAll();
        }
        return courses;
    }

    @PostMapping("/seed-demo")
    public Map<String, Object> seedDemoCourses() {
        Map<String, Object> result = new HashMap<>();
        List<FreeCourse> created = seedProviderCourses();
        result.put("status", "success");
        result.put("coursesAdded", created.size());
        result.put("message", "Provider courses from Infosys Springboard, IBM, and Salesforce added.");
        return result;
    }

    private List<FreeCourse> seedProviderCourses() {
        List<FreeCourse> seeded = new ArrayList<>();

        FreeCourse c1 = new FreeCourse();
        c1.setTitle("Infosys Springboard - Programming Fundamentals");
        c1.setDescription("A beginner-friendly track for Java, problem solving, and placement readiness.");
        c1.setLink("https://infyspringboard.onwingspan.com/");
        seeded.add(repo.save(c1));

        FreeCourse c2 = new FreeCourse();
        c2.setTitle("Infosys Springboard - Cloud and DevOps Essentials");
        c2.setDescription("Learn CI/CD, cloud basics, and real-world DevOps workflows.");
        c2.setLink("https://infyspringboard.onwingspan.com/");
        seeded.add(repo.save(c2));

        FreeCourse c3 = new FreeCourse();
        c3.setTitle("IBM SkillsBuild - Data Science Career Path");
        c3.setDescription("Statistics, data analysis, and machine learning concepts for freshers.");
        c3.setLink("https://skillsbuild.org/");
        seeded.add(repo.save(c3));

        FreeCourse c4 = new FreeCourse();
        c4.setTitle("IBM SkillsBuild - Cybersecurity Basics");
        c4.setDescription("Foundational cybersecurity concepts, SOC roles, and incident response.");
        c4.setLink("https://skillsbuild.org/");
        seeded.add(repo.save(c4));

        FreeCourse c5 = new FreeCourse();
        c5.setTitle("Salesforce Trailhead - Administrator Beginner");
        c5.setDescription("Understand org setup, profiles, roles, and reports in Salesforce.");
        c5.setLink("https://trailhead.salesforce.com/");
        seeded.add(repo.save(c5));

        FreeCourse c6 = new FreeCourse();
        c6.setTitle("Salesforce Trailhead - Apex Specialist Prep");
        c6.setDescription("Build backend logic with Apex, triggers, and asynchronous processing.");
        c6.setLink("https://trailhead.salesforce.com/");
        seeded.add(repo.save(c6));

        return seeded;
    }
}