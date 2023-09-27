package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Comments;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.service.commentsService.ICommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cageshop")
public class CommentsController {
    @Autowired
    private ICommentsService iCommentsService;

    @PostMapping("/comment/add")
    public Comments addComments(@RequestBody Comments comments){
        return iCommentsService.addComments(comments);
    }

    @PutMapping("/comment/update")
    public Comments updateComments(@RequestParam("id") long id, @RequestBody Comments comments){
        return iCommentsService.updateComments(id,comments);
    }


    // API delete Orders
    @DeleteMapping("/comment/delete/{id}")
    public boolean deleteComments(@PathVariable("id") long id){
        return iCommentsService.deleteComments(id);
    }

    //API get list
    @GetMapping("/comment/list")
    public List<Comments> getAllComments(){
        return iCommentsService.getAllComments();
    }
}
