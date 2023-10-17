package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Products;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findAllByOrderId(Long orderId);

    List<OrderDetail> findByStatus(String status);

}
