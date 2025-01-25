import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BiasResultsPage from './pages/BiasResultsPage';
import Header from './components/Header'
import SettingsPage from './components/SettingsPage';
import BiasLearning from './pages/BiasLearning';
import SubscriptionModal from './components/SubscriptionModal';

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <SubscriptionModal/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/results" element={<BiasResultsPage />} />
        <Route path="/learning" element={<BiasLearning />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App; 