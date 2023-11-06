package com.swp.cageshop.security;
import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;

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
import org.springframework.web.cors.CorsConfigurationSource;
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

  @Bean
  public UrlBasedCorsConfigurationSource corsConfigurationSource() {

    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowCredentials(true);
//    configuration.setAllowedOrigins(List.of("http://localhost:3000"));
    configuration.setAllowedOrigins(Collections.singletonList("*"));
    configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));
    configuration.setAllowedHeaders(List.of("*"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
  }

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
//          .requestMatchers("/cageshop/api/user/register","/cageshop/api/product/list-date-desc",
//              "/cageshop/api/user/authenticate","/cageshop/api/product/top3",
//              "/cageshop/api/marketing/list").permitAll()
//          .anyRequest().authenticated()
        );
//      .cors(c -> c.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()));
    http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}