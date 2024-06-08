import { Restaurant } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Dot } from 'lucide-react';

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}
          {restaurant.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.foods.map((food, index) => (
          <span key={index} className="flex">
            <span>{food}</span>
            {index < restaurant.foods.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
