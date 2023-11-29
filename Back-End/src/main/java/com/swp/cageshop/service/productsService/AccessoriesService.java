package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.entity.Accessories;
import com.swp.cageshop.repository.AccessoriesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccessoriesService implements IAccessoriesService {

    @Autowired
    private AccessoriesRepository accessoryRepository;

    public List<AccessoryDTO> getAllAccessories() {
        List<Accessories> accessories = accessoryRepository.findAll();
        ModelMapper modelMapper = new ModelMapper();

        return accessories.stream()
                .map(accessory -> modelMapper.map(accessory, AccessoryDTO.class))
                .collect(Collectors.toList());
    }

    public List<AccessoryDTO> getAccessoriesWithNullProductId() {
        ModelMapper modelMapper = new ModelMapper();
        List<Accessories> accessoriesWithNullProductId = accessoryRepository.findAccessoriesByCustomProductTrue();
        return accessoriesWithNullProductId
                .stream()
                .map(accessory -> modelMapper.map(accessory, AccessoryDTO.class))
                .collect(Collectors.toList());
    }



    public Optional<Accessories> getAccessoryById(Long id) {
        return accessoryRepository.findById(id);
    }

    public AccessoryDTO addAccessories(AccessoryDTO accessoryDTO) {
        if (accessoryDTO != null) {
            ModelMapper modelMapper = new ModelMapper();
            Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
            accessory.setCustomProduct(true);
            Accessories savedAccessory = accessoryRepository.save(accessory);
            return modelMapper.map(savedAccessory, AccessoryDTO.class);
        }
        return null;
    }


    public void deleteAccessory(Long id) {
        accessoryRepository.deleteById(id);
    }

    public Accessories updateAccessory(Long id, Accessories accessory) {
        accessory.setId(id);
        return accessoryRepository.save(accessory);
    }
}

