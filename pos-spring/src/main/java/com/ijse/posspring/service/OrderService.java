package com.ijse.posspring.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ijse.posspring.entity.Order;

@Service
public interface OrderService {

    List<Order> getAllOrders();

    Order getOrderById(Long id);

    Order createOrder(Order order);

    Order addItemToOrder (Long orderId, Long itemId, int quantity);

    Order removeItemFromOrder (Long orderId, Long itemId);
    
}
