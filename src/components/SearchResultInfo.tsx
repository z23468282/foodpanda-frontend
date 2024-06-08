import { Link } from 'react-router-dom';

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        從{city}找到了{total}間餐廳
        <Link
          to="/"
          className="text-sm ml-1 font-semibold underline cursor-pointer text-blue-500"
        >
          變更位置
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
