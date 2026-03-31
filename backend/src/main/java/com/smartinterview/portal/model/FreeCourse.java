package com.smartinterview.portal.model;

import jakarta.persistence.*;

@Entity
public class FreeCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String link;
    private String description;

    public FreeCourse(){}
    
    public Long getId(){ return id; }
    public void setId(Long id){ this.id=id; }

    public String getTitle(){ return title; }
    public void setTitle(String title){ this.title=title; }

    public String getLink(){ return link; }
    public void setLink(String link){ this.link=link; }

    public String getDescription(){ return description; }
    public void setDescription(String description){ this.description=description; }
}