package com.smartinterview.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartinterview.portal.model.Result;
import java.util.List;

public interface ResultRepository extends JpaRepository<Result,Long>{

    List<Result> findByUserId(Long userId);
}