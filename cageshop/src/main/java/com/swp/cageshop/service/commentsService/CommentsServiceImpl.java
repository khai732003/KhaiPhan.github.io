package com.swp.cageshop.service.commentsService;

import com.swp.cageshop.DTO.CommentDTO;
import com.swp.cageshop.entity.Comments;
import com.swp.cageshop.repository.CommentsRepository;
import com.swp.cageshop.service.commentsService.ICommentsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentsServiceImpl implements ICommentsService {

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private ModelMapper modelMapper; // Assuming you have configured ModelMapper

    @Override
    public CommentDTO addComment(CommentDTO commentDTO) {
        if (commentDTO != null) {
            Comments comment = modelMapper.map(commentDTO, Comments.class);
            Comments savedComment = commentsRepository.save(comment);
            return modelMapper.map(savedComment, CommentDTO.class);
        }
        return null;
    }

    @Override
    public CommentDTO updateComment(long id, CommentDTO commentDTO) {
        if (commentDTO != null) {
            Comments existingComment = commentsRepository.getReferenceById(id);
            if (existingComment != null) {
                // Update the existing comment with data from commentDTO
                existingComment.setTitle(commentDTO.getTitle());
                existingComment.setContent(commentDTO.getContent());
                existingComment.setDate(commentDTO.getCreateDate());

                // Save the updated comment
                Comments updatedComment = commentsRepository.save(existingComment);

                return modelMapper.map(updatedComment, CommentDTO.class);
            }
        }
        return null;
    }

    @Override
    public boolean deleteComment(long id) {
        if (id >= 1) {
            Comments comment = commentsRepository.getReferenceById(id);
            if (comment != null) {
                commentsRepository.delete(comment);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<CommentDTO> getAllComments() {
        List<Comments> comments = commentsRepository.findAll();
        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CommentDTO getOneComment(long id) {
        Comments comment = commentsRepository.getReferenceById(id);
        if (comment != null) {
            return modelMapper.map(comment, CommentDTO.class);
        }
        return null;
    }
}
