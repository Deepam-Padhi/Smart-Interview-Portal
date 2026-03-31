package com.smartinterview.portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartinterview.portal.model.User;
import com.smartinterview.portal.repository.UserRepository;

@Service
public class UserService {

@Autowired
UserRepository repo;

public User register(User user){
    return repo.save(user);
}

public User login(String email,String password){

    User user = repo.findByEmail(email);

    if(user != null && user.getPassword().equals(password)){
        return user;
    }

    return null;
}
}	