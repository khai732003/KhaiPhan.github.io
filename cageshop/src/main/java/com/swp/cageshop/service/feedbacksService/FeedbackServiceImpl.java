package com.swp.cageshop.service.feedbacksService;

import com.swp.cageshop.DTO.FeedbackDTO;
import com.swp.cageshop.entity.Feedback;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.FeedbackRepository;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.feedbacksService.IFeedbackService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImpl implements IFeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private ProductsRepository productRepository;

    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {
        Users users = userRepository.getReferenceById(feedbackDTO.getUserId());
        Products products = productRepository.getReferenceById(feedbackDTO.getProductId());
            if (users != null && products != null) {
                Feedback feedback = modelMapper.map(feedbackDTO, Feedback.class);
                Feedback savedFeedback = feedbackRepository.save(feedback);
                return modelMapper.map(savedFeedback, FeedbackDTO.class);
            }

        return null;
    }


    public List<FeedbackDTO> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepository.findAll();

        double sum = 0.0;
        for (Feedback feedback : feedbacks) {
            sum += feedback.getRating();
        }
        double averageRating = sum / feedbacks.size();

        System.out.println("Trung bình rating là: " + averageRating);

        return feedbacks.stream()
                .map(feedback -> modelMapper.map(feedback, FeedbackDTO.class))
                .collect(Collectors.toList());
    }

    public FeedbackDTO getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        return modelMapper.map(feedback, FeedbackDTO.class);
    }

    public FeedbackDTO updateFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = modelMapper.map(feedbackDTO, Feedback.class);
        feedback.setUser(userRepository.getReferenceById(feedbackDTO.getUserId()));
        feedback.setProduct(productRepository.getReferenceById(feedbackDTO.getProductId()));
        Feedback updatedFeedback = feedbackRepository.save(feedback);
        return modelMapper.map(updatedFeedback, FeedbackDTO.class);
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

    public double getAverageRatingByProduct(Long productId) {
        List<Feedback> ratings = feedbackRepository.findAllRatingByProductId(productId);
        double sum = 0;
        for (Feedback feedback : ratings) {
            sum += feedback.getRating();
        }
        return ratings.isEmpty() ? 0 : sum / ratings.size();
    }

}
