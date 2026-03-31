package com.smartinterview.portal.repository;

import com.smartinterview.portal.model.FreeCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreeCourseRepository extends JpaRepository<FreeCourse, Long> {
}
