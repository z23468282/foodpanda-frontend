import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import MenuItemInput from './MenuItemInput';

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'menuItems',
  });
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">選單</h2>
        <FormDescription>
          建立您的選單並為每個項目指定名稱和價格
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <MenuItemInput
                key={index}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: '', price: '' })}>
        新增選單項目
      </Button>
    </div>
  );
};

export default MenuSection;
