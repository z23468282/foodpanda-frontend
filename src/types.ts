export type User = {
  _id: string;
  email: string;
  name: string;
  address: string;
  city: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  address: string;
  price: number;
  defaultDeliveryTime: number;
  foods: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
