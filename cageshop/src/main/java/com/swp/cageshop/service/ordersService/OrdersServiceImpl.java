package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.DTO.VoucherType;
import com.swp.cageshop.entity.*;
import com.swp.cageshop.repository.*;
import com.swp.cageshop.service.productsService.IProductsService;
import com.swp.cageshop.service.voucherUsageService.IVoucherUsageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public OrderDTO addOrderDTO(OrderDTO orderDTO) {
        if (orderDTO != null) {
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

            // Cập nhật thông tin của đơn hàng từ OrderDTO
//            existingOrder.set(orderDTO.get);
//            existingOrder.setOrderProperty2(orderDTO.getOrderProperty2());
            // Cập nhật các trường khác tương ứng

            // Lưu đơn hàng đã cập nhật vào cơ sở dữ liệu
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

    // Khai báo và khởi tạo orderDetailDTOList
    List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();

    for (OrderDetail detail : orderDetailList) {
      totalCost += detail.getTotalCost();
      // Lấy productImage từ Product liên quan đến mỗi OrderDetail
      String productImg = detail.getProduct().getProductImage();
      // Thiết lập giá trị productImg vào OrderDetailDTO
      OrderDetailDTO orderDetailDTO = modelMapper.map(detail, OrderDetailDTO.class);
      orderDetailDTO.setProductImg(productImg);
      orderDetailDTOList.add(orderDetailDTO);
    }

    totalCost += order.getShipPrice();
    order.setTotal_Price(totalCost);
    ordersRepository.save(order);

    OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
    orderDTO.setOrderDetails(orderDetailDTOList);

    return orderDTO;
  }


    public void updateOrderAndOrderDetails(Orders order) {
        if (order != null) {
            order.setStatus("COMPLETED");
            ordersRepository.save(order);
            OrderDetail orderDetail = orderDetailsRepository.findByOrder_Id(order.getId());
            orderDetail.setStatus("COMPLETED");
            orderDetailsRepository.save(orderDetail);
            productsService.updateProductStock(order);
        }
    }

}
