package com.swp.cageshop.service.productsService.NewCage;


import com.swp.cageshop.DTO.SizeDTO;
import com.swp.cageshop.entity.Sizes;
import com.swp.cageshop.repository.SizeRepository;
import com.swp.cageshop.service.productsService.NewCage.ISizeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SizeServiceImpl implements ISizeService {

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private  ModelMapper modelMapper;
    @Override
    public List<SizeDTO> getAllSizes() {
        List<Sizes> sizes = sizeRepository.findAll();
        return sizes.stream()
                .map(size -> modelMapper.map(size, SizeDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Sizes> getSizeById(Long id) {
        return sizeRepository.findById(id);
    }

    @Override
    public SizeDTO createSize(SizeDTO sizeDTO) {
        if (sizeDTO != null) {
            Sizes size = modelMapper.map(sizeDTO, Sizes.class);
            Sizes savedSize = sizeRepository.save(size);
            return modelMapper.map(savedSize, SizeDTO.class);
        }
        return null;
    }

    @Override
    public SizeDTO updateSize(Long id, SizeDTO sizeDTO) {
        Optional<Sizes> optionalSize = sizeRepository.findById(id);
        if (optionalSize.isPresent()) {
            Sizes size = optionalSize.get();
            size.setSizeName(sizeDTO.getSizeName());
            size.setMaxspokes(size.getMaxspokes());
            size.setMinspokes(size.getMinspokes());
            size.setPrice(sizeDTO.getPrice());

            Sizes updatedSize = sizeRepository.save(size);
            return modelMapper.map(updatedSize, SizeDTO.class);
        }
        return null;
    }

    @Override
    public boolean deleteSize(Long id) {
        if (id >= 1) {
            Sizes size = sizeRepository.getReferenceById(id);
            if (size != null && size.getBirdcages().isEmpty()) {
                sizeRepository.delete(size);
                return true;
            }
        }
        return false;
    }

}
