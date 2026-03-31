package com.smartinterview.portal.controller;

import com.smartinterview.portal.model.Course;
import com.smartinterview.portal.model.Question;
import com.smartinterview.portal.repository.CourseRepository;
import com.smartinterview.portal.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AddCourse {

    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private QuestionRepository questionRepository;

    // Add new course
    @PostMapping("/add-course")
    public Course addCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    // Get all courses
    @GetMapping("/courses")
    public Iterable<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Delete course
    @DeleteMapping("/delete-course/{id}")
    public String deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
        return "Course deleted successfully";
    }
    
    // Seed demo courses
    @PostMapping("/seed-demo-courses")
    public Map<String, Object> seedDemoCourses() {
        Map<String, Object> response = new HashMap<>();
        try {
            // Keep seed idempotent for presentation refreshes.
            questionRepository.deleteAll();

            Course infosysJava = new Course();
            infosysJava.setTitle("Infosys Springboard - Java Foundation Certification");
            infosysJava.setDescription("Core Java, OOP, exception handling, and collections for placement readiness.");
            infosysJava.setLink("https://infyspringboard.onwingspan.com/");
            courseRepository.save(infosysJava);
            createQuestionsForCourse("Infosys Springboard", "Java Foundation", 8);

            Course infosysCloud = new Course();
            infosysCloud.setTitle("Infosys Springboard - Cloud and DevOps Basics");
            infosysCloud.setDescription("Cloud deployment fundamentals, CI/CD pipelines, and DevOps culture.");
            infosysCloud.setLink("https://infyspringboard.onwingspan.com/");
            courseRepository.save(infosysCloud);
            createQuestionsForCourse("Infosys Springboard", "Cloud and DevOps", 7);

            Course ibmData = new Course();
            ibmData.setTitle("IBM SkillsBuild - Data Science Foundations");
            ibmData.setDescription("Data analysis lifecycle, statistics basics, and model evaluation concepts.");
            ibmData.setLink("https://skillsbuild.org/");
            courseRepository.save(ibmData);
            createQuestionsForCourse("IBM SkillsBuild", "Data Science", 8);

            Course ibmCyber = new Course();
            ibmCyber.setTitle("IBM SkillsBuild - Cybersecurity Analyst Track");
            ibmCyber.setDescription("Threat modeling, CIA triad, incident response, and SOC workflow basics.");
            ibmCyber.setLink("https://skillsbuild.org/");
            courseRepository.save(ibmCyber);
            createQuestionsForCourse("IBM SkillsBuild", "Cybersecurity", 7);

            Course salesforceAdmin = new Course();
            salesforceAdmin.setTitle("Salesforce Trailhead - Admin Beginner");
            salesforceAdmin.setDescription("Objects, fields, profiles, roles, reports, and automation in Salesforce.");
            salesforceAdmin.setLink("https://trailhead.salesforce.com/");
            courseRepository.save(salesforceAdmin);
            createQuestionsForCourse("Salesforce Trailhead", "Salesforce Admin", 8);

            Course salesforceApex = new Course();
            salesforceApex.setTitle("Salesforce Trailhead - Apex and Lightning");
            salesforceApex.setDescription("Apex triggers, Lightning components, governor limits, and deployment basics.");
            salesforceApex.setLink("https://trailhead.salesforce.com/");
            courseRepository.save(salesforceApex);
            createQuestionsForCourse("Salesforce Trailhead", "Apex Development", 8);
            
            response.put("status", "success");
            response.put("message", "Provider demo courses and quiz questions seeded successfully.");
            response.put("coursesAdded", 6);
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return response;
    }
    
    private void createQuestionsForCourse(String course, String topic, int count) {
        Map<String, String[][]> questionsMap = new HashMap<>();
        
        questionsMap.put("Java Foundation", new String[][] {
            {"What is the difference between JDK, JRE, and JVM?", "JDK is for development, JRE is for runtime, JVM executes bytecode"},
            {"Explain encapsulation in Java", "Bundling data and methods together, hiding internal details from the outside"},
            {"What is polymorphism?", "Ability of objects to take multiple forms, achieved through method overriding and overloading"},
            {"What is the purpose of the 'final' keyword?", "Prevents modification of classes, methods, or variables"},
            {"Explain Exception handling in Java", "Managing runtime errors using try-catch-finally blocks"},
            {"What is a stream in Java?", "A sequence of elements supporting sequential and parallel aggregate operations"},
            {"Difference between interface and abstract class", "Interface specifies what to do, abstract class specifies how to do"},
            {"What is garbage collection?", "Automatic memory management that frees unused objects"}
        });
        
        questionsMap.put("Cloud and DevOps", new String[][] {
            {"What is CI/CD?", "A practice that automates integration, testing, and deployment of code changes"},
            {"What is the purpose of a Docker container?", "To package an application with its dependencies for consistent deployment"},
            {"What is Infrastructure as Code?", "Managing infrastructure through versioned configuration files"},
            {"What is blue-green deployment?", "A release strategy with two environments to reduce deployment risk"},
            {"Why is monitoring essential in DevOps?", "It helps detect failures quickly and improve system reliability"},
            {"What is a rollback strategy?", "A plan to restore a previous stable version after a failed release"},
            {"What is the role of a build pipeline?", "To compile, test, and package software automatically"}
        });
        
        questionsMap.put("Data Science", new String[][] {
            {"What is overfitting in machine learning?", "When a model learns noise from training data and performs poorly on new data"},
            {"What is the purpose of train-test split?", "To evaluate model performance on unseen data"},
            {"What is precision in classification?", "The fraction of predicted positives that are actually positive"},
            {"What is recall in classification?", "The fraction of actual positives correctly identified"},
            {"What is feature engineering?", "Creating or transforming variables to improve model performance"},
            {"What does normalization do?", "Scales data to a comparable range for better model behavior"},
            {"What is a confusion matrix used for?", "To visualize classification performance across predicted and actual classes"},
            {"What is cross-validation?", "A method to evaluate model stability by training/testing on multiple folds"}
        });
        
        questionsMap.put("Cybersecurity", new String[][] {
            {"What is the CIA triad?", "Confidentiality, Integrity, and Availability - the core security principles"},
            {"What is phishing?", "A social engineering attack that tricks users into revealing sensitive data"},
            {"What is multi-factor authentication?", "An authentication method that requires two or more verification factors"},
            {"What is vulnerability management?", "Identifying, prioritizing, and fixing security weaknesses"},
            {"What is an incident response plan?", "A structured process to detect, contain, and recover from security incidents"},
            {"What is least privilege access?", "Granting users only the minimum permissions needed"},
            {"What is a security patch?", "An update that fixes known software vulnerabilities"}
        });
        
        questionsMap.put("Salesforce Admin", new String[][] {
            {"What is a custom object in Salesforce?", "A user-defined data structure to store business-specific information"},
            {"What is the difference between profile and role?", "Profile controls permissions, role controls record visibility hierarchy"},
            {"What is a validation rule?", "A rule that enforces data quality before saving a record"},
            {"What is workflow in Salesforce?", "A legacy automation tool for field updates, alerts, and tasks"},
            {"What is a report type?", "Defines relationships and fields available when building reports"},
            {"What is a dashboard component?", "A visual chart or metric block used to display report data"},
            {"What is field-level security?", "Controls user access to view/edit specific fields"},
            {"What is record-level sharing?", "Controls which users can access specific records"}
        });

        questionsMap.put("Apex Development", new String[][] {
            {"What is Apex in Salesforce?", "A strongly typed object-oriented language used for custom business logic"},
            {"What is a trigger?", "Code that executes before or after DML events on records"},
            {"What are governor limits?", "Runtime limits that ensure shared resource usage in multi-tenant architecture"},
            {"What is a batch Apex job?", "An asynchronous process that handles large data volumes in chunks"},
            {"What is test coverage in Salesforce?", "The percentage of Apex code executed by unit tests"},
            {"What is SOQL?", "Salesforce Object Query Language for querying Salesforce data"},
            {"What is an Apex class?", "A template that defines methods and variables for Apex logic"},
            {"What is a Lightning component used for?", "Building reusable, interactive UI in Salesforce apps"}
        });
        
        String[][] questions = questionsMap.get(topic);
        if (questions != null) {
            for (int i = 0; i < Math.min(count, questions.length); i++) {
                Question q = new Question();
                q.setCourse(course);
                q.setTopic(topic);
                q.setQuestion(questions[i][0]);
                q.setOptionA(questions[i][1]);
                q.setOptionB("This is another possible answer about " + topic);
                q.setOptionC("Different perspective on " + topic + " concepts");
                q.setOptionD("Alternative approach to understanding " + topic);
                q.setCorrectAnswer("A");
                if (i % 3 == 0) {
                    q.setDifficulty("easy");
                } else if (i % 3 == 1) {
                    q.setDifficulty("medium");
                } else {
                    q.setDifficulty("hard");
                }
                questionRepository.save(q);
            }
        }
    }
}