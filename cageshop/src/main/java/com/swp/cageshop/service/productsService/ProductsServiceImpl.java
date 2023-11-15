package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.entity.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import com.swp.cageshop.repository.*;
import com.swp.cageshop.service.categoriesService.ICategoriesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductsServiceImpl implements IProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private ICategoriesService categoriesService;
    @Autowired
    private BirdCagesRepository birdCageRepository;

    @Autowired
    private AccessoriesRepository accessoriesRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Override
    public List<ProductDTO> getTop3NewestProductDTOs() {
        // Lấy top 3 sản phẩm mới nhất từ repository
        List<Products> top3Products = productsRepository.findTop3NewestProducts();

        // Chuyển đổi từ Products sang ProductDTO sử dụng ModelMapper
        List<ProductDTO> productDTOs = top3Products.stream()
            .map(product -> modelMapper.map(product, ProductDTO.class))
            .collect(Collectors.toList());

        return productDTOs;
    }

    @Override
    public void deleteAll() {
        productsRepository.deleteAll();
    }

    public ProductDTO addProduct(ProductDTO productDTO) {


        if (productDTO != null) {
            Products product = modelMapper.map(productDTO, Products.class);

            // Set the category for the product
            Categories category = categoriesRepository.findById(productDTO.getCategoryId()).orElse(null);
            if (category != null) {
                product.setCategory(category);

                Products savedProduct = productsRepository.save(product); // Lưu sản phẩm trước


                if (productDTO.getCage() != null) {
                    BirdCages birdCages = modelMapper.map(productDTO.getCage(), BirdCages.class);
                    birdCages.setProduct(savedProduct); // Set the product for the bird cage
                    birdCages.setId(savedProduct.getId()); // Set the proid for the bird cage
                    birdCageRepository.save(birdCages);

                }

                if (productDTO.getAccessories() != null) {

                    for (AccessoryDTO accessoryDTO : productDTO.getAccessories()) {
                        Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
                        accessory.setCustomProduct(false);
                        accessory.setProduct(savedProduct); // Set the product for the accessory

                        accessoryDTO.setProductId(savedProduct.getId());

                        accessoriesRepository.save(accessory);

                    }
                }

                ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);
                deleteBirdCagesWithNullProductId();
                deleteAccessoriesWithNullProductIdAndCustomProductNotNull();
                return savedProductDTO;
            }
        }
        return null;
    }

    public void deleteBirdCagesWithNullProductId() {
        List<BirdCages> birdcage=  birdCageRepository.findByProductIdIsNull();
        birdCageRepository.deleteAll(birdcage);
    }

    // Method to delete Accessories with productId null and customProduct not null
    public void deleteAccessoriesWithNullProductIdAndCustomProductNotNull() {
        List<Accessories> accessories = accessoriesRepository.findByProductIdIsNullAndCustomProductIsNull();
        accessoriesRepository.deleteAll(accessories);
    }

    public ProductDTO test(ProductDTO productDTO) {
        if (productDTO != null) {
            Categories category = categoriesRepository.findById(productDTO.getCategoryId()).orElse(null);
            if (category != null) {
                // Save bird cage and accessories first
                if (productDTO.getCage() != null) {
                    BirdCages birdCages = modelMapper.map(productDTO.getCage(), BirdCages.class);
                    birdCages.setProduct(null);
                    birdCageRepository.save(birdCages);
                }

                List<Accessories> savedAccessories = new ArrayList<>();
                if (productDTO.getAccessories() != null) {
                    for (AccessoryDTO accessoryDTO : productDTO.getAccessories()) {
                        Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
                        accessory.setCustomProduct(false);
                        accessory.setProduct(null);
                        savedAccessories.add(accessory);
                        accessoriesRepository.save(accessory);
                    }
                }

                // Save the product after bird cage and accessories are saved
                Products product = modelMapper.map(productDTO, Products.class);
                product.setCategory(category);
                Products savedProduct = productsRepository.save(product);

                // Set the product for the bird cage, if it exists
                if (productDTO.getCage() != null) {
                    BirdCages birdCages = modelMapper.map(productDTO.getCage(), BirdCages.class);
                    birdCages.setProduct(savedProduct);
                    birdCageRepository.save(birdCages);
                }

                // Set the product for each accessory
                for (Accessories accessory : savedAccessories) {
                    accessory.setProduct(savedProduct);
                    accessoriesRepository.save(accessory);
                }

                return modelMapper.map(savedProduct, ProductDTO.class);
            }
        }
        return null;
    }




    @Override
    public ProductDTO updateProduct(long id, ProductDTO productDTO) {
        if (productDTO != null) {
            Optional<Products> optionalExistingProduct = productsRepository.findById(id);
            if (optionalExistingProduct.isPresent()) {
                Products existingProduct = optionalExistingProduct.get();

                // Update fields of the product entity
                existingProduct.setName(productDTO.getName());
                existingProduct.setCode(productDTO.getCode());
                existingProduct.setProductImage(productDTO.getProductImage());
                existingProduct.setProductDetailImage(productDTO.getProductDetailImage());
                existingProduct.setStock(productDTO.getStock());
                existingProduct.setStatus(productDTO.getStatus());

                // Update or add BirdCage if it exists in the DTO
                if (productDTO.getCage() != null) {
                    if (existingProduct.getCage() == null) {
                        existingProduct.setCage(modelMapper.map(productDTO.getCage(), BirdCages.class));
                    } else {
                        BirdCages existingCage = existingProduct.getCage();
                        modelMapper.map(productDTO.getCage(), existingCage);
                    }
                }

                // Update or add Accessories if they exist in the DTO
                if (productDTO.getAccessories() != null) {
                    List<Accessories> existingAccessories = existingProduct.getAccessories();
                    existingAccessories.clear(); // Remove existing accessories

                    for (AccessoryDTO accessoryDTO : productDTO.getAccessories()) {
                        existingAccessories.add(modelMapper.map(accessoryDTO, Accessories.class));
                    }
                }

                // Save the updated product
                Products updatedProduct = productsRepository.save(existingProduct);

                // Map the updated product to a DTO
                ProductDTO updatedProductDTO = modelMapper.map(updatedProduct, ProductDTO.class);
                return updatedProductDTO;
            }
        }
        return null;
    }


    @Override
    public boolean deleteProduct(long id) {
        if (id >= 1) {
            Products product = productsRepository.getReferenceById(id);
<<<<<<< HEAD
            if (product != null) {
=======
            if (product != null ) {
>>>>>>> 6eb8c347e8031bf998f6244cfb07a235e03f179f
                productsRepository.delete(product);
                return true;
            }
        }
        return false;
    }


    @Override
    public ProductDTO setProductToSellAgain(Long productId) {
        Optional<Products> optionalProduct = productsRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Products product = optionalProduct.get();

            // Modify product name and status
            String name = "[SPECIAL]" + product.getName();
            product.setName(name);
            product.setStatus("Available");

            // Modify cage price
            BirdCages cage = product.getCage();
            if (cage != null) {
                double cagePrice = cage.getPrice();
                if (cagePrice - (cagePrice * 0.1) > 0) {
                    cage.setPrice(cagePrice - (cagePrice * 0.1));
                }
            }

            // Save the updated product
            Products updatedProduct = productsRepository.save(product);

            // Map the updated product to a DTO
            ProductDTO updatedProductDTO = modelMapper.map(updatedProduct, ProductDTO.class);
            return updatedProductDTO;
        }
        return null;
    }

    public ProductDTO cloneAndAddAccessories(Long productId, List<AccessoryDTO> accessories) {
        Optional<Products> optionalProduct = productsRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Products product = optionalProduct.get();
            if (product.getStock() > 0) {
                if(product.getOrderLevel() == null){
                    product.setOrderLevel(0);
                }
                product.setOrderLevel(product.getOrderLevel()+1);
                product.setStock(product.getStock() - 1);
                productsRepository.save(product);
                if (product.getStock() == 0) {
                    if(product.getOrderLevel() == null){
                        product.setOrderLevel(0);
                    }
                    product.setOrderLevel(product.getOrderLevel()+1);
                    product.setStatus("OutOfStock");
                    productsRepository.save(product);
                }


                Products clonedProduct = new Products();
                clonedProduct.setName(product.getName());
                clonedProduct.setStock(1);
                clonedProduct.setMotherProductId(product.getId());

                clonedProduct.setProductImage(product.getProductImage());
                clonedProduct.setCode(product.getCode());
                Categories category = categoriesRepository.findById(product.getCategory().getId()).orElse(null);
                if(category != null){

                    clonedProduct.setCategory(category);

                    }

                if (product.getCage() != null) {
                    BirdCages originalBirdCage = product.getCage();
                    BirdCages clonedBirdCage = new BirdCages();
                    clonedBirdCage.setDescription(originalBirdCage.getDescription());
                    clonedBirdCage.setMaterial(originalBirdCage.getMaterial());
                    clonedBirdCage.setSize(originalBirdCage.getSize());
                    clonedBirdCage.setPrice(originalBirdCage.getPrice());
                    clonedBirdCage.setProduct(clonedProduct);
                    clonedProduct.setCage(clonedBirdCage);
                }

                clonedProduct.setStatus("CustomProduct");

                // Clone existing accessories
                List<Accessories> productAccessories = new ArrayList<>();
                for (Accessories originalAccessory : product.getAccessories()) {
                    Accessories clonedAccessory = new Accessories();
                    clonedAccessory.setDescription(originalAccessory.getDescription());
                    clonedAccessory.setPrice(originalAccessory.getPrice());
                    clonedAccessory.setType(originalAccessory.getType());
                    clonedAccessory.setProduct(clonedProduct);
                    productAccessories.add(clonedAccessory);
                }

                // Add new accessories
                double result = 0;
                // Add new accessories
                for (AccessoryDTO accessoryDTO : accessories) {
                    Accessories newAccessory = new Accessories();
                    newAccessory.setDescription(accessoryDTO.getDescription());
                    newAccessory.setPrice(accessoryDTO.getPrice());
                    newAccessory.setType(accessoryDTO.getType());
                    result += newAccessory.getPrice();
                    newAccessory.setProduct(clonedProduct);
                    productAccessories.add(newAccessory);
                }
                clonedProduct.setTotalPrice(product.getTotalPrice()+result);
                clonedProduct.setAccessories(productAccessories);


                clonedProduct.setAccessories(productAccessories);

                Products updatedProduct = productsRepository.save(clonedProduct);
                return modelMapper.map(updatedProduct, ProductDTO.class);
            }

        }
        return null;
    }


    public ProductDTO addAccessoriesToProduct(Long productId, List<AccessoryDTO> accessories) {
        Optional<Products> optionalProduct = productsRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Products product = optionalProduct.get();
            List<Accessories> productAccessories = product.getAccessories();
            double result = 0;
            for (AccessoryDTO accessoryDTO : accessories) {
                Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
                accessory.setProduct(product);
                result += accessoryDTO.getPrice();
                productAccessories.add(accessory);
            }
            product.setTotalPrice(product.getTotalPrice()+result);
            product.setAccessories(productAccessories);
            Products updatedProduct = productsRepository.save(product);
            return modelMapper.map(updatedProduct, ProductDTO.class);
        }
        return null;
    }


    public List<ProductDTO> getProductsByStatusNew() {
        List<Products> products = productsRepository.findProductsByStatusNew();
        // Map the entity objects to DTOs if needed
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());


    }

    public List<ProductDTO> getProductsStatusNoMoreMade() {
        List<Products> products = productsRepository.findProductsByStatusNoMoreMade();
        // Map the entity objects to DTOs if needed
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());


    }
    public List<ProductDTO> getProductsStatusCustomProduct() {
        List<Products> products = productsRepository.findProductsByStatusCustomProduct();
        // Map the entity objects to DTOs if needed
        return products.stream()
            .map(product -> modelMapper.map(product, ProductDTO.class))
            .collect(Collectors.toList());
    }


    public List<ProductDTO> getProductsByStatusAvailable() {
        List<Products> products = productsRepository.findProductsByStatusAvailable();
        // Map the entity objects to DTOs if needed
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());


    }

    public List<ProductDTO> getProductsOutOfStock() {
        List<Products> products = productsRepository.findProductsOutOfStock();
        // Map the entity objects to DTOs if needed
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());


    }

    @Override
    public List<ProductDTO> listAllProducts() {
        List<Products> products = productsRepository.findAll();
        // Convert the list of Products to a list of ProductDTOs
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public ProductDTO listProducts(long id) {
        Products product = productsRepository.getReferenceById(id);
        if (product != null) {
            // Convert the Products entity to ProductDTO
            return modelMapper.map(product, ProductDTO.class);
        }
        return null;
    }

    public List<ProductDTO> findProductsWithoutCage() {
        List<Products> productsWithoutCage = productsRepository.findProductsWithoutCage();
        return productsWithoutCage.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findProductsWithAccessories() {
        List<Products> productsWithAccessories = productsRepository.findProductsWithAccessories();
        return productsWithAccessories.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> productsWithCageWithAccessories() {
        List<Products> productsWithCageWithAccessories = productsRepository.findProductsWithCageAndAccessories();
        return productsWithCageWithAccessories.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findProductsWithoutAccessories() {
        List<Products> productsWithoutAccessories = productsRepository.findProductsWithoutAccessories();
        return productsWithoutAccessories.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        Categories category = categoriesRepository.findOneById(categoryId);
        if (category != null) {
            List<Products> products = productsRepository.findByCategory(category);
            return products.stream()
                    .map(product -> modelMapper.map(product, ProductDTO.class))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public List<ProductDTO> searchProductsByKeyword(String keyword) {
        List<Products> products = productsRepository.findProductsByKeyword(keyword);

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByPriceRange(double minPrice, double maxPrice) {
        List<Products> products = productsRepository.findByPriceBetween(minPrice, maxPrice);

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<AccessoryDTO> getProductAccessories(Long productId) {
        Products product = productsRepository.findById(productId).orElse(null);

        if (product != null) {
            List<Accessories> accessories = accessoriesRepository.findAccessoriesByProduct(product);

            return accessories.stream()
                    .map(accessory -> modelMapper.map(accessory, AccessoryDTO.class))
                    .collect(Collectors.toList());
        }

        return Collections.emptyList();
    }

    public List<ProductDTO> getProductsByMaterial(String material) {
        List<Products> products = productsRepository.findByMaterial(material);

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsBySize(String size) {
        List<Products> products = productsRepository.findBySize(size);

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }


    public List<ProductDTO> getProductsByAccessoriesType(String accessoryType) {
        List<Products> products = productsRepository.findProductsByAccessoriesType(accessoryType);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByTotalPriceAsc() {
        List<Products> products = productsRepository.findProductsByTotalPriceAsc();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByTotalPriceDesc() {
        List<Products> products = productsRepository.findProductsByTotalPriceDesc();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsSortedBy(String sortBy) {
        List<Products> products = productsRepository.findAll(Sort.by(sortBy));

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsSortedByCreateDateASC (){
        List<Products> products = productsRepository.findAllProductsSortedByCreateDateAsc();

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsSortedByCreateDateDESC() {
        List<Products> products = productsRepository.findAllProductsSortedByCreateDateDesc();

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }


    public List<ProductDTO> getProductsWithLimitedStock(int maxStock) {
        List<Products> products = productsRepository.findProductsWithLimitedStock(maxStock);

        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByReleaseDateRange(String startDate, String endDate) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date start = dateFormat.parse(startDate);
            Date end = dateFormat.parse(endDate);

            List<Products> products = productsRepository.findByReleaseDateBetween(start, end);

            return products.stream()
                    .map(product -> modelMapper.map(product, ProductDTO.class))
                    .collect(Collectors.toList());
        } catch (ParseException e) {
            // Handle the parsing exception
            e.printStackTrace();
            return Collections.emptyList();
        }
    }


    // Cai nay cua Huu Bao xin thu loi nhe, tat ca vi loi ich chung
    // Boi vi sau khi thuc hien thanh toan toi muon cap nhat lai stock
    public void updateProductStock(Orders order) {
        List<OrderDetail> orderDetails = orderDetailsRepository.findByOrder_Id(order.getId());
        for (OrderDetail orderDetail : orderDetails) {
            Products product = orderDetail.getProduct();
            }


    }


}