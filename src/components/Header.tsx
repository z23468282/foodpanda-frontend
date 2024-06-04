import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import MainNav from './MainNav';
import foodpandaImage from '../assets/foodpanda.png';

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-orange-500 flex items-center gap-2"
        >
          <img src={foodpandaImage} width="50px" height="100px" />
          foodpanda
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
