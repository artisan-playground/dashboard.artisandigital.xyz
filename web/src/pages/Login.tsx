import { MailOutlined } from '@ant-design/icons'
import { useLazyQuery } from '@apollo/client'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Logo from '../assets/images/Artisan_Digital_logo.png'
import LoginPageImage from '../assets/images/login-image.png'
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
  let history = useHistory()
  async function onLogin() {
    if (email) {
      const userEmail = email + '@artisan.co.th'
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      getUser({ variables: { email: userEmail } })
    }
  }
  if (data?.getUserByEmail) {
    login(data.getUserByEmail as User)
    history.push('/')
  }

  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="h-screen bg-center bg-no-repeat">
      <Row justify="space-around" className="w-full items-center jestify-center">
        <Col xs={12} md={16} lg={16} className="-ml-16">
          <div className="flex justify-center items-center">
            <img src={LoginPageImage} className="w-full" alt="login" />
          </div>
        </Col>
        <Col xs={13} md={10} lg={7} className="mr-16">
          <div className="items-center justify-center">
            <div className="flex justify-center mb-2">
              <img src={Logo} className="w-64" alt="logo" />
            </div>
            <div className="flex justify-center mb-2">
              <Text className="text-blue-900 text-base">Artisan Dashboard</Text>
            </div>
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
                placeholder="E-mail"
                addonAfter="@artisan.co.th"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {data === undefined ||
                (data?.getUserByEmail === null ? (
                  <Text className="text-red-400">Invalid E-mail Please try again</Text>
                ) : (
                  ''
                ))}
              {email.includes('@') && (
                <Text className="text-red-400">Please enter E-mail with out @</Text>
              )}
            </Form.Item>
            <Form.Item shouldUpdate={true}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={onLogin}
                className="w-full"
                disabled={email === '' ? true : false}
              >
                Sign in
              </Button>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default Login
