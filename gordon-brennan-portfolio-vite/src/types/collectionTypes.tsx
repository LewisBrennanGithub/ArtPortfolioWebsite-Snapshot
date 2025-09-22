import { Item } from '../types/itemTypes';

export interface Collection {
  id: number;
  name: string;
  collectionImage: string;
  displayOrder: number;
  description: string;
  items?: Item[];
}