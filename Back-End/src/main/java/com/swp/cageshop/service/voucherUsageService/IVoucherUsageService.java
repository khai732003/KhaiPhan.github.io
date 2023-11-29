package com.swp.cageshop.service.voucherUsageService;

import com.swp.cageshop.DTO.VoucherUsageDTO;
import com.swp.cageshop.DTO.VoucherUsageVoucherAmountDTO;
import com.swp.cageshop.entity.VoucherUsage;

import java.util.List;

public interface IVoucherUsageService{
    public VoucherUsageDTO createVoucherUsage(VoucherUsageDTO voucherUsageDTO);

    public List<VoucherUsageDTO> getAllVoucherUsageDTO();

    public VoucherUsageDTO createVoucherUsageByVoucherCode(VoucherUsageDTO voucherUsageDTO);

    public VoucherUsageDTO getVoucherUsageById(Long id);

    public void deleteVoucherUsage(Long id);

    public List<VoucherUsage> getAllVoucherUsages();

    public Double findTotalVoucherAmountByOrderId(Long orderId);

    public List<String> findCodeVouchersByOrderId(Long orderId);

    public List<VoucherUsageVoucherAmountDTO> findVuVoucherAmountsByOrderId(Long orderId);

    public VoucherUsageDTO updateVoucherUsage(Long orderId, String newVoucherCode);
}
