package com.swp.cageshop.service.replyService;

import com.swp.cageshop.DTO.FeedbackDTO;
import com.swp.cageshop.DTO.ReplyDTO;
import com.swp.cageshop.entity.Feedback;
import com.swp.cageshop.entity.Reply;
import com.swp.cageshop.repository.FeedbackRepository;
import com.swp.cageshop.repository.ReplyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReplyServiceImpl implements IReplyService{

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Tạo một reply mới
    public ReplyDTO createReply(ReplyDTO replyDTO) {
        Reply reply = modelMapper.map(replyDTO, Reply.class);
        Feedback feedback = feedbackRepository.findById(replyDTO.getFeedbackId()).orElse(null);
        if (feedback != null) {
            reply.setFeedback(feedback);
            Reply savedReply = replyRepository.save(reply);
            return modelMapper.map(savedReply, ReplyDTO.class);
        }
        return null;
    }

    // Lấy một reply theo ID

    public List<ReplyDTO> getAllReplies() {
        List<Reply> replies = replyRepository.findAll();
        return replies.stream()
                .map(reply -> modelMapper.map(reply, ReplyDTO.class))
                .collect(Collectors.toList());
    }


    public ReplyDTO getReplyById(Long id) {
        Reply reply = replyRepository.findById(id).orElse(null);
        return modelMapper.map(reply, ReplyDTO.class);
    }

    // Cập nhật một reply
    public ReplyDTO updateReply(Long id, ReplyDTO updatedReplyDTO) {
        Reply existingReply = replyRepository.findById(id).orElse(null);
        if (existingReply != null) {
            existingReply.setContent(updatedReplyDTO.getContent());
            existingReply.setFeedback(feedbackRepository.findById(updatedReplyDTO.getFeedbackId()).orElse(null));
            Reply savedReply = replyRepository.save(existingReply);
            return modelMapper.map(savedReply, ReplyDTO.class);
        }
        return null;
    }

    // Xóa một reply
    public void deleteReply(Long id) {
        replyRepository.deleteById(id);
    }
}
