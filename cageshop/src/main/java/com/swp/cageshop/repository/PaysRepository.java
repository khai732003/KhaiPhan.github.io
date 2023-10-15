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

<<<<<<< HEAD
=======
    @Query("SELECT p FROM Pays p WHERE p.vnp_TxnRef = :vnp_TxnRef")
    Pays findByVnp_TxnRef(@Param("vnp_TxnRef") String vnp_TxnRef);

>>>>>>> 91cad770a94edf0d337baa6ddb7a287fb6588ba3
}
