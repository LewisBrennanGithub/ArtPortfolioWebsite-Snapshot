import React, { useState } from 'react';
import { formatMultilineText } from '../../components/helpers/MultiLineText';
import { Collection } from '../../../types/collectionTypes';
import { Item } from '../../../types/itemTypes';

interface ItemOptionsProps {
  items: Item[];
  collections: Collection[];
  fetchCollections: () => Promise<Collection[]>;
  fetchItems: () => Promise<Item[]>;
  addItem: (item: Item, collectionId: number) => Promise<Item>;
  updateItem: (id: number, updatedItem: Item, collectionId: number) => Promise<Item>;
  deleteItem: (id: number) => Promise<void>;
}

const ItemOptions = ({
  items,
  collections,
  fetchCollections,
  fetchItems,
  addItem,
  updateItem,
  deleteItem
}: ItemOptionsProps) => {

  const [selectedCollectionId, setSelectedCollectionId] = useState<number | ''>('');
  const [updateCollectionId, setUpdateCollectionId] = useState<number | ''>('');
  const [selectedItemId, setSelectedItemId] = useState<number | ''>('');
  const [updateItemId, setUpdateSelectedItemId] = useState<number | ''>('');
  const [selectedItemDetails, setSelectedItemDetails] = useState<Item | null>(null);
  const [itemFields, setItemFields] = useState({
    name: '',
    dateCreated: '',
    imageUrl: '',
    isSold: false,
    dimensions: '',
    displayOrder: 0,
    collectionId: 0,
    descriptions: '',
    materials: ''
  });
  const [updateItemFields, setUpdateItemFields] = useState({
    name: '',
    dateCreated: '',
    imageUrl: '',
    isSold: false,
    dimensions: '',
    displayOrder: 0,
    collectionId: 0,
    descriptions: '',
    materials: ''
  });

  // HELPERS

  const filteredItems = selectedCollectionId !== '' ? items.filter(item => item.collectionId === selectedCollectionId) : [];

  const fetchCollectionsAndItems = () => {
    fetchItems();
    fetchCollections();
  }

  const handleIsSoldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemFields({
      ...itemFields,
      isSold: event.target.value === 'true'
    });
  };

  const handleItemFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemFields({
      ...itemFields,
      [name]: value
    });
  };

  const handleUpdateItemFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateItemFields({
      ...updateItemFields,
      [name]: value
    });
  };

  const getSortedItems = () => {
    return filteredItems.slice().sort((a, b) => a.displayOrder - b.displayOrder);
  }

  // SELECTED ITEM ON PAGE FOR COMPARATIVE PURPOSES ONLY

  const handleItemSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemId = parseInt(e.target.value);
    setSelectedItemId(itemId);
    setUpdateSelectedItemId(itemId);

    const selectedItem = items.find(item => item.id === itemId);

    if (selectedItem) {
      setSelectedItemDetails(selectedItem);
      setUpdateItemFields({
        name: selectedItem.name,
        dateCreated: selectedItem.dateCreated,
        imageUrl: selectedItem.imageUrl,
        isSold: selectedItem.isSold,
        dimensions: selectedItem.dimensions,
        displayOrder: selectedItem.displayOrder,
        collectionId: selectedItem.collectionId || 0,
        descriptions: selectedItem.descriptions || '',
        materials: selectedItem.materials || '',
      });
      setUpdateCollectionId(selectedItem.collectionId || '');
    } else {
      setSelectedItemDetails(null);
      setUpdateItemFields({
        name: '',
        dateCreated: '',
        imageUrl: '',
        isSold: false,
        dimensions: '',
        displayOrder: 0,
        collectionId: 0,
        descriptions: '',
        materials: ''
      });
    }
  };

  // SUBMITS

  const handleNewItemSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedCollectionId !== '') {
      const newItem: Item = {
        name: itemFields.name,
        dateCreated: itemFields.dateCreated,
        imageUrl: itemFields.imageUrl,
        isSold: itemFields.isSold,
        dimensions: itemFields.dimensions,
        collectionId: (selectedCollectionId),
        displayOrder: itemFields.displayOrder,
        descriptions: itemFields.descriptions,
        materials: itemFields.materials
      };
      addItem(newItem, (selectedCollectionId))
        .then(() => {
          fetchCollectionsAndItems();
        })
        .catch(error => console.error("Error adding item", error));

      setItemFields({
        name: '',
        dateCreated: '',
        imageUrl: '',
        isSold: false,
        dimensions: '',
        collectionId: 0,
        displayOrder: 0,
        descriptions: '',
        materials: ''
      });
    }
  };

  const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (updateItemId) {
      const updatedItem: Item = {
        ...updateItemFields,
        collectionId: updateCollectionId ? (updateCollectionId) : updateItemFields.collectionId
      };

      console.log("Updating Item:", updatedItem);

      updateItem(updateItemId, updatedItem, updatedItem.collectionId || 0)
        .then((updatedItemResponse) => {
          fetchCollectionsAndItems();
          setSelectedItemDetails(updatedItemResponse);
        })
        .catch(error => {
          console.error("Error updating item:", error);
        });
    }
  };

  const handleDeleteItem = () => {
    if (selectedItemId) {
      deleteItem(selectedItemId)
        .then(() => {
          fetchCollectionsAndItems();
          setSelectedItemId('');
          setSelectedItemDetails(null);
        })
        .catch(error => console.error("Error deleting item:", error));
    }
  };


  return (
    <div className="itemDiv">
      <p className="signifierOne">Item Options</p>
      <p className="signifierThree">Select A Collection For Items</p>
      <select value={selectedCollectionId} onChange={(e) => setSelectedCollectionId(parseInt(e.target.value))}>
        <option value=''>Select a Collection</option>
        {collections.map(collection => (
          <option key={collection.id} value={collection.id}>{collection.name}</option>
        ))}
      </select>
      <div className="visualDivision">
        <p className="signifierTwo">Item List (Sorted)</p>
        <ul>
          {getSortedItems().map((item) => (
            <li key={item.id}>
              {item.name} - Display Order: {item.displayOrder}
            </li>
          ))}
        </ul>
      </div>
      <div className="visualDivision">
        <p className="signifierTwo">Add Item</p>
        <form onSubmit={handleNewItemSubmit}>
          <p>Name (New)</p>
          <input name="name" value={itemFields.name || ''} onChange={handleItemFieldChange} placeholder="Item Name" />
          <p>Date Created (New)</p>
          <input name="dateCreated" value={itemFields.dateCreated || ''} onChange={handleItemFieldChange} placeholder="Date Created" />
          <p>Image Url (New)</p>
          <input name="imageUrl" value={itemFields.imageUrl || ''} onChange={handleItemFieldChange} placeholder="Image URL" />
          <p>Is Sold (New)</p>
          <select name="isSold" value={itemFields.isSold ? 'true' : 'false'} onChange={handleIsSoldChange}>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
          <p>Dimensions (New)</p>
          <input name="dimensions" value={itemFields.dimensions || ''} onChange={handleItemFieldChange} placeholder="Dimensions" />
          <p>Materials (New)</p>
          <input name="materials" value={itemFields.materials} onChange={handleItemFieldChange} placeholder="Materials" />
          <p>Descriptions (New)</p>
          <textarea name="descriptions" value={itemFields.descriptions} onChange={handleItemFieldChange} placeholder="Descriptions" />
          <p>Display Order (New)</p>
          <input name="displayOrder" type="number" value={itemFields.displayOrder || ''} onChange={handleItemFieldChange} placeholder="Display Order" />
          <button type="submit">Add Item</button>
        </form>
      </div>
      <div className="visualDivision">
      <div className="visualDivisionTwo">
        <p className="signifierRed">Select Item To Update</p>
        <select value={selectedItemId} onChange={handleItemSelected}>
          <option value=''>Select an Item</option>
          {filteredItems.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        {selectedItemDetails ? (
          <div>
            <p className="signifierThree">Selected Item Information</p>
            <p>Name: {selectedItemDetails.name}</p>
            <p>Date Created: {selectedItemDetails.dateCreated}</p>
            <p>Image URL: {selectedItemDetails.imageUrl}</p>
            <img src={selectedItemDetails?.imageUrl} alt="This is an alt" width="400" height="400"></img>
            <p>Is Sold: {selectedItemDetails.isSold ? 'Yes' : 'No'}</p>
            <p>Dimensions: {selectedItemDetails.dimensions}</p>
            <p>Materials: {selectedItemDetails.materials}</p>
            <p>Descriptions:</p>
            <p>{formatMultilineText(selectedItemDetails.descriptions || '')}</p>
            <p>Display Order: {selectedItemDetails.displayOrder}</p>
            <p>Collection: {
              collections.find(c => c.id === selectedItemDetails.collectionId)?.name
            }</p>
          </div>
        ) : (
          <p className="signifierThree">No Item Selected</p>
        )}
      </div>
      </div>
      <div className="visualDivision">
        <p className="signifierTwo">Update Item</p>
        <form onSubmit={handleUpdateSubmit}>
          <p>Name (Update)</p>
          <input name="name" value={updateItemFields.name} onChange={handleUpdateItemFieldChange} placeholder="Item Name" />
          <p>Date Created (Update)</p>
          <input name="dateCreated" value={updateItemFields.dateCreated} onChange={handleUpdateItemFieldChange} placeholder="Date Created" />
          <p>Image Url (Update)</p>
          <input name="imageUrl" value={updateItemFields.imageUrl} onChange={handleUpdateItemFieldChange} placeholder="Image URL" />
          <p>Is Sold (Update)</p>
          <select name="isSold" value={updateItemFields.isSold ? 'true' : 'false'} onChange={handleUpdateItemFieldChange}>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
          <p>Dimensions (Update)</p>
          <input name="dimensions" value={updateItemFields.dimensions} onChange={handleUpdateItemFieldChange} placeholder="Dimensions" />
          <p>Materials (Update)</p>
          <input name="materials" value={updateItemFields.materials} onChange={handleUpdateItemFieldChange} placeholder="Materials" />
          <p>Descriptions (Update)</p>
          <textarea name="descriptions" value={updateItemFields.descriptions} onChange={handleUpdateItemFieldChange} placeholder="Descriptions" />
          <p>Display Order (Update)</p>
          <input name="displayOrder" type="number" value={updateItemFields.displayOrder || ''} onChange={handleUpdateItemFieldChange} placeholder="Display Order" />
          <p>Change Collection Item Belongs To (Update)</p>
          <select value={updateCollectionId} onChange={(e) => setUpdateCollectionId(parseInt(e.target.value))}>
            <option value=''>Select a Collection</option>
            {collections.map(collection => (
              <option key={collection.id} value={collection.id}>{collection.name}</option>
            ))}
          </select>
          <button type="submit">Update Item</button>
        </form>
      </div>
      <button
        onClick={handleDeleteItem}
        disabled={selectedItemId === ''}
      >
        Delete Selected Item
      </button>
    </div>
  );
};

export default ItemOptions;
