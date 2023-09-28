package com.swp.cageshop.service.categoriesService;

import com.swp.cageshop.entity.Categories;

import java.util.List;

public interface ICategoriesService {

    public Categories addCategories(Categories categories);
    public List<Categories> getAllCategories();



}
