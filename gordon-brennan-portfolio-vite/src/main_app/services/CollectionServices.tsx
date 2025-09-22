import { Collection } from '../../types/collectionTypes';

export const getCollections = (): Promise<Collection[]> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json() as Promise<Collection[]>;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
}

export const getCollection = (id: number): Promise<Collection> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections/${id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json() as Promise<Collection>;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

export const postCollection = (collection: Collection): Promise<Collection> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(collection),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json() as Promise<Collection>;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

export const updateCollection = (id: number, collectionUpdate: Collection): Promise<Collection> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(collectionUpdate),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json() as Promise<Collection>;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

export const deleteCollection = (id: number): Promise<Response> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections/${id}`, {
        method: 'DELETE',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

export const deleteCollectionAndItems = (id: number): Promise<Response> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections/${id}/withItems`, {
        method: 'DELETE',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

