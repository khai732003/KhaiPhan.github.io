package com.swp.cageshop.service.vouchersService;

import com.swp.cageshop.entity.Vouchers;

import java.util.List;

public interface IVouchersService {
        public Vouchers addVouchers(Vouchers vouchers);

        public Vouchers updateVouchers(long id,Vouchers vouchers);

        public boolean deleteVouchers(long id);
        public List<Vouchers> getAllVouchers();

        public Vouchers getOneVouchers(long id);
    }




