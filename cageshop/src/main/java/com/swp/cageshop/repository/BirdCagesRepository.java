package com.swp.cageshop.repository;

import com.swp.cageshop.entity.BirdCages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BirdCagesRepository extends JpaRepository<BirdCages, Long> {
    BirdCages findByProduct_Id(Long productId);
}
