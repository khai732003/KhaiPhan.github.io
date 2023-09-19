package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Admins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminsReposity extends JpaRepository<Admins, Long> {

}
