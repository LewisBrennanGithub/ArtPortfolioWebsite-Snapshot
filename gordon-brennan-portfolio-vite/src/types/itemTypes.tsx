export interface Item {
    id?: number;
    name: string;
    dateCreated: string;
    imageUrl: string;
    isSold: boolean;
    dimensions: string;
    collectionId?: number;
    descriptions?: string;
    materials?: string;
    displayOrder: number;
}
