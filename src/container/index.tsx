import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import SiderComponent from './Sider';
import HeaderComponent from './Header';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const Container: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isAuthenticated, signOut } = useAuthContext();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderComponent collapsed={collapsed} handleSignOut={handleSignOut} />
      <Layout>
        <HeaderComponent setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Container;