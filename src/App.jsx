import React from 'react';
import Home from './components/Home';
import Header from './components/navigations/Header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from './atoms/authAtom';
import Dashboard from './components/Dashboard';
export default function App() {
  const token = useAtomValue(authTokenAtom);

  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={token ? <Home /> : <LoginForm />} />
          <Route path="/home" element={token ? <Home /> : <LoginForm />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <LoginForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
