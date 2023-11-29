package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.entity.Accessories;
import com.swp.cageshop.repository.AccessoriesRepository;
import com.swp.cageshop.service.productsService.AccessoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api")
public class AccessoriesController {

    @Autowired
    private AccessoriesService accessoryService;

    @GetMapping("/accessories/list")
    public List<AccessoryDTO> getAllAccessories() {
        return accessoryService.getAllAccessories();
    }

    @GetMapping("/accessories/newaccessories")
    public List<AccessoryDTO> getAccessoriesWithNullProductId() {
        return accessoryService.getAccessoriesWithNullProductId();
    }
    @PostMapping("/accessories/addaccessories")
    public AccessoryDTO createAccessory(@RequestBody AccessoryDTO accessory) {
        return accessoryService.addAccessories(accessory);
    }

    @GetMapping("/accessories/{id}")
    public ResponseEntity<Accessories> getAccessoryById(@PathVariable Long id) {
        Optional<Accessories> accessory = accessoryService.getAccessoryById(id);
        return accessory.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }




    @PutMapping("/{id}")
    public Accessories updateAccessory(@PathVariable Long id, @RequestBody Accessories accessory) {
        return accessoryService.updateAccessory(id, accessory);
    }

    @DeleteMapping("/{id}")
    public void deleteAccessory(@PathVariable Long id) {
        accessoryService.deleteAccessory(id);
    }
}