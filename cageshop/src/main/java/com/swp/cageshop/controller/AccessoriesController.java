package com.swp.cageshop.controller;

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
@RequestMapping("/cageshop/api")
public class AccessoriesController {

    @Autowired
    private AccessoriesService accessoryService;

    @GetMapping("/accessories")
    public List<Accessories> getAllAccessories() {
        return accessoryService.getAllAccessories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accessories> getAccessoryById(@PathVariable Long id) {
        Optional<Accessories> accessory = accessoryService.getAccessoryById(id);
        return accessory.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public Accessories createAccessory(@RequestBody Accessories accessory) {
        return accessoryService.createAccessory(accessory);
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