import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BiasResultsPage from './pages/BiasResultsPage';
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/results" element={<BiasResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;