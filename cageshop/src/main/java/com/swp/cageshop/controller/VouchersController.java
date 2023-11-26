package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.VoucherDTO;
import com.swp.cageshop.entity.Vouchers;
import com.swp.cageshop.service.vouchersService.IVouchersService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/cageshop/api/voucher")
public class VouchersController {

    @Autowired
    private IVouchersService vouchersService;

    @PostMapping("/add")
    public ResponseEntity<VoucherDTO> createVoucher(@RequestBody VoucherDTO voucherDTO) {
        VoucherDTO createdVoucher = vouchersService.createVoucher(voucherDTO);
        return new ResponseEntity<>(createdVoucher, HttpStatus.CREATED);
    }

    @GetMapping("/get-all/{userId}")
    public ResponseEntity<List<Vouchers>> getAllVouchers(@PathVariable Long userId) {
        List<Vouchers> vouchers = vouchersService.listByUserId(userId);
        return new ResponseEntity<>(vouchers, HttpStatus.OK);
    }

    @GetMapping("get-by/{id}")
    public ResponseEntity<VoucherDTO> getVoucherById(@PathVariable Long id) {
        VoucherDTO voucher = vouchersService.getVoucherById(id);
        if (voucher != null) {
            return new ResponseEntity<>(voucher, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("update-by/{id}")
    public ResponseEntity<VoucherDTO> updateVoucher(@PathVariable Long id, @RequestBody VoucherDTO voucherDTO) {
        voucherDTO.setId(id);
        VoucherDTO updatedVoucher = vouchersService.updateVoucher(voucherDTO);
        if (updatedVoucher != null) {
            return new ResponseEntity<>(updatedVoucher, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("delete-by/{id}")
    public ResponseEntity<Void> deleteVoucher(@PathVariable Long id) {
        vouchersService.deleteVoucher(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}