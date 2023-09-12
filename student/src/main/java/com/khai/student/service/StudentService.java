package com.khai.student.service;

import com.khai.student.model.Student;
import java.util.List;
import java.util.Optional;

public interface StudentService {
    //add
    public Student addStudent(Student student);

    //update
    public Student updateStudent(long id, Student student);

    //delete
    public boolean deleteStudent(long id);

    //list
    public List<Student> listAllStudent();

    //list a student
    public Optional<Student> listAStudent(long id);

    //test find a String
    public List<Student> findByString(String key);
}
