import { Order, OrderStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ORDER_STATUS } from '@/config/order-status';
import { useUpdateMyRestaurantOrder } from '@/api/MyRestaurantApi';
import { useEffect, useState } from 'react';

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateRestaurantOrderStatus, isLoading } =
    useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantOrderStatus({
      orderId: order._id,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.paidAt as string);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinute = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinute}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 mb-3 justify-between">
          <div>
            客戶名稱:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            送達地址:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.city}
              {order.deliveryDetails.address}
            </span>
          </div>
          {order?.paidAt ? (
            <div>
              預計送達時間:
              <span className="ml-2 font-normal">{getTime()}</span>
            </div>
          ) : (
            <div>尚未付款</div>
          )}

          <div>
            總金額:
            <span className="ml-2 font-normal">${order.totalAmount}</span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem.menuItemId}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">該訂單的狀態如何？</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="狀態" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status, index) => (
                <SelectItem key={index} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
