package com.swp.cageshop.service.productsService;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;
import java.util.List;

import com.swp.cageshop.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsServiceImpl implements IProductsService{

  @Autowired
  private ProductsRepository productsRepository;
  @Override
  public Products addProducts(Products products) {
    if (products != null) {
      return productsRepository.save(products);
    }
    return null;
  }

  @Override
  public Products updateProducts(long id, Products products) {
    if (products != null) {
      Products existingProduct = productsRepository.getReferenceById(id);
      if (existingProduct != null) {

        existingProduct.setName(products.getName());
        existingProduct.setCode(products.getCode());
        existingProduct.setDescription(products.getDescription());
        existingProduct.setSize(products.getSize());
        existingProduct.setMaterial(products.getMaterial());
        existingProduct.setImage(products.getImage());
        existingProduct.setStatus(products.getStatus());

        return productsRepository.save(existingProduct);
      }
    }
    return null;
  }



  @Override
  public boolean deleteProducts(long id) {
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
  public List<Products> listAllProducts() {
    return productsRepository.findAll();
  }

  @Override
  public Products listProducts(long id) {
    return productsRepository.getReferenceById(id);
  }

  @Override
  public List<Products> getProductsByCategory(Categories categoryName) {
    return productsRepository.findByCategory(categoryName);
  }
}
