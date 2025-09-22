import { Item } from '../../types/itemTypes';

export const getItems = (): Promise<Item[]> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status ${res.status}`);
            }
            return res.json() as Promise<Item[]>;
        })
        .catch(error => {
            console.error("Fetch error ", error);
            throw error;
        })
}

export const getItem = (id: number): Promise<Item> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items/${id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json() as Promise<Item>;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

// export const getItemTruePath = (collectionId: number, itemId: number): Promise<Item> => {
//     return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections/${collectionId}/items/${itemId}`)
//     .then((res) => {
//         if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json() as Promise<Item>;
//     })
//     .catch(error => {
//         console.error("Fetch error: ", error);
//         throw error;
//     });
// }

export const getItemTruePath = (collectionId: number, itemDisplayOrder: number): Promise<Item> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collections/${collectionId}/items/${itemDisplayOrder}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json() as Promise<Item>;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
}

export const postItem = (item: Item, collectionId: number): Promise<Item> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items?collectionId=${collectionId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json() as Promise<Item>;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

export const updateItem = (id: number, itemUpdate: Item, collectionId?: number): Promise<Item> => {
    let url = `${import.meta.env.VITE_BACKEND_URL}/api/items/${id}`;
    if (collectionId !== undefined) {
        url += `?collectionId=${collectionId}`;
    }

    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemUpdate),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json() as Promise<Item>;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

export const deleteItem = (id: number): Promise<Response> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items/${id}`, {
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