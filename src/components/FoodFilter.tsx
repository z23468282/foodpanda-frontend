import { foodList } from '@/config/restaurant-option';
import { Label } from './ui/label';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ChangeEvent } from 'react';
import { Button } from './ui/button';

type Props = {
  onChange: (foods: string[]) => void;
  selectedFoods: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const FoodFilter = ({
  onChange,
  selectedFoods,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleFoodsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedFood = event.target.value;
    const isChecked = event.target.checked;

    const newFoodList = isChecked
      ? [...selectedFoods, clickedFood]
      : selectedFoods.filter((food) => food !== clickedFood);

    onChange(newFoodList);
  };

  const handleFoodsReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">按品項過濾</div>
        <div
          onClick={handleFoodsReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-900"
        >
          重置
        </div>
      </div>

      <div className="space-y-2 flex flex-col ">
        {foodList
          .slice(0, isExpanded ? foodList.length : 7)
          .map((food, index) => {
            const isSelected = selectedFoods.includes(food);

            return (
              <div key={index} className="flex ">
                <input
                  type="checkbox"
                  id={`food_${food}`}
                  className="hidden"
                  value={food}
                  checked={isSelected}
                  onChange={handleFoodsChange}
                />
                <Label
                  htmlFor={`food_${food}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? 'border border-green-600 text-green-600'
                      : 'border border-slate-300'
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {food}
                </Label>
              </div>
            );
          })}
        <Button
          onClick={onExpandedClick}
          variant="link"
          className="flex-1 mt-4"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center ">
              收回 <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center ">
              查看更多 <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default FoodFilter;
