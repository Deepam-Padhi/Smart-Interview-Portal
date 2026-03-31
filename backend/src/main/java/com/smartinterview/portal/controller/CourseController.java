package com.smartinterview.portal.controller;

import com.smartinterview.portal.model.Course;
import com.smartinterview.portal.model.Question;
import com.smartinterview.portal.repository.CourseRepository;
import com.smartinterview.portal.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin("*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping
    public Iterable<Course> getCourses() {
        return courseRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id);
    }
    
    // Get topics for a course by courseId
    @GetMapping("/{courseId}/topics")
    public List<String> getTopicsByCourseId(@PathVariable Long courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty()) {
            return List.of();
        }
        
        // Find questions by course title and extract unique topics
        List<Question> questions = questionRepository.findByCourseIgnoreCase(course.get().getTitle());
        return questions.stream()
                .map(Question::getTopic)
                .distinct()
                .toList();
    }
    
    // Get questions by courseId, topic, and difficulty
    @GetMapping("/{courseId}/questions/{topic}/{difficulty}")
    public List<Question> getQuestionsByCourseId(
            @PathVariable Long courseId,
            @PathVariable String topic,
            @PathVariable String difficulty) {
        
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty()) {
            return List.of();
        }
        
        return questionRepository.findByCourseIgnoreCaseAndTopicIgnoreCaseAndDifficultyIgnoreCase(
                course.get().getTitle(),
                topic.trim(),
                difficulty.trim()
        );
    }
}
