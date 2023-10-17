package com.swp.cageshop.service.productsService;

import com.swp.cageshop.entity.BirdCages;
import com.swp.cageshop.repository.BirdCagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BirdCagesService implements IBirdCagesService {
    @Autowired
    private BirdCagesRepository birdCagesRepository;


    public BirdCages getBirdCageByProductId(Long productId) {
        return birdCagesRepository.findByProduct_Id(productId);
    }



}
