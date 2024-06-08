import { SearchState } from '@/pages/Search';
import { Restaurant, RestaurantSearchResponse } from '@/types';
import { useQuery } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const res = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

    if (!res.ok) {
      throw new Error('找不到餐廳');
    }

    return res.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    'fetchRestaurant',
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set('searchQuery', searchState.searchQuery);
    params.set('page', searchState.page.toString());
    params.set('selectedFoods', searchState.selectedFoods.join(','));
    params.set('sortOption', searchState.sortOption);

    const res = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!res.ok) {
      throw new Error('搜尋餐廳失敗');
    }

    return res.json();
  };

  const { data: results, isLoading } = useQuery(
    ['searchRestaurants', searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};
