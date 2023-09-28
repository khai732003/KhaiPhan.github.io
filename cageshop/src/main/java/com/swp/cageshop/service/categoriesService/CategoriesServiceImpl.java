package com.swp.cageshop.service.categoriesService;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.repository.CategoriesRepository;
import com.swp.cageshop.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoriesServiceImpl implements ICategoriesService{
    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private ProductsRepository productsRepository;
    @Override
    public Categories addCategories(Categories categories) {
        if(categories!=null){
            return categoriesRepository.save(categories);
        }
        return null;
    }

    @Override
    public List<Categories> getAllCategories() {
        return categoriesRepository.findAll();
    }


    public Categories addCategoryWithProducts(Categories category, List<Long> productIds) {
        // Create or update the category
        Categories savedCategory = categoriesRepository.saveAndFlush(category);

        if (savedCategory != null && productIds != null && !productIds.isEmpty()) {
            for (Long productId : productIds) {
                Products product = productsRepository.findById(productId).orElse(null);
                if (product != null) {
                    savedCategory.addProduct(product);
                }
            }
            return categoriesRepository.saveAndFlush(savedCategory);
        }
        return savedCategory;
    }

    @Override
    public Categories getOneCategory(Long id) {
        return categoriesRepository.findOneById(id);
    }

    @Override
    public boolean deleteCategory(Long id) {
        if (id >= 1) {
            Categories category = categoriesRepository.getReferenceById(id);
            if (category != null) {
                categoriesRepository.delete(category);
                return true;
            }
        }
        return false;
    }
}
