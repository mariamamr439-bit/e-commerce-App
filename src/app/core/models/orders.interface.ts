export interface OrdersResponse extends Array<Order> {}

export interface Order {
  _id: string;
  id: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;

  shippingAddress: ShippingAddress;
  user: User;
  cartItems: CartItem[];
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;

  category: Category;
  brand: Brand;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  image: string;
}
