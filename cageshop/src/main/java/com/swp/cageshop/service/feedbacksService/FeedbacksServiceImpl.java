package com.swp.cageshop.service.feedbacksService;

import com.swp.cageshop.entity.Feedbacks;
import com.swp.cageshop.repository.FeedbacksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbacksServiceImpl implements IFeedbacksService {
   @Autowired
   private FeedbacksRepository feedbacksRepository;

    @Override
    public Feedbacks addFeedbacks(Feedbacks feedbacks) {
       if(feedbacks!=null){
           return feedbacksRepository.save(feedbacks);
       }

       return null;
    }

    @Override
    public Feedbacks updateFeedbacks(long id, Feedbacks feedbacks) {
        if (feedbacks != null) {
            Feedbacks feedbacks1 = feedbacksRepository.getReferenceById(id);
            if (feedbacks1 != null) {
             return null;

            }

            return null;
        }
    }

    @Override
    public boolean deleteFeedbacks(long id) {
        return false;
    }

    @Override
    public List<Feedbacks> getAllFeedbacks() {
        return null;
    }

    @Override
    public Feedbacks getOneFeedback(long id) {
        return null;
    }
}
