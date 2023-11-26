package com.swp.cageshop.repository;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findAllById(Long orderId);

    @Query("SELECT o FROM Orders o WHERE o.payStatus = 'PAID'")
    List<Orders> findPaidOrders();

    List<Orders> findByShipStatus(String shipStatus);

    List<Orders> findByUserId(Long userId);
    List<Orders> findByUserIdOrderByCreateDateDesc(Long userId);

    @Query("SELECT o FROM Orders o WHERE o.user.id = :userId AND o.payStatus = 'PAID' AND o.shipStatus = 'DELIVERED'")
    List<Orders> findOrdersByUserId(@Param("userId") Long userId);

    List<Orders> findByPayStatusAndShipStatus(String payStatus, String shipStatus);

    @Query("SELECT o FROM Orders o INNER JOIN Shipping s ON o.id = s.order.id " +
        "WHERE s.user.id = :userId AND o.shipStatus = :shipStatus AND o.payStatus = 'PAID'")
    List<Orders> findOrdersByStatusForUser(
        @Param("userId") Long userId,
        @Param("shipStatus") String shipStatus
    );

    void deleteById(Long orderId);

    List<Orders> findByUserIdAndPayStatusAndShipStatus(Long userId, String payStatus, String shipStatus);

    @Query("SELECT o FROM Orders o WHERE o.id = :orderId AND o.user.id = :userId")
    Orders existsByUserId(Long orderId,Long userId);

}