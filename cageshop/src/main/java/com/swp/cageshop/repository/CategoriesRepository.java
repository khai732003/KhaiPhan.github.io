package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.function.LongFunction;

@Repository
public interface
CategoriesRepository extends JpaRepository<Categories, Long> {
    Categories saveAndFlush(Categories category);
    Categories findOneById(Long id);

}
