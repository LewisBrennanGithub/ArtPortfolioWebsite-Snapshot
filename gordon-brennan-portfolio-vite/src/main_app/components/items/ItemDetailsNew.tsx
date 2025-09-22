import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../../BespokeCss.css';
import { Item } from '../../../types/itemTypes';
import { Collection } from '../../../types/collectionTypes';
import EmailElement from '../helpers/EmailElement';
import { formatMultilineText } from '../helpers/MultiLineText';

interface ItemDetailsPropsNew {
  selectedItem: Item | null;
  collections: Collection[] | null;
  fetchItemDetailsTruePath: (collectionId: number, itemDisplayOrder: number) => void;
}

const ItemDetailsNew = ({ selectedItem, collections, fetchItemDetailsTruePath }: ItemDetailsPropsNew) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isImageFocused, setIsImageFocused] = useState(false);

  const { collectionId, itemDisplayOrder } = useParams<{ collectionId: string, itemDisplayOrder: string }>();
  const collection = collections?.find((col: Collection) => col.id === selectedItem?.collectionId);
  const otherItems = collections?.find((col: Collection) => col.id === selectedItem?.collectionId)?.items?.filter(it => it.id !== selectedItem?.id);

useEffect(() => {
  if (!collectionId || !itemDisplayOrder) return;

  const nCid = parseInt(collectionId, 10);
  const nOrder = parseInt(itemDisplayOrder, 10);

  console.log(`→ [Effect] request fetch for ${nOrder} at ${new Date().toISOString()}`);
  fetchItemDetailsTruePath(nCid, nOrder);
}, [collectionId, itemDisplayOrder]);  // removed fetchItemDetailsTruePath

  if (!selectedItem) {
    return <div>Loading...</div>;
  }

  const focusImage = () => {
    setIsImageFocused(true);
  };

  const unfocusImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsImageFocused(false);
  };

  return (
    <div className="detailPageBorder">
      <div className={`detailPageContainer ${showEmailForm ? 'emailFormVisible' : ''}`}>
        <div className="imageBox">
          <img src={selectedItem.imageUrl} alt={selectedItem.name} className="imageBoxImage" onClick={focusImage} />
          <div className={`focusedBackdrop ${isImageFocused ? "focusedBackdropVisible" : ""}`} onClick={unfocusImage}>
            <img src={selectedItem.imageUrl} alt={selectedItem.name} className={`imageBoxImage focused ${isImageFocused ? "focusedVisible" : ""}`} onClick={e => e.stopPropagation()} />
          </div>
        </div>
        <div className="descriptionBoxContainer">
          <div className="descriptionBoxName">
            <div className="descriptionBoxKey">Title</div>
            <div className="descriptionBoxValue">{selectedItem.name}</div>
          </div>
          <div className="descriptionBoxCollection">
            <div className="descriptionBoxKey">Collection</div>
            <div className="descriptionBoxValue">{collection?.name}</div>
          </div>
          <div className="descriptionBoxDateCreated">
            <div className="descriptionBoxKey">Date Created</div>
            <div className="descriptionBoxValue">{selectedItem.dateCreated}</div>
          </div>
          <div className="descriptionBoxDimensions">
            <div className="descriptionBoxKey">Dimensions</div>
            <div className="descriptionBoxValue">{selectedItem.dimensions}</div>
          </div>
          <div className="descriptionBoxMaterials">
            <div className="descriptionBoxKey">Materials</div>
            <div className="descriptionBoxValue">{selectedItem.materials}</div>
          </div>
          <div className="descriptionBoxIsSold">
            <div className="descriptionBoxKey">Sale Availability</div>
            <div className="descriptionBoxValue">This piece is {selectedItem.isSold ? "for sale" : "sold"}</div>
          </div>
          <div className="descriptionBoxDescription">
            <div className="descriptionBoxKey">Description</div>
            <div className="descriptionBoxValue">{formatMultilineText(selectedItem.descriptions || "")}</div>
          </div>
          <div className="descriptionBoxEmailButton">
            <button onClick={() => setShowEmailForm(!showEmailForm)}>
              {showEmailForm ? "HIDE EMAIL FORM" : "SHOW EMAIL FORM"}
            </button>
          </div>
        </div>
        {showEmailForm && (
          <div className="emailBox">
            <EmailElement />
          </div>
        )}
        <div className="selectorBox">
          {otherItems?.map(otherItem => (
            <Link className="individualSelectorImage" key={otherItem.id} to={`/collections-new/${collectionId}/items/${otherItem.displayOrder}`}>
              <img src={otherItem.imageUrl} alt={otherItem.name} className="individualSelectorImageProperties" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsNew;