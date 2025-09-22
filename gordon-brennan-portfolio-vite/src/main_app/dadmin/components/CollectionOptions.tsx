import React, { useState } from 'react';
import { Collection } from '../../../types/collectionTypes';
import { formatMultilineText } from '../../components/helpers/MultiLineText';
import { Item } from '../../../types/itemTypes';

interface CollectionOptionsProps {
    collections: Collection[];
    fetchCollections: () => Promise<Collection[]>;
    fetchItems: () => Promise<Item[]>;
    postCollection: (collection: Collection) => Promise<Collection>;
    updateCollection: (id: number, collectionUpdate: Collection) => Promise<Collection>;
    deleteCollection: (id: number) => Promise<void>;
    deleteCollectionAndItems: (id: number) => Promise<void>;
}


const CollectionOptions = ({
    collections,
    fetchCollections,
    fetchItems,
    postCollection,
    updateCollection,
    deleteCollection,
    deleteCollectionAndItems
}: CollectionOptionsProps) => {

    const [postCollectionFields, setPostCollectionFields] = useState({
        name: '',
        collectionImage: '',
        displayOrder: 0,
        description: '',
    })
    const [patchCollectionFields, setPatchCollectionFields] = useState({
        name: '',
        collectionImage: '',
        displayOrder: 0,
        description: '',
    })
    const [selectedCollectionId, setSelectedCollectionId] = useState<number | ''>('');
    const [selectedCollectionIdToDelete, setSelectedCollectionIdToDelete] = useState<number | ''>('');
    const [selectedCollectionDetails, setSelectedCollectionDetails] = useState<Collection | null>(null);


    // HELPERS

    const fetchCollectionsAndItems = () => {
        fetchItems();
        fetchCollections();
    }

    const handlePostFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newValue = name === "displayOrder" ? parseInt(value) || 0 : value;
        setPostCollectionFields(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const handlePatchFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newValue = name === "displayOrder" ? parseInt(value) || 0 : value;
        setPatchCollectionFields(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleCollectionSelectToDelete = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCollectionIdToDelete(parseInt(event.target.value));
    };

    const getSortedCollections = () => {
        return collections.slice().sort((a, b) => a.displayOrder - b.displayOrder);
    }

    // SELECTED COLLECTION

    const handleCollectionSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const collectionId = parseInt(e.target.value);
        setSelectedCollectionId(collectionId);

        const selectedCollection = collections.find(collection => collection.id === collectionId);

        if (selectedCollection) {
            setSelectedCollectionDetails(selectedCollection);
            setPatchCollectionFields({
                name: selectedCollection.name,
                collectionImage: selectedCollection.collectionImage,
                description: selectedCollection.description,
                displayOrder: selectedCollection.displayOrder
            });
        } else {
            setSelectedCollectionDetails(null);
            setPatchCollectionFields({
                name: '',
                collectionImage: '',
                description: '',
                displayOrder: 0
            });
        }
    };

    // POST

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newCollection: Omit<Collection, 'id'> = {
            ...postCollectionFields,
        };

        postCollection(newCollection as Collection)
            .then(() => {
                fetchCollectionsAndItems();
                setPostCollectionFields({
                    name: '',
                    collectionImage: '',
                    description: '',
                    displayOrder: 0,
                });
            })
            .catch(error => console.error("Error adding collection:", error));
    };

    // PATCH

    const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedCollectionId !== '') {
            const id = typeof selectedCollectionId === 'number' ? selectedCollectionId : null;
            if (id !== null) {
                const collectionUpdate: Collection = {
                    id,
                    ...patchCollectionFields,
                };
                updateCollection(id, collectionUpdate)
                    .then(() => {
                        fetchCollectionsAndItems();
                        setSelectedCollectionDetails(collectionUpdate)
                    })
                    .catch(error => console.error("Error updating collection:", error));
            }
        }
    };

    // DELETE COLLECTION

    const handleDeleteCollection = () => {
        if (selectedCollectionIdToDelete !== '') {
            deleteCollection(selectedCollectionIdToDelete)
                .then(() => {
                    fetchCollectionsAndItems();
                })
                .catch(error => console.error("Error deleting collection:", error));
        }
    };

    // DELETE COLLECTION AND ITEM

    const handleDeleteCollectionAndItems = () => {
        if (selectedCollectionIdToDelete !== '') {
            deleteCollectionAndItems(selectedCollectionIdToDelete)
                .then(() => {
                    fetchCollectionsAndItems();
                })
                .catch(error => console.error("Error deleting collection and items:", error));
        }
    };

    return (
        <div className="collectionDiv">
            <p className="signifierOne">Collection Options</p>
            <div className="visualDivision">
                <p className="signifierTwo">Collections List (Sorted)</p>
                <ul>
                    {getSortedCollections().map((collection) => (
                        <li key={collection.id}>
                            {collection.name} - Display Order: {collection.displayOrder}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="visualDivision">
                <p className="signifierTwo">Add Collection</p>
                <form onSubmit={handleSubmit}>
                    <p>Name (New)</p>
                    <input
                        type="text"
                        name="name"
                        value={postCollectionFields.name || ''}
                        onChange={handlePostFieldChange}
                        placeholder="Collection Name"
                    />
                    <p>Image (New)</p>
                    <input
                        type="text"
                        name="collectionImage"
                        value={postCollectionFields.collectionImage || ''}
                        onChange={handlePostFieldChange}
                        placeholder="Collection Image"
                    />
                    <p>Display Order (New)</p>
                    <input
                        type="number"
                        name="displayOrder"
                        value={postCollectionFields.displayOrder || ''}
                        onChange={handlePostFieldChange}
                        placeholder="Display Order"
                    />
                    <p>Description (New)</p>
                    <textarea
                        name="description"
                        value={postCollectionFields.description || ''}
                        onChange={handlePostFieldChange}
                        placeholder="Collection Description"
                    />
                    <button type="submit">Add Collection</button>
                </form>
            </div>
            <div className="visualDivision">
            <div className="visualDivisionTwo">
                <p className="signifierRed">Select Collection To Update</p>
                <select value={selectedCollectionId} onChange={handleCollectionSelected}>
                    <option value=''>Select a Collection</option>
                    {collections.map(collection => (
                        <option key={collection.id} value={collection.id}>{collection.name}</option>
                    ))}
                </select>
                {selectedCollectionDetails ? (
                    <>
                        <p className="signifierThree">Selected Collection Information</p>
                        <div>
                            <p><strong>Name:</strong> {selectedCollectionDetails.name}</p>
                            <p><strong>Image URL:</strong> {selectedCollectionDetails.collectionImage}</p>
                            <img src={selectedCollectionDetails.collectionImage} alt="Collection" width="400" height="400"/>
                            <p><strong>Description:</strong> {formatMultilineText(selectedCollectionDetails.description)}</p>
                            <p><strong>Display Order:</strong> {selectedCollectionDetails.displayOrder}</p>
                        </div>
                    </>
                ) : (
                    <p className="signifierThree">No Collection Selected</p>
                )}
                </div>
                <p className="signifierTwo">Update Collection</p>
                <form onSubmit={handleUpdateSubmit}>
                    <p>Name (Update)</p>
                    <input
                        type="text"
                        name="name"
                        value={patchCollectionFields.name}
                        onChange={handlePatchFieldChange}
                        placeholder="New Collection Name"
                    />
                    <p>Image (Update)</p>
                    <input
                        type="text"
                        name="collectionImage"
                        value={patchCollectionFields.collectionImage}
                        onChange={handlePatchFieldChange}
                        placeholder="New Collection Image"
                    />
                    <p>Display Order (Update)</p>
                    <input
                        type="number"
                        name="displayOrder"
                        value={patchCollectionFields.displayOrder}
                        onChange={handlePatchFieldChange}
                        placeholder="New Display Order"
                    />
                    <p>Description (Update)</p>
                    <textarea
                        name="description"
                        value={patchCollectionFields.description}
                        onChange={handlePatchFieldChange}
                        placeholder="New Collection Description"
                    />
                    <button type="submit">Update Collection</button>
                </form>
            </div>
            <div className="visualDivision">
                <p className="signifierTwo">Delete Collection</p>
                <select value={selectedCollectionIdToDelete} onChange={handleCollectionSelectToDelete}>
                    <option value=''>Select a Collection to Delete</option>
                    {collections.map(collection => (
                        <option key={collection.id} value={collection.id}>
                            {collection.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleDeleteCollection}>Delete Collection</button>
                <button onClick={handleDeleteCollectionAndItems}>Delete Collection and Items</button>
            </div>
        </div>
    );
};

export default CollectionOptions;
