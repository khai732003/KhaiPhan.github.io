package com.swp.cageshop.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

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

  @Column(nullable = true)
  private String code;

  @Lob
  @Column(nullable = false)
  private String productImage;

  @Lob
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


  @Column(nullable = true)
  private Integer orderLevel;

  @Column(nullable = true)
  private String note;

  @Column(nullable = true)
  private double extraPrice;

// -------------------------------------------------

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = true)
  private Categories category;

  @JsonIgnore
  // 1:N voi Comments
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Comments> comments;

  @JsonIgnore
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Feedback> feedback;


  @JsonIgnore
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<OrderDetail> orderDetail;

  @Column(nullable = true)
  private Long motherProductId;

  @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
  private BirdCages cage;


  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Accessories> accessories;


}
