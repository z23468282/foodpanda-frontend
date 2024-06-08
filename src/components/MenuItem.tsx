import { MenuItem as MenuItemType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className=" flex justify-between items-center">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className="font-bold">$ {menuItem.price}</CardContent>
      </div>
      <div>
        <button
          onClick={addToCart}
          className="border border-slate-300 mx-2 px-1 py-1 rounded-md hover:bg-slate-300"
        >
          新增購物車
        </button>
      </div>
    </Card>
  );
};

export default MenuItem;
