package com.smartinterview.portal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String course;
    private String topic;
    private String difficulty;

    private int score;
    private int total;

    private LocalDateTime date;

    public Result(){
        this.date = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id=id; }

    public Long getUserId(){ return userId; }
    public void setUserId(Long userId){ this.userId=userId; }

    public String getCourse(){ return course; }
    public void setCourse(String course){ this.course=course; }

    public String getTopic(){ return topic; }
    public void setTopic(String topic){ this.topic=topic; }

    public String getDifficulty(){ return difficulty; }
    public void setDifficulty(String difficulty){ this.difficulty=difficulty; }

    public int getScore(){ return score; }
    public void setScore(int score){ this.score=score; }

    public int getTotal(){ return total; }
    public void setTotal(int total){ this.total=total; }

    public LocalDateTime getDate(){ return date; }
}