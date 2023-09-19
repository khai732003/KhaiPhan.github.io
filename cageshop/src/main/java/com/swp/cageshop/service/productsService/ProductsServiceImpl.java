package com.swp.cageshop.service.productsService;

import com.swp.cageshop.entity.Products;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProductsServiceImpl implements IProductsService{

  @Override
  public Products addProducts(Products products) {
    return null;
  }

  @Override
  public Products updateProducts(Products products) {
    return null;
  }

  @Override
  public boolean deleteProducts(long id) {
    return false;
  }

  @Override
  public List<Products> listAllProducts() {
    return null;
  }

  @Override
  public List<Products> listProducts(String key) {
    return null;
  }
}
