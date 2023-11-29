package com.swp.cageshop.security;

import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.security.CustomeUserDetail;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomerUserDetailsService implements UserDetailsService {
    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> users = usersRepository.findByName(username);

        return users.map(CustomeUserDetail::new)
            .orElseThrow(() -> new UsernameNotFoundException("user not found: " + username));
    }
}

