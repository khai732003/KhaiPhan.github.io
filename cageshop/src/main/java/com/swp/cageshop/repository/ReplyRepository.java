package com.swp.cageshop.repository;

import com.swp.cageshop.entity.Marketings;
import com.swp.cageshop.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {

}
