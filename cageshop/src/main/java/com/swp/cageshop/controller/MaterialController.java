package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.MaterialDTO;
import com.swp.cageshop.entity.Materials;


import com.swp.cageshop.service.productsService.NewCage.IMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api/materials")
public class MaterialController {

    @Autowired
    private IMaterialService materialService;

    @GetMapping("/list")
    public List<MaterialDTO> getAllMaterials() {
        return materialService.getAllMaterials();
    }

    @PostMapping("/add")
    public MaterialDTO createMaterial(@RequestBody MaterialDTO materialDTO) {
        return materialService.createMaterial(materialDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materials> getMaterialById(@PathVariable Long id) {
        Optional<Materials> material = materialService.getMaterialById(id);
        return material.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public MaterialDTO updateMaterial(@PathVariable Long id, @RequestBody MaterialDTO materialDTO) {
        return materialService.updateMaterial(id, materialDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMaterial(@PathVariable long id) {
        boolean deleted = materialService.deleteMaterial(id);
        if (deleted) {
            return ResponseEntity.ok("Material deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete Material.");
        }
    }
}
