package com.swp.cageshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "Shipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromCompany;
    private String fromStreet1;
    private String fromStreet2;
    private String fromCity;
    private String fromState;
    private String fromCountry;
    private String fromZip;
    private String fromPhone;

    private String toName;
    private String toStreet1;
    private String toCity;
    private String toState;
    private String toCountry;
    private String toZip;
    private String toPhone;

    private double weight;
    private double height;
    private double width;
    private double length;
}
