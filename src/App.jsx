import React from 'react';
import Home from './components/Home';
import Header from './components/navigations/Header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ContactForm from './components/ContactForm';
import Pagination from './components/Pagination';
import EmployeeDetails from './components/EmployeeDetails.jsx';
import Language from './components/Language';
import IntlProvider from './IntlProvider';
import PrivateRoute from './routes/PrivateRoute.jsx';

export default function App() {
  return (
    <IntlProvider>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contactform" element={<ContactForm />} />
              <Route path="/language" element={<Language />} />
              <Route path="/pagination" element={<Pagination />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />

            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </IntlProvider>
  );
}
