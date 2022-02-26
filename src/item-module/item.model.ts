export type ItemStatus = 'active' | 'disActive';

export interface Item {
  id: number;
  name: string;
  price: number;
  status: ItemStatus;
};

export const items: Item[] = [
  {
    id: 1,
    price: 55,
    name: 'product-1',
    status: 'active'
  },
  {
    id: 2,
    price: 65,
    name: 'product-2',
    status: 'active'
  },
  {
    id: 3,
    price: 97,
    name: 'product-3',
    status: 'disActive'
  },
  {
    id: 4,
    price: 44,
    name: 'product-4',
    status: 'active'
  },
  {
    id: 5,
    price: 21,
    name: 'product-5',
    status: 'disActive'
  },
  {
    id: 6,
    price: 20,
    name: 'product-6',
    status: 'disActive'
  },
  {
    id: 7,
    price: 33,
    name: 'product-7',
    status: 'active'
  },
]