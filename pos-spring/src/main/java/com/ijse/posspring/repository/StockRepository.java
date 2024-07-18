package com.ijse.posspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.posspring.entity.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock,Long> {
    
}
