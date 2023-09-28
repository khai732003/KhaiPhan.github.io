package com.swp.cageshop.repository;


import com.swp.cageshop.entity.Vounchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface VounchersRepository extends JpaRepository<Vounchers, Long>{
}
