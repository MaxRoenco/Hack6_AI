import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Indexes from "./components/Indexes";
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/indexes" element={<Indexes/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
