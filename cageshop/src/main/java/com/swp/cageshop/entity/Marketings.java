package com.swp.cageshop.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Marketings")
@Data
public class Marketings extends EntityBase{

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




}

