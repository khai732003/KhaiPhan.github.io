package com.swp.cageshop.security;
import static org.springframework.security.config.Customizer.withDefaults;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.filters.CorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  @Autowired
  private final JwtAuthenticationFilter jwtAuthenticationFilter ;

  private final CustomerUserDetailsService customerUserDetailsService ;

  @Bean
  public UserDetailsService userDetailsService() {

    return customerUserDetailsService;
  }

  @Bean
  public AuthenticationProvider authenticationProvider(){
    DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
    authenticationProvider.setUserDetailsService(userDetailsService());
    authenticationProvider.setPasswordEncoder(passwordEncoder());
    return authenticationProvider;
  }

//  @Bean
//  public CorsFilter corsFilter() {
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    CorsConfiguration config = new CorsConfiguration();
//    config.addAllowedOrigin("*"); // Cho phép tất cả các origin
//    config.addAllowedMethod("*"); // Cho phép tất cả các phương thức (GET, POST, PUT, DELETE, v.v.)
//    config.addAllowedHeader("*"); // Cho phép tất cả các header
//    source.registerCorsConfiguration("/**", config);
//    return new CorsFilter(source);
//  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception
  { return authenticationConfiguration.getAuthenticationManager();}

  @Bean
  public PasswordEncoder passwordEncoder()
  { return new BCryptPasswordEncoder(); }
//==============================================================
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

  http.csrf(AbstractHttpConfigurer::disable)
      .authorizeHttpRequests(authorize -> authorize
              .anyRequest().permitAll()
//          .requestMatchers("/cageshop/user/register","/cageshop/role/add","/cageshop/register").permitAll()
//          .anyRequest().authenticated()
      )
      .formLogin(withDefaults());
  http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);




  return http.build();
}
}
//http
//      .authorizeHttpRequests((authz) -> {
//        authz
//            .requestMatchers("/cageshop/api/user/register",
//                "/cageshop/api/product/get-list",
//                "/cageshop/api/product/select/**")
//            .permitAll()
//            .anyRequest().authenticated();
//      })
//      .formLogin(AbstractAuthenticationFilterConfigurer::permitAll);
//
//  http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


