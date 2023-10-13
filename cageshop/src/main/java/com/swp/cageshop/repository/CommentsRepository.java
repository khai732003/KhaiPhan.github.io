package com.swp.cageshop.repository;

import com.swp.cageshop.DTO.CommentDTO;
import com.swp.cageshop.entity.Comments;
import com.swp.cageshop.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findByUser(Users user);


}
