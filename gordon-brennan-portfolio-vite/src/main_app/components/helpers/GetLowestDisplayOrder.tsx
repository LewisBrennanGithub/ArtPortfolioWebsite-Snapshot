import { Collection } from '../../../types/collectionTypes';
import { Item } from '../../../types/itemTypes';

export const getLowestDisplayOrder = (collection: Collection, items: Item[] | null): number => {
    if (!items || items.length === 0) {
      return 0; // Return a default value if items is null or empty
    }
  
    const collectionItems = items.filter(item => item.collectionId === collection.id);
    
    if (collectionItems.length === 0) {
      return 0; // Return a default value if no items are found for the collection
    }
  
    const lowestDisplayOrder = collectionItems.reduce((min, item) => {
      return item.displayOrder < min ? item.displayOrder : min;
    }, collectionItems[0].displayOrder);
  
    return lowestDisplayOrder;
  };

