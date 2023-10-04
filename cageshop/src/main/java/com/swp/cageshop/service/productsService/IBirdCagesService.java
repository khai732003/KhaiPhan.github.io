package com.swp.cageshop.service.productsService;

import com.swp.cageshop.entity.BirdCages;

public interface IBirdCagesService {
    public BirdCages getBirdCageByProductId(Long productId);
}
