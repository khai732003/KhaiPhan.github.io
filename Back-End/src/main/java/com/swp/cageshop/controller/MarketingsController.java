package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.MarketingDTO;
import com.swp.cageshop.entity.Marketings;
import com.swp.cageshop.service.marketingsService.IMarketingsService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api")
public class MarketingsController {

  @Autowired
  private IMarketingsService iMarketingsService;


  @PostMapping("/marketing/add")
  public MarketingDTO addMa(@RequestBody MarketingDTO dto){
    return iMarketingsService.addMa(dto);
  }

  @DeleteMapping("/marketing/delete/{id}")
  public ResponseEntity<?> deleteById(@PathVariable Long id){
    return iMarketingsService.deleteMaById(id);
  }

  @GetMapping("/marketing/list")
  public List<Marketings> listAll(){
    return iMarketingsService.listAll();
  }


  @GetMapping("/marketing/list/{id}")
  public Optional<MarketingDTO> listById(@PathVariable Long id){
    return iMarketingsService.listMaById(id);
  }
}
