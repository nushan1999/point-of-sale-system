package com.ijse.posspring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.posspring.entity.Stock;
import com.ijse.posspring.repository.StockRepository;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;

    @Override
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @Override
    public Stock getStockById(Long id) {
        return stockRepository.findById(id).orElse(null);
    }

    @Override
    public Stock createStock(Stock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public Stock updateStock(Long id, Stock stock) {
        Stock existStock = stockRepository.findById(id).orElse(null);

        if (existStock != null) {
            existStock.setQuantity(stock.getQuantity());
            existStock.setItem(stock.getItem());
            return stockRepository.save(existStock);
        } else {
            return null;
        }

    }

    @Override
    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}
