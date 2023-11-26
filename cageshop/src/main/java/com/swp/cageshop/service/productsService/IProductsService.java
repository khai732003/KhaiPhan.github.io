package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Products;

import java.util.List;
import java.util.Optional;

public interface IProductsService {
  public List<Products> listByOrderId(Long orderId);
  public List<ProductDTO> getTop3NewestProductDTOs();
  public void deleteAll();
  public ProductDTO addProduct(ProductDTO productDTO);

  public ProductDTO updateProduct(long id, ProductDTO productDTO);

  public boolean deleteProduct(long id);

  public ProductDTO setProductToSellAgain(Long productId);

  public List<Products> listAllProducts();

  public Optional<Products> listProducts(long id);

  public List<ProductDTO> getProductsByCategory(Long categoryId);

  public List<ProductDTO> findProductsWithoutCage();

  public List<ProductDTO> findProductsWithAccessories();

  public List<ProductDTO> findProductsWithoutAccessories();

  public List<ProductDTO> getProductsOutOfStock();

  public List<ProductDTO> getProductsStatusCustomProduct();

  public List<ProductDTO> getProductsByStatusAvailable();

  public List<ProductDTO> getProductsStatusNoMoreMade();

  public List<ProductDTO> getProductsByStatusNew();

  public List<ProductDTO> getProductsByReleaseDateRange(String startDate, String endDate);

  public List<ProductDTO> getProductsSortedByCreateDateASC ();

  public List<Products> getProductsSortedByCreateDateDESC ();
  public List<ProductDTO> getProductsByPriceRange(double minPrice, double maxPrice);

  public List<ProductDTO> searchProductsByKeyword(String keyword);
  public List<ProductDTO> getProductsWithLimitedStock(int maxStock);

  public List<ProductDTO> getProductsSortedBy(String sortBy);

  public List<ProductDTO> getProductsByMaterial(String material);
  public List<ProductDTO> getProductsBySize(String size);

  public ProductDTO addAccessoriesToProduct(Long productId, List<AccessoryDTO> accessories);
//  public List<ProductDTO> getProductsByType(String type);

  public List<ProductDTO> productsWithCageWithAccessories();


  public List<ProductDTO> getProductsByAccessoriesType(String accessoryType);

  public List<ProductDTO> getProductsByTotalPriceAsc();

  public List<ProductDTO> getProductsByTotalPriceDesc();

  public List<AccessoryDTO> getProductAccessories(Long productId);

  public void updateProductStock(Orders order);

  ProductDTO cloneAndAddAccessories(Long productId, List<AccessoryDTO> accessories);
//  public boolean moveProductToOrderDetail(Long orderId, Long productId);


}
