package com.swp.cageshop.service.vouchersService;


import com.swp.cageshop.DTO.VoucherDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Vouchers;
import java.util.List;

public interface IVouchersService {

    public List<Vouchers> listByUserId(Long userId);
    
    public VoucherDTO createVoucher(VoucherDTO voucherDTO);

    public List<VoucherDTO> getAllVoucherDTO();

    public VoucherDTO getVoucherById(Long id);

    public VoucherDTO updateVoucher(VoucherDTO voucherDTO);

    public void deleteVoucher(Long id);
    public List<Vouchers> getAllVouchers();


    }






