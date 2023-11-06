package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.FeedbackDTO;
import com.swp.cageshop.entity.Feedback;
import com.swp.cageshop.repository.FeedbackRepository;
import com.swp.cageshop.service.feedbacksService.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cageshop/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private IFeedbackService feedbackService;

    @PostMapping("/add")
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Feedback existingFeedback = feedbackRepository.findByUserIdAndProductId(feedbackDTO.getUserId(), feedbackDTO.getProductId());
        if (existingFeedback != null) {
            return new ResponseEntity("Phản hồi đã tồn tại", HttpStatus.BAD_REQUEST);
        }
        FeedbackDTO createdFeedback = feedbackService.createFeedback(feedbackDTO);
        if (createdFeedback != null) {
            return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/get-all")
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() {
        List<FeedbackDTO> feedbacks = feedbackService.getAllFeedbacks();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    @GetMapping("get-by/{id}")
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable Long id) {
        FeedbackDTO feedback = feedbackService.getFeedbackById(id);
        if (feedback != null) {
            return new ResponseEntity<>(feedback, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("update-by/{id}")
    public ResponseEntity<FeedbackDTO> updateFeedback(@PathVariable Long id, @RequestBody FeedbackDTO feedbackDTO) {
        feedbackDTO.setId(id);
        FeedbackDTO updatedFeedback = feedbackService.updateFeedback(feedbackDTO);
        if (updatedFeedback != null) {
            return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("delete-by/{id}")
    public ResponseEntity<FeedbackDTO> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/average-rating/{productId}")
    public ResponseEntity<Double> getAverageRatingByProduct(@PathVariable Long productId) {
        double averageRating = feedbackService.getAverageRatingByProduct(productId);
        return ResponseEntity.ok(averageRating);
    }
}
