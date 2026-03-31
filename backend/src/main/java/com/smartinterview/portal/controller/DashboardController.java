package com.smartinterview.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartinterview.portal.model.Result;
import com.smartinterview.portal.repository.ResultRepository;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    ResultRepository repo;

    @GetMapping("/{userId}")
    public Map<String,Object> getDashboard(@PathVariable Long userId){

        List<Result> results = repo.findByUserId(userId);

        int totalQuiz = results.size();
        int totalQuestions = 0;
        int totalCorrect = 0;

        Map<String,Integer> topicWise = new HashMap<>();

        for(Result r : results){
            totalQuestions += r.getTotal();
            totalCorrect += r.getScore();

            topicWise.put(
                r.getTopic(),
                topicWise.getOrDefault(r.getTopic(),0) + r.getScore()
            );
        }

        double percentage = 0;
        if(totalQuestions > 0){
            percentage = ((double) totalCorrect / totalQuestions) * 100;
        }

        Map<String,Object> data = new HashMap<>();
        data.put("totalQuiz", totalQuiz);
        data.put("totalQuestions", totalQuestions);
        data.put("totalCorrect", totalCorrect);
        data.put("percentage", percentage);
        data.put("topicWiseScore", topicWise);

        return data;
    }
}