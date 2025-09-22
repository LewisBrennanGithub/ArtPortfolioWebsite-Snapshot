package com.gordonbrennan.gordonbrennanportfolio.utilities;
import com.gordonbrennan.gordonbrennanportfolio.models.Item;

import java.util.List;
import java.util.stream.Collectors;


public class DisplayOrderUtil {

    public static <T extends Orderable> void adjustDisplayOrder(List<T> entities, Integer newOrder, Integer originalOrder) {
        if (newOrder != null) {
            if (newOrder > originalOrder) {
                entities.stream()
                        .filter(entity -> entity.getDisplayOrder() > originalOrder && entity.getDisplayOrder() <= newOrder)
                        .forEach(entity -> entity.setDisplayOrder(entity.getDisplayOrder() - 1));
            } else if (newOrder < originalOrder) {
                entities.stream()
                        .filter(entity -> entity.getDisplayOrder() < originalOrder && entity.getDisplayOrder() >= newOrder)
                        .forEach(entity -> entity.setDisplayOrder(entity.getDisplayOrder() + 1));
            }
        }
    }

    public static void adjustItemDisplayOrderWithinCollection(List<Item> items, Integer newOrder, Integer originalOrder, Long collectionId) {
        if (newOrder != null && collectionId != null) {
            List<Item> filteredItems = items.stream()
                    .filter(item -> item.getCollection() != null && item.getCollection().getId().equals(collectionId))
                    .collect(Collectors.toList());
            adjustDisplayOrder(filteredItems, newOrder, originalOrder);
        }
    }

}
