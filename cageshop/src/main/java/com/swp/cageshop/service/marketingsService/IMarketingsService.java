package com.swp.cageshop.service.marketingsService;

import com.swp.cageshop.DTO.MarketingDTO;
import com.swp.cageshop.entity.Marketings;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface IMarketingsService {
  public MarketingDTO addMa(MarketingDTO dto);

  public ResponseEntity<String> deleteMaById(Long id);

  public List<Marketings> listAll();
}
