package com.swp.cageshop.service.commentsService;

import com.swp.cageshop.entity.Comments;

import java.util.List;

public interface ICommentsService {
    public Comments addComments(Comments comments);

    public Comments updateComments(long id, Comments comments);

    public boolean deleteComments(long id);

    public List<Comments> getAllComments();

    public Comments getOneComments(long id);
}
