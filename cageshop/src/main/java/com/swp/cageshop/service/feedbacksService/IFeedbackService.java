package com.swp.cageshop.service.feedbacksService;

import com.swp.cageshop.DTO.FeedbackDTO;

import java.util.List;

public interface IFeedbackService {
    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO);
    public List<FeedbackDTO> getAllFeedbacks() ;

    public FeedbackDTO getFeedbackById(Long id);

    public FeedbackDTO updateFeedback(FeedbackDTO feedbackDTO);

    public void deleteFeedback(Long id);

    }
