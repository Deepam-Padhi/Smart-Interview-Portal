package com.smartinterview.portal.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.smartinterview.portal.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByCourseIgnoreCase(String course);

    List<Question> findByCourseIgnoreCaseAndTopicIgnoreCaseAndDifficultyIgnoreCase(
            String course, String topic, String difficulty);
}