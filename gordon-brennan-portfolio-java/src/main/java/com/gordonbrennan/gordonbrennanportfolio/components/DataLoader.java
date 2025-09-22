package com.gordonbrennan.gordonbrennanportfolio.components;

import com.gordonbrennan.gordonbrennanportfolio.models.Collection;
import com.gordonbrennan.gordonbrennanportfolio.models.Item;
import com.gordonbrennan.gordonbrennanportfolio.repository.CollectionRepository;
import com.gordonbrennan.gordonbrennanportfolio.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

// REMEMBER TO COMMENT THIS OUT
//@Component
//public class DataLoader implements ApplicationRunner {
//
//    @Autowired
//    CollectionRepository collectionRepository;
//
//    @Autowired
//    ItemRepository itemRepository;
//
//    public DataLoader(){
//
//    }
//
//    public void run(ApplicationArguments args){
////        DELETE THESE, DON'T CONSIDER UNCOMMENTING UNLESS NECESSARY
//        Collection collection0 = new Collection ("Spares", "https://images.unsplash.com/photo-1605404392988-53c6f6f838ef?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 1,"Token description");
//        collectionRepository.save(collection0);
//        Collection collection1 = new Collection("2023", "https://images.unsplash.com/photo-1602464729960-f95937746b68?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 2,"Token description");
//        collectionRepository.save(collection1);
//        Collection collection2 = new Collection("2022", "https://images.unsplash.com/photo-1609599861433-154df09c32e0?q=80&w=2851&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",3,"Token description");
//        collectionRepository.save(collection2);
//        Collection collection3 = new Collection("2021", "https://images.unsplash.com/photo-1612487528505-d2338264c821?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80", 4,"Token description");
//        collectionRepository.save(collection3);
//        Collection collection4 = new Collection("2020", "https://images.unsplash.com/photo-1577398628395-4ebd1f36731b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",5,"Token description");
//        collectionRepository.save(collection4);
//        Collection collection5 = new Collection("2019", "https://images.unsplash.com/photo-1583407723467-9b2d22504831?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",6,"Token description");
//        collectionRepository.save(collection5);
//
////        List<String> art1Materials = new ArrayList<>();
////        art1Materials.add("Concrete");
////        art1Materials.add("Paint");
////
////        List<String> art2Materials = new ArrayList<>();
////        art2Materials.add("Wood");
////        art2Materials.add("Linen");
////        art2Materials.add("Clay");
//
//        Item art1 = new Item(collection1, "Painting Paolozesque", "June 2023", "https://images.unsplash.com/photo-1612487528505-d2338264c821?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80", "String Test", false, "45cm", "Wood / Craft", 1);
//        itemRepository.save(art1);
//        Item art2 = new Item(collection1, "Painting Sun", "May 2023", "https://images.unsplash.com/photo-1577398628395-4ebd1f36731b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", "String Test", true, "45cm", "Wood / Craft", 2);
//        itemRepository.save(art2);
//        Item art3 = new Item(collection2, "Radial Sculpture", "November 2022", "https://images.unsplash.com/photo-1604782666037-3c63d50052db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80", "String Test", false, "45cm", "Wood / Craft", 1);
//        itemRepository.save(art3);
//        Item art4 = new Item(collection2, "Radial Sculpture Two", "June 2022", "https://images.unsplash.com/photo-1604782206219-3b9576575203?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=697&q=80", "String Test", true, "45cm", "Wood / Craft", 2);
//        itemRepository.save(art4);
//        Item art5 = new Item(collection2, "Painting Colourful", "March 2022", "https://images.unsplash.com/photo-1531056416665-266c4099c928?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", "String Test", false, "45cm", "Wood / Craft", 3);
//        itemRepository.save(art5);
//
//        Item art6 = new Item(collection1, "Painting Paolozesque", "June 2023", "https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 3);
//        itemRepository.save(art6);
//        Item art7 = new Item(collection1, "Painting Sun", "May 2023", "https://images.unsplash.com/photo-1583407723467-9b2d22504831?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 4);
//        itemRepository.save(art7);
//        Item art8 = new Item(collection2, "Radial Sculpture", "November 2022", "https://plus.unsplash.com/premium_photo-1682125291930-1427e5d80e5b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 4);
//        itemRepository.save(art8);
//        Item art9 = new Item(collection2, "Radial Sculpture Two", "June 2022", "https://images.unsplash.com/photo-1544037118-737759b6d388?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 5);
//        itemRepository.save(art9);
//        Item art10 = new Item(collection2, "Painting Colourful", "March 2022", "https://images.unsplash.com/photo-1580136607993-fd598cf5c4f5?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 6);
//        itemRepository.save(art10);
//
//        Item art11 = new Item(collection1, "Painting Paolozesque", "June 2023", "https://images.unsplash.com/photo-1533208087231-c3618eab623c?q=80&w=1485&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 5);
//        itemRepository.save(art11);
//        Item art12 = new Item(collection1, "Painting Sun", "May 2023", "https://images.unsplash.com/photo-1573528822711-66c49506aee2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 6);
//        itemRepository.save(art12);
//        Item art13 = new Item(collection2, "Radial Sculpture", "November 2022", "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 7);
//        itemRepository.save(art13);
//        Item art14 = new Item(collection2, "Radial Sculpture Two", "June 2022", "https://images.unsplash.com/photo-1594845281364-63dbe90f37f5?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 8);
//        itemRepository.save(art14);
//        Item art15 = new Item(collection2, "Painting Colourful", "March 2022", "https://images.unsplash.com/photo-1573096108468-702f6014ef28?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 9);
//        itemRepository.save(art15);
//
//        Item art16 = new Item(collection1, "Painting Paolozesque", "June 2023", "https://images.unsplash.com/photo-1610792716147-3a2e3b1e5052?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 7);
//        itemRepository.save(art16);
//        Item art17 = new Item(collection1, "Painting Sun", "May 2023", "https://images.unsplash.com/photo-1552250575-e508473b090f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 8);
//        itemRepository.save(art17);
//        Item art18 = new Item(collection2, "Radial Sculpture", "November 2022", "https://images.unsplash.com/photo-1592587445145-04498cbba81c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 10);
//        itemRepository.save(art18);
//        Item art19 = new Item(collection2, "Radial Sculpture Two", "June 2022", "https://images.unsplash.com/photo-1586032788085-d75f745f26e0?q=80&w=1462&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 11);
//        itemRepository.save(art19);
//        Item art20 = new Item(collection2, "Painting Colourful", "March 2022", "https://images.unsplash.com/photo-1529772187639-085af5eb1c40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 12);
//        itemRepository.save(art20);
//
//        Item art21 = new Item(collection1, "Painting Paolozesque", "June 2023", "https://plus.unsplash.com/premium_photo-1664640458486-1ef3c8738cf9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 9);
//        itemRepository.save(art21);
//        Item art22 = new Item(collection1, "Painting Sun", "May 2023", "https://images.unsplash.com/photo-1544733422-251e532ca221?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 10);
//        itemRepository.save(art22);
//        Item art23 = new Item(collection2, "Radial Sculpture", "November 2022", "https://images.unsplash.com/photo-1595012651352-9b39b99c341b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 13);
//        itemRepository.save(art23);
//        Item art24 = new Item(collection2, "Radial Sculpture Two", "June 2022", "https://images.unsplash.com/photo-1602464729960-f95937746b68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 14);
//        itemRepository.save(art24);
//        Item art25 = new Item(collection2, "Painting Colourful", "March 2022", "https://images.unsplash.com/photo-1603549657180-57d429ac79ec?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 15);
//        itemRepository.save(art25);
//        Item art26 = new Item(collection2, "Painting Colourful", "March 2022", "https://images.unsplash.com/photo-1585756146062-394f6cd9ac2b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 16);
//        itemRepository.save(art26);
//
//        Item art27 = new Item(collection3, "Radial Sculpture Two", "June 2022", "https://images.unsplash.com/photo-1602464729960-f95937746b68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", true, "45cm", "Wood / Craft", 1);
//        itemRepository.save(art27);
//        Item art28 = new Item(collection4, "Painting Colourful", "March 2022", "https://images.unsplash.com/photo-1603549657180-57d429ac79ec?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 1);
//        itemRepository.save(art28);
//        Item art29 = new Item(collection5, "Painting Colourful", "March 2022", "https://images.unsplash.com/photo-1585756146062-394f6cd9ac2b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "String Test", false, "45cm", "Wood / Craft", 1);
//        itemRepository.save(art29);
//    }
//}
