export interface IProductItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  thumbnail: string;
}

export interface IShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
  shippingAddress: IShippingAddress;
}
export interface IOrderData {
  id: string;
  statuses: string[];
  createdAt: number;
  lastUpdatedAt: number;
  currency: string;
  productList: IProductItem[]
}