package com.swp.cageshop.service.shipService;

import com.swp.cageshop.DTO.ShippingDTO;
import com.swp.cageshop.entity.Shipping;

import java.util.List;

public interface IShippingService {
    public ShippingDTO createShipping(ShippingDTO shippingDTO);

    public List<ShippingDTO> getAllShippings();

    public ShippingDTO getShippingById(Long id);

    public ShippingDTO updateShipping(ShippingDTO shippingDTO);

    public ShippingDTO updateShippingStatusByOrderId(Long orderId, String newStatus);
        public void deleteShipping(Long id);
}
