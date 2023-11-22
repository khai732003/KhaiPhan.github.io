package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Shapes;
import com.swp.cageshop.service.productsService.NewCage.IShapeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api/shapes")
public class ShapeController {
    @Autowired
    private IShapeService shapeService;




    @GetMapping("/list")
    public List<Shapes> getAllShapes() {
        return shapeService.getAllShapes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shapes> getShapeById(@PathVariable Long id) {
        Optional<Shapes> shape = shapeService.getShapeById(id);
        return shape.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<Shapes> createShape(@RequestBody Shapes shape) {
        Shapes createdShape = shapeService.createShape(shape);
        return new ResponseEntity<>(createdShape, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shapes> updateShape(@PathVariable Long id, @RequestBody Shapes updatedShape) {
        Shapes shape = shapeService.updateShape(id, updatedShape);
        return shape != null ?
                new ResponseEntity<>(shape, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteShape(@PathVariable long id) {
        boolean deleted = shapeService.deleteShape(id);
        if (deleted) {
            return ResponseEntity.ok("Shape deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete Shape.");
        }
    }
}