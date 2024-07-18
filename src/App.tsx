import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import DonationForm from './pages/donation';
import AdminPanel from './pages/admin';
import Registration from './pages/register';
import Container from './container';
import ForgotPassword from './pages/forgotPassword';
import theme from './theme';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<Container />}>
                <Route index element={<Dashboard />} />
                <Route path="donations" element={<DonationForm />} />
              </Route>
              <Route path="/register" element={<Registration />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;