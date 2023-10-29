package com.swp.cageshop.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Marketings")
@Data
public class Marketings extends EntityBase{

//  @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
//  private Long id;

  @Lob
  @Column(nullable = false)
  private String title;

  @Lob
  @Column(nullable = false)
  private String name;

  @Lob
  @Column(nullable = true)
  private String img;

  @Lob
  @Column(nullable = false)
  private String info;

  @Lob
  @Column(nullable = false)
  private String shortinfo;

//  @Column(nullable = false)
//  @Temporal(TemporalType.TIMESTAMP)
//  private Date date;

//  //N:1 với user
//  @ManyToOne(fetch = FetchType.LAZY)
//  @JoinColumn(name = "user_id", nullable = false)
//  private Users user;


}

