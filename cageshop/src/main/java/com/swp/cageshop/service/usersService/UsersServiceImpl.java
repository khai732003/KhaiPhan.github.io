package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.BearerToken;
import com.swp.cageshop.DTO.LoginDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.security.JwtUtilities;
import jakarta.transaction.Transactional;

import java.io.UnsupportedEncodingException;
import java.util.*;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
//import jakarta.mail.*;
//import jakarta.mail.internet.*;


@Service
public class UsersServiceImpl implements IUsersService {

  @Autowired
  private  AuthenticationManager authenticationManager ;

  @Autowired
  private JwtUtilities jwtUtilities ;

  @Autowired
  private UsersRepository usersRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private PasswordEncoder passwordEncoder;



  @Override
  public String authenticate(LoginDTO loginDto) {
    Authentication authentication= authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginDto.getName(),
            loginDto.getPassword()
        )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    Users users = usersRepository.findByName(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    String rolesNames = users.getRole().getName();

    String token = jwtUtilities.generateToken(users.getName(),rolesNames);
    return token;
  }

  @Override
  public ResponseEntity<?> register(UserDTO userDTO) {
    if(usersRepository.existsByName(userDTO.getName()))
    { return  new ResponseEntity<>("name is already taken !", HttpStatus.SEE_OTHER); }
    else
    { Users users = modelMapper.map(userDTO, Users.class);
      users.setPassword(passwordEncoder.encode(userDTO.getPassword()));
      Users savedUsers = usersRepository.save(users);

      String token = jwtUtilities.generateToken(userDTO.getName(),users.getRole().getName());
      return new ResponseEntity<>(new BearerToken(token , "Bearer "),HttpStatus.OK);

    }
  }


  @Override
  public UserDTO updateUsers(long id, UserDTO userDTO) {
    //chuyển dto -> entity
    Users users = modelMapper.map(userDTO, Users.class);
    if (users != null) {
      Users users1 = usersRepository.getReferenceById(id);
      if (users1 != null) {
        // Lưu trữ giá trị createDate hiện tại
        Date currentCreateDate = users1.getCreateDate();

        users1.setName(users.getName());
        users1.setAddress(users.getAddress());
        users1.setPhone(users.getPhone());
        users1.setCreateDate(currentCreateDate);
        //chuyển lại dto -> enitity
        UserDTO saveUserDTO = modelMapper.map(users1, UserDTO.class);
        return saveUserDTO;
      }
    }
    return null;
  }

  @Override
  public UserDTO resetPassword(long id, UserDTO userDTO) {
    //chuyển dto -> entity
    Users users = modelMapper.map(userDTO, Users.class);
    if (users != null) {
      Users users1 = usersRepository.getReferenceById(id);
      if (users1 != null) {
        users1.setPassword(passwordEncoder.encode(users1.getPassword()));
        //chuyển lại dto -> enitity
        UserDTO saveUserDTO = modelMapper.map(users1, UserDTO.class);
        return saveUserDTO;
      }
    }
    return null;
  }

  public List<Users> listAll(){
    return usersRepository.findAll();
  }

//  @Override
//  public void sendVerificationEmail(UserDTO userDTO) throws MessagingException, UnsupportedEncodingException {
//    // Email sending code
//    try {
//    String subject = "Email xác thực tài khoản BirdCageShop";
//    String senderName = "Đội ngũ Steam";
//    String mailContent = "<p>Hello " + userDTO.getFullname() + ",</p>";
//    mailContent += "<p>Để tiếp tục tạo tài khoản Steam mới, vui lòng xác thực địa chỉ email của bạn bên dưới. " +
//            "\n" +
//            "Steam\n" +
//            "Để tiếp tục tạo tài khoản Steam mới, vui lòng xác thực địa chỉ email của bạn bên dưới.\n" +
//            "XÁC THỰC ĐỊA CHỈ EMAIL CỦA TÔI   \n" +
//            "Bạn phải xác thực địa chỉ email của mình để sử dụng những tính năng như bảo mật Steam Guard, chợ cộng đồng, trao đổi Steam, cũng như là để lấy lại tài khoản của mình một cách an toàn trong tương lai. " +
//            "Nếu gần đây bạn chưa từng dùng địa chỉ email này để tạo tài khoản Steam mới, xin hãy phớt lờ email này..</p>";
//    String verifyURL = "https://example.com/verify?code=" + userDTO.getVerfiCode(); // Update with your verification URL
//    mailContent += "<a href='" + verifyURL
//            + "' style='background-color: blue; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;'>XÁC THỰC ĐỊA CHỈ EMAIL CỦA TÔI</a>";
//    mailContent += "<p>Chúc vui vẻ,</p>";
//    mailContent += "<p>Đội ngũ Steam</p></br>";
//
//    // Set up mail server properties
//    Properties properties = System.getProperties();
//    properties.setProperty("mail.smtp.host", "your-smtp-server.com"); // Update with your SMTP server
//    properties.setProperty("mail.smtp.port", "your-smtp-port"); // Update with your SMTP port
//    properties.setProperty("mail.smtp.auth", "true");
//
//    // Create a session with authentication
//    Session session = Session.getInstance(properties, new Authenticator() {
//      protected PasswordAuthentication getPasswordAuthentication() {
//        return new PasswordAuthentication("your-email@gmail.com", "your-password"); // Update with your email and password
//      }
//    });
//
//    // Create a MimeMessage
//    MimeMessage message = new MimeMessage(session);
//
//    // Set From, To, Subject, and Content
//    message.setFrom(new InternetAddress("your-email@gmail.com", senderName)); // Update with your email and sender name
//    message.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(userDTO.getEmail()));
//    message.setSubject(subject);
//    message.setContent(mailContent, "text/html");
//
//    // Send the message
//    Transport.send(message);
//  } catch (UnsupportedEncodingException e) {
//    // Handle the exception here or log it
//    e.printStackTrace();
//  }
//  }
//
//  public ResponseEntity<?> registerUser(UserDTO userDTO) {
//    Users users = modelMapper.map(userDTO, Users.class);
//    // Check if a user with the provided email already exists
//
//    if (usersRepository.existsByEmail(users.getEmail())) {
//      throw new UserAlreadyExistsException("A user with this email already exists.");
//    }
//
//    users.setEmail(users.getEmail());
//    users.setName(users.getName());
//    users.setFullname(users.getFullname());
//    users.setGender(users.getGender());
//    users.setPassword(passwordEncoder.encode(users.getPassword()));
//    users.setImage(users.getImage());
//    users.setPhone(users.getPhone());
//    users.setAddress(users.getAddress());
//    users.setRole(users.getRole());
//    users.setDepend_id(users.getDepend_id());
//
//    // Generate a verification code (you can use a UUID or any other method)
//    String verificationCode = UUID.randomUUID().toString();
//    users.setVerfiCode(verificationCode);
//    usersRepository.save(users);
//
//    UserDTO saveUserDTO = modelMapper.map(users, UserDTO.class);
//
//    String token = jwtUtilities.generateToken(userDTO.getName(),users.getRole().getName());
//    return new ResponseEntity<>(new BearerToken(token , "Bearer "),HttpStatus.OK);
//
//    // Send a verification email
//    try {
//      sendVerificationEmail(saveUserDTO.);
//    } catch (MessagingException | UnsupportedEncodingException e) {
//      // Handle email sending errors
//      e.printStackTrace();
//    }
//  }
//
//  public class UserAlreadyExistsException extends RuntimeException {
//
//    public UserAlreadyExistsException(String message) {
//      super(message);
//    }
//  }

}
