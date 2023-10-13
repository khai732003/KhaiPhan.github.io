    package com.swp.cageshop.entity;


    import jakarta.persistence.*;
    import jakarta.persistence.Entity;
    import jakarta.persistence.JoinColumn;
    import jakarta.persistence.ManyToOne;
    import jakarta.transaction.Status;
    import jdk.jshell.Snippet;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;


    @Entity
    @Data
    @Table(name = "Pays")
    @AllArgsConstructor
    @NoArgsConstructor
    public class Pays extends EntityBase{
        @Column(nullable = false)
        public double vnp_Ammount;

        @Column(nullable = false)
        public String vnp_OrderInfo;

        @Column(nullable = false)
        public String vnp_OrderType = "200000";

        @Column(unique = true, name = "vnp_TxnRef")
        private String vnp_TxnRef;

        @Column
        private String status;

        @Column
        private String vnp_bankCode;

        @OneToOne
        @JoinColumn(name = "order_id")
        private Orders order;

        @PrePersist
        public void Status(){
            this.status = "Processing";
        }


    }