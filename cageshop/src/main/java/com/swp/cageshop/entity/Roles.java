package com.swp.cageshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Roles extends EntityBase{

  @Column(nullable = false, unique = true)
  private String name;

  // 1:N với User
//  @JsonIgnore //ngăn chặn stackoverflow
//  @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
//  private List<Users> users;

}
