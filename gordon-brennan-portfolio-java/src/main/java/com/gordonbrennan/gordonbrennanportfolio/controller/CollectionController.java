package com.gordonbrennan.gordonbrennanportfolio.controller;

import com.gordonbrennan.gordonbrennanportfolio.models.Item;
import com.gordonbrennan.gordonbrennanportfolio.models.Collection;
import com.gordonbrennan.gordonbrennanportfolio.repository.CollectionRepository;
import com.gordonbrennan.gordonbrennanportfolio.repository.ItemRepository;
import com.gordonbrennan.gordonbrennanportfolio.utilities.DisplayOrderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class CollectionController {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    CollectionRepository collectionRepository;

    @GetMapping(value = "api/collections")
    public ResponseEntity<List<Collection>> getAllCollections() {
        return new ResponseEntity<>(collectionRepository.findAllByOrderByDisplayOrderAsc(), HttpStatus.OK);
    }

    @GetMapping(value = "api/collections/{id}")
    public ResponseEntity<Collection> getCollection(@PathVariable Long id) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found"));
        return new ResponseEntity<>(collection, HttpStatus.OK);
    }

    @PostMapping(value = "api/collections")
    public ResponseEntity<Collection> postCollection(@RequestBody Collection collection) {
        List<Collection> allCollections = collectionRepository.findAll();

        if (collection.getDisplayOrder() == null) {
            int highestOrder = allCollections.stream()
                    .mapToInt(Collection::getDisplayOrder)
                    .max()
                    .orElse(0);
            collection.setDisplayOrder(highestOrder + 1);
        }

        DisplayOrderUtil.adjustDisplayOrder(allCollections, collection.getDisplayOrder(), Integer.MAX_VALUE);
        collectionRepository.saveAll(allCollections);
        collectionRepository.save(collection);
        return new ResponseEntity<>(collection, HttpStatus.CREATED);
    }

    @PatchMapping(value = "api/collections/{id}")
    public ResponseEntity<Collection> updateCollection(@PathVariable Long id, @RequestBody Collection collectionUpdate) {
        Collection existingCollection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found"));

        Integer originalDisplayOrder = existingCollection.getDisplayOrder();

        if (collectionUpdate.getName() != null) {
            existingCollection.setName(collectionUpdate.getName());
        }

        if (collectionUpdate.getCollectionImage() != null) {
            existingCollection.setCollectionImage(collectionUpdate.getCollectionImage());
        }

        if (collectionUpdate.getDescription() != null) {
            existingCollection.setDescription(collectionUpdate.getDescription());
        }

        if (collectionUpdate.getDisplayOrder() != null) {
            List<Collection> allCollections = collectionRepository.findAll();
            allCollections.remove(existingCollection);
            DisplayOrderUtil.adjustDisplayOrder(allCollections, collectionUpdate.getDisplayOrder(), originalDisplayOrder);
            existingCollection.setDisplayOrder(collectionUpdate.getDisplayOrder());
            collectionRepository.saveAll(allCollections);
        }
        collectionRepository.save(existingCollection);
        return new ResponseEntity<>(existingCollection, HttpStatus.OK);
    }

    @DeleteMapping(value = "api/collections/{id}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Long id) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found"));

        Collection sparesCollection = collectionRepository.findByName("Spares")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Spares Collection not found"));

        List<Item> items = collection.getItems();
        if (items != null) {
            for (Item item : items) {
                item.setCollection(sparesCollection);
            }
            itemRepository.saveAll(items);
        }
        if (collection.getName().equals("Spares")) {
            return deleteCollectionAndItems(id);
        } else {
            collectionRepository.delete(collection);
        }
        List<Collection> remainingCollections = collectionRepository.findAll(Sort.by("displayOrder"));
        for (int i = 0; i < remainingCollections.size(); i++) {
            Collection currentCollection = remainingCollections.get(i);
            currentCollection.setDisplayOrder(i + 1);
        }
        collectionRepository.saveAll(remainingCollections);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping(value = "api/collections/{id}/withItems")
    public ResponseEntity<Void> deleteCollectionAndItems(@PathVariable Long id) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Collection not found"));

        List<Item> items = collection.getItems();
        if (items != null) {
            itemRepository.deleteAll(items);
        }

        collectionRepository.delete(collection);

        List<Collection> remainingCollections = collectionRepository.findAll(Sort.by("displayOrder"));
        remainingCollections.removeIf(coll -> coll.getId().equals(collection.getId()));
        for (int i = 0; i < remainingCollections.size(); i++) {
            Collection currentCollection = remainingCollections.get(i);
            currentCollection.setDisplayOrder(i + 1);
        }
        collectionRepository.saveAll(remainingCollections);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}

