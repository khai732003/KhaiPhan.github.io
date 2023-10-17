package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Pays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaysRepository extends JpaRepository<Pays, Long> {

    @Query("SELECT p FROM Pays p WHERE p.vnp_TxnRef = :vnp_TxnRef")
    Pays findByVnp_TxnRef(@Param("vnp_TxnRef") String vnp_TxnRef);


//    @Query("SELECT p FROM Pays p WHERE p.status = 'Success' AND p.orderId = :orderId")
//    Pays findByOrderIdAndStatus(@Param("orderId") String orderId);

}
