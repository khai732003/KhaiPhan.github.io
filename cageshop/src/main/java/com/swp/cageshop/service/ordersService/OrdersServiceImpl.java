package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.DTO.ShippingDTO;
import com.swp.cageshop.config.ShippingStatus;
import com.swp.cageshop.config.VoucherType;
import com.swp.cageshop.entity.*;
import com.swp.cageshop.repository.*;
import com.swp.cageshop.service.orderdetailService.IOrderDetailService;
import com.swp.cageshop.service.productsService.IProductsService;
import com.swp.cageshop.service.voucherUsageService.IVoucherUsageService;
import com.swp.cageshop.service.vouchersService.IVouchersService;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrdersServiceImpl implements IOrdersService {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;


    @Autowired
    private IProductsService productsService;

    @Autowired
    private IVoucherUsageService voucherUsageService;

    @Autowired
    private VouchersRepository voucherRepository;

    @Autowired
    private VoucherUsageRepository voucherUsageRepository;

    @Autowired
    private IVouchersService iVouchersService;


    @Autowired
    private IOrderDetailService iOrderDetailService;

    @Autowired
    private VouchersRepository vouchersRepository;
    @Override
    public OrderDTO addOrderDTO(OrderDTO orderDTO) {
        if (orderDTO != null) {
            if(orderDTO.getTotal_price() <= 0){
                orderDTO.setTotal_price(0);
            }
            Orders orders = modelMapper.map(orderDTO, Orders.class);
            Orders orders1 = ordersRepository.save(orders);
            OrderDTO orderDTO1 = modelMapper.map(orders1, OrderDTO.class);
            return orderDTO1;
        }
        return null;
    }

    @Override
    public OrderDTO updateOrderDTO(long id, OrderDTO orderDTO) {
        Optional<Orders> optionalOrder = ordersRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Orders existingOrder = optionalOrder.get();
            Orders updatedOrder = ordersRepository.save(existingOrder);
            OrderDTO updatedOrderDTO = modelMapper.map(updatedOrder, OrderDTO.class);
            return updatedOrderDTO;
        } else {
            return null;
        }
    }


    public List<OrderDTO> getAllOrderDTO() {
        List<Orders> ordersList = ordersRepository.findAll();
        List<OrderDTO> orderDTOList = new ArrayList<>();

        for (Orders orders : ordersList) {
            List<OrderDetail> orderDetailList = orderDetailsRepository.findAllByOrderId(orders.getId());
            double totalCost = 0.0;
            for (OrderDetail detail : orderDetailList) {
                totalCost += detail.getTotalCost();
            }
            List<VoucherUsage> voucherUsages = voucherUsageRepository.findByOrderId(orders.getId());
            double totalVoucherAmount = 0;
            boolean isCashVoucher = false;
            for (VoucherUsage voucherUsage : voucherUsages) {
                Vouchers voucher = voucherUsage.getVoucher();
                if (voucher != null) {
                    if ("CASH".equals(voucher.getVoucherType())) {
                        isCashVoucher = true;
                        totalVoucherAmount += voucher.getVoucherAmount();
                    }
                }
            }
            if (isCashVoucher) {
                totalCost -= totalVoucherAmount;
            }
            if (totalCost < 0) {
                orders.setTotal_Price(6000);
                ordersRepository.save(orders);
                OrderDTO orderDTO = modelMapper.map(orders, OrderDTO.class);
                List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();
                for (OrderDetail detail : orderDetailList) {
                    OrderDetailDTO orderDetailDTO = modelMapper.map(detail, OrderDetailDTO.class);
                    orderDetailDTOList.add(orderDetailDTO);
                }
                orderDTO.setOrderDetails(orderDetailDTOList);
                orderDTOList.add(orderDTO);
            } else {
                orders.setTotal_Price(totalCost);
                ordersRepository.save(orders);
                OrderDTO orderDTO = modelMapper.map(orders, OrderDTO.class);
                List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();
                for (OrderDetail detail : orderDetailList) {
                    OrderDetailDTO orderDetailDTO = modelMapper.map(detail, OrderDetailDTO.class);
                    orderDetailDTOList.add(orderDetailDTO);
                }
                orderDTO.setOrderDetails(orderDetailDTOList);
                orderDTOList.add(orderDTO);
            }
        }
            return orderDTOList;
    }


    public List<Orders> getAllOrdersByUserId(Long orderId) {
        return ordersRepository.findAllById(orderId);
    }

    @Override
    public OrderDTO findById(Long id) {
        Orders order = ordersRepository.getReferenceById(id);

        List<OrderDetail> orderDetailList = orderDetailsRepository.findAllByOrderId(order.getId());
        double totalCost = 0.0;

        List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();

        for (OrderDetail detail : orderDetailList) {
            totalCost += detail.getTotalCost();
            String productImg = detail.getProduct().getProductImage();
            OrderDetailDTO orderDetailDTO = modelMapper.map(detail, OrderDetailDTO.class);
            orderDetailDTO.setProductImg(productImg);
            orderDetailDTOList.add(orderDetailDTO);
        }

        List<VoucherUsage> voucherUsages = voucherUsageRepository.findByOrderId(order.getId());
        double totalVoucherAmount = 0;
        boolean isCashVoucher = false;
        for (VoucherUsage voucherUsage : voucherUsages) {
            Vouchers voucher = voucherUsage.getVoucher();
            if (voucher != null) {
                if ("CASH".equals(voucher.getVoucherType())) {
                    isCashVoucher = true;
                    totalVoucherAmount += voucher.getVoucherAmount();
                }
            }
        }
        if (isCashVoucher) {
            totalCost -= totalVoucherAmount;
        }
        if (totalCost < 0) {
            order.setTotal_Price(6000);
            ordersRepository.save(order);
            OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
            orderDTO.setOrderDetails(orderDetailDTOList);
            return orderDTO;
        } else {
            order.setTotal_Price(totalCost);
            ordersRepository.save(order);
            OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
            orderDTO.setOrderDetails(orderDetailDTOList);
            return orderDTO;
        }
    }


    @Override
    public void updateOrderAndOrderDetailsAndVoucher(Orders order) {
        if (order != null) {
            order.setShipStatus(ShippingStatus.NOT_CONFIRM.toString());
            ordersRepository.save(order);
            List<OrderDetail> orderDetail = orderDetailsRepository.findByOrder_Id(order.getId());
            for(OrderDetail orderD : orderDetail) {
                orderD.setStatus("COMPLETED");
                orderDetailsRepository.save(orderD);
            }
            productsService.updateProductStock(order);
        }
    }
    @Override
    public List<OrderDTO> getPaidAndNotConfirmedOrders(String shipStatus) {
        List<Orders> paidAndNotConfirmedOrders = ordersRepository.findByPayStatusAndShipStatus("PAID", shipStatus);

        List<OrderDTO> orderDTOs = paidAndNotConfirmedOrders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());

        return orderDTOs;
    }

    @Override
    public List<OrderDTO> getPaidAndNotConfirmedOrdersAndShipBy(Long userId, String shipStatus) {
        List<Orders> paidAndNotConfirmedOrders = ordersRepository.findOrdersByStatusForUser(userId,shipStatus);

        List<OrderDTO> orderDTOs = paidAndNotConfirmedOrders.stream()
            .map(order -> modelMapper.map(order, OrderDTO.class))
            .collect(Collectors.toList());

        return orderDTOs;
    }




    @Override
    public List<OrderDTO> getOrdersByShipStatus(String shipStatus) {
        List<Orders> orders = ordersRepository.findByShipStatus(shipStatus);
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getAllPayStatusByStatus(String payStatus) {
        return ordersRepository.findAll().stream()
                .filter(order -> order.getPayStatus().equals(payStatus))
                .map(Orders::getPayStatus)
                .collect(Collectors.toList());
    }
    @Override
    public List<String> getAllShipStatusByStatus(String shipStatus) {
        return ordersRepository.findAll().stream()
                .filter(order -> order.getShipStatus().equals(shipStatus))
                .map(Orders::getShipStatus)
                .collect(Collectors.toList());
    }



    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        List<Orders> orders = ordersRepository.findByUserIdOrderByCreateDateDesc(userId);
        List<OrderDTO> orderDTOs = new ArrayList<>();

        for (Orders order : orders) {
            OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);

            List<OrderDetail> orderDetailList = orderDetailsRepository.findAllByOrderId(order.getId());
            List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();

            for (OrderDetail detail : orderDetailList) {
                String productImg = detail.getProduct().getProductImage();
                OrderDetailDTO orderDetailDTO = modelMapper.map(detail, OrderDetailDTO.class);
                orderDetailDTO.setProductImg(productImg);
                orderDetailDTOList.add(orderDetailDTO);
            }
            orderDTO.setOrderDetails(orderDetailDTOList);
            orderDTOs.add(orderDTO);
        }

        return orderDTOs;
    }


    @Override
    public List<OrderDTO> getOrdersByUserIdAndPayStatus(Long userId, String payStatus) {
        List<Orders> orders = ordersRepository.findByUserId(userId);
        List<OrderDTO> orderDTOs = new ArrayList<>();
        for (Orders order : orders) {
            if (payStatus != null && !payStatus.isEmpty()) {
                if (order.getPayStatus() != null && order.getPayStatus().equals(payStatus)) {
                    OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
                    orderDTOs.add(orderDTO);
                }
            } else {
                OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
                orderDTOs.add(orderDTO);
            }
        }
        return orderDTOs;
    }

    @Override
    public boolean checkIfUserHasPurchasedProduct1(Long userId, Long productId) {
        List<Orders> orders = ordersRepository.findByUserIdAndPayStatusAndShipStatus(userId, "PAID", ShippingStatus.DELIVERED.toString());
        for (Orders order : orders) {
            List<OrderDetail> orderDetailList = orderDetailsRepository.findAllByOrderId(order.getId());
            for (OrderDetail orderDetail : orderDetailList) {
                if (orderDetail.getProduct().getId().equals(productId)) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public boolean deleteOrderDTO(Long orderId) {
        var orders =ordersRepository.getReferenceById(orderId);
        List<VoucherUsage> voucherUsages = voucherUsageRepository.findByOrderId(orderId);
        if(voucherUsages !=null) {
            for (VoucherUsage voucherUsage : voucherUsages) {
                voucherUsage.setOrder(null);
                voucherUsageRepository.save(voucherUsage);
            }
        }
        ordersRepository.deleteById(orderId);
        orderDetailsRepository.deleteAllByOrderId(orderId);
        return true;
    }


    @Override
    public boolean existsByUserId(Long orderId, Long userId) {

        Orders orders = ordersRepository.existsByUserId(orderId,userId);
        if(orders != null){
            return true;
        }
        return false;
    }

}

