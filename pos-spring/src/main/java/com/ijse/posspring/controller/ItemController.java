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

import com.ijse.posspring.dto.ItemDto;
import com.ijse.posspring.entity.Item;
import com.ijse.posspring.entity.ItemCategory;
import com.ijse.posspring.entity.Stock;
import com.ijse.posspring.service.ItemCategoryService;
import com.ijse.posspring.service.ItemService;
import com.ijse.posspring.service.StockService;

@RestController
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemCategoryService itemCategoryService;

    @Autowired
    private StockService stockService;

    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/items/{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    @PostMapping("/items")
    public Item createItem(@RequestBody ItemDto itemDto) {

        Item item = new Item();
        item.setName(itemDto.getName());
        item.setPrice(itemDto.getPrice());
        item.setDescription(itemDto.getDescription());

        ItemCategory category = itemCategoryService.getItemCategoryById(itemDto.getCategoryId());
        item.setCategory(category);

        return itemService.createItem(item);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody ItemDto itemDto) {
        
        Item item = new Item();
        item.setName(itemDto.getName());
        item.setPrice(itemDto.getPrice());
        item.setDescription(itemDto.getDescription());

        ItemCategory category = itemCategoryService.getItemCategoryById(itemDto.getCategoryId());
        item.setCategory(category);

        Item updateItem = itemService.updateItem(id, item);

        if (updateItem == null) {
            return ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.status(200).body(updateItem);
        }
    }

    @DeleteMapping("/items/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }

}
