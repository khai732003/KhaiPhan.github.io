package com.swp.cageshop.service.productsService.NewCage;

import com.swp.cageshop.entity.Shapes;

import java.util.List;
import java.util.Optional;

public interface IShapeService {

    public List<Shapes> getAllShapes();


    public Optional<Shapes> getShapeById(Long id) ;


    public Shapes createShape(Shapes shape) ;


    public Shapes updateShape(Long id, Shapes updatedShape) ;

    public boolean deleteShape(Long id);
}
