package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.CategoryDTO;
import com.swp.cageshop.DTO.ProductDTO;
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





    @PostMapping("/product/add")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO productDTO, @RequestParam Long categoryId) {
        CategoryDTO category = categoriesService.getOneCategory(categoryId);
        if (category != null) {
            // Set the category for the product
            productDTO.setCategoryId(categoryId);

            // Create or update the product
            ProductDTO savedProductDTO = productsService.addProduct(productDTO);

            if (savedProductDTO != null) {
                return ResponseEntity.ok(savedProductDTO);
            } else {
                return ResponseEntity.badRequest().body("Failed to add product.");
            }
        } else {
            return ResponseEntity.badRequest().body("Category not found.");
        }
    }

    @GetMapping("/product/list")
    public List<ProductDTO> listProducts() {
        return productsService.listAllProducts();
    }

    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
        boolean deleted = productsService.deleteProduct(id);
        if (deleted) {
            return ResponseEntity.ok("Product deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete product.");
        }
    }

    @GetMapping("/product/select/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable long id) {
        ProductDTO productDTO = productsService.listProducts(id);
        if (productDTO != null) {
            return ResponseEntity.ok(productDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/product/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProductDTO = productsService.updateProduct(id, productDTO);
        if (updatedProductDTO != null) {
            return ResponseEntity.ok(updatedProductDTO);
        } else {
            return ResponseEntity.badRequest().body("Failed to update product.");
        }
    }
    @PostMapping("/product/addWithAccessories")
    public ResponseEntity<?> addProductWithAccessories(@RequestBody ProductDTO mainProductDTO, @RequestParam Long categoryId, @RequestBody List<ProductDTO> accessoryDTOs) {
        ProductDTO savedMainProductDTO = productsService.addProductWithAccessories(mainProductDTO, accessoryDTOs, categoryId);

        if (savedMainProductDTO != null) {
            return ResponseEntity.ok(savedMainProductDTO);
        } else {
            return ResponseEntity.badRequest().body("Failed to add main product.");
        }
    }
}



































//SAVE ENTITY



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


//    @PostMapping("/product/add")
//    public ResponseEntity<?> addProduct(@RequestBody Products product, @RequestParam Long categoryId) {
//        Categories category = categoriesService.getOneCategory(categoryId);
//        if (category != null) {
//            product.setCategory(category);
//            Products savedProduct = productsService.addProducts(product);
//            return ResponseEntity.ok(savedProduct);
//        } else {
//            return ResponseEntity.badRequest().body("Category not found.");
//        }
//    }
//
//    @GetMapping("/product/list")
//    public List<Products> listProducts() {
//        return productsService.listAllProducts();
//    }
//
//    @DeleteMapping("/product/delete/{id}")
//    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
//        boolean deleted = productsService.deleteProducts(id);
//        if (deleted) {
//            return ResponseEntity.ok("Product deleted successfully.");
//        } else {
//            return ResponseEntity.badRequest().body("Failed to delete product.");
//        }
//    }
//
//    @GetMapping("/product/{id}")
//    public ResponseEntity<Products> getProduct(@PathVariable long id) {
//        Products product = productsService.listProducts(id);
//        if (product != null) {
//            return ResponseEntity.ok(product);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @PutMapping("/product/update/{id}")
//    public ResponseEntity<?> updateProduct(@PathVariable long id, @RequestBody Products product) {
//        Products updatedProduct = productsService.updateProducts(id, product);
//        if (updatedProduct != null) {
//            return ResponseEntity.ok(updatedProduct);
//        } else {
//            return ResponseEntity.badRequest().body("Failed to update product.");
//        }
//    }


