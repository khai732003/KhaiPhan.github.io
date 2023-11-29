package com.swp.cageshop.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.AllArgsConstructor;
@Entity
@Table(name = "Categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Categories extends EntityBase{

  // For different chim
  @Column(nullable = false)
  private String name;

  //1:N voi Product
  @JsonIgnore
  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
  private List<Products> products;

  public void addProduct(Products product) {
    if (products == null) {
      products = new ArrayList<>();
    }
    products.add(product);
    product.setCategory(this);
  }

}
