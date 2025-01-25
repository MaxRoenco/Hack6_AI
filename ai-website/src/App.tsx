import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BiasResultsPage from './pages/BiasResultsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/results" element={<BiasResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;