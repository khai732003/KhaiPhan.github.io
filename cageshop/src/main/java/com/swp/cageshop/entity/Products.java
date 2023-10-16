package com.swp.cageshop.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Products extends EntityBase {

  @Column(nullable = false, length = 50)
  private String name;

  @Column(nullable = true, length=6)
  private String code;

  @Column(nullable = false)
  private String productImage;


  @ElementCollection
  @CollectionTable(name = "product_detail_images", joinColumns = @JoinColumn(name = "product_id"))
  @Column(name = "image_url")
  private List<String> productDetailImage;
  @Column(nullable = false,length = 10)
  private int stock;


  @Column(nullable = false,length = 10)
  private double totalPrice;

// -------------------------------------------------

  // 1: cage 2: accessory

  // 1: arrived soon  2: already   3: out of stock
  @Column(nullable = false)
  private String status;

  @Column(nullable = true)
  private String orderLevel;


// -------------------------------------------------

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = true)
  private Categories category;

  // 1:N voi Comments
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Comments> comments;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Feedbacks> feedbacks;


  @OneToOne(mappedBy = "product", cascade = CascadeType.MERGE)
  private OrderDetail orderDetail;


  @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
  private BirdCages cage;


  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Accessories> accessories;
}



//  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
//  private List<Ratings> ratings;

//
//  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
//  private List<Ratings> ratings;
//  // N:1 voi User
//  @ManyToOne
//  @JoinColumn(name = "user_id", nullable = false)
//  private Users user;


//N:1 voi Category


//  // Mối quan hệ Many-to-Many với Cart
//  @ManyToMany(mappedBy = "products")

//  private List<Carts> carts;


//  private List<Carts> carts;
// @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
// private OrderDetail  orderDetail;