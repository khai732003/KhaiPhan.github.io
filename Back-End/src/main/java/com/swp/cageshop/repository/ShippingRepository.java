package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Long> {
    Shipping findByOrderId(Long orderId);
    List<Shipping> findByStatus(String status);

}

