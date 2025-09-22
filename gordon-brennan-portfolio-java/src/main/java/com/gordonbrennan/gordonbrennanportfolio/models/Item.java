package com.gordonbrennan.gordonbrennanportfolio.models;

import com.gordonbrennan.gordonbrennanportfolio.utilities.Orderable;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
@Entity
@Table(name = "items")
public class Item implements Orderable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "collectionId")
    private Collection collection;
    @Column(name = "name")
    private String name;
    @Column(name = "dateCreated")
    private String dateCreated;
    @Column(name = "imageUrl")
    private String imageUrl;
    @Column(name = "isSold")
    private boolean isSold;
    @Column(name="size")
    private String dimensions;
    @Column
    private Integer displayOrder;
    @Column(name = "description")
    private String descriptions;
    @Column(name="materials")
    private String materials;

    public Item(Collection collection, String name, String dateCreated, String imageUrl, String descriptions, boolean isSold, String dimensions, String materials, Integer displayOrder) {
        this.collection = collection;
        this.name = name;
        this.dateCreated = dateCreated;
        this.imageUrl = imageUrl;
        this.descriptions = descriptions;
        this.isSold = isSold;
        this.dimensions = dimensions;
        this.materials = materials;
        this.displayOrder = displayOrder;
    }

    public Item () {

    }

    public Long getId() {
        return id;
    }

    public Collection getCollection() {
        return collection;
    }

    public Long getCollectionId() {
        return collection != null ? collection.getId() : null;
    }

    public String getName() {
        return name;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public boolean getIsSold() {
        return isSold;
    }

    public String getDimensions() { return dimensions; }

    public String getMaterials() {return materials;}

    @Override
    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCollection(Collection collection) {
        this.collection = collection;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public void setIsSold(boolean sold) {
        isSold = sold;
    }

    public void setDimensions(String dimensions) {this.dimensions = dimensions;}

    public void setMaterials(String materials) {this.materials = materials;}

    @Override
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}


