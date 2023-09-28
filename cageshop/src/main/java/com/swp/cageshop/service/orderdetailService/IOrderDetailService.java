package com.swp.cageshop.service.orderdetailService;

import com.swp.cageshop.DTO.OrderDetailDTO;

import java.util.List;

public interface IOrderDetailService {
    OrderDetailDTO addOrderDetailDTO(OrderDetailDTO orderDetailDTO);

    OrderDetailDTO updateOrderDetailDTO(long id, OrderDetailDTO orderDetailDTO);

    boolean deleteOrderDetailDTO(long id);

    List<OrderDetailDTO> getAllOrderDetailDTOs();

    OrderDetailDTO getOneOrderDetailDTO(long id);
}
