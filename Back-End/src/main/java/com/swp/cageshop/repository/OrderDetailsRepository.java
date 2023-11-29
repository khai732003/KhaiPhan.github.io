package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Products;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findAllByOrderId(Long orderId);

    List<OrderDetail> findByStatus(String status);

    List<OrderDetail> findByOrder_Id(Long orderId);

    @Query("SELECT o FROM OrderDetail o WHERE o.order.id = :orderId AND o.product.id = :productId")
    OrderDetail findByOrderIdAndProductId(@Param("orderId") Long orderId, @Param("productId") Long productId);
    void deleteAllByOrderId(Long orderId);

    List<OrderDetail> findByOrderId(Long orderId);
}
