package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.service.categoriesService.ICategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cageshop")
public class CategoriesController {
    @Autowired
    private ICategoriesService iCategoriesService;

    @PostMapping("/category/add")
    public Categories addCategories(@RequestBody Categories categories){
        return iCategoriesService.addCategories(categories);
    }

    @GetMapping("/category/list")
    public List<Categories> listCategories(){
        return iCategoriesService.getAllCategories();
    }
}
