package com.swp.cageshop.entity;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import java.util.Date;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "Products")
@Data
public class Products {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Temporal(TemporalType.TIMESTAMP)
  private Date date;

  @Column(nullable = false)
  private double price;

  @Column(nullable = false)
  private String image;

  @Column(nullable = false)
  private String title;

  // N:1 voi User
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  //N:1 voi Category
  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Categories category;

  // 1:N voi Feedback
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Feedbacks> feedbacks;

//  // Mối quan hệ Many-to-Many với Cart
//  @ManyToMany(mappedBy = "products")
//  private List<Carts> carts;
}

