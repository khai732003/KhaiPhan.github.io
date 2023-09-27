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
                feedbacks1.setContent(feedbacks1.getContent());
                return feedbacksRepository.save(feedbacks1);
            }
        }
            return null;
        }


    @Override
    public boolean deleteFeedbacks(long id) {
        if (id >=1){
            Feedbacks feedbacks = feedbacksRepository.getReferenceById(id);
           if(feedbacks!=null){
               feedbacksRepository.delete(feedbacks);
                return true;
           }
        }

        return false;
    }

    @Override
    public List<Feedbacks> getAllFeedbacks() {
        return feedbacksRepository.findAll();
    }

    @Override
    public Feedbacks getOneFeedback(long id) {
        return feedbacksRepository.getReferenceById(id);
    }
}
