package com.swp.cageshop.service.productsService;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;
import java.util.List;

public interface IProductsService {
  public Products addProducts(Products products);

  public Products updateProducts(long id,Products products);

  public boolean deleteProducts(long id);

  public List<Products> listAllProducts();

  public Products listProducts(long id);

  List<Products> getProductsByCategory(Categories categoryName);
}
