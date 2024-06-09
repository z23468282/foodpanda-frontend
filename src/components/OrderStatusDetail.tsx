import { Order } from '@/types';
import { Separator } from './ui/separator';

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-5 ">
      <div className="flex flex-col">
        <span className="font-bold">交付給:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.city}
          {order.deliveryDetails.address}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">您的訂單</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item.menuItemId}>
              {item.name} x {item.quantity}份
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">總計</span>
        <span>${order.totalAmount}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
