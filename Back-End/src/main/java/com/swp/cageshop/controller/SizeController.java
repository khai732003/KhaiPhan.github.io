package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.SizeDTO;
import com.swp.cageshop.entity.Sizes;
import com.swp.cageshop.service.productsService.NewCage.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api/sizes")
public class SizeController {

    @Autowired
    private ISizeService sizeService;

    @GetMapping("/list")
    public List<SizeDTO> getAllSizes() {
        return sizeService.getAllSizes();
    }

    @PostMapping("/add")
    public SizeDTO createSize(@RequestBody SizeDTO sizeDTO) {
        return sizeService.createSize(sizeDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sizes> getSizeById(@PathVariable Long id) {
        Optional<Sizes> size = sizeService.getSizeById(id);
        return size.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public SizeDTO updateSize(@PathVariable Long id, @RequestBody SizeDTO sizeDTO) {
        return sizeService.updateSize(id, sizeDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSize(@PathVariable long id) {
        boolean deleted = sizeService.deleteSize(id);
        if (deleted) {
            return ResponseEntity.ok("Size deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete Size.");
        }
    }
}
