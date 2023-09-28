package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.service.categoriesService.ICategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private ProductsRepository productsRepository;

    @GetMapping("/category/list")
    public List<Categories> listCategories(){
        return iCategoriesService.getAllCategories();
    }

    @PostMapping("/category/addwithproduct")
    public ResponseEntity<?> addCategoryWithProducts(@RequestBody Categories category, @RequestParam List<Long> productIds) {
        Categories savedCategory = iCategoriesService.addCategoryWithProducts(category, productIds);
        if (savedCategory != null) {
            return ResponseEntity.ok(savedCategory);
        } else {
            return ResponseEntity.badRequest().body("Failed to add category with products.");
        }
    }
    @GetMapping("/category/categorybyid")
    public Categories getCategoryById(@RequestParam Long id) {
        return iCategoriesService.getOneCategory(id);
    }

}


