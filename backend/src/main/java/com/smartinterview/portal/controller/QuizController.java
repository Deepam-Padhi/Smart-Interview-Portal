package com.smartinterview.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartinterview.portal.model.Question;
import com.smartinterview.portal.repository.QuestionRepository;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuestionRepository repo;

    // Add Question
    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question q) {
        q.setCourse(q.getCourse().trim());
        q.setTopic(q.getTopic().trim());
        q.setDifficulty(q.getDifficulty().toLowerCase().trim());
        return repo.save(q);
    }

    // Get Courses
    @GetMapping("/courses")
    public List<String> getCourses() {
        return repo.findAll()
                .stream()
                .map(Question::getCourse)
                .distinct()
                .toList();
    }

    // Get Topics
    @GetMapping("/topics/{course}")
    public List<String> getTopics(@PathVariable String course) {
        return repo.findByCourseIgnoreCase(course.trim())
                .stream()
                .map(Question::getTopic)
                .distinct()
                .toList();
    }

    // Get Quiz
    @GetMapping("/{course}/{topic}/{difficulty}")
    public List<Question> getQuiz(
            @PathVariable String course,
            @PathVariable String topic,
            @PathVariable String difficulty) {

        System.out.println("Course: " + course);
        System.out.println("Topic: " + topic);
        System.out.println("Difficulty: " + difficulty);

        return repo.findByCourseIgnoreCaseAndTopicIgnoreCaseAndDifficultyIgnoreCase(
                course.trim(),
                topic.trim(),
                difficulty.trim()
        );
    }
}