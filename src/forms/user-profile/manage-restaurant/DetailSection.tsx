import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const DetailSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">詳細資訊</h2>
        <FormDescription>輸入你的餐廳詳情</FormDescription>
      </div>
      <FormField
        control={control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>餐廳名稱</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid md:grid-cols-[1fr_3fr] gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>城市</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>地址</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>運費</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="30" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="defaultDeliveryTime"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>預計送達時間 (分)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="30" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailSection;
