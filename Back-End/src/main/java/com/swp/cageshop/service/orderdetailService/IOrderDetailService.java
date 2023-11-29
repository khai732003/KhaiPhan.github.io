package com.swp.cageshop.service.orderdetailService;

import com.swp.cageshop.DTO.OrderDetailDTO;

import com.swp.cageshop.entity.OrderDetail;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface IOrderDetailService {
    OrderDetailDTO addOrderDetail(OrderDetailDTO orderDetailDTO);

    public OrderDetailDTO updateOrderDetailDTO(long orderDetailId, int newQuantity, double newPrice, OrderDetailDTO updatedOrderDetailDTO);

    boolean deleteOrderDetailDTO(long id);

    List<OrderDetailDTO> getAllOrderDetailDTOs();

    public  List<OrderDetailDTO> getAllOrderDetailsByOrderId(Long orderId);

    public List<OrderDetail> listAll();

    public void deleteAllOrderDetail(Long orderid);

    public void deleteOrderDetail(Long id);

}
