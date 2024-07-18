import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Image, Form, Input, message, Col, Row, Typography } from 'antd';
import { AuthImage } from '../../constants';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import CustomButton from '../../components/button';
import AnimatedSection from '../../components/pageAnimation';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn, isAuthenticated, register } = useAuthContext();
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    setMountKey(prev => prev + 1);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (e: React.FormEvent) => {
    console.log("hi")
    e.preventDefault();
    setError(null);
    try {
      setLoading(true)
      await register(email, password, fullName, phoneNumber)
      await signIn(email, password);
      setLoading(false)
      navigate('/');
    } catch (error: any) {
      setError(error.message);
      setLoading(false)
    }
  };

  const errorMessage = (error: any): any => {
    messageApi.open({
      type: 'error',
      content: error,
      key: "1"
    });
  };

  return (
    <Row key={mountKey} justify="center" align="middle" style={{ padding: "0 5rem", height: "100vh" }}>
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
          onFinish={handleRegister}
        >
          <Form.Item label="Email" rules={[{ required: true, message: 'Please input your Email' }]}>
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
          <Form.Item label="Full Name">
            <Input
              placeholder="Enter Full Name"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              size='large'
            />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input
              placeholder="Enter Phone Number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size='large'
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
              onClick={handleRegister}
              style={{ width: "100%" }}
              size='large'>Register
            </CustomButton>

            <Typography style={{ textAlign: "center", marginTop: "1rem" }} color='primary'>Or <Link to="/login" type='primary'>Login now!</Link></Typography>
          </Form.Item>
        </Form>
      </Col>
    </Row >
  );
};

export default Registration;
