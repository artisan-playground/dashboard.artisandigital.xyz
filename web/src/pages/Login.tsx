import { MailOutlined } from '@ant-design/icons'
import { useLazyQuery } from '@apollo/client'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
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
      const userEmail = email + '@artisan.co.th'
      getUser({ variables: { email: userEmail } })
    }
  }
  if (data?.getUserByEmail) {
    login(data.getUserByEmail as User)
  }

  function enterLoading() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="h-screen bg-center bg-no-repeat">
      <Row justify="space-around" className="w-full items-center jestify-center">
        <Col xs={16} className="-ml-16">
          <div className="flex justify-center items-center">
            <img alt="logo" src={require('../assets/images/login-image.png')} className="w-full" />
          </div>
        </Col>
        <Col xs={7} className="mr-16">
          <div className="items-center justify-center">
            <div className="flex justify-center mb-2">
              <img
                alt="logo"
                src={require('../assets/images/Artisan_Digital_logo.png')}
                className="w-64"
              />
            </div>
            <div className="flex justify-center mb-2">
              <Text className="text-blue-900 text-base">Artisan Dashboard</Text>
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
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon text-gray-300" />}
                  className="w-full"
                  placeholder="Email"
                  addonAfter="@artisan.co.th"
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
                  className="login-form-button w-full bg-secondary border-none hover:bg-thirdcolor"
                >
                  <Text strong className="text-white">
                    Sign in
                  </Text>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default Login
