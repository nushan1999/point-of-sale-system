package com.ijse.posspring.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderItemDto {

    private Long itemId;
    private int quantity;
    
}
