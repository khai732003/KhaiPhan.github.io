package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.entity.Accessories;
import com.swp.cageshop.repository.AccessoriesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class AccessoriesService implements IAccessoriesService{

    @Autowired
    private AccessoriesRepository accessoryRepository;

    public List<AccessoryDTO> getAllAccessories() {
        List<Accessories> accessories = accessoryRepository.findAll(); // Điều chỉnh tên phương thức và tên biến tùy thuộc vào tên thực tế của bạn
        ModelMapper modelMapper = new ModelMapper(); // Tạo một đối tượng ModelMapper nếu bạn chưa có nó

        return accessories.stream()
                .map(accessory -> modelMapper.map(accessory, AccessoryDTO.class))
                .collect(Collectors.toList());
    }


    public Optional<Accessories> getAccessoryById(Long id) {
        return accessoryRepository.findById(id);
    }

    public Accessories createAccessory(Accessories accessory) {
        return accessoryRepository.save(accessory);
    }

    public void deleteAccessory(Long id) {
        accessoryRepository.deleteById(id);
    }

    public Accessories updateAccessory(Long id, Accessories accessory) {
        accessory.setId(id);
        return accessoryRepository.save(accessory);
    }
}

