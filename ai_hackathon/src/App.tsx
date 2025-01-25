import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Indexes from "./components/Indexes";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/index" element={<Indexes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
