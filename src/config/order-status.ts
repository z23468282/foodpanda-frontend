import { OrderStatus } from '@/types';

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  {
    label: '等待付款',
    value: '待付款',
    progressValue: 0,
  },
  {
    label: '已付款',
    value: '已付款',
    progressValue: 25,
  },
  {
    label: '準備餐點中',
    value: '處理中',
    progressValue: 50,
  },
  {
    label: '外送員正在路上',
    value: '運輸中',
    progressValue: 75,
  },
  {
    label: '已送達',
    value: '已送達',
    progressValue: 100,
  },
];
