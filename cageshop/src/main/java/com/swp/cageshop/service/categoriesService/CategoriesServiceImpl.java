package com.swp.cageshop.service.categoriesService;

import com.swp.cageshop.DTO.CategoryDTO;
import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.repository.CategoriesRepository;
import com.swp.cageshop.repository.ProductsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriesServiceImpl implements ICategoriesService{
    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private ProductsRepository productsRepository;



    @Autowired
    private ModelMapper modelMapper;
    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) {
        if (categoryDTO != null) {
            Categories category = modelMapper.map(categoryDTO, Categories.class);
            Categories savedCategory = categoriesRepository.save(category);
            return modelMapper.map(savedCategory, CategoryDTO.class);
        }
        return null;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return null;
    }


    @Override
    public CategoryDTO addCategoryWithProducts(CategoryDTO categoryDTO, List<Long> productIds) {
        Categories category = modelMapper.map(categoryDTO, Categories.class);

        Categories savedCategory = categoriesRepository.saveAndFlush(category);

        if (savedCategory != null && productIds != null && !productIds.isEmpty()) {
            for (Long productId : productIds) {
                Products product = productsRepository.findById(productId).orElse(null);
                if (product != null) {
                    savedCategory.addProduct(product);
                }
            }
            return modelMapper.map(categoriesRepository.saveAndFlush(savedCategory), CategoryDTO.class);
        }
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO getOneCategory(Long categoryId) {

        Categories categoryEntity = categoriesRepository.findById(categoryId).orElse(null);
        if (categoryEntity != null) {
            return modelMapper.map(categoryEntity, CategoryDTO.class);
        }
        return null;
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
