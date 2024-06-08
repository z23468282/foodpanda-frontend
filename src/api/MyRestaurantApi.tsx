import { Restaurant } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('無法獲取您的餐廳');
    }

    return res.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    'fetchMyRestaurant',
    fetchMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!res.ok) {
      throw new Error('無法創建餐廳');
    }

    return res.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success('成功創建餐廳!');
  }

  if (error) {
    toast.error('無法更新餐廳');
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!res.ok) {
      throw new Error('無法更新餐廳');
    }

    return res.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyRestaurantRequest);

  if (isSuccess) {
    toast.success('餐廳已更新!');
  }

  if (error) {
    toast.error('無法更新餐廳');
  }

  return { updateRestaurant, isLoading };
};
