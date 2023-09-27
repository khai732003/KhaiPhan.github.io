package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Feedbacks;
import com.swp.cageshop.service.feedbacksService.IFeedbacksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cageshop")
public class FeedbacksController {
    @Autowired
    private IFeedbacksService iFeedbacksService;

   @PostMapping("/feedbacks/add")
    public Feedbacks addFeedbacks(@RequestBody Feedbacks feedbacks){
       return iFeedbacksService.addFeedbacks(feedbacks);
   }
   @PutMapping("feedbacks/update")
    public Feedbacks updateFeedbacks(@RequestParam("id") long id, @RequestBody Feedbacks feedbacks){
       return iFeedbacksService.updateFeedbacks(id,feedbacks);
   }

}
