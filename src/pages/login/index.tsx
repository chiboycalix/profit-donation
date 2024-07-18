import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuthContext } from "../../context/AuthContext";
import { Image, Form, Input, message, Col, Row, Typography } from 'antd';
import { AuthImage } from '../../constants';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import CustomButton from '../../components/button';
import AnimatedSection from '../../components/pageAnimation';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn, isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const errorMessage = (error: any): any => {
    messageApi.open({
      type: 'error',
      content: error,
      key: "1"
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true)
      await signIn(email, password);
      navigate('/');
      setLoading(false)
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message);
      setLoading(false)
    }
  };

  return (
    <Row justify="center" align="middle" style={{ padding: "0 5rem", height: "100vh" }}>
      <Col span={14}>
        {contextHolder}
        {error && <p style={{ color: 'red' }}>{errorMessage(error)}</p>}
        <AnimatedSection>
          <Image
            preview={false}
            src={AuthImage}
          />

        </AnimatedSection>
      </Col >
      <Col span={8}>
        <Form
          layout={"vertical"}
          form={form}
          initialValues={{ layout: "vertical" }}
          onFinish={handleLogin}
        >
          <Form.Item label="Email" hasFeedback rules={[{ required: true, message: 'Please input your Email' }]}>
            <Input
              placeholder="Enter Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size='large'
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              placeholder="Enter Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size='large'
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item>
            <Link to="/forgot-password">
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item >
            <CustomButton
              weight={800}
              loading={loading}
              onClick={handleLogin}
              style={{ width: "100%" }}
              size='large'>Login
            </CustomButton>
            <Typography style={{ textAlign: "center", marginTop: "1rem", fontWeight: "strong" }}>Or <Link to="/register">Register now</Link></Typography>
          </Form.Item>
        </Form>
      </Col>
    </Row >
  );
};

export default Login;