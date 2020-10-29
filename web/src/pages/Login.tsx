import { MailOutlined } from '@ant-design/icons'
import { useLazyQuery } from '@apollo/client'
import { Button, Card, Col, Form, Image, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { GET_USER } from '../services/api/user'
import { useStoreActions, useStoreState } from '../store'
import { User, UserData } from '../typings'

function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useStoreState((s) => s.userState.user)
  const login = useStoreActions((a) => a.userState.logIn)
  const { Text } = Typography
  const [getUser, { data }] = useLazyQuery<UserData>(GET_USER)
  async function onLogin() {
    if (email) {
      getUser({ variables: { email } })
    }
  }
  if (data?.user) {
    login(data.user as User)
  }

  function enterLoading() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return user ? (
    <Redirect to="/" />
  ) : (
    <div
      className="h-screen bg-auto bg-center bg-no-repeat"
      style={{ backgroundImage: `url(https://source.unsplash.com/1600x900/?computer,blur` }}
    >
      <div
        className="flex items-center justify-center h-screen h-full w-full"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      >
        <Col xs={18} xl={6}>
          <Card hoverable>
            <div className="flex justify-center mb-6">
              <Image
                alt="logo"
                src={require('../assets/images/artisan-logo.png')}
                className="w-48"
              />
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
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  onClick={enterLoading}
                  className="login-form-button w-full"
                >
                  <Text strong className="text-white">
                    Continue
                  </Text>
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </div>
    </div>
  )
}
export default Login
