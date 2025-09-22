package com.gordonbrennan.gordonbrennanportfolio.repository;

import com.gordonbrennan.gordonbrennanportfolio.models.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Long> {
    Optional<Collection> findByName(String name);
    List<Collection> findAllByOrderByDisplayOrderAsc();
}
