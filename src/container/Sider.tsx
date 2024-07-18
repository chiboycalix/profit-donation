import React, { useState } from 'react'
import {
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const { Sider } = Layout;

const SiderComponent: React.FC<{ collapsed: boolean; handleSignOut: any }> = ({ collapsed, handleSignOut }) => {
  const location = useLocation();
  const [isLightTheme, setIsLightTheme] = useState(false)


  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="" style={{ height: "65px", backgroundColor: "white" }} />
      <Menu
        theme={isLightTheme ? "dark" : "light"}
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
        items={[
          {
            key: '/',
            icon: <UserOutlined />,
            label: <Link to="/">Dashboard</Link>,
          },
          {
            key: '/donations',
            icon: <VideoCameraOutlined />,
            label: <Link to="/donations">Donations</Link>,
          },
          {
            key: '4',
            icon: <UserOutlined />,
            label: 'Set Theme',
            onClick: () => setIsLightTheme(!isLightTheme)
          },
          {
            key: '3',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => handleSignOut()
          },
        ]}
      />
    </Sider>
  )
}

export default SiderComponent