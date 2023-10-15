package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.CommentDTO;
import com.swp.cageshop.entity.Comments;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.commentsService.ICommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api")
public class CommentsController {
    @Autowired
    private ICommentsService commentsService;


    @Autowired
    private UsersRepository usersRepository;
    @PostMapping("/comment/add-to-product")
    public ResponseEntity<CommentDTO> addCommentToProduct(
            @PathVariable Long productId,
            @RequestBody CommentDTO commentDTO) {
        commentDTO.setProductId(productId);

        CommentDTO savedCommentDTO = commentsService.addComment(commentDTO);

        if (savedCommentDTO != null) {
            return new ResponseEntity<>(savedCommentDTO, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/comment/add-to-marketing")
    public ResponseEntity<CommentDTO> addCommentToMarketing(
            @PathVariable Long marketingId,
            @RequestBody CommentDTO commentDTO) {
        commentDTO.setMarketingId(marketingId);

        CommentDTO savedCommentDTO = commentsService.addComment(commentDTO);

        if (savedCommentDTO != null) {
            return new ResponseEntity<>(savedCommentDTO, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/comment/update/{id}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable("id") long id, @RequestBody CommentDTO commentDTO) {
        CommentDTO updatedCommentDTO = commentsService.updateComment(id, commentDTO);

        if (updatedCommentDTO != null) {
            return ResponseEntity.ok(updatedCommentDTO);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/comment/delete/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable("id") long id) {
        boolean deleted = commentsService.deleteComment(id);
        if (deleted) {
            return ResponseEntity.ok("Comment deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete comment.");
        }
    }

    @GetMapping("/comment/list")
    public List<CommentDTO> getAllComments() {
        List<CommentDTO> comments = commentsService.getAllComments();
        return comments;
    }

    @GetMapping("/comment/select/{id}")
    public ResponseEntity<CommentDTO> getComment(@PathVariable long id) {
        CommentDTO commentDTO = commentsService.getOneComment(id);
        if (commentDTO != null) {
            return ResponseEntity.ok(commentDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/users/{userId}/comments") ///users/123/comments
    public ResponseEntity<List<CommentDTO>> getCommentsByUser(@PathVariable Long userId) {
        Users user = usersRepository.findById(userId).orElse(null);

        if (user != null) {
            List<CommentDTO> comments = commentsService.getCommentsByUser(user);
            if (!comments.isEmpty()) {
                return new ResponseEntity<>(comments, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

