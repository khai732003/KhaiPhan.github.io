package com.swp.cageshop.service.replyService;

import com.swp.cageshop.DTO.ReplyDTO;

import java.util.List;

public interface IReplyService {
    public ReplyDTO createReply(ReplyDTO replyDTO);
    public ReplyDTO getReplyById(Long id);
    public ReplyDTO updateReply(Long id, ReplyDTO updatedReplyDTO);
    public void deleteReply(Long id);

    public List<ReplyDTO> getAllReplies();
}
