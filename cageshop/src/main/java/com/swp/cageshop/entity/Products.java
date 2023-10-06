package com.swp.cageshop.entity;
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

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String code;

  @Column(nullable = false)
  private String productImage;

  @ElementCollection
  @CollectionTable(name = "product_detail_images", joinColumns = @JoinColumn(name = "product_id"))
  @Column(name = "image_url")
  private List<String> productDetailImage;
  @Column(nullable = false)
  private int stock;


  @Column(nullable = false)
  private double totalPrice;

// -------------------------------------------------

  // 1: cage 2: accessory

  // 1: arrived soon  2: already   3: out of stock
  @Column(nullable = false)
  private String status;


// -------------------------------------------------

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Categories category;

  // 1:N voi Comments
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Comments> comments;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Feedbacks> feedbacks;


//  private List<Carts> carts;
// @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
// private OrderDetail  orderDetail;

 @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
 private List<OrderDetail>  orderDetails;


//  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
//  private List<Ratings> ratings;
  @OneToOne
  @JoinColumn(name = "product_id", referencedColumnName = "id") // Thay thế "id" bằng tên cột khóa chính trong Products entity
  private OrderDetail orderDetail;


//
//  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
//  private List<Ratings> ratings;


  @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
  private BirdCages cage;


  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Accessories> accessories;
}

//  // N:1 voi User
//  @ManyToOne
//  @JoinColumn(name = "user_id", nullable = false)
//  private Users user;


//N:1 voi Category


//  // Mối quan hệ Many-to-Many với Cart
//  @ManyToMany(mappedBy = "products")

//  private List<Carts> carts;
