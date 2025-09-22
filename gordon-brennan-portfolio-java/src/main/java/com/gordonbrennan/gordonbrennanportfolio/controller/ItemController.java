package com.gordonbrennan.gordonbrennanportfolio.controller;

import com.gordonbrennan.gordonbrennanportfolio.models.Item;
import com.gordonbrennan.gordonbrennanportfolio.models.Collection;
import com.gordonbrennan.gordonbrennanportfolio.repository.CollectionRepository;
import com.gordonbrennan.gordonbrennanportfolio.repository.ItemRepository;
import com.gordonbrennan.gordonbrennanportfolio.utilities.DisplayOrderUtil;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ItemController {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    CollectionRepository collectionRepository;

//    OLD VERSION

    @GetMapping(value = "api/items")
    public ResponseEntity<List<Item>> getAllItems() {
        return new ResponseEntity<>(itemRepository.findAllByOrderByDisplayOrderAsc(), HttpStatus.OK);
    }

    @GetMapping(value = "api/items/{id}")
    public ResponseEntity getItem(@PathVariable Long id){
        return new ResponseEntity<>(itemRepository.findById(id), HttpStatus.OK);
    }

//    NEW VERSION

//    @GetMapping(value = "api/collections/{collectionId}/items/{itemId}")
//    public ResponseEntity<Item> getItemByCollectionIdAndItemId(
//            @PathVariable Long collectionId,
//            @PathVariable Long itemId) {
//        Item item = itemRepository.findByIdAndCollection_Id(itemId, collectionId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
//        return new ResponseEntity<>(item, HttpStatus.OK);
//    }

    @GetMapping(value = "api/collections/{collectionId}/items/{itemDisplayOrder}")
    public ResponseEntity<Item> getItemByCollectionIdAndDisplayOrder(
            @PathVariable Long collectionId,
            @PathVariable Integer itemDisplayOrder) {
        Item item = itemRepository.findByCollection_IdAndDisplayOrder(collectionId, itemDisplayOrder)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PostMapping(value = "api/items")
    public ResponseEntity<Item> postItem(@RequestBody Item item, @RequestParam Long collectionId) {
        Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found"));
        item.setCollection(collection);

        List<Item> allItemsInCollection = itemRepository.findByCollection_IdOrderByDisplayOrderAsc(collectionId);

        if (item.getDisplayOrder() == null) {
            int highestOrder = allItemsInCollection.stream()
                    .mapToInt(Item::getDisplayOrder)
                    .max()
                    .orElse(0);
            item.setDisplayOrder(highestOrder + 1);
        }

        DisplayOrderUtil.adjustItemDisplayOrderWithinCollection(allItemsInCollection, item.getDisplayOrder(), Integer.MAX_VALUE, collectionId);
        itemRepository.saveAll(allItemsInCollection);
        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PatchMapping(value = "api/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemUpdate, @RequestParam(required = false) Long collectionId) {
        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        Integer originalDisplayOrder = existingItem.getDisplayOrder();
        Long originalCollectionId = existingItem.getCollection() != null ? existingItem.getCollection().getId() : null;

        if (collectionId != null && !collectionId.equals(originalCollectionId)) {
            Collection newCollection = collectionRepository.findById(collectionId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found"));
            existingItem.setCollection(newCollection);

            if (originalCollectionId != null) {
                List<Item> itemsInOriginalCollection = itemRepository.findByCollection_IdOrderByDisplayOrderAsc(originalCollectionId);
                itemsInOriginalCollection.removeIf(item -> item.getId().equals(id)); // Remove the current item
                DisplayOrderUtil.adjustItemDisplayOrderWithinCollection(itemsInOriginalCollection, Integer.MAX_VALUE, originalDisplayOrder, originalCollectionId); // Use MAX_VALUE for new order
                itemRepository.saveAll(itemsInOriginalCollection);
            }

            List<Item> itemsInNewCollection = itemRepository.findByCollection_IdOrderByDisplayOrderAsc(collectionId);
            DisplayOrderUtil.adjustItemDisplayOrderWithinCollection(itemsInNewCollection, itemUpdate.getDisplayOrder(), Integer.MAX_VALUE, collectionId); // Incoming item is treated as a new addition
            itemRepository.saveAll(itemsInNewCollection);
        }

        if (itemUpdate.getName() != null) existingItem.setName(itemUpdate.getName());
        if (itemUpdate.getDateCreated() != null) existingItem.setDateCreated(itemUpdate.getDateCreated());
        if (itemUpdate.getImageUrl() != null) existingItem.setImageUrl(itemUpdate.getImageUrl());
        if (itemUpdate.getDimensions() != null) existingItem.setDimensions(itemUpdate.getDimensions());
        existingItem.setIsSold(itemUpdate.getIsSold());
        if (itemUpdate.getDescriptions() != null) {
            existingItem.setDescriptions(itemUpdate.getDescriptions());
        }
        if (itemUpdate.getMaterials() != null) {
            existingItem.setMaterials(itemUpdate.getMaterials());
        }

        if (itemUpdate.getDisplayOrder() != null && !itemUpdate.getDisplayOrder().equals(originalDisplayOrder) && (collectionId == null || collectionId.equals(originalCollectionId))) {
            List<Item> allItemsInCollection = itemRepository.findByCollection_IdOrderByDisplayOrderAsc(originalCollectionId);
            DisplayOrderUtil.adjustItemDisplayOrderWithinCollection(allItemsInCollection, itemUpdate.getDisplayOrder(), originalDisplayOrder, originalCollectionId);
            itemRepository.saveAll(allItemsInCollection);
        }

        existingItem.setDisplayOrder(itemUpdate.getDisplayOrder());
        itemRepository.save(existingItem);
        return new ResponseEntity<>(existingItem, HttpStatus.OK);
    }

    @DeleteMapping(value = "api/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        Item itemToDelete = itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        Integer deletedItemOrder = itemToDelete.getDisplayOrder();
        Long collectionId = itemToDelete.getCollection() != null ? itemToDelete.getCollection().getId() : null;

        itemRepository.deleteById(id);

        if (deletedItemOrder != null && collectionId != null) {
            List<Item> remainingItems = itemRepository.findByCollection_IdOrderByDisplayOrderAsc(collectionId);
            remainingItems.stream()
                    .filter(item -> item.getDisplayOrder() > deletedItemOrder)
                    .forEach(item -> item.setDisplayOrder(item.getDisplayOrder() - 1));
            itemRepository.saveAll(remainingItems);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
