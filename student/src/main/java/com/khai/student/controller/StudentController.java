package com.khai.student.controller;

import com.khai.student.model.Student;
import com.khai.student.service.IStudentServices;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("student")
public class StudentController {
  @Autowired
  private IStudentServices iStudentServices;

  @PostMapping("/add")
  public Student add(@RequestBody Student student){
    return iStudentServices.addStudent(student);
  }

  @PutMapping("/update/{id}")
  public Student update(@PathVariable("id") long id, @RequestBody Student student){
     return iStudentServices.updateStudent(id, student);
  }

  @DeleteMapping("/delete/{id}")
  public boolean delete(@PathVariable("id") long id){
    return iStudentServices.deleteStudent(id);
  }

  @GetMapping("/list")
  public List<Student> listAll(){
    return iStudentServices.listAllStudent();
  }

  @GetMapping("/list/{id}")
  public Optional<Student> listById(@PathVariable("id") long id){

    return iStudentServices.listAStudent(id);
  }
}
