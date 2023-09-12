package com.khai.student.service;

import com.khai.student.model.Student;
import java.util.List;

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
    public List<Student> listAStudent(long id);

}
