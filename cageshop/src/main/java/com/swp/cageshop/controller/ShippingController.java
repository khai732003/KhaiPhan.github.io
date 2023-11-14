package com.swp.cageshop.controller;


import com.swp.cageshop.DTO.ShippingDTO;
import com.swp.cageshop.config.ShippingStatus;
import com.swp.cageshop.entity.Shipping;
import com.swp.cageshop.service.shipService.IShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api/shipping")
public class ShippingController {


    @Autowired
    private IShippingService shippingService;

    @PostMapping("/add")
    public ResponseEntity<ShippingDTO> createShipping(@RequestBody ShippingDTO shippingDTO) {
        ShippingDTO createdShipping = shippingService.createShipping(shippingDTO);
        if (createdShipping != null) {
            return new ResponseEntity<>(createdShipping, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<ShippingDTO>> getAllShippings() {
        List<ShippingDTO> shippings = shippingService.getAllShippings();
        return new ResponseEntity<>(shippings, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ShippingDTO> getShippingById(@PathVariable Long id) {
        ShippingDTO shipping = shippingService.getShippingById(id);
        if (shipping != null) {
            return new ResponseEntity<>(shipping, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ShippingDTO> updateShipping(@RequestBody ShippingDTO shippingDTO) {
        ShippingDTO updatedShipping = shippingService.updateShipping(shippingDTO);
        if (updatedShipping != null) {
            return new ResponseEntity<>(updatedShipping, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/update/status/{orderId}")
    public ResponseEntity<?> updateShippingStatusByOrderId(@PathVariable("orderId") Long orderId, @RequestParam ShippingStatus newStatus) {
        ShippingDTO updatedShippingDTO = shippingService.updateShippingStatusByOrderId(orderId, newStatus);
        if (updatedShippingDTO != null) {
            return ResponseEntity.ok(updatedShippingDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteShipping(@PathVariable Long id) {
        shippingService.deleteShipping(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("get-all-by-status/not-confirmed")
    public List<ShippingDTO> getShippingsByNotConfirmedStatus() {
        return shippingService.getShippingsByNotConfirmedStatus();
    }

    @GetMapping("get-all-by-status/confirmed")
    public List<ShippingDTO> getShippingsByConfirmedStatus() {
        return shippingService.getShippingsByConfirmedStatus();
    }

    @GetMapping("get-all-by-status/delivering")
    public List<ShippingDTO> getShippingsByDeliveringStatus() {
        return shippingService.getShippingsByDeliveringStatus();
    }

    @GetMapping("get-all-by-status/delivered")
    public List<ShippingDTO> getShippingsByDeliveredStatus() {
        return shippingService.getShippingsByDeliveredStatus();
    }

}

