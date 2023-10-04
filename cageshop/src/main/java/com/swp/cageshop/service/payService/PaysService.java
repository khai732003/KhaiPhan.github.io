package com.swp.cageshop.service.payService;

import org.modelmapper.ModelMapper;
import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.PayDTO;
import com.swp.cageshop.DTO.VnPayConstant;
import com.swp.cageshop.config.Config;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Pays;
import com.swp.cageshop.repository.PaysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class PaysService implements PaysServiceImpl {

    @Autowired
    private PaysRepository paysRepository;

    @Autowired
    private ModelMapper modelMapper;

    public String payWithVNPAY(PayDTO payDTO, HttpServletRequest request) throws UnsupportedEncodingException {
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());

        Random random = new Random();
        Long randomTxnRef = (long) (100000000 + random.nextInt(900000000));

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VnPayConstant.vnp_Version);
        vnp_Params.put("vnp_Command", VnPayConstant.vnp_Command);
        vnp_Params.put("vnp_TmnCode", VnPayConstant.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf((long) (payDTO.getVnp_Ammount() * 100.0)));  // Chuyển đổi và nhân với 100, sau đó đặt vào vnp_Amount
        vnp_Params.put("vnp_BankCode", payDTO.vnp_BankCode);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_CurrCode", VnPayConstant.vnp_CurrCode);
        vnp_Params.put("vnp_IpAddr", Config.getIpAddress(request));
        vnp_Params.put("vnp_Locale", VnPayConstant.vnp_Locale);
        vnp_Params.put("vnp_OrderInfo", payDTO.vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", payDTO.vnp_OrderType);
        vnp_Params.put("vnp_ReturnUrl", VnPayConstant.vnp_ReturnUrl);
        vnp_Params.put("vnp_TxnRef", String.valueOf(randomTxnRef));
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

        Pays paysEntity = modelMapper.map(payDTO, Pays.class);
        paysRepository.save(paysEntity);

        return paymentUrl;
    }


    @Override
    public List<PayDTO> getAllPayDTO() {
        List<Pays> payEntities = paysRepository.findAll();
        List<PayDTO> payDTOList = new ArrayList<>();

        for (Pays pays : payEntities) {
            PayDTO payDTO = modelMapper.map(pays, PayDTO.class);
            payDTOList.add(payDTO);
        }

        return payDTOList;
    }

}
