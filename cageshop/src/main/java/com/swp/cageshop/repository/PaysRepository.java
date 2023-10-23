package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.PaypalPayment;
import com.swp.cageshop.entity.Pays;
import com.swp.cageshop.entity.VNPayPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaysRepository extends JpaRepository<Pays, Long> {

    @Query("SELECT p FROM Pays p WHERE p.paymentCode = :paymentCode")
    Pays findByPaymentCode(@Param("paymentCode") String paymentCode);

    @Query("SELECT p FROM Pays p WHERE p.paymentCode = :paymentCode")
    PaypalPayment findPaypalPaymentByPaymentCode(@Param("paymentCode") String paymentCode);
    @Query("SELECT p.paymentCode FROM Pays p WHERE p.order.id = :orderId ORDER BY p.id DESC")
    String findPaymentCodeByOrderId(Long orderId);

//    @Query("SELECT p FROM Pays p ORDER BY p.id DESC LIMIT 1")
//    Pays findTopByOrderByIdDesc();

//    @Query("SELECT p FROM Pays p WHERE p.status = 'Success' AND p.orderId = :orderId")
//    Pays findByOrderIdAndStatus(@Param("orderId") String orderId)
//    ;
}
