package com.swp.cageshop.service.feedbacksService;

import com.swp.cageshop.DTO.FeedbackDTO;

import java.util.List;

public interface IFeedbackService {
    public boolean checkF(Long orderDetailId);
    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO);
    public List<FeedbackDTO> getAllFeedbacks() ;

    public FeedbackDTO getFeedbackById(Long id);

    public FeedbackDTO updateFeedback(FeedbackDTO feedbackDTO);

    public void deleteFeedback(Long id);

    public double getAverageRatingByProduct(Long productId);

    public boolean checkIfUserHasPurchasedProduct(FeedbackDTO feedbackDTO);

    public List<FeedbackDTO> getAllFeedbacksByProductId(Long productId);

    public List<FeedbackDTO> getAllFeedbacksByUserId(Long userId, Long productId);

    public boolean existsFeedbackByUserIdAndProductId(Long userId, Long productId);

}
