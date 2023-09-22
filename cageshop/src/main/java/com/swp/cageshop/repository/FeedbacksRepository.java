package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbacksRepository extends JpaRepository<Comments, Long> {
}
