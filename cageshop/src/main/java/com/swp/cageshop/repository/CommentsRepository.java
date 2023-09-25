package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.xml.stream.events.Comment;

public interface CommentsRepository extends JpaRepository<Comments,Long> {
}
