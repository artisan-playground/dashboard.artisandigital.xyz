import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Card, Input, Form, Button, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useStoreActions, useStoreState } from '../store'

function Login() {
  const history = useHistory()
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
    if (user) history.push('/')
    console.log('user', user)
  }
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundImage: `url(https://source.unsplash.com/1600x900/?technology` }}
    >
      <Card hoverable className="p-4">
        <div className="flex justify-center mb-6">
          <img alt="logo" src={require('../assets/artisan-logo.png')} className="w-64" />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onLogin}
        >
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="test@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button w-full">
              <Text strong className="text-white">
                Continue
              </Text>
            </Button>
            <Text strong>
              Don't have an account? <Link href="/register">Register</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login
