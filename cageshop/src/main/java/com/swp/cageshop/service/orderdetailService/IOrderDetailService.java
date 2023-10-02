package com.swp.cageshop.service.orderdetailService;

import com.swp.cageshop.DTO.OrderDetailDTO;

import java.util.List;

public interface IOrderDetailService {
    OrderDetailDTO addOrderDetailDTO(OrderDetailDTO orderDetailDTO);

    public OrderDetailDTO updateOrderDetailDTO(long orderDetailId, int newQuantity, double newPrice, OrderDetailDTO updatedOrderDetailDTO);

    boolean deleteOrderDetailDTO(long id);

    List<OrderDetailDTO> getAllOrderDetailDTOs();

    OrderDetailDTO getOneOrderDetailDTO(long id);
}
