package com.swp.cageshop.service.productsService.NewCage;

import com.swp.cageshop.entity.Shapes;
import com.swp.cageshop.repository.ShapeRepository;
import com.swp.cageshop.service.productsService.NewCage.IShapeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShapeServiceImpl implements IShapeService {
    @Autowired
    private ShapeRepository shapeRepository;


@Override
    public List<Shapes> getAllShapes() {
        return shapeRepository.findAll();
    }
    @Override
    public Optional<Shapes> getShapeById(Long id) {
        return shapeRepository.findById(id);
    }
    @Override
    public Shapes createShape(Shapes shape) {
        return shapeRepository.save(shape);
    }
    @Override
    public Shapes updateShape(Long id, Shapes updatedShape) {
        return shapeRepository.findById(id)
                .map(shape -> {
                    shape.setShapeName(updatedShape.getShapeName());
                    shape.setPrice(updatedShape.getPrice());
                    // Update other fields as needed
                    return shapeRepository.save(shape);
                })
                .orElse(null); // or throw an exception if not found
    }
    @Override
    public boolean deleteShape(Long id) {
        if (id >= 1) {
            Shapes shape = shapeRepository.getReferenceById(id);
            if (shape != null && shape.getBirdcages().isEmpty()) {
                shapeRepository.delete(shape);
                return true;
            }
        }
        return false;
    }
}
