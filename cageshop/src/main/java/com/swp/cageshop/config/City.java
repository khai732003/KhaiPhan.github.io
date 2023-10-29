package com.swp.cageshop.config;

public enum City {
    HOCHIMINH("Hồ Chí Minh", 100000);

    private final String cityName;
    private final int shippingFee;

    City(String cityName, int shippingFee) {
        this.cityName = cityName;
        this.shippingFee = shippingFee;
    }

    public int getShippingFee() {
        return this.shippingFee;
    }
}
