package com.swp.cageshop.service.vouchersService;

import com.swp.cageshop.entity.Vouchers;
import com.swp.cageshop.repository.VouchersRepository;

import java.util.List;

public class VouchersServiceImpl implements IVouchersService{

    private VouchersRepository vouchersRepository;
    @Override
    public Vouchers addVouchers(Vouchers vouchers) {
        if (vouchers != null) {
            return vouchersRepository.save(vouchers);
        }
        return null;
    }


    @Override
    public Vouchers updateVouchers(long id, Vouchers vouchers) {
        if (vouchers != null) {
            Vouchers existingVoucher = vouchersRepository.getReferenceById(id);
            if (existingVoucher != null) {
                // Update voucher fields here
                existingVoucher.setCode(vouchers.getCode());
                existingVoucher.setDiscountAmount(vouchers.getDiscountAmount());
                existingVoucher.setActive(vouchers.isActive());
                return vouchersRepository.save(existingVoucher);
            }
        }
        return null;
    }

    @Override
    public boolean deleteVouchers(long id) {
        if (id >= 1) {
            Vouchers voucher = vouchersRepository.getReferenceById(id);
            if (voucher != null) {
                vouchersRepository.delete(voucher);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Vouchers> getAllVouchers() {
        return vouchersRepository.findAll();
    }

    @Override
    public Vouchers getOneVouchers(long id) {
        return vouchersRepository.getReferenceById(id);
    }
}
