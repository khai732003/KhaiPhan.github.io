package com.swp.cageshop.repository;

import com.swp.cageshop.entity.PaypalPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaypalPaymentRepository extends PaysRepository {

}
