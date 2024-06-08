import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DetailSection from './DetailSection';
import FoodSection from './FoodSection';
import { Separator } from '@/components/ui/separator';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/types';
import { useEffect } from 'react';

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: '需要填寫餐廳名稱',
    }),
    city: z.string({
      required_error: '需要填寫城市',
    }),
    address: z.string({
      required_error: '需要填寫地址',
    }),
    price: z.coerce.number({
      required_error: '需要填寫價格',
      invalid_type_error: '須為有效的數字',
    }),
    defaultDeliveryTime: z.coerce.number({
      required_error: '需要填寫交貨時間',
      invalid_type_error: '須為有效的數字',
    }),
    foods: z.array(z.string()).nonempty({
      message: '至少選擇一個食物',
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, '需要填寫名稱'),
        price: z.coerce.number().min(1, '需要填寫價格'),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: '需要圖像' }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: '必須提供圖像 URL 或圖像文件',
    path: ['imageFile'],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: '',
      city: '',
      address: '',
      price: 0,
      defaultDeliveryTime: 0,
      foods: [],
      menuItems: [{ name: '', price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    form.reset(restaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
    formData.append('restaurantName', formDataJson.restaurantName);
    formData.append('city', formDataJson.city);
    formData.append('address', formDataJson.address);

    formData.append('price', formDataJson.price.toString());
    formData.append(
      'defaultDeliveryTime',
      formDataJson.defaultDeliveryTime.toString()
    );

    formDataJson.foods.forEach((food, index) =>
      formData.append(`foods[${index}]`, food)
    );
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });

    if (formDataJson.imageFile) {
      formData.append('imageFile', formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <FoodSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">提交</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
