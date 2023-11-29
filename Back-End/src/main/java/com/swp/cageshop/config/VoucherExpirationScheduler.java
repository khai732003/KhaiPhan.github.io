package com.swp.cageshop.config;

import com.swp.cageshop.DTO.VoucherDTO;
import com.swp.cageshop.entity.Vouchers;
import com.swp.cageshop.repository.VouchersRepository;
import com.swp.cageshop.service.vouchersService.IVouchersService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.*;
import java.util.List;

@Component
@Configuration
@EnableScheduling
public class VoucherExpirationScheduler {

   @Autowired
   private VouchersRepository voucherRepository;

    @Autowired
    private IVouchersService iVouchersService;

    @Autowired
    private RestTemplate restTemplate;

    @Scheduled(cron = "@daily")
    public void checkVoucherExpiration() {
        List<Vouchers> vouchers = voucherRepository.findAll();
        ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        LocalDateTime currentDate = LocalDateTime.now(zoneId);
        System.out.println("Thời gian hiện tại ở Hà Nội là: " + currentDate);
        for (Vouchers voucher : vouchers) {
            if (voucher.getExpiration_date() != null && voucher.getExpiration_date().isBefore(currentDate)) {
                iVouchersService.deleteVoucher(voucher.getId());
            }
        }
    }

//    @Scheduled(cron = "0 0 0 * * SAT,SUN")
//    public void createVouchersOnWeekends() {
//        VoucherDTO voucherDTO = new VoucherDTO();
//        voucherDTO.setCode("GIAMGIACUOITUAN");
//        voucherDTO.setDescription("Giảm giá cuối tuần");
//        voucherDTO.setVoucherAmount(70);
//        voucherDTO.setVoucherType(VoucherType.CASH.toString());
//        voucherDTO.setQuantity(50);
//        LocalDate currentDate = LocalDate.now(ZoneId.of("Asia/Ho_Chi_Minh"));
//        LocalDateTime expirationDateTime = LocalDateTime.of(currentDate, LocalTime.MAX);
//        voucherDTO.setExpiration_date(expirationDateTime);
//        System.out.println("Thời gian hiện tại ở Hà Nội là: " + currentDate);
//        if (currentDate.getDayOfWeek() == DayOfWeek.SATURDAY) {
//            iVouchersService.createVoucher(voucherDTO);
//        }
//    }
//
//    @Scheduled(cron = "0 6 4 16 11 ?")
//    public void addVoucherAtSpecificTime() {
//        VoucherDTO voucherDTO = new VoucherDTO();
//        voucherDTO.setCode("NEWVOUCHER");
//        voucherDTO.setDescription("Voucher mới");
//        voucherDTO.setVoucherAmount(50);
//        voucherDTO.setVoucherType(VoucherType.CASH.toString());
//        voucherDTO.setQuantity(30);
//
//        // Set the expiration date, for example, 7 days from now
//        LocalDate currentDate = LocalDate.now(ZoneId.of("Asia/Ho_Chi_Minh"));
//        LocalDateTime expirationDateTime = LocalDateTime.of(currentDate.plusDays(7), LocalTime.MAX);
//        voucherDTO.setExpiration_date(expirationDateTime);
//
//        // Call the service to create the new voucher
//        iVouchersService.createVoucher(voucherDTO);
//
//        // You can add additional logic or logging here if needed
//    }

}
