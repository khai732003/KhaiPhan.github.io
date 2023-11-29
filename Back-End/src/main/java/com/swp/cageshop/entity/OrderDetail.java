  package com.swp.cageshop.entity;


  import com.fasterxml.jackson.annotation.JsonIgnore;
  import com.swp.cageshop.DTO.DTOBase;
  import jakarta.persistence.*;
  import lombok.AllArgsConstructor;
  import lombok.Data;
  import lombok.NoArgsConstructor;

  import java.util.List;

@Entity
@Table(name = "Order_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail extends EntityBase {
      @Column
       private String name;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double totalOfProd;

    @Column(nullable = false)
    private double totalCost;

  @Column(nullable = false)
  private String note;

  // Mối quan hệ ManyToOne với Order
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private Orders order;

  // One-to-One với Product
  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Products product;


  @Column
  private String status;

  @Lob
  @Column
  private String productImage;


  @PrePersist
  public void Status(){
    this.status = "Processing";
  }


  }


