package com.swp.cageshop.service.voucherUsageService;

import com.swp.cageshop.DTO.VoucherUsageDTO;
import com.swp.cageshop.entity.VoucherUsage;
import com.swp.cageshop.entity.Vouchers;
import com.swp.cageshop.repository.VoucherUsageRepository;
import com.swp.cageshop.repository.VouchersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherUsageServiceImpl implements IVoucherUsageService {

    @Autowired
    private VoucherUsageRepository voucherUsageRepository;

    @Autowired
    private VouchersRepository vouchersRepository;

    @Autowired
    private ModelMapper modelMapper;

    public VoucherUsageDTO createVoucherUsage(VoucherUsageDTO voucherUsageDTO) {
        VoucherUsage voucherUsage = modelMapper.map(voucherUsageDTO, VoucherUsage.class);
        VoucherUsage savedVoucherUsage = voucherUsageRepository.save(voucherUsage);
        return modelMapper.map(savedVoucherUsage, VoucherUsageDTO.class);
    }


    public VoucherUsageDTO createVoucherUsageByVoucherCode(VoucherUsageDTO voucherUsageDTO) {
        Long userId = voucherUsageDTO.getUserId();
        Long voucherId = vouchersRepository.findIdByCode(voucherUsageDTO.getCodeVoucher());
        if(voucherId !=null){
        boolean used = voucherUsageRepository.existsByUserIdAndVoucherId(userId, voucherId);
        if (!used) {
            VoucherUsage voucherUsage = modelMapper.map(voucherUsageDTO, VoucherUsage.class);
            Vouchers voucher = vouchersRepository.findByCodeAndIsAvailable(voucherUsageDTO.getCodeVoucher(), true);
            if (voucher != null && voucher.getQuantity() > 0) {
                voucherUsage.setVoucher(voucher);
                VoucherUsage savedVoucherUsage = voucherUsageRepository.save(voucherUsage);
                return modelMapper.map(savedVoucherUsage, VoucherUsageDTO.class);
            } else {
                return null;
            }
        }else{
            throw new IllegalArgumentException("Voucher này đã hết hạn");

        }
        }else{
            throw new IllegalArgumentException("User đã xài voucher này rồi, mời nó nhập voucher khác đi");
        }
    }


    public List<VoucherUsageDTO> getAllVoucherUsageDTO() {
        List<VoucherUsage> voucherUsages = voucherUsageRepository.findAll();
        return voucherUsages.stream()
                .map(voucherUsage -> modelMapper.map(voucherUsage, VoucherUsageDTO.class))
                .collect(Collectors.toList());
    }

    public List<String> findCodeVouchersByOrderId(Long orderId) {
        return voucherUsageRepository.findCodeVouchersByOrderId(orderId);
    }

    @Override
    public List<Double> findAmountVouchersByOrderId(Long orderId) {
        return null;
    }

    public VoucherUsageDTO getVoucherUsageById(Long id) {
        VoucherUsage voucherUsage = voucherUsageRepository.findById(id).orElse(null);
        return modelMapper.map(voucherUsage, VoucherUsageDTO.class);
    }

    public VoucherUsageDTO updateVoucherUsage(VoucherUsageDTO voucherUsageDTO) {
        VoucherUsage voucherUsage = modelMapper.map(voucherUsageDTO, VoucherUsage.class);
        VoucherUsage updatedVoucherUsage = voucherUsageRepository.save(voucherUsage);
        return modelMapper.map(updatedVoucherUsage, VoucherUsageDTO.class);
    }

    public void deleteVoucherUsage(Long id) {
        voucherUsageRepository.deleteById(id);
    }

    @Override
    public List<VoucherUsage> getAllVoucherUsages() {
        return voucherUsageRepository.findAll();
    }


    public Double findTotalVoucherAmountByOrderId(Long orderId) {
        List<Double> voucherAmountList = voucherUsageRepository.findVoucherAmountsByOrderId(orderId);
        double totalVoucherAmount = 0.0;
        for (Double voucherAmount : voucherAmountList) {
            totalVoucherAmount += voucherAmount;
        }
        return totalVoucherAmount;
    }


    public boolean isUserUsedVoucher(Long userId, Long voucherId) {
        return voucherUsageRepository.existsByUserIdAndVoucherId(userId, voucherId);
    }



}
