package com.swp.cageshop.entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import java.util.Date;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
  private String material;

  @Column(nullable = false)
  private String size;

  @Column(nullable = false)
  private String image;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String type;

  //N:1 voi Category
  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Categories category;

  // 1:N voi Comments
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Comments> comments;


  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
<<<<<<< HEAD
  private List<Feedbacks> feedbacks;



//  // Mối quan hệ Many-to-Many với Cart
//  @ManyToMany(mappedBy = "products")
//  private List<Carts> carts;
=======
  private List<OrderDetail> orderDetails;
>>>>>>> 41d88712177ff5d68a79e7e142f6426dfdab4c68


  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<Ratings> ratings;






}

