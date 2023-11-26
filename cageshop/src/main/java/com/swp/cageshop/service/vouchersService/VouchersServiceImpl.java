package com.swp.cageshop.service.vouchersService;

import com.swp.cageshop.DTO.VoucherDTO;
import com.swp.cageshop.config.VoucherType;
import com.swp.cageshop.entity.*;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.repository.VoucherUsageRepository;
import com.swp.cageshop.repository.VouchersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class VouchersServiceImpl implements IVouchersService{

    @Autowired
    private VouchersRepository voucherRepository;

    @Autowired
    private VoucherUsageRepository voucherUsageRepository;
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<Vouchers> listByUserId(Long userId){
        return voucherRepository.findUnusedVouchersForUser(userId);
    }

    public VoucherDTO createVoucher(VoucherDTO voucherDTO) {
        Vouchers voucher = modelMapper.map(voucherDTO, Vouchers.class);
        voucher.setVoucherType(voucher.getVoucherType().toUpperCase());
        voucher.setCode(voucher.getCode().toUpperCase());
        String voucherType = voucher.getVoucherType();
        if (voucherType.equals(VoucherType.CASH.toString())) {
            Vouchers savedVoucher = voucherRepository.save(voucher);
            return modelMapper.map(savedVoucher, VoucherDTO.class);
        } else{
            throw new IllegalArgumentException("Invalid voucher type.");
        }
    }



    public List<VoucherDTO> getAllVoucherDTO() {
        List<Vouchers> vouchers = voucherRepository.findAll();
        return vouchers.stream()
                .map(voucher -> modelMapper.map(voucher, VoucherDTO.class))
                .collect(Collectors.toList());
    }

    public VoucherDTO getVoucherById(Long id) {
        Vouchers voucher = voucherRepository.findById(id).orElse(null);
        return modelMapper.map(voucher, VoucherDTO.class);
    }

    public VoucherDTO updateVoucher(VoucherDTO voucherDTO) {
           Vouchers voucher = modelMapper.map(voucherDTO, Vouchers.class);
           voucher.setCode(voucherDTO.getCode());
           Vouchers updatedVoucher = voucherRepository.save(voucher);
           return modelMapper.map(updatedVoucher, VoucherDTO.class);
    }

    public void deleteVoucher(Long id) {
        Vouchers voucher = voucherRepository.findByIdAndIsAvailable(id);
        voucher.setAvailable(false);
        voucherRepository.save(voucher);
    }

    @Override
    public List<Vouchers> getAllVouchers() {
        return voucherRepository.findAll();
    }


}
