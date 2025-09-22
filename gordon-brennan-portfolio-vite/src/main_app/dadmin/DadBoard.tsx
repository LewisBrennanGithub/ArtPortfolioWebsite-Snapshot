import { useState, useEffect } from 'react';
import CollectionOptions from "./components/CollectionOptions";
import ItemOptions from "./components/ItemOptions";
import * as CollectionServices from '../services/CollectionServices';
import * as ItemServices from '../services/ItemServices';
import { Collection } from '../../types/collectionTypes';
import { Item } from '../../types/itemTypes';

const DadBoard = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchAllCollections();
        fetchAllItems();
    }, []);

    // COLLECTION SERVICES IMPORTS

    const fetchAllCollections = (): Promise<Collection[]> => {
        return CollectionServices.getCollections()
            .then(data => {
                setCollections(data);
                return data;
            })
            .catch(error => {
                console.error("Failed to fetch collections:", error);
                throw error;
            });
    };

    const addNewCollection = (newCollection: Collection): Promise<Collection> => {
        return CollectionServices.postCollection(newCollection)
            .then(addedCollection => {
                setCollections(prevCollections => [...prevCollections, addedCollection]);
                return addedCollection;
            })
            .catch(error => {
                console.error("Error adding collection:", error);
                throw error;
            });
    };

    const updateExistingCollection = (id: number, updatedCollection: Collection): Promise<Collection> => {
        return CollectionServices.updateCollection(id, updatedCollection)
            .then(updated => {
                setCollections(collections => collections.map(collection =>
                    collection.id === id ? updated : collection
                ));
                return updated;
            })
            .catch(error => {
                console.error("Error updating collection:", error);
                throw error;
            });
    };


    const removeCollection = (id: number): Promise<void> => {
        return CollectionServices.deleteCollection(id)
            .then(() => {
                setCollections(collections => collections.filter(collection => collection.id !== id));
            })
            .catch(error => {
                console.error("Error deleting collection:", error);
                throw error;
            });
    };

    const removeCollectionAndItems = (id: number): Promise<void> => {
        return CollectionServices.deleteCollectionAndItems(id)
            .then(() => {
                setCollections(collections => collections.filter(collection => collection.id !== id));
            })
            .catch(error => {
                console.error("Error deleting collection and items:", error);
                throw error;
            });
    };

    // ITEM SERVICES IMPORTS

    const fetchAllItems = (): Promise<Item[]> => {
        return ItemServices.getItems()
            .then(data => {
                setItems(data);
                return data;
            })
            .catch(error => {
                console.error("Failed to fetch collections:", error);
                throw error;
            });
    }

    const addNewItem = (newItem: Item, collectionId: number): Promise<Item> => {
        return ItemServices.postItem(newItem, collectionId)
            .then(addedItem => {
                setItems(prevItems => [...prevItems, addedItem]);
                return addedItem;
            })
            .catch(error => {
                console.error("Error adding item", error);
                throw new Error("Failed to add item");
            });
    }

    const updateExistingItem = (id: number, updatedItem: Item, collectionId?: number): Promise<Item> => {
        return ItemServices.updateItem(id, updatedItem, collectionId)
            .then(updated => {
                setItems(items => items.map(item => item.id === id ? updated : item));
                return updated;
            })
            .catch(error => {
                console.error("Error updating item:", error);
                throw error;
            });
    };

    const deleteExistingItem = (id: number): Promise<void> => {
        return ItemServices.deleteItem(id)
            .then(() => {
                setItems(items => items.filter(item => item.id !== id));
            })
            .catch(error => {
                console.error("Error deleting item:", error);
                throw error;
            });
    };

    // RETURN

    return (
        <div className="adminDiv">
            <p>This is the Dadboard</p>
            <CollectionOptions
                collections={collections}
                fetchCollections={fetchAllCollections}
                fetchItems={fetchAllItems}
                postCollection={addNewCollection}
                updateCollection={updateExistingCollection}
                deleteCollection={removeCollection}
                deleteCollectionAndItems={removeCollectionAndItems}
            />
            <ItemOptions
                items={items}
                collections={collections}
                fetchCollections={fetchAllCollections}
                fetchItems={fetchAllItems}
                addItem={addNewItem}
                updateItem={updateExistingItem}
                deleteItem={deleteExistingItem}
            />
        </div>
    );
}

export default DadBoard;