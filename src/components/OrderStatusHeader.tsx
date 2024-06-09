import { Order } from '@/types';
import { Progress } from './ui/progress';
import { ORDER_STATUS } from '@/config/order-status';

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getDefaultDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.defaultDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatus = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1
        className="text-4xl font-bold flex flex-col gap-5 md:flex-row md:justify-between
        "
      >
        <span>訂單狀態: {getOrderStatus().label}</span>
        {order?.paidAt && <span>預計送達時間: {getDefaultDelivery()}</span>}
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatus().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
