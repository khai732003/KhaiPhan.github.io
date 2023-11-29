package com.swp.cageshop.service.marketingsService;

import com.swp.cageshop.DTO.MarketingDTO;
import com.swp.cageshop.DTO.RoleDTO;
import com.swp.cageshop.entity.Marketings;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.repository.MarketingsRepository;
import com.swp.cageshop.repository.RolesRepository;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MarketingsServiceImpl implements IMarketingsService {

  @Autowired
  private MarketingsRepository marketingsRepository;

  @Autowired
  private ModelMapper modelMapper;


  @Override
  public Optional<MarketingDTO> listMaById(Long id) {
    Optional<Marketings> marketingOptional = marketingsRepository.findById(id);

    if (marketingOptional.isPresent()) {
      Marketings marketing = marketingOptional.get();
      MarketingDTO marketingDTO = modelMapper.map(marketing, MarketingDTO.class);
      return Optional.of(marketingDTO);
    }

    return Optional.empty();
  }
  @Override
  public MarketingDTO addMa(MarketingDTO dto) {
      Marketings marketings = modelMapper.map(dto, Marketings.class);

      Marketings saved = marketingsRepository.save(marketings);

      MarketingDTO savedDTO = modelMapper.map(saved, MarketingDTO.class);

      return savedDTO;
  }

  @Override
  public ResponseEntity<String> deleteMaById(Long id) {
    try {
      marketingsRepository.deleteById(id);
      return ResponseEntity.status(HttpStatus.OK).body("Đã xóa.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xóa không thành công.");
    }
  }

  public List<Marketings> listAll(){
    return marketingsRepository.findAll();
  }


}
