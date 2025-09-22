package com.gordonbrennan.gordonbrennanportfolio.models;
import com.gordonbrennan.gordonbrennanportfolio.utilities.Orderable;

import javax.persistence.*;
import java.util.List;
@Entity
@Table (name = "collections")
public class Collection implements Orderable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String collectionImage;
    @OneToMany(mappedBy = "collection")
    private List<Item> items;
    @Column
    private Integer displayOrder;
    @Column
    private String description;
    public Collection(String name, String collectionImage, Integer displayOrder, String description) {
        this.name = name;
        this.collectionImage = collectionImage;
        this.displayOrder = displayOrder;
        this.description = description;
    }
    public Collection() {}
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public List<Item> getItems() {
        return items;
    }
    public String getCollectionImage() {return collectionImage;}
    @Override
    public Integer getDisplayOrder() {
        return displayOrder;
    }
    public String getDescription() {return description;}
    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setItems(List<Item> items) {
        this.items = items;
    }
    public void setCollectionImage(String collectionImage) {this.collectionImage = collectionImage;}
    @Override
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
    public void setDescription(String description) {this.description = description;}
}