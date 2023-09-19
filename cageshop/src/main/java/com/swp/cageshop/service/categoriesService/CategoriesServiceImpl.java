package com.swp.cageshop.service.categoriesService;

import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoriesServiceImpl implements ICategoriesService{
    @Autowired
    private CategoriesRepository categoriesRepository;


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
}
