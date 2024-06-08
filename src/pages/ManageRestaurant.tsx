import {
  useCreateMyRestaurant,
  useFetchMyRestaurant,
  useUpdateMyRestaurant,
} from '@/api/MyRestaurantApi';
import ManageRestaurantForm from '../forms/user-profile/manage-restaurant/ManageRestaurantForm';

const ManageRestaurant = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useFetchMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      restaurant={restaurant}
    />
  );
};

export default ManageRestaurant;
