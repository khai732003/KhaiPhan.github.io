package com.swp.cageshop.service.productsService.NewCage;

import com.swp.cageshop.DTO.MaterialDTO;
import com.swp.cageshop.DTO.SizeDTO;
import com.swp.cageshop.entity.Materials;

import java.util.List;
import java.util.Optional;

public interface IMaterialService {

    public List<MaterialDTO> getAllMaterials();

    public Optional<Materials> getMaterialById(Long id);
    public MaterialDTO createMaterial(MaterialDTO materialDTO);

    public MaterialDTO updateMaterial(Long id, MaterialDTO materialDTO);

    public boolean deleteMaterial(Long id);


}
