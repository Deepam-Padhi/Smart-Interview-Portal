package com.smartinterview.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartinterview.portal.model.User;

public interface UserRepository extends JpaRepository<User,Long>{

User findByEmail(String email);

}