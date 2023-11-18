package com.swp.cageshop.service.shipService;

import com.swp.cageshop.DTO.ShippingDTO;
import com.swp.cageshop.config.ShippingStatus;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Shipping;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.ShippingRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.ordersService.IOrdersService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

    @Service
    public class ShippingServiceImpl implements IShippingService{

        @Autowired
        private ShippingRepository shippingRepository;

        @Autowired
        private ModelMapper modelMapper;

        @Autowired
        private OrdersRepository ordersRepository;

        @Autowired
        private UsersRepository usersRepository;

        @Autowired
        private IOrdersService iOrdersService;

        public ShippingDTO createShipping(ShippingDTO shippingDTO) {
            Orders orders = ordersRepository.getReferenceById(shippingDTO.getOrderId());
            Users users = usersRepository.getReferenceById(shippingDTO.getUserId());
            if(orders != null && users.isShipStatus() == false) {
                users.setShipStatus(true);
//                shippingDTO.setUserId(shippingDTO.getUserId());
                shippingDTO.setAddress(orders.getAddress());
                shippingDTO.setCity(orders.getCity());
                orders.setShipStatus(ShippingStatus.CONFIRMED.toString());
                Shipping shipping = modelMapper.map(shippingDTO, Shipping.class);
                Shipping savedShipping = shippingRepository.save(shipping);
                return modelMapper.map(savedShipping, ShippingDTO.class);
            }
            return null;
        }

        public List<ShippingDTO> getAllShippings() {
            List<Shipping> shippings = shippingRepository.findAll();
            return shippings.stream()
                    .map(shipping -> modelMapper.map(shipping, ShippingDTO.class))
                    .collect(Collectors.toList());
        }


        public ShippingDTO getShippingById(Long id) {
            Shipping shipping = shippingRepository.findById(id).orElse(null);
            return modelMapper.map(shipping, ShippingDTO.class);
        }

        public ShippingDTO updateShipping(ShippingDTO shippingDTO) {
            Shipping shipping = modelMapper.map(shippingDTO, Shipping.class);
            Shipping updatedShipping = shippingRepository.save(shipping);
            return modelMapper.map(updatedShipping, ShippingDTO.class);
        }


        public void deleteShipping(Long id) {
            shippingRepository.deleteById(id);
        }

        public ShippingDTO updateShippingStatusByOrderId(Long orderId, ShippingStatus newStatus) {
            Shipping shipping = shippingRepository.findByOrderId(orderId);
            Orders orders = ordersRepository.getReferenceById(orderId);
            Long userId = orders.getShipping().getUser().getId();
            Users users = usersRepository.getReferenceById(userId);
            if (shipping != null) {
                shipping.setStatus(newStatus.name()); // Lấy tên của Enum làm giá trị trạng thái cho Shipping
                Shipping updatedShipping = shippingRepository.save(shipping);


                if (newStatus == ShippingStatus.DELIVERED) {
                    if (shipping.getUser() != null) {
                        users.setShipStatus(false);
                        users.setShipCount(users.getShipCount() + 1);
                        // Lưu lại thông tin người dùng
                        usersRepository.save(users);
                    }
                }
                if (shipping.getOrder() != null) {
                    Orders order = shipping.getOrder();
                    order.setShipStatus(newStatus.name()); // Lấy tên của Enum làm giá trị trạng thái vận chuyển cho đơn hàng
                    ordersRepository.save(order);
                }
                return modelMapper.map(updatedShipping, ShippingDTO.class);
            }
            return null; // hoặc có thể ném ra một Exception phù hợp ở đây nếu không tìm thấy shipping với orderId tương ứng
        }


        public ShippingDTO patchUpdateShippingStatusById(Long id, ShippingStatus newStatus) {
            Shipping shipping = shippingRepository.findById(id).orElse(null);
            if (shipping != null) {
                shipping.setStatus(newStatus.name()); // Lấy tên của Enum làm giá trị trạng thái cho Shipping
                Shipping updatedShipping = shippingRepository.save(shipping);
                if (shipping.getOrder() != null) {
                    Orders order = shipping.getOrder();
                    order.setShipStatus(newStatus.name()); // Lấy tên của Enum làm giá trị trạng thái vận chuyển cho đơn hàng
                    ordersRepository.save(order);
                }
                return modelMapper.map(updatedShipping, ShippingDTO.class);
            }
            return null; // hoặc có thể ném ra một Exception phù hợp ở đây nếu không tìm thấy shipping với id tương ứng
        }

        //////////////////////////////// STATUS
        public List<ShippingDTO> getShippingsByStatus(ShippingStatus status) {
            List<Shipping> shippings = shippingRepository.findByStatus(status.name());
            List<ShippingDTO> shippingDTOs = new ArrayList<>();

            for (Shipping shipping : shippings) {
                shippingDTOs.add(modelMapper.map(shipping, ShippingDTO.class));
            }

            return shippingDTOs;
        }

        public List<ShippingDTO> getShippingsByNotConfirmedStatus() {
            return getShippingsByStatus(ShippingStatus.NOT_CONFIRM);
        }

        public List<ShippingDTO> getShippingsByConfirmedStatus() {
            return getShippingsByStatus(ShippingStatus.CONFIRMED);
        }

        public List<ShippingDTO> getShippingsByDeliveringStatus() {
            return getShippingsByStatus(ShippingStatus.DELIVERING);
        }

        public List<ShippingDTO> getShippingsByDeliveredStatus() {
            return getShippingsByStatus(ShippingStatus.DELIVERED);
        }

    }


