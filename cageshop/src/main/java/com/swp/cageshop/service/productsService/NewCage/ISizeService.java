package com.swp.cageshop.service.productsService.NewCage;

import com.swp.cageshop.DTO.SizeDTO;
import com.swp.cageshop.entity.Sizes;

import java.util.List;
import java.util.Optional;

public interface ISizeService  {
    public List<SizeDTO> getAllSizes();

    public Optional<Sizes> getSizeById(Long id);

    public SizeDTO createSize(SizeDTO sizeDTO);

    public SizeDTO updateSize(Long id, SizeDTO sizeDTO);

    public boolean deleteSize(Long id);
}
