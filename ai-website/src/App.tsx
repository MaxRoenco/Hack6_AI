import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BiasResultsPage from './pages/BiasResultsPage';
import Header from './components/Header'
import SettingsPage from './components/SettingsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/results" element={<BiasResultsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App; 