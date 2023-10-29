package com.swp.cageshop.config;

import com.swp.cageshop.entity.Vouchers;
import com.swp.cageshop.repository.VouchersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Component
@Configuration
@EnableScheduling
public class VoucherExpirationScheduler {

   @Autowired
   private VouchersRepository voucherRepository;

    @Scheduled(cron = "@daily")
    public void checkVoucherExpiration() {
        List<Vouchers> vouchers = voucherRepository.findAll();
        ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        LocalDateTime currentDate = LocalDateTime.now(zoneId);
        System.out.println("Thời gian hiện tại ở Hà Nội là: " + currentDate);
        for (Vouchers voucher : vouchers) {
            if (voucher.getExpiration_date() != null && voucher.getExpiration_date().isBefore(currentDate)) {
                voucherRepository.delete(voucher);
            }
        }
    }
}
