package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.service.categoriesService.ICategoriesService;
import com.swp.cageshop.service.productsService.IProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cageshop")
public class ProductsController {

    @Autowired
    private IProductsService productsService;

    @Autowired
    private ICategoriesService categoriesService;

//    @GetMapping("/products/byCategory")
////    public ResponseEntity<List<Products>> getProductsByCategory(@RequestParam Long categoryId) {
//////        Categories category = "con cac anh hung";
////        if (category != null) {
////            List<Products> products = productsService.getProductsByCategory(category);
////            return ResponseEntity.ok(products);
////        } else {
////            return ResponseEntity.badRequest().body(null);
////        }
//    }

    @PostMapping("/product/add")
    public ResponseEntity<?> addProduct(@RequestBody Products product, @RequestParam Long categoryId) {
        Categories category = categoriesService.getOneCategory(categoryId);
        if (category != null) {
            product.setCategory(category);
            Products savedProduct = productsService.addProducts(product);
            return ResponseEntity.ok(savedProduct);
        } else {
            return ResponseEntity.badRequest().body("Category not found.");
        }
    }

    @GetMapping("/product/list")
    public List<Products> listProducts() {
        return productsService.listAllProducts();
    }

    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
        boolean deleted = productsService.deleteProducts(id);
        if (deleted) {
            return ResponseEntity.ok("Product deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete product.");
        }
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Products> getProduct(@PathVariable long id) {
        Products product = productsService.listProducts(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/product/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable long id, @RequestBody Products product) {
        Products updatedProduct = productsService.updateProducts(id, product);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.badRequest().body("Failed to update product.");
        }
    }
}

