package com.swp.cageshop.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

import java.util.List;


@Entity
@Check(constraints = "rating >= 1 and rating <= 5")
@Table(name = "Feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback extends EntityBase{

    @Column(nullable = false)
    private int rating;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;

    // N:1 voi user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products product;

    @OneToMany(mappedBy = "feedback")
    private List<Reply> reply;

}
