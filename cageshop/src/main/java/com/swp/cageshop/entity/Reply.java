package com.swp.cageshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "Reply")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reply extends EntityBase{
    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name="feedback_id")
    private Feedback feedback;


}
