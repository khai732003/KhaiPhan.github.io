package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Accessories;
import com.swp.cageshop.entity.BirdCages;
import com.swp.cageshop.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccessoriesRepository extends JpaRepository<Accessories, Long> {


    @Query("SELECT a FROM Accessories a WHERE a.product IS NULL AND a.CustomProduct IS NULL")
    List<Accessories> findByProductIdIsNullAndCustomProductIsNull();

    List<Accessories> findByProductIdIsNull();
    @Query("SELECT a FROM Accessories a WHERE a.product = :product")
    List<Accessories> findAccessoriesByProduct(@Param("product") Products product);


    @Query("SELECT a FROM Accessories a WHERE a.CustomProduct = true")
    List<Accessories> findAccessoriesByCustomProductTrue();


    @Query("SELECT a FROM Accessories a WHERE a.product is null")
    List<Accessories> findAccessoriesWithNullProductId();


}
