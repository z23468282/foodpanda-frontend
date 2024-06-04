import foodpandaAppImage from '../assets/foodpanda-app.jpg';
import appStoreImage from '../assets/app_store.png';
import playStoreImage from '../assets/play_store.png';

const Home = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold text-orange-600">
          只需點擊一下即可！
        </h1>
        <span className="text-xl ">只需單擊此處</span>
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
