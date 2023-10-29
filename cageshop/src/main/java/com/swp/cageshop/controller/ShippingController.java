package com.swp.cageshop.controller;

import com.easypost.model.Shipment;
import com.easypost.service.EasyPostClient;
import com.swp.cageshop.DTO.ShippingDTO;
import com.swp.cageshop.service.shipService.IShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.easypost.EasyPost;
import com.easypost.exception.EasyPostException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cageshop/api/shipping")
public class ShippingController {

    @Value("${EASYPOST_API_KEY}")
    private String apiKey;

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
    public ResponseEntity<?> updateShippingStatusByOrderId(@PathVariable("orderId") Long orderId, @RequestParam String newStatus) {
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


//    @GetMapping("/create-address")
//    public void createAddress() throws EasyPostException{
//        EasyPostClient client = new EasyPostClient(System.getenv("EZAKba6d37fe386947248ffc969110303bc1pcBx4jZZaLE0TX82KyXPhQ"));
//        Map<String, Object> fromAddressMap = new HashMap<String, Object>();
//        fromAddressMap.put("company", "EasyPost");
//        fromAddressMap.put("street1", "417 MONTGOMERY ST");
//        fromAddressMap.put("street2", "FLOOR 5");
//        fromAddressMap.put("city", "SAN FRANCISCO");
//        fromAddressMap.put("state", "CA");
//        fromAddressMap.put("country", "US");
//        fromAddressMap.put("zip", "94104");
//        fromAddressMap.put("phone", "415-123-4567");
//
//        Map<String, Object> toAddressMap = new HashMap<String, Object>();
//        toAddressMap.put("name", "Dr. Steve Brule");
//        toAddressMap.put("street1", "179 N Harbor Dr");
//        toAddressMap.put("city", "Redondo Beach");
//        toAddressMap.put("state", "CA");
//        toAddressMap.put("country", "US");
//        toAddressMap.put("zip", "90277");
//        toAddressMap.put("phone", "310-808-5243");
//
//        Map<String, Object> parcelMap = new HashMap<String, Object>();
//        parcelMap.put("weight", 22.9);
//        parcelMap.put("height", 12.1);
//        parcelMap.put("width", 8);
//        parcelMap.put("length", 19.8);
//
//        Map<String, Object> shipmentMap = new HashMap<String, Object>();
//        shipmentMap.put("from_address", fromAddressMap);
//        shipmentMap.put("to_address", toAddressMap);
//        shipmentMap.put("parcel", parcelMap);
//
//        Shipment shipment = client.shipment.create(shipmentMap);
//
////        Shipment boughtShipment = client.shipment.buy(shipment.lowestRate(), shipment.getId());
//        System.out.println(shipment.prettyPrint());
//    }

}

