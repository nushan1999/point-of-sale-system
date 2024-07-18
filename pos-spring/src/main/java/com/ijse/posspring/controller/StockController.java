package com.ijse.posspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.posspring.dto.StockDto;
import com.ijse.posspring.entity.Item;
import com.ijse.posspring.entity.Stock;
import com.ijse.posspring.service.ItemService;
import com.ijse.posspring.service.StockService;

@RestController
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockService stockService;

    @Autowired
    private ItemService itemService;

    @GetMapping("/stocks")
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/stocks/{id}")
    public Stock getStockById(@PathVariable Long id) {
        return stockService.getStockById(id);
    }

    @PostMapping("/stocks")
    public ResponseEntity<Stock> createStock(@RequestBody StockDto stockDto) {

        Stock stock = new Stock();
        stock.setQuantity(stockDto.getQuantity());
        
        Item item = itemService.getItemById(stockDto.getItemId());
        stock.setItem(item);

        Stock createStock = stockService.createStock(stock);
        return ResponseEntity.status(201).body(createStock);

    }

    @PutMapping("/stocks/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody StockDto stockDto) {

        Stock stock = new Stock();
        stock.setQuantity(stockDto.getQuantity());

        Item item = itemService.getItemById(stockDto.getItemId());
        stock.setItem(item);

        Stock updateStock = stockService.updateStock(id, stock);

        if (updateStock == null) {
            return ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.status(200).body(updateStock);
        }
    }

    @DeleteMapping("/stocks/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
    }
    
}
