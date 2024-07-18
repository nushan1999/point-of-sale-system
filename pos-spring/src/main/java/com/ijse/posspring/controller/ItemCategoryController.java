package com.ijse.posspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.posspring.dto.ItemCategoryDto;
import com.ijse.posspring.entity.ItemCategory;
import com.ijse.posspring.service.ItemCategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryService itemCategoryService;

    @GetMapping("/itemCategories")
    public List<ItemCategory> getAllItemCategories() {
        return itemCategoryService.getAllItemCategories();
    }

    @GetMapping("/itemCategories/{id}")
    public ResponseEntity<ItemCategory> getItemCategoryById(@PathVariable Long id) {
        ItemCategory itemCategory = itemCategoryService.getItemCategoryById(id);

        if (itemCategory == null) {
            return ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.ok(itemCategory);
        }
    }

    @PostMapping("/itemCategories")
    public ResponseEntity<ItemCategory> createItemCategory(@RequestBody ItemCategoryDto itemCategoryDto) {

        ItemCategory itemCategory = new ItemCategory();
        itemCategory.setName(itemCategoryDto.getName());
        
        ItemCategory createItemCategory = itemCategoryService.createItemCategory(itemCategory);
        return ResponseEntity.status(201).body(createItemCategory);
    }

    @PutMapping("/itemCategories/{id}")
    public ResponseEntity<ItemCategory> updateItemCategory(@PathVariable Long id, @RequestBody ItemCategory itemCategory) {

        ItemCategory itemCategory2 = new ItemCategory();
        itemCategory2.setName(itemCategory.getName());

        ItemCategory updateItemCategory = itemCategoryService.updateItemCategory(id, itemCategory2);

        if (updateItemCategory == null) {
            return ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.status(200).body(updateItemCategory);
        }
    }

    @DeleteMapping("/itemCategories/{id}")
    public void deleteItemCategory(@PathVariable Long id) {
        itemCategoryService.deleteItemCategory(id);
    }

}
