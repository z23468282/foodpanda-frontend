import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { foodList } from '@/config/restaurant-option';
import FoodCheckbox from './FoodCheckbox';

const FoodSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">食物</h2>
        <FormDescription>選擇您的餐廳提供的菜色</FormDescription>
      </div>
      <FormField
        control={control}
        name="foods"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {foodList.map((food, index) => (
                <FoodCheckbox key={index} food={food} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FoodSection;
