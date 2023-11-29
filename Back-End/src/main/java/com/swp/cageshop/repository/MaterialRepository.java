package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Materials;
import com.swp.cageshop.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository  extends JpaRepository<Materials, Long> {
}
