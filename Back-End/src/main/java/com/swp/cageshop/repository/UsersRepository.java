package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Users;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
  Optional<Users> findByName(String username);

  boolean existsByName(String name);

  boolean existsByEmail(String email);

  boolean existsByPhone(String phone);

  List<Users> findByNameContaining(String name);

  void deleteAll();

  @Query("SELECT u FROM Users u WHERE UPPER(u.role.name) != 'admin'")
  List<Users> findAllExceptAdmin();

  @Query("SELECT u FROM Users u WHERE UPPER(u.role.name) = 'STAFF'")
  List<Users> findAllStaff();

  @Query("SELECT u FROM Users u WHERE UPPER(u.role.name) = 'STAFF' AND u.shipStatus = false ")
  List<Users> findAllStaffAndStatusFalse();

  List<Users> findByManagerId(Long managerId);

  @Query("SELECT u.fullname FROM Users u WHERE u.id = :userId")
  String findUserNameByUserId(@Param("userId") Long userId);

//  @Query("SELECT u FROM Users u WHERE u.phone = :phoneNumber")
  Optional<Users> findByPhone(String phoneNumber);

  @Query("SELECT U.name FROM Users U INNER JOIN Shipping S ON U.id = S.user.id WHERE S.order.id = :orderId")
  String shipNameBy (@Param("orderId") Long orderId);
}