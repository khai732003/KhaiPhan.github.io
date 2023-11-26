package com.swp.cageshop.service.feedbacksService;


import com.swp.cageshop.DTO.FeedbackDTO;
import com.swp.cageshop.entity.*;
import com.swp.cageshop.repository.FeedbackRepository;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.feedbacksService.IFeedbackService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @Autowired
    private OrdersRepository ordersRepository;

    @Override
    public boolean checkF(Long orderDetailId){
        Feedback feedback = feedbackRepository.checkFeedbackByOrderId(orderDetailId);
        if(feedback != null){
            return true;
        }
        return false;
    }
    @Override
    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {
        Users users = userRepository.getReferenceById(feedbackDTO.getUserId());
        Products products = productRepository.getReferenceById(feedbackDTO.getProductId());
        if (users != null && products != null) {
                Feedback feedback = modelMapper.map(feedbackDTO, Feedback.class);
                feedback.setUser(users);
                Feedback savedFeedback = feedbackRepository.save(feedback);
                return modelMapper.map(savedFeedback, FeedbackDTO.class);
        }
        return null;
    }


    @Override
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
    @Override
    public FeedbackDTO getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        return modelMapper.map(feedback, FeedbackDTO.class);
    }
    @Override
    public FeedbackDTO updateFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = modelMapper.map(feedbackDTO, Feedback.class);
        feedback.setUser(userRepository.getReferenceById(feedbackDTO.getUserId()));
        feedback.setProduct(productRepository.getReferenceById(feedbackDTO.getProductId()));
        Feedback updatedFeedback = feedbackRepository.save(feedback);
        return modelMapper.map(updatedFeedback, FeedbackDTO.class);
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
    @Override
    public double getAverageRatingByProduct(Long productId) {
        List<Feedback> ratings = feedbackRepository.findAllRatingByProductId(productId);
        double sum = 0;
        for (Feedback feedback : ratings) {
            sum += feedback.getRating();
        }
        return ratings.isEmpty() ? 0 : sum / ratings.size();
    }

    @Override
    public boolean checkIfUserHasPurchasedProduct(FeedbackDTO feedbackDTO) {
        List<Orders> orderIdWithUserPurchased = ordersRepository.findOrdersByUserId(feedbackDTO.getUserId());
        if (orderIdWithUserPurchased != null) {
            for (Orders order : orderIdWithUserPurchased) {
                List<OrderDetail> orderDetails = order.getOrderDetails();
                for (OrderDetail orderDetail : orderDetails) {
                    Products product = orderDetail.getProduct();
                    Long productIdFound = product.getId();
                    if (productIdFound.equals(feedbackDTO.getProductId())) {
                        return true;
                    }
                }
            }
        }
        return false;
    }


    @Override
    public List<FeedbackDTO> getAllFeedbacksByProductId(Long productId) {
        List<Feedback> feedbacks = feedbackRepository.findAllByProductIdOrderByIdDesc(productId);
        List<FeedbackDTO> feedbackDTOs = new ArrayList<>();

        for (Feedback feedback : feedbacks) {
            FeedbackDTO mappedFeedbackDTO = modelMapper.map(feedback, FeedbackDTO.class);
            mappedFeedbackDTO.setUserName(userRepository.findUserNameByUserId(feedback.getUser().getId()));
            feedbackDTOs.add(mappedFeedbackDTO);
        }

        return feedbackDTOs;
    }

    @Override
    public List<FeedbackDTO> getAllFeedbacksByUserId(Long userId, Long productId) {
        List<Feedback> feedbacks = feedbackRepository.findByUserIdAndProductIdOrderByIdDesc(userId, productId);
        List<FeedbackDTO> feedbackDTOs = new ArrayList<>();

        for (Feedback feedback : feedbacks) {
            FeedbackDTO mappedFeedbackDTO = modelMapper.map(feedback, FeedbackDTO.class);
            mappedFeedbackDTO.setUserName(feedback.getProduct().getName()); // Assuming you want to include the product name
            feedbackDTOs.add(mappedFeedbackDTO);
        }

        return feedbackDTOs;
    }


    @Override
    public boolean existsFeedbackByUserIdAndProductId(Long userId, Long productId) {
        return feedbackRepository.existsByUserIdAndProductId(userId, productId);
    }

}
