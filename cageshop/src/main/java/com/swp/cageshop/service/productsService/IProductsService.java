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

  public List<ProductDTO> findProductsWithoutCage();

  public List<ProductDTO> findProductsWithAccessories();

  public List<ProductDTO> findProductsWithoutAccessories();

  public List<ProductDTO> getProductsOutOfStock();

  public List<ProductDTO> getProductsByStatusAvailable();

  public List<ProductDTO> getProductsStatusNoMoreMade();

  public List<ProductDTO> getProductsByStatusNew();

  public List<ProductDTO> getProductsByReleaseDateRange(String startDate, String endDate);
  public List<ProductDTO> getProductsByPriceRange(double minPrice, double maxPrice);

  public List<ProductDTO> searchProductsByKeyword(String keyword);
  public List<ProductDTO> getProductsWithLimitedStock(int maxStock);

  public List<ProductDTO> getProductsSortedBy(String sortBy);

  public List<ProductDTO> getProductsByMaterial(String material);
  public List<ProductDTO> getProductsBySize(String size);

  public ProductDTO addAccessoriesToProduct(Long productId, List<AccessoryDTO> accessories);
//  public List<ProductDTO> getProductsByType(String type);

  public List<AccessoryDTO> getProductAccessories(Long productId);
  public boolean moveProductToOrderDetail(Long orderId, Long productId);





//  public ProductDTO addProductWithBirdCage(ProductDTO productDTO, BirdCageDTO birdCageDTO);
//  public ProductDTO addProductWithAccessories(ProductDTO productDTO, List<AccessoryDTO> accessories);
//  public ProductDTO addProductWithAccessories(ProductDTO mainProduct, List<ProductDTO> accessories, Long categoryId);
}
