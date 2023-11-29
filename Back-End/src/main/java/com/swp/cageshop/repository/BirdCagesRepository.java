package com.swp.cageshop.repository;

import com.swp.cageshop.entity.BirdCages;
import com.swp.cageshop.entity.Products;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

@Repository
public interface BirdCagesRepository extends JpaRepository<BirdCages, Long> {
    BirdCages findByProduct_Id(Long productId);

    List<BirdCages> findByProductIdIsNull();

}
