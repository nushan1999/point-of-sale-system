package com.ijse.posspring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.posspring.entity.Item;
import com.ijse.posspring.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    @Override
    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(Long id, Item item) {
        Item existItem = itemRepository.findById(id).orElse(null);

        if (existItem != null) {
            existItem.setName(item.getName());
            existItem.setPrice(item.getPrice());
            existItem.setDescription(item.getDescription());
            existItem.setCategory(item.getCategory());
            return itemRepository.save(existItem);
        } else {
            return null;
        }

    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

}
