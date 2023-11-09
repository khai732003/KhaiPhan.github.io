package com.swp.cageshop.repository;

import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.entity.Categories;
import com.swp.cageshop.entity.Products;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductsRepository extends JpaRepository<Products,Long> {

    void deleteAll();

    List<Products> findByCategory(Categories category);

    Products findProductIdByOrderDetail_Id(Long orderDetailId);

  @Query(value = "SELECT * FROM products p ORDER BY p.create_date DESC LIMIT 3",
      nativeQuery = true)
  List<Products> findTop3NewestProducts();
    //Status
    @Query("SELECT p FROM Products p WHERE p.status = 'New'")
    List<Products> findProductsByStatusNew();

  @Query("SELECT p FROM Products p WHERE p.status = 'CustomProduct'")
  List<Products> findProductsByStatusCustomProduct();

    @Query("SELECT p FROM Products p WHERE p.status = 'Available'")
    List<Products> findProductsByStatusAvailable();


    @Query("SELECT p FROM Products p WHERE p.status = 'NoMoreMade'")
    List<Products> findProductsByStatusNoMoreMade();

    @Query("SELECT p FROM Products p WHERE p.stock = 0")
    List<Products> findProductsOutOfStock();

    @Query("SELECT p FROM Products p WHERE p.cage IS NOT NULL AND p.accessories IS NOT EMPTY")
    List<Products> findProductsWithCageAndAccessories();


    @Query("SELECT p FROM Products p WHERE p.accessories IS NOT EMPTY")
    List<Products> findProductsWithAccessories();

    @Query("SELECT p FROM Products p WHERE p.accessories IS EMPTY")
    List<Products> findProductsWithoutAccessories();

    @Query("SELECT p FROM Products p WHERE p.cage IS NULL")
    List<Products> findProductsWithoutCage();

   //Cage
    @Query("SELECT p FROM Products p JOIN BirdCages b ON p.id = b.product.id WHERE b.material = :material")
    List<Products> findByMaterial(@Param("material") String material);

    @Query("SELECT p FROM Products p JOIN BirdCages b ON p.id = b.product.id WHERE b.size = :size")
    List<Products> findBySize(@Param("size") String size);


    //Accessories
    @Query("SELECT p FROM Products p JOIN p.accessories a WHERE a.type = :accessoryType")
    List<Products> findProductsByAccessoriesType(@Param("accessoryType") String accessoryType);


  //Sort
    @Query("SELECT p FROM Products p ORDER BY p.totalPrice ASC")
    List<Products> findProductsByTotalPriceAsc();

    @Query("SELECT p FROM Products p ORDER BY p.totalPrice DESC")
    List<Products> findProductsByTotalPriceDesc();


//    List<Products> findProductsByDescriptionContaining(String keyword);


  @Query("SELECT p FROM Products p WHERE p.status = 'Available'  ORDER BY p.createDate DESC" )
  List<Products> findAllProductsSortedByCreateDateDesc();



    @Query("SELECT p FROM Products p ORDER BY p.createDate ASC")
    List<Products> findAllProductsSortedByCreateDateAsc();



    @Query("SELECT p FROM Products p WHERE p.createDate BETWEEN :startDate AND :endDate")
    List<Products> findByReleaseDateBetween(@Param("startDate") Date startDate,
                                            @Param("endDate") Date endDate);

    @Query("SELECT p FROM Products p WHERE p.stock <= :maxStock")
    List<Products> findProductsWithLimitedStock(@Param("maxStock") int maxStock);

    @Query("SELECT p FROM Products p WHERE p.totalPrice BETWEEN :minPrice AND :maxPrice")
    List<Products> findByPriceBetween(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);

    @Query("SELECT p.name, c.description FROM Products p JOIN BirdCages c ON p.id = c.product.id WHERE c.description LIKE %:keyword%")
    List<Products> findProductsByKeyword(@Param("keyword") String keyword);


///////////////////////////////////////////////////////
    // Still not use or unable, need fix!



//    @Query("SELECT p FROM Products p WHERE p.type = :type AND p.size = :size")
//    List<Products> findByTypeAndSize(@Param("type") String type, @Param("size") String size);
//
//    @Query("SELECT p FROM Products p WHERE p.type = :type AND p.price BETWEEN :minPrice AND :maxPrice")
//    List<Products> findByTypeAndPriceBetween(@Param("type") String type, @Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);
//
//    @Query("SELECT p FROM Products p WHERE p.type = :type AND p.size = :size AND p.material = :material")
//    List<Products> findByTypeAndSizeAndMaterial(@Param("type") String type, @Param("size") String size, @Param("material") String material);
//
//    @Query("SELECT p FROM Products p WHERE p.type = :type AND p.material = :material AND p.price BETWEEN :minPrice AND :maxPrice")
//    List<Products> findByTypeAndMaterialAndPriceBetween(
//            @Param("type") String type,
//            @Param("material") String material,
//            @Param("minPrice") double minPrice,
//            @Param("maxPrice") double maxPrice
//    );
//
////
//
//    @Query("SELECT p FROM Products p WHERE p.type = :type AND p.material = :material")
//    List<Products> findByTypeAndMaterial(@Param("type") String type, @Param("material") String material);
//    ;
//    @Query("SELECT p FROM Products p WHERE p.category = :category AND p.status = :status")
//    List<Products> findByCategoryAndStatus(@Param("category") Categories category, @Param("status") String status);
//    @Query("SELECT p FROM Products p WHERE p.category = :category AND p.type = :type")
//    List<Products> findByCategoryAndType(@Param("category") Categories category, @Param("type") String type);
//
//
//    @Query("SELECT p FROM Products p WHERE p.category = :category AND p.price BETWEEN :minPrice AND :maxPrice")
//    List<Products> findByCategoryAndPriceBetween(
//            @Param("category") Categories category,
//            @Param("minPrice") double minPrice,
//            @Param("maxPrice") double maxPrice
//    );
//    @Query("SELECT p FROM Products p WHERE p.category = :category AND p.size = :size")
//    List<Products> findByCategoryAndSize(@Param("category") Categories category, @Param("size") String size);
//
//
//    List<Products> findRecommendedProducts(Pageable pageable);
//
//    List<Products> findBestSellingProducts(Pageable pageable);

//    List<Products> findAll(Sort sort);

//    @Query("SELECT p FROM Products p JOIN p.cage c WHERE c.material = :material")
//    List<Products> findByMaterial(@Param("material") String material);


//    @Query("SELECT p FROM Products p JOIN p.cage c WHERE c.size = :size")
//    List<Products> findBySize(@Param("size") String size);
//    @Query("SELECT p FROM Products p WHERE p.accessories IS NOT NULL")
//    List<Products> findProductsWithAccessories();
//
//    @Query("SELECT p FROM Products p WHERE p.accessories IS NULL")
//    List<Products> findProductsWithoutAccessories();
//
//
//    @Query("SELECT p FROM Products p LEFT JOIN BirdCages b ON p.id = b.product_id  WHERE b.product_id IS NULL")
//    List<Products> findProductsWithoutCage();


//    @Query("SELECT p FROM Products p JOIN p.accessories a WHERE a.type = :type")
//    List<Products> findByType(@Param("type") String type);
//

}
