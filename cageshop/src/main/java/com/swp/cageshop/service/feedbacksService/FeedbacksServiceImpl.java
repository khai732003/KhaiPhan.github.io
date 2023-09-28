package com.swp.cageshop.service.feedbacksService;

import com.swp.cageshop.entity.Feedbacks;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.FeedbacksRepository;
import com.swp.cageshop.repository.UsersRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbacksServiceImpl implements IFeedbacksService {

  @Autowired
  private FeedbacksRepository feedbacksRepository;

  @Autowired
  private UsersRepository usersRepository;

  @Override
  public List<Feedbacks> listFeedbacks() {
    return feedbacksRepository.findAll();
  }

  @Override
  public Feedbacks addFeedBack(Feedbacks feedbacks, Long userId) {
    if (feedbacks != null && userId != null) {
      // Find the user by ID
      Users user = usersRepository.findById(userId).orElse(null);

      if (user != null) {
        // Set the permission level to 1 for the feedback
        feedbacks.getUser().getRole().equals(1);

        // Associate the user with the feedback
        feedbacks.setUser(user);

        // Save the feedback to the database
        Feedbacks savedFeedbacks = feedbacksRepository.save(feedbacks);

        return savedFeedbacks;
      }
    }
    return null;
  }


    @Override
    public boolean deleteFeedbacks(Long id) {
        if (id >= 1) {
            Feedbacks feedbacks = feedbacksRepository.getReferenceById(id);
            if (feedbacks != null) {
                feedbacksRepository.delete(feedbacks);
                return true;
            }
        }

        return false;


    }


    @Override
    public Feedbacks updateFeedbacks(Long id, Feedbacks feedbacks) {
        if (feedbacks != null) {
            Feedbacks feedbacks1 = feedbacksRepository.getReferenceById(id);
            if (feedbacks1 != null) {
                feedbacks1.setContent(feedbacks1.getContent());
                return feedbacksRepository.save(feedbacks1);
            }
            return null;
        }
        return feedbacks;
    }





//    @Override
//    public Feedbacks updateFeedbacks(long id, Feedbacks feedbacks) {
//        if (feedbacks != null) {
//            Feedbacks feedbacks1 = feedbacksRepository.getReferenceById(id);
//            if (feedbacks1 != null) {
//                feedbacks1.setContent(feedbacks1.getContent());
//                return feedbacksRepository.save(feedbacks1);
//            }
//        }
//            return null;
//        }



//  @Override
//  public boolean deleteFeedBack(Long id) {
//  if (id >= 1) {
//    Feedbacks feedbacks = feedbacksRepository.getReferenceById(id);
//    if (feedbacks != null) {
//      feedbacksRepository.delete(feedbacks);
//      return true;
//    }
//  }
//  return false;
//}

//  @Override
//  public Feedbacks updateFeedbacks(Long id, Feedbacks feedbacks) {
//    if (feedbacks != null) {
//      Feedbacks feedbacks1 = feedbacksRepository.getReferenceById(id);
//      if (feedbacks1 != null) {
//        return null;
//
//      }
//
//    }
//    return null;
//  }
//>>>>>>> 3bc361b573a7c8097e69f46130d41625ba9e2922



    @Override
    public List<Feedbacks> getAllFeedbacks() {
        return feedbacksRepository.findAll();
    }

    @Override
    public Feedbacks getOneFeedback(long id) {
        return feedbacksRepository.getReferenceById(id);
    }

}
