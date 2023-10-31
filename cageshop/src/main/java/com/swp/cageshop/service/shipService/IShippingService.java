package com.swp.cageshop.service.shipService;

import com.swp.cageshop.DTO.ShippingDTO;
import com.swp.cageshop.config.ShippingStatus;
import com.swp.cageshop.entity.Shipping;

import java.util.ArrayList;
import java.util.List;

public interface IShippingService {
    public ShippingDTO createShipping(ShippingDTO shippingDTO);

    public List<ShippingDTO> getAllShippings();

    public ShippingDTO getShippingById(Long id);

    public ShippingDTO updateShipping(ShippingDTO shippingDTO);

        public void deleteShipping(Long id);

    public ShippingDTO updateShippingStatusByOrderId(Long orderId, ShippingStatus newStatus);


    public List<ShippingDTO> getShippingsByStatus(ShippingStatus status);

    public List<ShippingDTO> getShippingsByNotConfirmedStatus();


    public List<ShippingDTO> getShippingsByConfirmedStatus();

    public List<ShippingDTO> getShippingsByDeliveringStatus();


    public List<ShippingDTO> getShippingsByDeliveredStatus();
}
