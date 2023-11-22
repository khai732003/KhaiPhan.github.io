package com.swp.cageshop.service.orderdetailService;


import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.config.ShippingStatus;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.repository.OrderDetailsRepository;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.ProductsRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    public OrderDetailDTO addOrderDetail(OrderDetailDTO orderDetailDTO) {
        double totalCost, totalProduct;
        int quantity;
        Products product = productsRepository.getReferenceById(orderDetailDTO.getProductId());
        OrderDetail existing = orderDetailRepository.findByOrderIdAndProductId(orderDetailDTO.getOrderId(), orderDetailDTO.getProductId());

        if (existing != null) {
            if (existing.getQuantity() <= product.getStock()) {
                int newStock = product.getStock() - 1;
                updateProductStockAndStatus(product, newStock);
                quantity = existing.getQuantity();
                quantity++;
                existing.setQuantity(quantity + orderDetailDTO.getQuantity());
                totalProduct = product.getTotalPrice() * existing.getQuantity();
                existing.setTotalOfProd(totalProduct);
                totalCost = totalProduct;
                existing.setTotalCost(totalCost);
                orderDetailRepository.save(existing);
                return modelMapper.map(existing, OrderDetailDTO.class);
            } else {
                return null;
            }
        } else {
            String productImg = product.getProductImage();
            quantity = orderDetailDTO.getQuantity();
            if(quantity == 0){
                quantity = 1;
            }
            if (quantity <= product.getStock()) {
                int newStock = product.getStock() - 1;
                updateProductStockAndStatus(product, newStock);
                orderDetailDTO.setQuantity(quantity);
                totalProduct = product.getTotalPrice() * quantity;
                orderDetailDTO.setTotalOfProd(totalProduct);
                totalCost = totalProduct ;
                orderDetailDTO.setTotalCost(totalCost);
                orderDetailDTO.setProductImg(productImg);
                OrderDetail orderDetail = modelMapper.map(orderDetailDTO, OrderDetail.class);
                orderDetail.setProductImage(productImg);
                orderDetail = orderDetailRepository.save(orderDetail);

                return modelMapper.map(orderDetail, OrderDetailDTO.class);
            } else {
                throw new RuntimeException("Số lượng đặt hàng vượt quá số lượng tồn kho.");
            }
        }
    }

    private void updateProductStockAndStatus(Products product, int newStock) {
        if (newStock == 0 && !product.getStatus().contains("CustomProduct")) {
            product.setStock(0);
            product.setStatus("OutOfStock");
            if(product.getOrderLevel() == null){
                product.setOrderLevel(0);
            }

            product.setOrderLevel(product.getOrderLevel() + product.getStock());
        } else {
            product.setStock(newStock);
            if(product.getOrderLevel() == null){
                product.setOrderLevel(0);
            }
            product.setOrderLevel(product.getOrderLevel() + product.getStock());
        }
        productsRepository.save(product);
    }




    @Override
    public OrderDetailDTO updateOrderDetailDTO(long orderDetailId, int newQuantity, double newPrice, OrderDetailDTO updatedOrderDetailDTO) {
        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElse(null);
        if (orderDetail != null) {
            orderDetail.setQuantity(newQuantity);
            OrderDetail updatedOrderDetail = orderDetailRepository.save(orderDetail);
            OrderDetailDTO updatedOrderDetailDTO1 = modelMapper.map(updatedOrderDetail, OrderDetailDTO.class);
            orderDetailRepository.save(updatedOrderDetail);
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

//    @Override
//    public List<OrderDetailDTO> getAllOrderDetailDTOs() {
//        List<OrderDetail> orderDetails = orderDetailRepository.findAll();
//        // Sử dụng Java Stream để chuyển đổi danh sách OrderDetail thành danh sách OrderDetailDTO
//        List<OrderDetailDTO> orderDetailDTOs = orderDetails.stream()
//                .map(orderDetail -> modelMapper.map(orderDetail, OrderDetailDTO.class))
//                .collect(Collectors.toList());
//        return orderDetailDTOs;
//    }

    @Override
    public List<OrderDetailDTO> getAllOrderDetailDTOs() {
        List<OrderDetail> orderDetails = orderDetailRepository.findAll();
        List<OrderDetailDTO> orderDetailDTOs = orderDetails.stream()
            .map(orderDetail -> {
                OrderDetailDTO orderDetailDTO = modelMapper.map(orderDetail, OrderDetailDTO.class);
                String productImage = orderDetail.getProduct().getProductImage();
                orderDetailDTO.setProductImg(productImage);
                return orderDetailDTO;
            })
            .collect(Collectors.toList());
        return orderDetailDTOs;
    }


    @Override
    public List<OrderDetailDTO> getAllOrderDetailsByOrderId(Long orderId) {
        List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrderId(orderId);
        List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();

        for (OrderDetail orderDetail : orderDetailList) {
            OrderDetailDTO orderDetailDTO = modelMapper.map(orderDetail, OrderDetailDTO.class);
            orderDetailDTOList.add(orderDetailDTO);
        }

        return orderDetailDTOList;
    }




    @Override
    public List<OrderDetail> listAll() {
        return orderDetailRepository.findAll();
    }
    @Override
    public void deleteOrderDetail(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id).orElse(null);
        if(orderDetail != null ) {
            if (orderDetail.getProduct().getMotherProductId() != null) {
                Products product = productsRepository.getReferenceById(
                    orderDetail.getProduct().getMotherProductId());
                if (product != null) {
                    if (product.getStock() == 0) {
                        product.setStatus("Available");
                        product.setStock(product.getStock() + 1);
                        productsRepository.save(product);
                    } else
                        product.setStock(product.getStock() + 1);
                    productsRepository.save(product);
                }


            } else {
                if (orderDetail.getProduct().getId() != null) {
                    Products product = productsRepository.getReferenceById(
                        orderDetail.getProduct().getId());
                    if (product != null) {
                        if (product.getStock() == 0) {
                            product.setStatus("Available");
                            product.setStock(product.getStock() + orderDetail.getQuantity());
                            product.setOrderLevel(
                                product.getOrderLevel() - orderDetail.getQuantity());
                            productsRepository.save(product);
                        } else
                            product.setStock(product.getStock() + orderDetail.getQuantity());
                        product.setOrderLevel(product.getOrderLevel() - orderDetail.getQuantity());
                        productsRepository.save(product);
                    }


                }


            }
        }

        orderDetailRepository.deleteById(id);
    }


    @Override
    public void deleteAllOrderDetail(Long orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
        for (OrderDetail orderDetail : orderDetails) {
            Products product = orderDetail.getProduct();
            if (product != null) {
                if (product.getMotherProductId() != null) {
                    updateProductStock(product.getMotherProductId(), 1);
                } else if (product.getId() != null) {
                    updateProductStock(product.getId(), orderDetail.getQuantity());
                }
            }
        }
    }

    private void updateProductStock(Long productId, int quantity) {
        Products product = productsRepository.getReferenceById(productId);
        if (product != null) {
            if (product.getStock() == 0) {
                product.setStatus("Available");
            }
            product.setStock(product.getStock() + quantity);
            product.setOrderLevel(product.getOrderLevel() - quantity);
            productsRepository.save(product);
        }
    }

}