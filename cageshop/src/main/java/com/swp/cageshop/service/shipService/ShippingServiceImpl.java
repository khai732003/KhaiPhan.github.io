package com.swp.cageshop.service.shipService;

import com.swp.cageshop.DTO.ShippingDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Shipping;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.ShippingRepository;
import com.swp.cageshop.service.ordersService.IOrdersService;
import com.swp.cageshop.service.productsService.IProductsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        private IOrdersService iOrdersService;

        public ShippingDTO createShipping(ShippingDTO shippingDTO) {
            Orders orders = ordersRepository.getReferenceById(shippingDTO.getOrderId());
            if(orders != null) {
                shippingDTO.setAddress(orders.getAddress());
                shippingDTO.setCity(orders.getCity());
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

        public ShippingDTO updateShippingStatusByOrderId(Long orderId, String newStatus) {
            Shipping shipping = shippingRepository.findByOrderId(orderId);
            if (shipping != null) {
                shipping.setStatus(newStatus);
                Shipping updatedShipping = shippingRepository.save(shipping);
                Orders orders = ordersRepository.getReferenceById(orderId);
                iOrdersService.updateOrderAndOrderDetails(orders);
                return modelMapper.map(updatedShipping, ShippingDTO.class);
            }
            return null; // hoặc có thể ném ra một Exception phù hợp ở đây nếu không tìm thấy shipping với orderId tương ứng
        }
    }


