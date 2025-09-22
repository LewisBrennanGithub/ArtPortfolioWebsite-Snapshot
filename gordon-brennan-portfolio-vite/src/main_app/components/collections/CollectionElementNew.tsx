import { formatMultilineText } from '../helpers/MultiLineText';
import { Link } from 'react-router-dom';
import { Collection } from '../../../types/collectionTypes';
import { Item } from '../../../types/itemTypes';
import { getLowestDisplayOrder } from '../helpers/GetLowestDisplayOrder';


interface CollectionElementNewProps {
    collection: Collection;
    items: Item[] | null;
}

const CollectionElementNew = ({ collection, items }: CollectionElementNewProps) => {
    const lowestDisplayOrder = getLowestDisplayOrder(collection, items);


    return (
        <div className="collectionElementContainer">
          <div className="collectionTitle">{collection.name}</div>
          <Link to={`/collections-new/${collection.id}/items/${lowestDisplayOrder}`}>
            <img src={collection.collectionImage} className="collectionElementImage" />
          </Link>
          <div className="collectionDescription">{formatMultilineText(collection.description)}</div>
        </div>
      );
    };

export default CollectionElementNew;
