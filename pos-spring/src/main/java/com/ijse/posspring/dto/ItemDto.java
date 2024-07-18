package com.ijse.posspring.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ItemDto {
    
    private String name;
    private Double price;
    private String description;
    private Long categoryId;
    private Long stockId;

}
