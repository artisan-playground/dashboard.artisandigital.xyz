import { CameraOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Form, Input, Row, Select, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProfileEditor() {
  const { Text } = Typography
  const [, setEmail] = useState('')
  const [, setFirstname] = useState('')
  const [, setLastname] = useState('')
  const [, setFacebook] = useState('')
  const [, setTwitter] = useState('')
  const [, setInstagram] = useState('')
  const [, setGitlab] = useState('')
  const [, setGithub] = useState('')
  const { Option } = Select
  const user = {
    id: '0',
    email: 'test@mail.com',
    firstname: 'John',
    lastname: 'Doe',
    position: 'Designers/Programmers',
    skills: ['HTML', 'JavaScript', 'React', 'Redux', 'UI', 'UX'],
    contacts: [
      {
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
  }

  function handleChange(value: any) {
    console.log(`Selected ${value}`)
  }

  return (
    <LayoutDashboard>
      <Row>
        <Col span={17} push={7}>
          <Card title="Edit Profile" headStyle={{ fontWeight: 'bold' }}>
            <Form name="normal_edit" className="edit-form" initialValues={{ remember: true }}>
              <div className="flex items-center justify-between">
                <Form.Item
                  name="firstname"
                  label="Firstname"
                  className="mr-2 w-2/4"
                  rules={[{ required: true, message: 'Please input your Firstname!' }]}
                >
                  <Input
                    placeholder="Firstname..."
                    value={user.firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  label="Lastname"
                  className="w-2/4"
                  rules={[{ required: true, message: 'Please input your Lastname!' }]}
                >
                  <Input
                    placeholder="Lastname..."
                    value={user.lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="email"
                label="Email"
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
                  placeholder="Email..."
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Select defaultValue={user.position} className="w-2/4" onChange={handleChange}>
                <Option value="Head of Development">Head of Development</Option>
                <Option value="Assistant">Assistant</Option>
                <Option value="Product/Project Manager">Product/Project Manager</Option>
                <Option value="Business Analysis Manager">Business Analysis Manager</Option>
                <Option value="Software Development Manager">Software Development Manager</Option>
                <Option value="Quality Analysis Manager">Quality Analysis Manager</Option>
                <Option value="Analysis">Analysis</Option>
                <Option value="Designers/Programmers">Designers/Programmers</Option>
                <Option value="Testers">Testers</Option>
              </Select>
              <Divider />
              {user.contacts.map((value, index) => {
                return (
                  <div key={index}>
                    <Form.Item name="facebook" label="Facebook">
                      <Input
                        placeholder="http://"
                        value={value.facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item name="twitter" label="Twitter">
                      <Input
                        placeholder="http://"
                        value={value.twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item name="instagram" label="Instagram">
                      <Input
                        placeholder="http://"
                        value={value.instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item name="gitlab" label="Gitlab">
                      <Input
                        placeholder="http://"
                        value={value.gitlab}
                        onChange={(e) => setGitlab(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item name="github" label="Github">
                      <Input
                        placeholder="http://"
                        value={value.github}
                        onChange={(e) => setGithub(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                )
              })}

              <Divider />
              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit" className="edit-form-button w-48">
                  <Text strong className="text-white">
                    Save Changes
                  </Text>
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={6} pull={17}>
          <Card className="flex items-center justify-center text-center mb-4">
            <Avatar
              src="https://source.unsplash.com/600x600/?people"
              alt="user"
              size={125}
              className="mb-8"
            />
            <Button type="primary" ghost icon={<CameraOutlined />}>
              Upload an image
            </Button>
            <Button type="text">Remove an image</Button>
          </Card>
          <Card>
            <Text className="text-lg font-bold">Skill(s)</Text>
          </Card>
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default ProfileEditor
