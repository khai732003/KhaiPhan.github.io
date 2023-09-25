package com.swp.cageshop.service.feedbacksService;

import com.swp.cageshop.entity.Feedbacks;
import com.swp.cageshop.entity.Orders;

import java.util.List;

public interface IFeedbacksService {
    public Feedbacks addFeedbacks(Feedbacks feedbacks);

    public Feedbacks updateFeedbacks(long id,Feedbacks feedbacks);

    public boolean deleteFeedbacks(long id);
    public List<Feedbacks> getAllFeedbacks();

    public Feedbacks getOneFeedback(long id);

}
