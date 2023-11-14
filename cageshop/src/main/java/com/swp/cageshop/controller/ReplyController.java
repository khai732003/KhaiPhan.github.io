package com.swp.cageshop.controller;

import com.swp.cageshop.service.replyService.IReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cageshop/api/reply")
public class ReplyController {

    @Autowired
    private IReplyService replyService;

    @PostMapping("/add")
    public ResponseEntity<ReplyDTO> createReply(@RequestBody ReplyDTO replyDTO) {
        ReplyDTO createdReply = replyService.createReply(replyDTO);
        if (createdReply != null) {
            return new ResponseEntity<>(createdReply, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-by/{id}")
    public ResponseEntity<ReplyDTO> getReplyById(@PathVariable Long id) {
        ReplyDTO replyDTO = replyService.getReplyById(id);
        if (replyDTO != null) {
            return new ResponseEntity<>(replyDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("get-all")
    public ResponseEntity<List<ReplyDTO>> getAllReplies() {
        List<ReplyDTO> replyDTOList = replyService.getAllReplies();
        return new ResponseEntity<>(replyDTOList, HttpStatus.OK);
    }


    @PutMapping("/update-by/{id}")
    public ResponseEntity<ReplyDTO> updateReply(@PathVariable Long id, @RequestBody ReplyDTO updatedReplyDTO) {
        ReplyDTO updatedReply = replyService.updateReply(id, updatedReplyDTO);
        if (updatedReply != null) {
            return new ResponseEntity<>(updatedReply, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("delete-by/{id}")
    public ResponseEntity<String> deleteReply(@PathVariable Long id) {
        replyService.deleteReply(id);
        return new ResponseEntity<>("Reply with id " + id + " has been deleted", HttpStatus.OK);
    }
}
