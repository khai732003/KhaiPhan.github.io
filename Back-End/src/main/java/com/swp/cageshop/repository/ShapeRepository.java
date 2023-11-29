package com.swp.cageshop.repository;


import com.swp.cageshop.entity.Shapes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.*;

public interface ShapeRepository extends JpaRepository<Shapes, Long> {
}
