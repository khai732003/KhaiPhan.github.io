package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.DTO.BirdCageDTO;
import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;
import java.util.List;

public interface IProductsService {
  public ProductDTO addProduct(ProductDTO productDTO);

  public ProductDTO updateProduct(long id, ProductDTO productDTO);

  public boolean deleteProduct(long id);

  public List<ProductDTO>listAllProducts();

  public ProductDTO listProducts(long id);

  public List<ProductDTO> getProductsByCategory(Long categoryId);


  public ProductDTO addProductWithBirdCage(ProductDTO productDTO, BirdCageDTO birdCageDTO);
  public ProductDTO addProductBirdcagewithAccessories(ProductDTO mainProductDTO, List<AccessoryDTO> accessoryDTOs);
//  public ProductDTO addProductWithAccessories(ProductDTO mainProduct, List<ProductDTO> accessories, Long categoryId);
}
