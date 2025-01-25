import { Link } from "react-chrome-extension-router";
import Home from "./Home";

const Header = () => {
  return (
    <header className="bg-emerald-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justfify-between items-center">
        <h1 className="text-2xl font-bold">My Website</h1>
        <nav className="flex space-x-4">
          <Link component={Home} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
