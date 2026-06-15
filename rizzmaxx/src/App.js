import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PSLRater from './pages/PSLRater';
import RizzCoach from './pages/RizzCoach';
import GlowUpGuide from './pages/GlowUpGuide';
import RizzBattle from './pages/RizzBattle';
import TierList from './pages/TierList';
import Leaderboard from './pages/Leaderboard';
import Languages from './pages/Languages';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psl" element={<PSLRater />} />
        <Route path="/coach" element={<RizzCoach />} />
        <Route path="/guide" element={<GlowUpGuide />} />
        <Route path="/battle" element={<RizzBattle />} />
        <Route path="/tier" element={<TierList />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
