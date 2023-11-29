package com.swp.cageshop.service.productsService;

import com.swp.cageshop.DTO.*;
import com.swp.cageshop.entity.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import com.swp.cageshop.repository.*;
import com.swp.cageshop.service.categoriesService.ICategoriesService;
import com.swp.cageshop.service.productsService.NewCage.IMaterialService;
import com.swp.cageshop.service.productsService.NewCage.ISizeService;
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

    @Autowired
    private IMaterialService materialService;

    @Autowired
    private ISizeService sizeService;

    @Autowired
    private MaterialRepository materialRepository;


    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private ShapeRepository shapeRepository;


    @Override
    public List<Products> listByOrderId(Long orderId){
        return productsRepository.listProByOrderId(orderId);
    }

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
                product.setTotalPrice(productDTO.getTotalPrice());
                Products savedProduct = productsRepository.save(product); // Save the product

                if (productDTO.getCage() != null) {
                    BirdCages birdCages = createBirdCagesFromDto(productDTO.getCage(), savedProduct);

                    // Additional logic for spokes adjustment
                    if (birdCages.getSize().getMinspokes() > birdCages.getSpokes()) {
                        birdCages.setSpokes(birdCages.getSize().getMinspokes());
                    } else if ( birdCages.getSize().getMaxspokes() < birdCages.getSpokes() ) {
                        birdCages.setSpokes(birdCages.getSize().getMaxspokes());
                    }
                    double totalPrice = 0;
                    int spokes = birdCages.getSpokes();

                    if (birdCages.getMaterial() != null) {
                        totalPrice += birdCages.getMaterial() .getPrice();
                    }
                    if (birdCages.getShape() != null) {
                        totalPrice += birdCages.getShape().getPrice();
                    }

                    if (birdCages.getSize() != null && spokes >= birdCages.getSize().getMinspokes() && spokes <= birdCages.getSize().getMaxspokes()) {
                        totalPrice +=   birdCages.getSize().getPrice() * spokes;
                    }


                    birdCages.setBirdCagePrice(totalPrice);

                    product.setTotalPrice(totalPrice);


                    birdCageRepository.save(birdCages);
                }

                if (productDTO.getAccessories() != null) {
                    for (AccessoryDTO accessoryDTO : productDTO.getAccessories()) {
                        Accessories accessory = modelMapper.map(accessoryDTO, Accessories.class);
                        accessory.setCustomProduct(false);
                        accessory.setProduct(savedProduct); // Set the product for the accessory
                        product.setTotalPrice(product.getTotalPrice()+accessory.getPrice());
                        accessoryDTO.setProductId(savedProduct.getId());
                        accessoriesRepository.save(accessory);
                    }
                }

                if(productDTO.getExtraPrice() > 0){
                    product.setTotalPrice(product.getTotalPrice() + product.getExtraPrice());
                }

//                product.setTotalPrice(productDTO.getTotalPrice());




                ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);
                deleteBirdCagesWithNullProductId();
                deleteAccessoriesWithNullProductIdAndCustomProductNotNull();
                return savedProductDTO;
            }
        }
        return null;
    }

    private BirdCages createBirdCagesFromDto(BirdCageDTO cageDTO, Products savedProduct) {
        BirdCages birdCages = modelMapper.map(cageDTO, BirdCages.class);

        // Set the product for the bird cage
        birdCages.setProduct(savedProduct);

        // Set the product ID for the bird cage (assuming savedProduct.getId() returns a valid ID)
        birdCages.setId(savedProduct.getId());

        // Fetch MaterialDTO and SizeDTO based on the provided IDs
        var material = materialRepository.findById(cageDTO.getMaterialId()).orElse(null);
        var size = sizeRepository.findById(cageDTO.getSizeId()).orElse(null);
        var shape = shapeRepository.findById(cageDTO.getShapeId()).orElse(null);


        if (material != null && size != null && shape !=null) {
            birdCages.setSize(size);
            birdCages.setMaterial(material);
            birdCages.setShape(shape);
        }

        return birdCages;
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



    @Override
    public ProductDTO updateProduct(long id, ProductDTO productDTO) {
        if (productDTO == null) {
            return null;
        }

        Optional<Products> optionalExistingProduct = productsRepository.findById(id);
        if (optionalExistingProduct.isPresent()) {
            Products existingProduct = optionalExistingProduct.get();

            updateOrAddBirdCage(existingProduct, productDTO);
            updateOrAddAccessories(existingProduct, productDTO);
            updateProductFields(existingProduct, productDTO);

            existingProduct.setTotalPrice(existingProduct.getExtraPrice() + existingProduct.getCage().getBirdCagePrice());
            // Save the updated product
            Products updatedProduct = productsRepository.save(existingProduct);

            // Map the updated product to a DTO
            return modelMapper.map(updatedProduct, ProductDTO.class);
        }

        return null;
    }

    private void updateProductFields(Products existingProduct, ProductDTO productDTO) {
        existingProduct.setName(productDTO.getName());
        existingProduct.setCode(productDTO.getCode());
        existingProduct.setProductImage(productDTO.getProductImage());
        existingProduct.setProductDetailImage(productDTO.getProductDetailImage());
//        existingProduct.setTotalPrice(existingProduct.getTotalPrice()-existingProduct.getExtraPrice()+productDTO.getExtraPrice());
        existingProduct.setStock(productDTO.getStock());
        existingProduct.setExtraPrice(productDTO.getExtraPrice());
        existingProduct.setStatus(productDTO.getStatus());
        Categories category = categoriesRepository.findById(productDTO.getCategoryId()).orElse(null);
        if (category != null) {
            existingProduct.setCategory(category);
        }
    }

    private void updateOrAddBirdCage(Products existingProduct, ProductDTO productDTO) {
        if (productDTO.getCage() != null) {
            BirdCages existingCage = existingProduct.getCage();

//            if (existingCage == null) {
//                // If no existing cage, create a new one and set its properties
//                BirdCages newCage = modelMapper.map(productDTO.getCage(), BirdCages.class);
//                newCage.setProduct(existingProduct);
////                existingProduct.setTotalPrice(existingProduct.getTotalPrice()-existingProduct.getCage().getBirdCagePrice() + newCage.getBirdCagePrice());
//                existingProduct.setCage(newCage);
//            } else {
                // If existing cage, update its properties
                BirdCages updatedCage = modelMapper.map(productDTO.getCage(), BirdCages.class);

                // Set the existing cage's ID and product reference
//                existingProduct.setTotalPrice(existingProduct.getTotalPrice()-existingProduct.getCage().getBirdCagePrice() + updatedCage.getBirdCagePrice());
                updatedCage.setId(existingCage.getId());
                updatedCage.setProduct(existingProduct);
            var material = materialRepository.findById(productDTO.getCage().getMaterialId()).orElse(null);
            var size = sizeRepository.findById(productDTO.getCage().getSizeId()).orElse(null);
            var shape = shapeRepository.findById(productDTO.getCage().getShapeId()).orElse(null);


            if (material != null && size != null && shape !=null) {
                updatedCage.setSize(size);
                updatedCage.setMaterial(material);
                updatedCage.setShape(shape);
            }

                // Update the existing cage with the mapped values
                modelMapper.map(updatedCage, existingCage);
                existingCage.setBirdCagePrice(existingCage.getMaterial().getPrice() + existingCage.getShape().getPrice() + (existingCage.getSize().getPrice()*existingCage.getSpokes()));
            }
        }
//    }

    private void updateOrAddAccessories(Products existingProduct, ProductDTO productDTO) {
        if (productDTO.getAccessories() != null) {
            List<Accessories> existingAccessories = existingProduct.getAccessories();
            existingAccessories.clear(); // Remove existing accessories

            for (AccessoryDTO accessoryDTO : productDTO.getAccessories()) {
                existingAccessories.add(modelMapper.map(accessoryDTO, Accessories.class));
            }
        }
    }



    @Override
    public boolean deleteProduct(long id) {
        if (id >= 1) {
            Products product = productsRepository.getReferenceById(id);
            BirdCages deletedbirdcage = product.getCage();
            if (product != null) {
                productsRepository.delete(product);
                birdCageRepository.delete(deletedbirdcage);
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
            modifyProductNameAndStatus(product);

            // Modify cage price
            modifyCagePrice(product);

            // Save the updated product
            Products updatedProduct = productsRepository.save(product);

            // Map the updated product to a DTO
            return modelMapper.map(updatedProduct, ProductDTO.class);
        }

        return null;
    }

    private void modifyProductNameAndStatus(Products product) {
        String name = "[SPECIAL]" + product.getName();
        product.setName(name);
        product.setStatus("Available");
    }

    private void modifyCagePrice(Products product) {
        BirdCages cage = product.getCage();

        if (cage != null) {
            double cagePrice = cage.getBirdCagePrice();
            double discountedPrice = cagePrice - (cagePrice * 0.1);

            // Ensure the discounted price is not negative
            cage.setBirdCagePrice(Math.max(discountedPrice, 0));
        }
    }


    public ProductDTO cloneAndAddAccessories(Long productId, List<AccessoryDTO> accessories) {
        Optional<Products> optionalProduct = productsRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Products originalProduct = optionalProduct.get();

            // Check if there is enough stock to clone
            if (originalProduct.getStock() > 0) {
                cloneProductAndUpdateStock(originalProduct);

                // Create a new instance for the cloned product
                Products clonedProduct = createClonedProduct(originalProduct);

                // Clone bird cage, if exists
                if (originalProduct.getCage() != null) {
                    cloneBirdCage(originalProduct.getCage(), clonedProduct);
                }

                // Clone existing accessories and add new accessories
                List<Accessories> productAccessories = cloneAndAddAccessories(originalProduct, accessories, clonedProduct);

                // Update and save the cloned product
                clonedProduct.setAccessories(productAccessories);
                Products updatedProduct = productsRepository.save(clonedProduct);

                return modelMapper.map(updatedProduct, ProductDTO.class);
            }
        }

        return null;
    }

    private void cloneProductAndUpdateStock(Products product) {
        if (product.getOrderLevel() == null) {
            product.setOrderLevel(0);
        }
        product.setOrderLevel(product.getOrderLevel() + 1);
        product.setStock(product.getStock() - 1);

        // If stock is zero, mark as OutOfStock
        if (product.getStock() == 0) {
            product.setOrderLevel(product.getOrderLevel() + 1);
            product.setStatus("OutOfStock");
        }

        productsRepository.save(product);
    }

    private Products createClonedProduct(Products originalProduct) {
        Products clonedProduct = new Products();
        clonedProduct.setName(originalProduct.getName());
        clonedProduct.setStock(1);
        clonedProduct.setMotherProductId(originalProduct.getId());
        clonedProduct.setProductImage(originalProduct.getProductImage());
        clonedProduct.setCode(originalProduct.getCode());

        // Clone the category
        Categories category = categoriesRepository.findById(originalProduct.getCategory().getId()).orElse(null);
        if (category != null) {
            clonedProduct.setCategory(category);
        }

        clonedProduct.setStatus("CustomProduct");
        return clonedProduct;
    }

    private void cloneBirdCage(BirdCages originalBirdCage, Products clonedProduct) {
        BirdCages clonedBirdCage = new BirdCages();
        clonedBirdCage.setDescription(originalBirdCage.getDescription());
        clonedBirdCage.setMaterial(originalBirdCage.getMaterial());
        clonedBirdCage.setSize(originalBirdCage.getSize());
        clonedBirdCage.setMaterial(originalBirdCage.getMaterial());
        clonedBirdCage.setBirdCagePrice(originalBirdCage.getBirdCagePrice());
        clonedBirdCage.setProduct(clonedProduct);
        clonedProduct.setCage(clonedBirdCage);
    }

    private List<Accessories> cloneAndAddAccessories(
            Products originalProduct, List<AccessoryDTO> accessories, Products clonedProduct) {
        List<Accessories> productAccessories = new ArrayList<>();

        // Clone existing accessories
        for (Accessories originalAccessory : originalProduct.getAccessories()) {
            Accessories clonedAccessory = new Accessories();
            clonedAccessory.setDescription(originalAccessory.getDescription());
            clonedAccessory.setPrice(originalAccessory.getPrice());
            clonedAccessory.setType(originalAccessory.getType());
            clonedAccessory.setProduct(clonedProduct);
            productAccessories.add(clonedAccessory);
        }

        // Add new accessories
        double totalPrice = 0;
        for (AccessoryDTO accessoryDTO : accessories) {
            Accessories newAccessory = new Accessories();
            newAccessory.setDescription(accessoryDTO.getDescription());
            newAccessory.setPrice(accessoryDTO.getPrice());
            newAccessory.setType(accessoryDTO.getType());
            totalPrice += newAccessory.getPrice();
            newAccessory.setProduct(clonedProduct);
            productAccessories.add(newAccessory);
        }

        // Update the total price for the cloned product
        clonedProduct.setTotalPrice(originalProduct.getTotalPrice() + totalPrice);

        return productAccessories;
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
    public List<Products> listAllProducts() {
        List<Products> products = productsRepository.findAll();
        // Convert the list of Products to a list of ProductDTOs
        return products;
    }


    @Override
    public Optional<Products> listProducts(long id) {
        Optional<Products> product = productsRepository.findById(id);
        if (product != null) {

            return product;
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

    public List<Products> getProductsSortedByCreateDateDESC() {
        List<Products> products = productsRepository.findAllProductsSortedByCreateDateDesc();
return products;
//        return products.stream()
//                .map(product -> modelMapper.map(product, ProductDTO.class))
//                .collect(Collectors.toList());
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