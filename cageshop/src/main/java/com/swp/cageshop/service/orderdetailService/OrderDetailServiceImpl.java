package com.swp.cageshop.service.orderdetailService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.repository.OrderDetailsRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderDetailServiceImpl implements IOrderDetailService {

    @Autowired
    private OrderDetailsRepository orderDetailRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public OrderDetailDTO addOrderDetailDTO(OrderDetailDTO orderDetailDTO) {
        if (orderDetailDTO != null) {
            // Chuyển đổi từ DTO sang Entity:
            OrderDetail orderDetail = modelMapper.map(orderDetailDTO, OrderDetail.class);
            // Lưu Entity vao csdl
            OrderDetail orderDetail1 = orderDetailRepository.save(orderDetail);
            // Chuyển đổi từ Entity sang DTO
            OrderDetailDTO orderDetailDTO1 = modelMapper.map(orderDetail1, OrderDetailDTO.class);
            return orderDetailDTO1;
        }else{

        }
        return null;
    }

    @Override
    public OrderDetailDTO updateOrderDetailDTO(long orderDetailId, int newQuantity, double newPrice, OrderDetailDTO updatedOrderDetailDTO) {
        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElse(null);
        if (orderDetail != null) {
            orderDetail.setQuantity(newQuantity);
            orderDetail.setPrice(newPrice);
            OrderDetail updatedOrderDetail = orderDetailRepository.save(orderDetail);
            OrderDetailDTO updatedOrderDetailDTO1 = modelMapper.map(updatedOrderDetail, OrderDetailDTO.class);
            return updatedOrderDetailDTO1;
        } else {
            // Xử lý trường hợp không tìm thấy OrderDetail
            throw new ResourceNotFoundException("Không tìm thấy OrderDetail với ID: " + orderDetailId);
        }
    }

    @Override
    public boolean deleteOrderDetailDTO(long id) {
        return false;
    }

    @Override
    public List<OrderDetailDTO> getAllOrderDetailDTOs() {
        List<OrderDetail> orderDetails = orderDetailRepository.findAll();
        // Sử dụng Java Stream để chuyển đổi danh sách OrderDetail thành danh sách OrderDetailDTO
        List<OrderDetailDTO> orderDetailDTOs = orderDetails.stream()
                .map(orderDetail -> modelMapper.map(orderDetail, OrderDetailDTO.class))
                .collect(Collectors.toList());
        return orderDetailDTOs;
    }



    @Override
    public OrderDetailDTO getOneOrderDetailDTO(long id) {
        return null;
    }
}
