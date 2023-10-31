package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface VouchersRepository extends JpaRepository<Vouchers, Long> {
    Vouchers findByCode(String code);

    @Query("SELECT v.id FROM Vouchers v WHERE v.code = :code")
    Long findIdByCode(@Param("code") String code);


    public List<Vouchers> findByVoucherType(String voucherType);

}

