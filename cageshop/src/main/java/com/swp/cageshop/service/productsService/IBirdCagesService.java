package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.BirdCageDTO;
import com.swp.cageshop.entity.BirdCages;

public interface IBirdCagesService {
    public BirdCages getBirdCageByProductId(Long productId);

    public BirdCageDTO createBirdCageWithMaterialAndSize(BirdCageDTO birdCageDTO, Long materialID, Long sizeID);
}
