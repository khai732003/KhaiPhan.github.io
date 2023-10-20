package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.AccessoryDTO;
import com.swp.cageshop.DTO.BirdCageDTO;
import com.swp.cageshop.DTO.CategoryDTO;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
                Products savedProduct = productsRepository.save(product);
                ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);

                if (productDTO.getCage() != null) {
                    BirdCages birdCages = modelMapper.map(productDTO.getCage(), BirdCages.class);
                    birdCages.setProduct(savedProduct); // Set the product for the bird cage
                    birdCageRepository.save(birdCages);
                }
                if (productDTO.getAccessories() != null) {
                    for (AccessoryDTO accessoryDTO : productDTO.getAccessories()) {
                        Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
                        accessory.setProduct(savedProduct); // Set the product for the accessory
                        accessoriesRepository.save(accessory);
                    }
                }

                return savedProductDTO;
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
            if (product != null) {
                productsRepository.delete(product);
                return true;
            }
        }
        return false;
    }

    public ProductDTO addAccessoriesToProduct(Long productId, List<AccessoryDTO> accessories) {
        Optional<Products> optionalProduct = productsRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Products product = optionalProduct.get();
            List<Accessories> productAccessories = product.getAccessories();
            for (AccessoryDTO accessoryDTO : accessories) {
                Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
                accessory.setProduct(product);
                productAccessories.add(accessory);
            }
            product.setAccessories(productAccessories);
            Products updatedProduct = productsRepository.save(product);
            return modelMapper.map(updatedProduct, ProductDTO.class);
        }
        return null;
    }



////////////////////////////////////////////////////



//    public boolean moveProductToOrderDetail(Long orderId, Long productId) {
//        // Find the order by orderId
//        Orders order = ordersRepository.findById(orderId).orElse(null);
//
//        // Find the product by productId
//        Products product = productsRepository.findById(productId).orElse(null);
//
//        if (order != null && product != null && product.getStock() > 0) {
//            // Create a new OrderDetail
//            OrderDetail orderDetail = new OrderDetail();
//            orderDetail.setQuantity(1);
//            orderDetail.setProductPrice(product.getTotalPrice());
//            orderDetail.setOrder(order);
//            orderDetail.setProduct(product);
//
//            // Save the new OrderDetail
//            order.getOrderDetails().add(orderDetail);
//
//            // Decrement the product's stock by 1
//            product.setStock(product.getStock() - 1);
//
//            // Save the changes to the database
//            ordersRepository.save(order);
//            productsRepository.save(product);
//
//            return true;
//        }
//
//        return false;
//    }


//////////////////////////////////////////////////////////


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


//    public List<ProductDTO> getProductsByType(String type) {
//        List<Products> products = productsRepository.findByType(type);
//
//        return products.stream()
//                .map(product -> modelMapper.map(product, ProductDTO.class))
//                .collect(Collectors.toList());
//    }
//    public List<ProductDTO> getRecommendedProducts(int count) {
//        List<Products> products = productsRepository.findRecommendedProducts(PageRequest.of(0, count));
//
//        return products.stream()
//                .map(product -> modelMapper.map(product, ProductDTO.class))
//                .collect(Collectors.toList());
//    }
//
//
//    public List<ProductDTO> getBestSellingProducts(int count) {
//        List<Products> products = productsRepository.findBestSellingProducts(PageRequest.of(0, count));
//
//        return products.stream()
//                .map(product -> modelMapper.map(product, ProductDTO.class))
//                .collect(Collectors.toList());
//    }

    public List<ProductDTO> getProductsSortedBy(String sortBy) {
        List<Products> products = productsRepository.findAll(Sort.by(sortBy));

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

        for (OrderDetail orderDetail : order.getOrderDetails()) {
            if (orderDetail.getStatus().equals("Success")) {
                Long productId = orderDetail.getProduct().getId();

                    Optional<Products> optionalProduct = productsRepository.findById(productId);
                    if (optionalProduct.isPresent()) {
                        Products product = optionalProduct.get();
                        int newStock = product.getStock() - orderDetail.getQuantity();
                        product.setStock(newStock);
                        productsRepository.save(product);
                    } else {
                    }

            }
        }
    }

}









        //////////////////////////////////////////
//        public ProductDTO addProductWithBirdCage(ProductDTO productDTO, BirdCageDTO birdCageDTO) {
//            if (productDTO != null && birdCageDTO != null) {
//                // Map the ProductDTO to a Products entity
//                Products product = modelMapper.map(productDTO, Products.class);
//
//                // Retrieve the category by ID
//                Categories category = categoriesRepository.findById(productDTO.getCategoryId()).orElse(null);
//
//                if (category != null) {
//                    // Set the category for the product
//                    product.setCategory(category);
//
//                    // Save the product to the database
//                    Products savedProduct = productsRepository.save(product);
//
//                    if (savedProduct != null) {
//                        // Map the BirdCageDTO to a BirdCages entity
//                        BirdCages birdCage = modelMapper.map(birdCageDTO, BirdCages.class);
//
//                        // Associate the bird cage with the saved product
//                        birdCage.setProduct(savedProduct);
//                        // Save the bird cage to the database
//                        BirdCages savedBirdCage = birdCageRepository.save(birdCage);
//
//                        // Associate the saved bird cage with the saved product
//                        savedProduct.setCage(savedBirdCage);
//
//                        // Update the product's total price with the cage's price
//                        savedProduct.setTotalPrice(savedProduct.getTotalPrice());
//
//                        // Save the updated product to ensure the association and total price
//                        productsRepository.save(savedProduct);
//
//                        // Map the saved product back to a DTO
//                        ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);
//                        return savedProductDTO;
//                    }
//                }
//            }
//            return null;
//        }
//
//
//    public ProductDTO addProductWithAccessories(ProductDTO productDTO, List<AccessoryDTO> accessories) {
//        if (productDTO != null && accessories != null) {
//            // Map the ProductDTO to a Products entity
//            Products product = modelMapper.map(productDTO, Products.class);
//
//            // Retrieve the category by ID
//            Categories category = categoriesRepository.findById(productDTO.getCategoryId()).orElse(null);
//
//            if (category != null) {
//                // Set the category for the product
//                product.setCategory(category);
//
//                // Save the product to the database
//                Products savedProduct = productsRepository.save(product);
//
//                if (savedProduct != null) {
//                    // Map each AccessoryDTO to Accessories entities
//                    List<Accessories> accessoriesList = accessories.stream()
//                            .map(accessoryDTO -> {
//                                Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
//                                accessory.setProduct(savedProduct);
//                                return accessory;
//                            })
//                            .collect(Collectors.toList());
//
//                    // Save the list of accessories to the database
//                    List<Accessories> savedAccessories = accessoriesRepository.saveAll(accessoriesList);
//
//                    // Update the product to include the saved accessories
//                    savedProduct.setAccessories(savedAccessories);
//                    productsRepository.save(savedProduct);
//
//                    // Map the saved product back to a DTO
//                    ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);
//                    return savedProductDTO;
//                }
//            }
//        }
//        return null;
//    }



//    public ProductDTO addBirdCageProduct(BirdCageDTO birdCageDTO, Categories category) {
//        // Create a new ProductDTO
//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setName(birdCageDTO.getClass().getName()); // Set product name from BirdCage description
//        productDTO.setStock(1); // Set initial stock
//        productDTO.setTotalPrice(birdCageDTO); // Set total price
//        productDTO.setStatus("Available"); // Set status as available
//        productDTO.setCategoryId(category.getId()); // Set the category ID
//
//        // Map BirdCageDTO to BirdCage and set it in the product
//        BirdCageDTO birdCage = modelMapper.map(birdCageDTO, BirdCageDTO.class);
//        productDTO.setCage(birdCage);
//
//        // Save the product to the repository
//        Products savedProduct = productsRepository.save(modelMapper.map(productDTO, Products.class));
//        return modelMapper.map(savedProduct, ProductDTO.class);
//    }
//
//
//    public ProductDTO addAccessoriesProduct(AccessoryDTO accessoryDTO, Categories category) {
//        // Create a new ProductDTO
//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setName(accessoryDTO.get); // Set product name from Accessory description
//        productDTO.setStock(1); // Set initial stock
//        productDTO.setTotalPrice(accessoryDTO.getPrice()); // Set total price
//        productDTO.setStatus("Available"); // Set status as available
//        productDTO.setCategoryId(category.getId()); // Set the category ID
//
//        // Map AccessoryDTO to Accessory and set it in the product
//        AccessoryDTO accessory = modelMapper.map(accessoryDTO, AccessoryDTO.class);
//        List<AccessoryDTO> accessories = new ArrayList<>();
//        accessories.add(accessory);
//        productDTO.setAccessories(accessories);
//
//        // Save the product to the repository
//        Products savedProduct = productsRepository.save(modelMapper.map(productDTO, Products.class));
//        return modelMapper.map(savedProduct, ProductDTO.class);
//    }

//  @Override
//  public Products addProducts(Products products) {
//    if (products != null) {
//      return productsRepository.save(products);
//    }
//    return null;
//  }
//
//  @Override
//  public Products updateProducts(long id, Products products) {
//    if (products != null) {
//      Products existingProduct = productsRepository.getReferenceById(id);
//      if (existingProduct != null) {
//
//        existingProduct.setName(products.getName());
//        existingProduct.setCode(products.getCode());
//        existingProduct.setDescription(products.getDescription());
//        existingProduct.setSize(products.getSize());
//        existingProduct.setMaterial(products.getMaterial());
//        existingProduct.setImage(products.getImage());
//        existingProduct.setStatus(products.getStatus());
//
//        return productsRepository.save(existingProduct);
//      }
//    }
//    return null;
//  }
//
//
//
//  @Override
//  public boolean deleteProducts(long id) {
//    if (id >= 1) {
//      Products product = productsRepository.getReferenceById(id);
//      if (product != null) {
//        productsRepository.delete(product);
//        return true;
//      }
//    }
//    return false;
//  }





//    public ProductDTO addProductBirdcagewithAccessories(ProductDTO mainProductDTO, List<AccessoryDTO> accessoryDTOs) {
//        if (mainProductDTO != null) {
//            // Create the main product entity
//            Products mainProduct = modelMapper.map(mainProductDTO, Products.class);
//
//            // Create a list to store accessory entities
//            List<Accessories> accessories = new ArrayList<>();
//
//            if (accessoryDTOs != null && !accessoryDTOs.isEmpty()) {
//                for (AccessoryDTO accessoryDTO : accessoryDTOs) {
//                    // Create each accessory entity
//                    Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
//
//                    // Set the main product as the parent for each accessory
//                    accessory.setProduct(mainProduct); // Change from getCategory() to setProduct()
//
//                    // Add each accessory to the list
//                    accessories.add(accessory);
//                }
//            }
//
//            // Set the accessories for the main product
//            mainProduct.setAccessories(accessories);
//
//            // Save the main product along with its accessories to the database
//            mainProduct = productsRepository.save(mainProduct);
//
//            // Map the saved main product with accessories back to DTO
//            ProductDTO savedMainProductDTO = modelMapper.map(mainProduct, ProductDTO.class);
//
//            return savedMainProductDTO;
//        }
//        return null;
//    }


















//    @Override
//    public ProductDTO addProductWithAccessories(ProductDTO mainProduct, List<ProductDTO> accessories, Long categoryId) {
//        if (mainProduct != null) {
//            // Check if the category exists
//            CategoryDTO category = categoriesService.getOneCategory(categoryId);
//            if (category == null) {
//                return null; // Category not found
//            }
//
//            // Set the category for the main product
//            mainProduct.setCategoryId(categoryId);
//
//            // Save the main product
//            Products mainProductEntity = modelMapper.map(mainProduct, Products.class);
//            mainProductEntity = productsRepository.save(mainProductEntity);
//
//            // Map the saved main product back to DTO
//            ProductDTO savedMainProductDTO = modelMapper.map(mainProductEntity, ProductDTO.class);
//
//            if (accessories != null && !accessories.isEmpty()) {
//                for (ProductDTO accessory : accessories) {
//                    // Set the same category for accessories
//                    accessory.setCategoryId(categoryId);
//
//                    // Save each accessory
//                    Products accessoryEntity = modelMapper.map(accessory, Products.class);
//                    accessoryEntity = productsRepository.save(accessoryEntity);
//
//                    // Map the saved accessory back to DTO
//                    ProductDTO savedAccessoryDTO = modelMapper.map(accessoryEntity, ProductDTO.class);
//
//                    // Add the accessory to the main product
//                    savedMainProductDTO.addAccessory(savedAccessoryDTO);
//                }
//            }
//
//            return savedMainProductDTO;
//        }
//        return null;
//    }





