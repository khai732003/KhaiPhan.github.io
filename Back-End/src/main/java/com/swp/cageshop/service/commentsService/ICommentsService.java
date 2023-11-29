package com.swp.cageshop.service.commentsService;

import com.swp.cageshop.DTO.CommentDTO;
import com.swp.cageshop.entity.Comments;
import com.swp.cageshop.entity.Users;

import java.util.List;

public interface ICommentsService {
    public CommentDTO addComment(CommentDTO commentDTO);

    public CommentDTO addComments(CommentDTO commentDTO);

    public CommentDTO updateComment(long id, CommentDTO commentDTO);

    public boolean deleteComment(long id);

    public List<CommentDTO> getAllComments();

    public CommentDTO getOneComment(long id);

    public List<CommentDTO> getCommentsByUser(Users user);
}
