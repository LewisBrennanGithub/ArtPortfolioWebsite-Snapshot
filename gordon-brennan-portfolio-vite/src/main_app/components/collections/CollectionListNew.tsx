import CollectionElementNew from "../collections/CollectionElementNew";
import { Item } from '../../../types/itemTypes';
import { Collection } from '../../../types/collectionTypes';


interface CollectionListNewProps {
    collections: Collection[] | null;
    items: Item[] | null;
}

const CollectionListNew = ({ collections, items }: CollectionListNewProps) => {
    return (
        <div>
            <div className="collectionListContainer">
                {collections && collections
                    .filter(collection => collection.name !== "Spares")
                    .map(collection => (
                        <CollectionElementNew
                            key={collection.id}
                            collection={collection}
                            items={items}
                        />
                    ))
                }
            </div>
        </div>
    );
};
export default CollectionListNew;