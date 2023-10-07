package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Users;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
  Optional<Users> findByName(String username);

  boolean existsByName(String name);

  boolean existsByEmail(String email);

  List<Users> findByNameContaining(String name);


}