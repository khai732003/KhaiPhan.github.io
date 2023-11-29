package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.BirdCageDTO;
import com.swp.cageshop.DTO.MaterialDTO;
import com.swp.cageshop.DTO.SizeDTO;
import com.swp.cageshop.entity.BirdCages;
import com.swp.cageshop.entity.Materials;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.entity.Sizes;
import com.swp.cageshop.repository.BirdCagesRepository;
import com.swp.cageshop.repository.MaterialRepository;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.repository.SizeRepository;
import com.swp.cageshop.service.productsService.NewCage.IMaterialService;
import com.swp.cageshop.service.productsService.NewCage.ISizeService;
import com.swp.cageshop.service.productsService.NewCage.MaterialService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BirdCagesService implements IBirdCagesService {
    @Autowired
    private BirdCagesRepository birdCagesRepository;
    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private MaterialRepository materialsRepository;

    @Autowired
    private SizeRepository sizesRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IMaterialService materialService;

    @Autowired
    private ISizeService sizeService;


    public BirdCages getBirdCageByProductId(Long productId) {
        return birdCagesRepository.findByProduct_Id(productId);
    }

    public BirdCageDTO createBirdCageWithMaterialAndSize(BirdCageDTO birdCageDTO, Long materialID, Long sizeID) {
//        // Fetch MaterialDTO and SizeDTO based on the provided IDs
//        Optional<Materials> materialOptional = materialService.getMaterialById(materialID);
//        Optional<Sizes> sizeOptional = sizeService.getSizeById(sizeID);
//
//        if (materialOptional.isPresent() && sizeOptional.isPresent()) {
//            MaterialDTO materialDTO = modelMapper.map(materialOptional, MaterialDTO.class);
//            SizeDTO sizeDTO = modelMapper.map(sizeOptional, SizeDTO.class);
//
//            // Set the mapped MaterialDTO and SizeDTO to the BirdCageDTO
//            birdCageDTO.setMaterial(materialDTO);
//            birdCageDTO.setSize(sizeDTO);
//
//            // Assuming birdCageDTO.getPrice() calculates the price based on MaterialDTO and SizeDTO
//            double totalPrice = birdCageDTO.getBirdCagePrice();
//
//
//            // Save or persist the BirdCageDTO using your repository or service
//            // For example:
//            // birdCageRepository.save(birdCageDTO);
//            // Or, if you have a service method to create a bird cage:
//            // return birdCageRepository.createBirdCage(birdCageDTO);
//            BirdCages birdCageEntity = modelMapper.map(birdCageDTO, BirdCages.class);
//
//            // Save the BirdCage entity using the repository
//            birdCagesRepository.save(birdCageEntity);
//
//            // If needed, you can map the saved entity back to a DTO and return it
//            BirdCageDTO savedBirdCageDTO = modelMapper.map(birdCageEntity, BirdCageDTO.class);
//            return savedBirdCageDTO;
//        } else {
//            // Handle the case where either MaterialDTO or SizeDTO is not present
//            // You might want to throw an exception, log a message, or handle it based on your requirements
//            // For simplicity, returning null here, but consider a better error-handling strategy
//            return null;
//        }
        return  null;
    }


}
