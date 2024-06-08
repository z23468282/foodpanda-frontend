import foodpandaAppImage from '../assets/foodpanda-app.jpg';
import appStoreImage from '../assets/app_store.png';
import playStoreImage from '../assets/play_store.png';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold text-orange-600">
          只需點擊一下即可！
        </h1>
        <span className="text-xl ">只需單擊此處</span>
        <SearchBar
          placeHolder="按你所在的縣市搜尋"
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={foodpandaAppImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl ">下載foodpanda App!</span>
          <span>
            手指輕點，從美食到生鮮雜貨，上萬種商品馬上點馬上到－立即下載
          </span>
          <div className="flex gap-4 justify-center items-center ">
            <img
              src={appStoreImage}
              className=" max-w-[180px] duration-500 cursor-pointer hover:scale-110"
            />
            <img
              src={playStoreImage}
              className=" max-w-[180px] duration-500 cursor-pointer hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
