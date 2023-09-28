package com.swp.cageshop.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;


@Entity
@Table(name = "Feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedbacks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;


    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "feedback_date", nullable = false)
    private Date date;

    // N:1 voi user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products product;
}

