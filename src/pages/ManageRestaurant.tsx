import {
  useCreateMyRestaurant,
  useFetchMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from '@/api/MyRestaurantApi';
import ManageRestaurantForm from '../forms/user-profile/manage-restaurant/ManageRestaurantForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderItemCard from '@/components/OrderItemCard';

const ManageRestaurant = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useFetchMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">管理訂單</TabsTrigger>
        <TabsTrigger value="manage-restaurant">管理餐廳</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {orders?.length ? `${orders.length}筆訂單` : '沒有訂單'}
        </h2>
        {orders?.map((order) => (
          <OrderItemCard key={order._id} order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
          restaurant={restaurant}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurant;
