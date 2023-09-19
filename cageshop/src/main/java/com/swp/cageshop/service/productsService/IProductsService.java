package com.swp.cageshop.service.productsService;

import com.swp.cageshop.entity.Products;
import java.util.List;

public interface IProductsService {
  public Products addProducts(Products products);

  public Products updateProducts(Products products);

  public boolean deleteProducts(long id);

  public List<Products> listAllProducts();

  public List<Products> listProducts(String key);
}
