package com.swp.cageshop.repository;

import com.swp.cageshop.entity.VoucherUsage;
import com.swp.cageshop.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoucherUsageRepository extends JpaRepository<VoucherUsage, Long> {
    @Query("SELECT vu.voucher.voucherAmount FROM VoucherUsage vu WHERE vu.order.id = :orderId")
    List<Double> findVoucherAmountsByOrderId(@Param("orderId") Long orderId);

    @Query("SELECT vu.voucher.code FROM VoucherUsage vu WHERE vu.order.id = :orderId")
    List<String> findCodeVouchersByOrderId(@Param("orderId") Long orderId);

    boolean existsByUserIdAndVoucherId(Long userId, Long voucherId);

    List<VoucherUsage> findByOrderId(Long orderId);


    @Query("SELECT vu FROM VoucherUsage vu WHERE vu.order.id = :orderId")
    VoucherUsage findByOrderId1(@Param("orderId") Long orderId);
}
