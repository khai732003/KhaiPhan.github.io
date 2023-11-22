package com.swp.cageshop.service.productsService.NewCage;

import com.swp.cageshop.DTO.MaterialDTO;
import com.swp.cageshop.entity.Materials;
import com.swp.cageshop.repository.MaterialRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MaterialService implements IMaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<MaterialDTO> getAllMaterials() {
        List<Materials> materials = materialRepository.findAll();


        return materials.stream()
                .map(material -> modelMapper.map(material, MaterialDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Materials> getMaterialById(Long id) {
        return materialRepository.findById(id);
    }

    @Override
    public MaterialDTO createMaterial(MaterialDTO materialDTO) {
        if (materialDTO != null) {
            Materials material = modelMapper.map(materialDTO, Materials.class);
            Materials savedMaterial = materialRepository.save(material);
            return modelMapper.map(savedMaterial, MaterialDTO.class);
        }
        return null;
    }

    @Override
    public MaterialDTO updateMaterial(Long id, MaterialDTO materialDTO) {
        Optional<Materials> optionalMaterial = materialRepository.findById(id);
        if (optionalMaterial.isPresent()) {
            Materials material = optionalMaterial.get();
            material.setMaterialName(materialDTO.getMaterialName());
            material.setPrice(materialDTO.getPrice());
            // Set other fields if needed
            Materials updatedMaterial = materialRepository.save(material);
            return modelMapper.map(updatedMaterial, MaterialDTO.class);
        }
        return null;
    }

    @Override
    public boolean deleteMaterial(Long id) {
        if (id >= 1) {
            Materials material = materialRepository.getReferenceById(id);
            if (material != null && material.getBirdcages().isEmpty()) {
                materialRepository.delete(material);
                return true;
            }
        }
        return false;
    }
}
