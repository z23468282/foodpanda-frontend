import { User } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const useFetchMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('獲取用戶時出錯');
    }

    return res.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery('fetchCurrentUser', getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error('建立用戶時出錯');
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(CreateUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};

type UpdateMyUserRequest = {
  name: string;
  address: string;
  city: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error('更新資料失敗');
    }
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success('個人檔案已更新!');
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};
