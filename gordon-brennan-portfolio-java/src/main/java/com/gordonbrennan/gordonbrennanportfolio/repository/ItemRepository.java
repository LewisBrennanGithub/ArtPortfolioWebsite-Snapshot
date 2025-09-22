package com.gordonbrennan.gordonbrennanportfolio.repository;

import com.gordonbrennan.gordonbrennanportfolio.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByOrderByDisplayOrderAsc();
    List<Item> findByCollection_IdOrderByDisplayOrderAsc(Long collectionId);
    Optional<Item> findByCollection_IdAndDisplayOrder(Long collectionId, Integer displayOrder);

}

