import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as CollectionServices from "../services/CollectionServices";
import * as ItemServices from "../services/ItemServices";

// NEWER IMPORTS
import CollectionListNew from '../components/collections/CollectionListNew';
import ItemDetailsNew from '../components/items/ItemDetailsNew';

import SiteMain from '../components/main/SiteMain';
import AboutMain from '../components/about/AboutMain';
import MenuBar from '../menu/MenuBar';
import ScrollToTop from '../components/helpers/ScrollToTop';
import { Collection } from '../../types/collectionTypes';
import { Item } from '../../types/itemTypes';


const PortfolioContainer = () => {

    const [collections, setCollections] = useState<Collection[] | null>(null);
    const [items, setItems] = useState<Item[] | null>(null);

    // NEW STATE 
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        fetchAllCollections();
        fetchAllItems();
    }, []);

    const fetchAllCollections = () => {
        CollectionServices.getCollections().then(data => {
            setCollections(data);
        }).catch(error => {
            console.error("Failed to fetch collections:", error);
        });
    };

    const fetchAllItems = () => {
        ItemServices.getItems().then(data => {
            setItems(data);
        }).catch(error => {
            console.error("Failed to fetch items:", error);
        });
    };

    // NEW FETCH TWO
    const fetchItemDetailsTruePath = (collectionId: number, itemDisplayOrder: number) => {
        ItemServices.getItemTruePath(collectionId, itemDisplayOrder)
          .then(data => {
            setSelectedItem(data);
          })
          .catch(error => {
            console.error("Failed to fetch item details:", error);
          });
      };

    return (
        <div>
            <MenuBar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<SiteMain />} />
                <Route path="/about" element={<AboutMain />} />

                {/* NEW ROUTES*/}
                <Route path="/collections-new" element={<CollectionListNew collections={collections} items={items} />} />
                {/* <Route path="/collections-new/:collectionId/items/:itemDisplayOrder" element={<ItemDetailsNew selectedItem={selectedItem} collections={collections} fetchItemDetailsTruePath={fetchItemDetailsTruePath} />} />   */}
                <Route path="/collections-new/:collectionId/items/:itemDisplayOrder" element={<ItemDetailsNew selectedItem={selectedItem} collections={collections} fetchItemDetailsTruePath={fetchItemDetailsTruePath} />} />                
              
      </Routes>
        </div>
    );
};

export default PortfolioContainer;