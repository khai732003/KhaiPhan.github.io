package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.DTO.ShippingDTO;
import com.swp.cageshop.config.ShippingStatus;
import com.swp.cageshop.config.VoucherType;
import com.swp.cageshop.entity.*;
import com.swp.cageshop.repository.*;
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
    private VouchersRepository vouchersRepository;
    @Override
    public OrderDTO addOrderDTO(OrderDTO orderDTO) {
        if (orderDTO != null) {
            String city = orderDTO.getCity();
            if(city.equalsIgnoreCase("Hồ Chí Minh")){
                orderDTO.setShipPrice(100000);
            }else{
                orderDTO.setShipPrice(200000);
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
        // Kiểm tra xem đơn hàng có tồn tại trong cơ sở dữ liệu hay không
        Optional<Orders> optionalOrder = ordersRepository.findById(id);

        if (optionalOrder.isPresent()) {
            // Lấy đơn hàng từ cơ sở dữ liệu
            Orders existingOrder = optionalOrder.get();

            Orders updatedOrder = ordersRepository.save(existingOrder);

            // Chuyển đổi đơn hàng đã cập nhật thành DTO và trả về
            OrderDTO updatedOrderDTO = modelMapper.map(updatedOrder, OrderDTO.class);

            return updatedOrderDTO;
        } else {
            // Xử lý trường hợp không tìm thấy đơn hàng với id tương ứng
            // Có thể trả về null hoặc ném một ngoại lệ tùy thuộc vào quyết định thiết kế của bạn.
            return null;
        }
    }

    @Override
    public boolean deleteOrderDTO(long id) {
        return false;
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
            boolean isFreeShipVoucher = false;
            boolean isCashVoucher = false;
            for (VoucherUsage voucherUsage : voucherUsages) {
                if (voucherUsage.getVoucher().getVoucherType().equals("FREESHIP")) {
                    isFreeShipVoucher = true;
                    totalVoucherAmount += voucherUsage.getVoucher().getVoucherAmount();
                } else if (voucherUsage.getVoucher().getVoucherType().equals("CASH")) {
                    isCashVoucher = true;
                    totalVoucherAmount += voucherUsage.getVoucher().getVoucherAmount();
                }
            }
            double shipPrice = orders.getShipPrice();
            if (isFreeShipVoucher && isCashVoucher) {
                totalCost -= totalVoucherAmount;
            } else if (isFreeShipVoucher) {
                totalCost -= totalVoucherAmount;
            } else {
                totalCost += shipPrice - totalVoucherAmount;
            }

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
        boolean isFreeShipVoucher = false;
        boolean isCashVoucher = false;
        for (VoucherUsage voucherUsage : voucherUsages) {
            if (voucherUsage.getVoucher().getVoucherType().equals("FREESHIP")) {
                isFreeShipVoucher = true;
                totalVoucherAmount += voucherUsage.getVoucher().getVoucherAmount();
            } else if (voucherUsage.getVoucher().getVoucherType().equals("CASH")) {
                isCashVoucher = true;
                totalVoucherAmount += voucherUsage.getVoucher().getVoucherAmount();
            }
        }
        double shipPrice = order.getShipPrice();
        if (isFreeShipVoucher && isCashVoucher) {
            totalCost -= totalVoucherAmount;
        } else if (isFreeShipVoucher) {
            totalCost -= totalVoucherAmount;
        } else {
            totalCost += shipPrice - totalVoucherAmount;
        }

        if (totalCost <= 0) {
            order.setTotal_Price(0);
        }

        order.setTotal_Price(totalCost);
        ordersRepository.save(order);

        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
        orderDTO.setOrderDetails(orderDetailDTOList);

        return orderDTO;
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
        List<Orders> orders = ordersRepository.findByUserId(userId);
        List<OrderDTO> orderDTOs = new ArrayList<>();
        for (Orders order : orders) {
            OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
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

}
