package com.khai.student.repository;

import com.khai.student.model.Student;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepositories extends JpaRepository<Student, Long> {
   List<Student> findByNameContaining(String key);
}
