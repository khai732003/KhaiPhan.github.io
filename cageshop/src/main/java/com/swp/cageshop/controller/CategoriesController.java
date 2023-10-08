package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.CategoryDTO;
import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.service.categoriesService.ICategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/cageshop")
public class CategoriesController {
    @Autowired
    private ICategoriesService categoriesService;

    @PostMapping("/category/add")
    public ResponseEntity<?> addCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO savedCategoryDTO = categoriesService.addCategory(categoryDTO);
        if (savedCategoryDTO != null) {
            return ResponseEntity.ok(savedCategoryDTO);
        } else {
            return ResponseEntity.badRequest().body("Failed to add category.");
        }
    }

    @GetMapping("/category/list")
    public List<CategoryDTO> listCategories() {
        return categoriesService.getAllCategories();
    }

    @PostMapping("/category/addwithproduct")
    public ResponseEntity<?> addCategoryWithProducts(@RequestBody CategoryDTO categoryDTO, @RequestParam List<Long> productIds) {
        CategoryDTO savedCategoryDTO = categoriesService.addCategoryWithProducts(categoryDTO, productIds);
        if (savedCategoryDTO != null) {
            return ResponseEntity.ok(savedCategoryDTO);
        } else {
            return ResponseEntity.badRequest().body("Failed to add category with products.");
        }
    }

    @GetMapping("/category/categorybyid")
    public ResponseEntity<CategoryDTO> getCategoryById(@RequestParam Long id) {
        CategoryDTO categoryDTO = categoriesService.getOneCategory(id);
        if (categoryDTO != null) {
            return ResponseEntity.ok(categoryDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}



// SAVE ENTITY
//    @PostMapping("/category/add")
//    public Categories addCategories(@RequestBody Categories categories){
//        return iCategoriesService.addCategories(categories);
//    }
//
//    @Autowired
//    private ProductsRepository productsRepository;
//
//    @GetMapping("/category/list")
//    public List<Categories> listCategories(){
//        return iCategoriesService.getAllCategories();
//    }
//
//    @PostMapping("/category/addwithproduct")
//    public ResponseEntity<?> addCategoryWithProducts(@RequestBody Categories category, @RequestParam List<Long> productIds) {
//        Categories savedCategory = iCategoriesService.addCategoryWithProducts(category, productIds);
//        if (savedCategory != null) {
//            return ResponseEntity.ok(savedCategory);
//        } else {
//            return ResponseEntity.badRequest().body("Failed to add category with products.");
//        }
//    }
//    @GetMapping("/category/categorybyid")
//    public Categories getCategoryById(@RequestParam Long id) {
//        return iCategoriesService.getOneCategory(id);
//    }




