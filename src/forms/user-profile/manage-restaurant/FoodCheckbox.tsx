import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

type Props = {
  food: string;
  field: ControllerRenderProps<FieldValues, 'foods'>;
};

const FoodCheckbox = ({ food, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(food)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, food]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== food)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{food}</FormLabel>
    </FormItem>
  );
};

export default FoodCheckbox;
