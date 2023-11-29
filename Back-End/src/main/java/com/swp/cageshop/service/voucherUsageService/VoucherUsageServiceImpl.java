package com.swp.cageshop.service.voucherUsageService;

import com.swp.cageshop.DTO.VoucherUsageDTO;
import com.swp.cageshop.DTO.VoucherUsageVoucherAmountDTO;
import com.swp.cageshop.entity.VoucherUsage;
import com.swp.cageshop.entity.Vouchers;
import com.swp.cageshop.repository.VoucherUsageRepository;
import com.swp.cageshop.repository.VouchersRepository;
import java.util.ArrayList;
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
    @Override
    public VoucherUsageDTO createVoucherUsageByVoucherCode(VoucherUsageDTO voucherUsageDTO) {
        Long userId = voucherUsageDTO.getUserId();
        Vouchers voucher = vouchersRepository.findByCode(voucherUsageDTO.getCodeVoucher());
        if (voucher != null) {
            boolean used = voucherUsageRepository.existsByUserIdAndVoucherId(userId, voucher.getId());
            if (!used) {
                VoucherUsage voucherUsage = modelMapper.map(voucherUsageDTO, VoucherUsage.class);
                Vouchers voucher1 = vouchersRepository.findByCodeAndIsAvailable(voucherUsageDTO.getCodeVoucher(), true);
                if (voucher1 != null && voucher.getQuantity() > 0) {
                    voucherUsage.setVoucher(voucher);
                    VoucherUsage existingVoucherUsage = voucherUsageRepository.findByUserIdAndVoucherId(userId, voucher.getId());
                    if (existingVoucherUsage != null) {
                        existingVoucherUsage.getVoucher().setId(voucher.getId());
                        VoucherUsage updatedVoucherUsage = voucherUsageRepository.save(existingVoucherUsage);
                        return modelMapper.map(updatedVoucherUsage, VoucherUsageDTO.class);
                    } else {
                        VoucherUsage savedVoucherUsage = voucherUsageRepository.save(voucherUsage);
                        return modelMapper.map(savedVoucherUsage, VoucherUsageDTO.class);
                    }
                } else {
                    throw new IllegalArgumentException("Voucher is not available");
                }
            } else {
                throw new IllegalArgumentException("User has already used this voucher");
            }
        } else {
            throw new IllegalArgumentException("Voucher not found");
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

//    @Override
    public List<Double> findAmountVouchersByOrderId(Long orderId) {
        return voucherUsageRepository.findVoucherAmountsByOrderId(orderId);
    }

    public VoucherUsageDTO getVoucherUsageById(Long id) {
        VoucherUsage voucherUsage = voucherUsageRepository.findById(id).orElse(null);
        return modelMapper.map(voucherUsage, VoucherUsageDTO.class);
    }
    @Override
    public VoucherUsageDTO updateVoucherUsage(Long orderId, String voucherCode) {
        List<VoucherUsage> voucherUsages = voucherUsageRepository.findByOrderId(orderId);
        Vouchers voucher = vouchersRepository.findByCodeAndIsAvailable(voucherCode, true);

        if (voucherUsages != null && !voucherUsages.isEmpty() && voucher != null) {
            for (VoucherUsage voucherUsage : voucherUsages) {
                if (voucherUsage.getVoucher() != null && voucherUsage.getVoucher().getCode().equals(voucherCode)) {
                    voucherUsageRepository.delete(voucherUsage);
                }
            }
            return modelMapper.map(voucherUsages.get(0), VoucherUsageDTO.class);
        } else {
            throw new IllegalArgumentException("VoucherUsage not found for orderId: " + orderId);
        }
    }



    public void deleteVoucherUsage(Long id) {
        voucherUsageRepository.deleteById(id);
    }

    @Override
    public List<VoucherUsage> getAllVoucherUsages() {
        return voucherUsageRepository.findAll();
    }

    @Override
    public Double findTotalVoucherAmountByOrderId(Long orderId) {
        return null;
    }


    public List<VoucherUsageVoucherAmountDTO> findVuVoucherAmountsByOrderId(Long orderId) {
        List<Object[]> result = voucherUsageRepository.findVuVoucherAmountsByOrderId(orderId);
        List<VoucherUsageVoucherAmountDTO> voucherUsageDTOList = new ArrayList<>();

        for (Object[] row : result) {
            // Sử dụng constructor của DTO để giảm mã boilerplate
            VoucherUsageVoucherAmountDTO dto = new VoucherUsageVoucherAmountDTO(
                (Long) row[0],
                (Long) row[2],
                (Double) row[5],
                (String) row[6]
            );
            voucherUsageDTOList.add(dto);
        }

        return voucherUsageDTOList;
    }


    public boolean isUserUsedVoucher(Long userId, Long voucherId) {
        return voucherUsageRepository.existsByUserIdAndVoucherId(userId, voucherId);
    }


}