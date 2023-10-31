package com.swp.cageshop.service.categoriesService;

import com.swp.cageshop.DTO.CategoryDTO;
import com.swp.cageshop.entity.Categories;

import java.util.Date;
import java.util.List;

public interface ICategoriesService {

    public CategoryDTO addCategory(CategoryDTO categoryDTO);
    public List<CategoryDTO> getAllCategories();

    public CategoryDTO addCategoryWithProducts(CategoryDTO categoryDTO, List<Long> productIds);
    public CategoryDTO getOneCategory(Long id);

    public boolean deleteCategory(Long id);


}
