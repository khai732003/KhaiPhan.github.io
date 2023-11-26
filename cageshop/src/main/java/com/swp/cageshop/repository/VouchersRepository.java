package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Shipping;
import com.swp.cageshop.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface VouchersRepository extends JpaRepository<Vouchers, Long> {
    
    Vouchers findByCodeAndIsAvailable(String code, boolean isAvailable);

    @Query("SELECT v FROM Vouchers v " +
        "LEFT JOIN VoucherUsage vu ON vu.voucher.id = v.id AND vu.user.id = :userId " +
        "WHERE vu.voucher.id IS NULL")
    List<Vouchers> findUnusedVouchersForUser(@Param("userId") Long userId);

    @Query("SELECT v.id FROM Vouchers v WHERE v.code = :code AND v.isAvailable = true")
    Long findIdByCode(@Param("code") String code);

    Vouchers findByCode(String code);

    public List<Vouchers> findByVoucherType(String voucherType);

    @Query("SELECT v FROM Vouchers v WHERE v.id = :id AND v.isAvailable = true")
    Vouchers findByIdAndIsAvailable(@Param("id") Long id);


}

