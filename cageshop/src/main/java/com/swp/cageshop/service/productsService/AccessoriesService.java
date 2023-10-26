package com.swp.cageshop.service.productsService;

import com.swp.cageshop.entity.Accessories;
import com.swp.cageshop.repository.AccessoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class AccessoriesService implements IAccessoriesService{

    @Autowired
    private AccessoriesRepository accessoryRepository;

    public List<Accessories> getAllAccessories() {
        return accessoryRepository.findAll();
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

