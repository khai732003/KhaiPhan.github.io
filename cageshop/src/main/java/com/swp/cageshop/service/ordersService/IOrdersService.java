package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.entity.OrderDetail;

import com.swp.cageshop.entity.Orders;
import java.util.List;
import java.util.Optional;

public interface IOrdersService {
    public OrderDTO addOrderDTO(OrderDTO OrderDTO);


//    public OrderDTO updateOrderDTO(long id, OrderDTO OrderDTO);

    public OrderDTO updateOrderDTO(long id, OrderDTO OrderDTO);


    public boolean deleteOrderDTO(long id);

    public List<OrderDTO> getAllOrderDTO();

    public OrderDTO getOneOrderDTO(long id);

    public  List<OrderDetailDTO> getAllOrderDetailsByOrderId(Long orderId);

    public OrderDTO findById(Long id);
}
