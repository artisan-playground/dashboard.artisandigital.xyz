import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useStoreActions, useStoreState } from '../store'

function Register() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const user = useStoreState((s) => s.userState.user)
  const set = useStoreActions((a) => a.userState.set)
  const { Text, Link } = Typography
  const testUser = {
    id: '0',
    firstname: 'John',
    lastname: 'Doe',
    email: 'test@mail.com',
    password: '1234',
  }

  async function onRegister() {
    await set(testUser)
    if (user) history.push('/')
    console.log('user', user)
  }

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundImage: `url(https://source.unsplash.com/1600x900/?computer,blur` }}
    >
      <Card hoverable className="z-1 p-4">
        <img alt="logo" src={require('../assets/images/logo3.png')} className="w-32 mb-10" />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onRegister}
        >
          <div className="flex items-center justify-between">
            <Form.Item
              name="firstname"
              className="mr-2"
              rules={[{ required: true, message: 'Please input your Firstname!' }]}
            >
              <Input
                placeholder="Firstname..."
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[{ required: true, message: 'Please input your Lastname!' }]}
            >
              <Input
                placeholder="Lastname..."
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Item>
          </div>
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
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="confirmPass"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('The two passwords that you entered does not match!')
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password..."
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="login-form-button w-full">
              <Text strong className="text-white">
                Register
              </Text>
            </Button>
            <Divider />
            <Text strong>
              Already have an account? <Link href="/login">Login</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Register
