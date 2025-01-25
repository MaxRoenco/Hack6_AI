
const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Website</h1>
        <nav className="flex space-x-4">
          <a href="/home" className="hover:underline">
            Home
          </a>
          <a href="/index" className="hover:underline">
            Indexes
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
