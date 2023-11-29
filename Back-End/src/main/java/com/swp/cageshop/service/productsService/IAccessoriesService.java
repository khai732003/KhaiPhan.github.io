package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.entity.Accessories;

import java.util.List;
import java.util.Optional;

public interface IAccessoriesService {
    public List<AccessoryDTO> getAllAccessories();
    public Optional<Accessories> getAccessoryById(Long id);

    public AccessoryDTO addAccessories(AccessoryDTO accessoryDTO);

    public void deleteAccessory(Long id);

    public Accessories updateAccessory(Long id, Accessories accessory);
}
