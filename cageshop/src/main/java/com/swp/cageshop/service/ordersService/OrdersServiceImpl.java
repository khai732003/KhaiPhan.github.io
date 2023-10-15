package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.repository.OrderDetailsRepository;
import com.swp.cageshop.repository.OrdersRepository;
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
    private ModelMapper modelMapper;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

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

    @Override
    public List<OrderDTO> getAllOrderDTO() {
        // Lấy tất cả các đơn hàng từ cơ sở dữ liệu
        List<Orders> ordersList = ordersRepository.findAll();
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for (Orders orders : ordersList) {
            OrderDTO orderDTO = modelMapper.map(orders, OrderDTO.class);
            orderDTOList.add(orderDTO);
        }
        return orderDTOList;
    }

    @Override
    public OrderDTO getOneOrderDTO(long id) {
        return null;
    }


}
