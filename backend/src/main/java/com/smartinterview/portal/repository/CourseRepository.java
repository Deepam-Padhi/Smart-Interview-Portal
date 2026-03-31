package com.smartinterview.portal.repository;

import com.smartinterview.portal.model.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, Long> {
}