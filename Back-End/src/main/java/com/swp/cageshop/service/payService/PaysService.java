package com.swp.cageshop.service.payService;

import com.swp.cageshop.DTO.PaymentDTO;
import com.swp.cageshop.DTO.VnPayDTO;
import com.swp.cageshop.config.ShippingStatus;
import com.swp.cageshop.entity.*;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.service.productsService.IProductsService;
import org.modelmapper.ModelMapper;
import com.swp.cageshop.DTO.VnPayConstant;
import com.swp.cageshop.config.Config;
import com.swp.cageshop.repository.PaysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.web.servlet.view.RedirectView;


@Service
public class PaysService implements PaysServiceImpl {

    @Autowired
    private PaysRepository paysRepository;

    @Autowired
    private OrdersRepository ordersRepository;


    @Autowired
    private IProductsService productsService;

    @Autowired
    private ModelMapper modelMapper;


    public String payWithVNPAY(VnPayDTO vnPayDTO, HttpServletRequest request) throws UnsupportedEncodingException {
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());

        String randomTxnRef = Config.getRandomNumber(8);

        Long orderId = vnPayDTO.getOrderId();
        Orders orders = ordersRepository.getReferenceById(orderId);
        double getPrice = orders.getTotal_Price();
        System.out.println("The value of total_price is: " + getPrice);
        vnPayDTO.setPaymentCode(randomTxnRef);
        vnPayDTO.setPrice(getPrice);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VnPayConstant.vnp_Version);
        vnp_Params.put("vnp_Command", VnPayConstant.vnp_Command);
        vnp_Params.put("vnp_TmnCode", VnPayConstant.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf((long) (getPrice * 100.0)));  // Chuyển đổi và nhân với 100, sau đó đặt vào vnp_Amount
        vnp_Params.put("vnp_BankCode", vnPayDTO.vnp_BankCode);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_CurrCode", VnPayConstant.vnp_CurrCode);
        vnp_Params.put("vnp_IpAddr", Config.getIpAddress(request));
        vnp_Params.put("vnp_Locale", VnPayConstant.vnp_Locale);
        vnp_Params.put("vnp_OrderInfo", vnPayDTO.vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", vnPayDTO.vnp_OrderType);
        vnp_Params.put("vnp_ReturnUrl", VnPayConstant.vnp_ReturnUrl);
        vnp_Params.put("vnp_TxnRef", randomTxnRef);
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldList = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldList);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator itr = fieldList.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                if (itr.hasNext()) {
                    query.append("&");
                    hashData.append("&");
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(VnPayConstant.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VnPayConstant.vnp_Url + "?" + queryUrl;
        return paymentUrl;
    }


    @Override
    public List<VnPayDTO> getAllPayDTO() {
        List<Pays> payEntities = paysRepository.findAll();
        List<VnPayDTO> payDTOList = new ArrayList<>();

        for (Pays pays : payEntities) {
            VnPayDTO payDTO = modelMapper.map(pays, VnPayDTO.class);
            payDTOList.add(payDTO);
        }

        return payDTOList;
    }

    public List<VnPayDTO> getAllPayDTOByUserId(Long userId) {
        List<Pays> payEntities = paysRepository.findByOrder_User_Id(userId);
        List<VnPayDTO> payDTOList = new ArrayList<>();

        for (Pays pays : payEntities) {
            VnPayDTO payDTO = modelMapper.map(pays, VnPayDTO.class);
            payDTOList.add(payDTO);
        }

        return payDTOList;
    }

    public RedirectView handleTransaction() {
        // Redirect to the specified URL when the condition is met
        return new RedirectView("http://localhost:8086/paid-success");

    }

    @Override
    public double getTotalRevenueFromCompletedPays() {
        double totalRevenue = 0;
        List<Orders> orders = ordersRepository.findByPayStatusAndShipStatus("PAID", "DELIVERED");
        for (Orders order : orders) {
            totalRevenue += order.getTotal_Price();
        }
        return totalRevenue;
    }


    @Override
    public double getTotalRevenueByDateFromCompletedPays(Date date) {
        double totalRevenue = 0;
        List<Pays> pay = paysRepository.findByStatusAndCreateDate("COMPLETED", date); // Gọi phương thức từ repository với tham số ngày
        for (Pays pays : pay) {
            totalRevenue += pays.getPrice();
        }
        return totalRevenue;
    }

    public List<Map<String, Object>> getRevenueByDate() {
        List<Orders> orders = ordersRepository.findByPayStatusAndShipStatus("PAID", "DELIVERED");
        List<Pays> completedPays = new ArrayList<>();
        for (Orders order : orders) {
            Pays pay = order.getPays();
            completedPays.add(pay);
        }
        List<Map<String, Object>> result = completedPays.stream()
            .collect(Collectors.groupingBy(
                p -> p.getCreateDate()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate(),
                Collectors.summingDouble(Pays::getPrice)
            ))
            .entrySet()
            .stream()
            .map(entry -> {
                Map<String, Object> item = new HashMap<>();
                item.put(entry.getKey().toString(), entry.getValue());
                return item;
            })
            .collect(Collectors.toList());

        return result;
    }


    public List<Map<String, Object>> getRevenueByMonth() {
        List<Orders> orders = ordersRepository.findByPayStatusAndShipStatus("PAID", "DELIVERED");
        List<Pays> completedPays = new ArrayList<>();
        for (Orders order : orders) {
            Pays pay = order.getPays();
            completedPays.add(pay);
        }
        Map<YearMonth, Double> resultMap = completedPays.stream()
            .collect(Collectors.groupingBy(
                p -> YearMonth.from(p.getCreateDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate()),
                Collectors.summingDouble(Pays::getPrice)
            ));

        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Map.Entry<YearMonth, Double> entry : resultMap.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put(entry.getKey().toString(), entry.getValue());
            resultList.add(item);
        }

        return resultList;
    }

    public List<Map<String, Object>> getRevenueByYear() {
        List<Orders> orders = ordersRepository.findByPayStatusAndShipStatus("PAID", "DELIVERED");
        List<Pays> completedPays = new ArrayList<>();
        for (Orders order : orders) {
            Pays pay = order.getPays();
            completedPays.add(pay);
        }
        Map<Year, Double> resultMap = completedPays.stream()
            .collect(Collectors.groupingBy(
                p -> Year.from(p.getCreateDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate()),
                Collectors.summingDouble(Pays::getPrice)
            ));

        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Map.Entry<Year, Double> entry : resultMap.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put(entry.getKey().toString(), entry.getValue());
            resultList.add(item);
        }

        return resultList;
    }
    public void updateCreateDate(Long paysId, Date newCreateDate) {
        Optional<Pays> paysOptional = paysRepository.findById(paysId);
        if (paysOptional.isPresent()) {
            Pays pays = paysOptional.get();
            pays.setCreateDate(newCreateDate);
            paysRepository.save(pays);
        } else {
        }
    }
    public boolean checkPays(Long orderId){
        return paysRepository.existsByOrderId(orderId);
    }

}
