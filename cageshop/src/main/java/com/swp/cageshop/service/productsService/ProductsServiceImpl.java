package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.DTO.BirdCageDTO;
import com.swp.cageshop.DTO.CategoryDTO;
import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.entity.BirdCages;
import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.swp.cageshop.repository.BirdCagesRepository;
import com.swp.cageshop.repository.CategoriesRepository;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.service.categoriesService.ICategoriesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsServiceImpl implements IProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private ICategoriesService categoriesService;
    @Autowired
    private BirdCagesRepository birdCageRepository;


    @Autowired
    private ModelMapper modelMapper;

//  @Override
//  public Products addProducts(Products products) {
//    if (products != null) {
//      return productsRepository.save(products);
//    }
//    return null;
//  }
//
//  @Override
//  public Products updateProducts(long id, Products products) {
//    if (products != null) {
//      Products existingProduct = productsRepository.getReferenceById(id);
//      if (existingProduct != null) {
//
//        existingProduct.setName(products.getName());
//        existingProduct.setCode(products.getCode());
//        existingProduct.setDescription(products.getDescription());
//        existingProduct.setSize(products.getSize());
//        existingProduct.setMaterial(products.getMaterial());
//        existingProduct.setImage(products.getImage());
//        existingProduct.setStatus(products.getStatus());
//
//        return productsRepository.save(existingProduct);
//      }
//    }
//    return null;
//  }
//
//
//
//  @Override
//  public boolean deleteProducts(long id) {
//    if (id >= 1) {
//      Products product = productsRepository.getReferenceById(id);
//      if (product != null) {
//        productsRepository.delete(product);
//        return true;
//      }
//    }
//    return false;
//  }


    public ProductDTO addProduct(ProductDTO productDTO) {
        if (productDTO != null) {
            Products product = modelMapper.map(productDTO, Products.class);
            // Set the category for the product
            Categories category = categoriesRepository.findById(productDTO.getCategoryId()).orElse(null);
            if (category != null) {
                product.setCategory(category);
                Products savedProduct = productsRepository.save(product);
                ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);
                return savedProductDTO;
            }
        }
        return null;
    }


    @Override
    public ProductDTO updateProduct(long id, ProductDTO productDTO) {
        if (productDTO != null) {
            Optional<Products> optionalExistingProduct = productsRepository.findById(id);
            if (optionalExistingProduct.isPresent()) {
                Products existingProduct = optionalExistingProduct.get();

                // Update fields as needed
                existingProduct.setName(productDTO.getName());
                existingProduct.setCode(productDTO.getCode());
                existingProduct.setProductImage(productDTO.getProductImage());
                existingProduct.setProductDetailImage(productDTO.getProductDetailImage());
                existingProduct.setStock(productDTO.getStock());
                existingProduct.setTotalPrice(productDTO.getTotalPrice());
                existingProduct.setStatus(productDTO.getStatus());

                // Save the updated product
                Products updatedProduct = productsRepository.save(existingProduct);

                // Map the updated product to a DTO
                ProductDTO updatedProductDTO = modelMapper.map(updatedProduct, ProductDTO.class);
                return updatedProductDTO;
            }
        }
        return null; // Product not found or DTO is null
    }


    @Override
    public boolean deleteProduct(long id) {
        if (id >= 1) {
            Products product = productsRepository.getReferenceById(id);
            if (product != null) {
                productsRepository.delete(product);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<ProductDTO> listAllProducts() {
        List<Products> products = productsRepository.findAll();
        // Convert the list of Products to a list of ProductDTOs
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public ProductDTO listProducts(long id) {
        Products product = productsRepository.getReferenceById(id);
        if (product != null) {
            // Convert the Products entity to ProductDTO
            return modelMapper.map(product, ProductDTO.class);
        }
        return null;
    }

    @Override
    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        Categories category = categoriesRepository.findOneById(categoryId);
        if (category != null) {
            List<Products> products = productsRepository.findByCategory(category);
            return products.stream()
                    .map(product -> modelMapper.map(product, ProductDTO.class))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
///////////// addtoOrder

    public ProductDTO addProductBirdcagewithAccessories(ProductDTO mainProductDTO, List<AccessoryDTO> accessoryDTOs) {
        if (mainProductDTO != null) {
            // Create the main product entity
            Products mainProduct = modelMapper.map(mainProductDTO, Products.class);

            // Create a list to store accessory entities
            List<Products> accessories = new ArrayList<>();

            if (accessoryDTOs != null && !accessoryDTOs.isEmpty()) {
                for (AccessoryDTO accessoryDTO : accessoryDTOs) {
                    // Create each accessory entity
                    Products accessory = modelMapper.map(accessoryDTO, Products.class);

                    // Set the main product as the parent for each accessory
                    accessory.setCategory(mainProduct.getCategory());

                    // Add each accessory to the list
                    accessories.add(accessory);
                }
            }
////////////////////////////////////////////
            // Set the accessories for the main product
//            mainProduct.setAccessories(accessories)
////////////////////////////////////////////////////////////////////
            // Save the main product along with its accessories to the database
            mainProduct = productsRepository.save(mainProduct);

            // Map the saved main product with accessories back to DTO
            ProductDTO savedMainProductDTO = modelMapper.map(mainProduct, ProductDTO.class);

            return savedMainProductDTO;
        }
        return null; // mainProductDTO is null
    }


    public ProductDTO addProductWithBirdCage(ProductDTO productDTO, BirdCageDTO birdCageDTO) {
        if (productDTO != null && birdCageDTO != null) {

            Products product = modelMapper.map(productDTO, Products.class);
            Categories category = categoriesRepository.findById(productDTO.getCategoryId()).orElse(null);

            if (category != null) {
                product.setCategory(category);
                Products savedProduct = productsRepository.save(product);

                if (savedProduct != null) {
                    BirdCages birdCage = modelMapper.map(birdCageDTO, BirdCages.class);
                    birdCage.setProduct(savedProduct);
                    BirdCages savedBirdCage = birdCageRepository.save(birdCage);
                    savedProduct.setCage(savedBirdCage);
                    productsRepository.save(savedProduct);

                    ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);
                    return savedProductDTO;
                }
            }
        }
        return null;
    }


}


//    @Override
//    public ProductDTO addProductWithAccessories(ProductDTO mainProduct, List<ProductDTO> accessories, Long categoryId) {
//        if (mainProduct != null) {
//            // Check if the category exists
//            CategoryDTO category = categoriesService.getOneCategory(categoryId);
//            if (category == null) {
//                return null; // Category not found
//            }
//
//            // Set the category for the main product
//            mainProduct.setCategoryId(categoryId);
//
//            // Save the main product
//            Products mainProductEntity = modelMapper.map(mainProduct, Products.class);
//            mainProductEntity = productsRepository.save(mainProductEntity);
//
//            // Map the saved main product back to DTO
//            ProductDTO savedMainProductDTO = modelMapper.map(mainProductEntity, ProductDTO.class);
//
//            if (accessories != null && !accessories.isEmpty()) {
//                for (ProductDTO accessory : accessories) {
//                    // Set the same category for accessories
//                    accessory.setCategoryId(categoryId);
//
//                    // Save each accessory
//                    Products accessoryEntity = modelMapper.map(accessory, Products.class);
//                    accessoryEntity = productsRepository.save(accessoryEntity);
//
//                    // Map the saved accessory back to DTO
//                    ProductDTO savedAccessoryDTO = modelMapper.map(accessoryEntity, ProductDTO.class);
//
//                    // Add the accessory to the main product
//                    savedMainProductDTO.addAccessory(savedAccessoryDTO);
//                }
//            }
//
//            return savedMainProductDTO;
//        }
//        return null;
//    }





