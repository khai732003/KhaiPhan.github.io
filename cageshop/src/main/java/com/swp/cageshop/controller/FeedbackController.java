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
@CrossOrigin
@RequestMapping("/cageshop/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private IFeedbackService feedbackService;


    @GetMapping("/check-by-orderdetail/{orderDetailId}")
    public boolean checkByOrderDetail(@PathVariable Long orderDetailId){
        return feedbackService.checkF(orderDetailId);
    }
    @PostMapping("/add")
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Feedback existingFeedback = feedbackRepository.findByUserIdAndProductId(feedbackDTO.getUserId(), feedbackDTO.getProductId());
        if (existingFeedback != null) {
            return new ResponseEntity("Phản hồi đã tồn tại", HttpStatus.BAD_REQUEST);
        }
        if(feedbackService.checkIfUserHasPurchasedProduct(feedbackDTO) == true) {
            FeedbackDTO createdFeedback = feedbackService.createFeedback(feedbackDTO);
            if (createdFeedback != null) {
                return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }else{
            return new ResponseEntity("User này chưa thực hiện thanh toán và chưa nhận được các sản phẩm này", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/get-all")
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() {
        List<FeedbackDTO> feedbacks = feedbackService.getAllFeedbacks()
                ;
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


    @GetMapping("/byProductId/{productId}")
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacksByProductId(@PathVariable Long productId) {
        List<FeedbackDTO> feedbackDTOs = feedbackService.getAllFeedbacksByProductId(productId);

        if (feedbackDTOs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(feedbackDTOs, HttpStatus.OK);
        }
    }

    @GetMapping("/get-by-userId-and-productId")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByUserIdAndProductId(
            @RequestParam Long userId,
            @RequestParam Long productId
    ) {
        List<FeedbackDTO> feedbacks = feedbackService.getAllFeedbacksByUserId(userId, productId);
        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/userId/{feedbackId}")
    public ResponseEntity<Long> findUserIdByFeedbackId(@PathVariable Long feedbackId) {
        Long userId = feedbackRepository.findUserIdByFeedbackId(feedbackId);
        if (userId != null) {
            return new ResponseEntity<>(userId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @GetMapping("/exists/{userId}/{productId}")
    public boolean existsFeedbackByUserIdAndProductId(@PathVariable Long userId, @PathVariable Long productId) {
        return feedbackService.existsFeedbackByUserIdAndProductId(userId, productId);
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }



}
