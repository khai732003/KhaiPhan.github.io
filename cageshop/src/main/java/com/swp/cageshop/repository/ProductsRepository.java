package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products,Long> {
    List<Products> findByCategory(Categories category);
}
