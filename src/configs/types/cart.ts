export type TCartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

export type TCart = {
  id: number;
  products: TCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export type TCartList = {
  carts: TCart[];
  total: number;
  skip: number;
  limit: number;
};
