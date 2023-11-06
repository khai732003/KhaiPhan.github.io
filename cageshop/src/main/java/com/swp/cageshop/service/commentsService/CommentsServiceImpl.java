package com.swp.cageshop.service.commentsService;

import com.swp.cageshop.DTO.CommentDTO;
import com.swp.cageshop.DTO.MarketingDTO;
import com.swp.cageshop.entity.Comments;
import com.swp.cageshop.entity.Marketings;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.CommentsRepository;
import com.swp.cageshop.repository.MarketingsRepository;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.commentsService.ICommentsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentsServiceImpl implements ICommentsService {


    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private MarketingsRepository marketingsRepository;


    @Autowired
    private ModelMapper modelMapper; // Assuming you have configured ModelMapper


    @Override
    public CommentDTO updateComment(long id, CommentDTO commentDTO) {
        if (commentDTO != null) {
            Comments existingComment = commentsRepository.getReferenceById(id);
            if (existingComment != null) {
                // Update the existing comment with data from commentDTO
                existingComment.setTitle(commentDTO.getTitle());
                existingComment.setContent(commentDTO.getContent());
                existingComment.setCreateDate(commentDTO.getCreateDate());

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

    public List<CommentDTO> getCommentsByUser(Users user) {
        List<Comments> comments = commentsRepository.findByUser(user);

        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentDTO.class))
                .collect(Collectors.toList());
    }

    public CommentDTO addComment(CommentDTO commentDTO) {
        if (commentDTO != null) {
            // Map the CommentDTO to an entity
            Comments comment = new Comments();
            comment.setTitle(commentDTO.getTitle());
            comment.setContent(commentDTO.getContent());

            // Retrieve the user by userId and product by productId
            Users user = usersRepository.findById(commentDTO.getUserId()).orElse(null);
            Products product = productsRepository.findById(commentDTO.getProductId()).orElse(null);

            if (user != null && product != null) {
                comment.setUser(user);
                comment.setProduct(product);

                // Set the comment date (you can use the current date here)
                comment.setCreateDate(new Date());

                // Save the comment to the database
                Comments savedComment = commentsRepository.save(comment);

                if (savedComment != null) {
                    CommentDTO savedCommentDTO = new CommentDTO();
                    savedCommentDTO.setId(savedComment.getId());
                    savedCommentDTO.setTitle(savedComment.getTitle());
                    savedCommentDTO.setContent(savedComment.getContent());
                    savedCommentDTO.setUserId(savedComment.getUser().getId());
                    savedCommentDTO.setProductId(savedComment.getProduct().getId());
                    savedCommentDTO.setCreateDate(savedComment.getCreateDate());

                    return savedCommentDTO;
                }
            }
        }
        return null;
    }

    public CommentDTO addComments(CommentDTO commentDTO) {
        if (commentDTO != null) {
            Comments comment = modelMapper.map(commentDTO, Comments.class);

            Users user = usersRepository.findById(commentDTO.getUserId()).orElse(null);

            Marketings marketing = marketingsRepository.findById(commentDTO.getProductId()).orElse(null);

            if (user != null && marketing != null) {
                comment.setUser(user);
                comment.setMarketing(marketing);
                comment.setCreateDate(new Date());

                Comments savedComment = commentsRepository.save(comment);

                if (savedComment != null) {
                    CommentDTO savedCommentDTO = modelMapper.map(savedComment, CommentDTO.class);
                    return savedCommentDTO;
                }
            }
        }
        return null;
    }


}
