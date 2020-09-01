import { MailOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input, Typography, Col } from 'antd'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useStoreActions, useStoreState } from '../store'

function Login() {
  const [email, setEmail] = useState('')
  const user = useStoreState((s) => s.userState.user)
  const login = useStoreActions((a) => a.userState.logIn)
  const { Text, Link } = Typography
  const testUser = {
    id: '0',
    email: 'test@mail.com',
  }

  async function onLogin() {
    await login(testUser)
  }

  return user ? (
    <Redirect to="/" />
  ) : (
    <div
      className="flex items-center justify-center h-screen bg-auto bg-center bg-no-repeat"
      style={{ backgroundImage: `url(https://source.unsplash.com/1600x900/?computer,blur` }}
    >
      <Col xs={18} xl={6}>
        <Card hoverable>
          <div className="flex justify-center mb-6">
            <img alt="logo" src={require('../assets/images/artisan-logo.png')} className="w-48" />
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onLogin}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                className="w-full"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" className="login-form-button w-full">
                <Text strong className="text-white">
                  Continue
                </Text>
              </Button>
              <Divider />
              <Text strong>
                Don't have an account? <Link href="/register">Register</Link>
              </Text>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </div>
  )
}
export default Login
