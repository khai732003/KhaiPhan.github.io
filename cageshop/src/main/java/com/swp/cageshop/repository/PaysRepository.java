package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Pays;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaysRepository extends JpaRepository<Pays, Long> {

}
