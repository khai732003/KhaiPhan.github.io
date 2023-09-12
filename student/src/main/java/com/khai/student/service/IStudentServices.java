package com.khai.student.service;

import com.khai.student.model.Student;
import com.khai.student.repository.StudentRepositories;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IStudentServices implements StudentService{


  @Autowired
  //human talk with database
  private StudentRepositories studentRepositories;

  @Override
  public Student addStudent(Student student) {
    if(student != null){
      return studentRepositories.save(student);
    }
    return null;
  }

  @Override
  public Student updateStudent(long id, Student student) {
    if(student != null){
      Student student1 = studentRepositories.getReferenceById(id);
      if(student1 != null){
        student1.setName(student.getName());
        student1.setAge(student.getAge());
        return studentRepositories.save(student1);
      }
    }
    return null;
  }

  @Override
  public boolean deleteStudent(long id) {
    if(id >= 1){
      Student student = studentRepositories.getReferenceById(id);
      if (student != null){
        studentRepositories.delete(student);
        return true;
      }
    }
    return false;
  }

  @Override
  public List<Student> listAllStudent() {

    return studentRepositories.findAll();
  }

  @Override
  public Optional<Student> listAStudent(long id) {

    return studentRepositories.findById(id);
  }

  @Override
  public List<Student> findByString(String key) {
    return studentRepositories.findByNameContaining(key);
  }


}
