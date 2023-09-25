package com.swp.cageshop.service.commentsService;

import com.swp.cageshop.entity.Comments;
import com.swp.cageshop.repository.CommentsRepository;
import com.swp.cageshop.service.commentsService.ICommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsServiceImpl implements ICommentsService {
    @Autowired
    private CommentsRepository commentsRepository;
    @Override
    public Comments addComments(Comments comments) {
        if(comments!=null){
            return commentsRepository.save(comments);
        }
        return null;
    }

    @Override
    public Comments updateComments(long id, Comments comments) {
        if(comments!=null){
            Comments comments1 = commentsRepository.getReferenceById(id);
            if(comments1!=null){
                comments1.setId(comments.getId());
                comments1.setTitle(comments.getTitle());
                comments1.setContent(comments.getContent());
                comments1.setDate(comments.getDate());
                return commentsRepository.save(comments1);
            }
        }
        return null;
    }

    @Override
    public boolean deleteComments(long id) {
        if(id>1){
            Comments comments=commentsRepository.getReferenceById(id);
            if(comments!=null){
                commentsRepository.delete(comments);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Comments> getAllComments() {
        return commentsRepository.findAll();
    }

    @Override
    public Comments getOneComments(long id) {
        return commentsRepository.getReferenceById(id);
    }
}
