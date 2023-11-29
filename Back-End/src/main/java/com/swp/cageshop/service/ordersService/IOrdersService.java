package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.config.ShippingStatus;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;

import com.swp.cageshop.entity.Orders;
import java.util.List;
import java.util.Optional;

public interface IOrdersService {
    public OrderDTO addOrderDTO(OrderDTO OrderDTO);


//    public OrderDTO updateOrderDTO(long id, OrderDTO OrderDTO);

    public OrderDTO updateOrderDTO(long id, OrderDTO OrderDTO);

    public List<OrderDTO> getAllOrderDTO();

    public OrderDTO findById(Long id);

    public void updateOrderAndOrderDetailsAndVoucher(Orders order);

    public List<OrderDTO> getPaidAndNotConfirmedOrders(String shipStatus);

    public List<OrderDTO> getPaidAndNotConfirmedOrdersAndShipBy(Long userId, String shipStatus);

    public List<OrderDTO> getOrdersByShipStatus(String shipStatus);

    public List<String> getAllPayStatusByStatus(String payStatus);

    public List<String> getAllShipStatusByStatus(String shipStatus);

    public List<OrderDTO> getOrdersByUserId(Long userId);

    public List<OrderDTO> getOrdersByUserIdAndPayStatus(Long userId, String payStatus);

    public boolean deleteOrderDTO(Long orderId);

    public boolean checkIfUserHasPurchasedProduct1(Long userId, Long productId);

    public boolean existsByUserId(Long orderId,Long userId);


}
