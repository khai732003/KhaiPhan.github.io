package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Feedbacks;
import com.swp.cageshop.service.feedbacksService.IFeedbacksService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/cageshop")
public class FeedbacksController {

    @Autowired
    private IFeedbacksService iFeedbacksService;

    @PostMapping("/feedback/add")
    public ResponseEntity<?> addFeedback(@RequestBody Feedbacks feedbacks, @RequestParam Long userId) {
        Feedbacks savedFeedback = iFeedbacksService.addFeedBack(feedbacks, userId);
        if (savedFeedback != null) {
            return ResponseEntity.ok(savedFeedback);
        } else {
            return ResponseEntity.badRequest().body("Failed to add feedback.");
        }
    }
    @DeleteMapping("/feedback/delete/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable long id) {
        boolean deleted = iFeedbacksService.deleteFeedbacks(id);
        if (deleted) {
            return ResponseEntity.ok("Feedback deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete feedback.");
        }
    }

    @GetMapping("/feedback/list")
    public List<Feedbacks> listFeedbacks() {
        return iFeedbacksService.getAllFeedbacks();
    }

//  @PostMapping("/feedback/add/{id}")
//  public Feedbacks addFeedback(@RequestBody Feedbacks feedbacks, @PathVariable Long id){
//    return iFeedbacksService.addFeedBack(feedbacks, id);
//  }


}
