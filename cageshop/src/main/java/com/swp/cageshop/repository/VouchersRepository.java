package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;


import com.swp.cageshop.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface VouchersRepository extends JpaRepository<Vouchers, Long> {
}
