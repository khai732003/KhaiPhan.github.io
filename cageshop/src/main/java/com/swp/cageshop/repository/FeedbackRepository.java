package com.swp.cageshop.repository;
import com.swp.cageshop.entity.Feedback;
import com.swp.cageshop.entity.OrderDetail;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query("SELECT f FROM Feedback f " +
        "INNER JOIN OrderDetail od ON od.product.id = f.product.id WHERE od.id = :orderDetailId")
    Feedback checkFeedbackByOrderId(@Param("orderDetailId") Long orderDetailId);

    @Query("SELECT f FROM Feedback f WHERE f.product.id = :productId AND f.user.id = :userId")
    Feedback findFeedbackByProductIdAndUserId(@Param("productId") Long productId, @Param("userId") Long userId);

    @Query("SELECT f FROM Feedback f WHERE f.product.id = :productId")
    List<Feedback> findAllRatingByProductId(Long productId);

    Feedback findByUserIdAndProductId(Long userId, Long productId);

    Feedback findUserIdandById(Long feedbackId);

    @Query("SELECT f.user.id FROM Feedback f WHERE f.id = :feedbackId")
    Long findUserIdByFeedbackId(@Param("feedbackId") Long feedbackId);

    List<Feedback> findAllByProductId(Long productId);

    List<Feedback> findByUserIdAndProductIdOrderByIdDesc(Long userId, Long productId);

    // Inside FeedbackRepository
    List<Feedback> findAllByProductIdOrderByIdDesc(Long productId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);


}
