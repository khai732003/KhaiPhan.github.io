package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Marketings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketingsRepository extends JpaRepository<Marketings, Long> {

}
