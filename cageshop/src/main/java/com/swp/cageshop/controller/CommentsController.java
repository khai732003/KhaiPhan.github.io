package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.CommentDTO;
import com.swp.cageshop.entity.Comments;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.service.commentsService.ICommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/cageshop")
public class CommentsController {
    @Autowired
    private ICommentsService commentsService;

    @PostMapping("/comment/add")
    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO commentDTO) {
        CommentDTO savedCommentDTO = commentsService.addComment(commentDTO);

        if (savedCommentDTO != null) {
            return ResponseEntity.ok(savedCommentDTO);
        } else {
            return ResponseEntity.badRequest().body(null); // You can customize the error response
        }
    }

    @PutMapping("/comment/update/{id}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable("id") long id, @RequestBody CommentDTO commentDTO) {
        CommentDTO updatedCommentDTO = commentsService.updateComment(id, commentDTO);

        if (updatedCommentDTO != null) {
            return ResponseEntity.ok(updatedCommentDTO);
        } else {
            return ResponseEntity.badRequest().body(null); // You can customize the error response
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
}

