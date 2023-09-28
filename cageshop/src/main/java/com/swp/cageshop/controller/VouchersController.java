package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Vouchers;
import com.swp.cageshop.service.vouchersService.IVouchersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cageshop")
public class VouchersController {
//    @Autowired
//    private IVouchersService vouchersService;
//
//    @PostMapping("/voucher/add")
//    public ResponseEntity<?> addVoucher(@RequestBody Vouchers voucher) {
//        Vouchers savedVoucher = vouchersService.addVouchers(voucher);
//        if (savedVoucher != null) {
//            return ResponseEntity.ok(savedVoucher);
//        } else {
//            return ResponseEntity.badRequest().body("Failed to add voucher.");
//        }
//    }
//
//    @GetMapping("/voucher/list")
//    public List<Vouchers> listVouchers() {
//        return vouchersService.getAllVouchers();
//    }
//
//    @DeleteMapping("/voucher/delete/{id}")
//    public ResponseEntity<String> deleteVoucher(@PathVariable long id) {
//        boolean deleted = vouchersService.deleteVouchers(id);
//        if (deleted) {
//            return ResponseEntity.ok("Voucher deleted successfully.");
//        } else {
//            return ResponseEntity.badRequest().body("Failed to delete voucher.");
//        }
//    }
}


