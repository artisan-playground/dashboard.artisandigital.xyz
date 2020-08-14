import { CameraOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Form, Input, Row, Select, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProfileEditor() {
  const { Text } = Typography
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [gitlab, setGitlab] = useState('')
  const [github, setGithub] = useState('')
  const { Option } = Select

  function handleChange(value: any) {
    console.log(`Selected ${value}`)
  }

  return (
    <LayoutDashboard>
      <Row>
        <Col span={17} push={7}>
          <Card title="Edit Profile" headStyle={{ fontWeight: 'bold' }}>
            <Form name="normal_edit" className="edit-form" initialValues={{ remember: true }}>
              <Form.Item
                name="firstname"
                className="mr-2"
                rules={[{ required: true, message: 'Please input your Firstname!' }]}
              >
                <Input
                  placeholder="Firstname..."
                  value={firstname}
                  className="inline-block w-5/12"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <Input
                  placeholder="Lastname..."
                  value={lastname}
                  className="inline-block w-5/12 ml-2"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Item>
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
                  placeholder="Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Select defaultValue="a" className="w-2/4" onChange={handleChange}>
                <Option value="a">Head of Development</Option>
                <Option value="b">Assistant</Option>
                <Option value="c">Product/Project Manager</Option>
                <Option value="d">Business Analysis Manager</Option>
                <Option value="d">Software Development Manager</Option>
                <Option value="d">Quality Analysis Manager</Option>
                <Option value="d">Analysis</Option>
                <Option value="d">Designers/Programmers</Option>
                <Option value="d">Testers</Option>
              </Select>
              <Divider />
              <Form.Item name="facebook" label="Facebook">
                <Input
                  placeholder="http://"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="twitter" label="Twitter">
                <Input
                  placeholder="http://"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="instagram" label="Instagram">
                <Input
                  placeholder="http://"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="gitlab" label="Gitlab">
                <Input
                  placeholder="http://"
                  value={gitlab}
                  onChange={(e) => setGitlab(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="github" label="Github">
                <Input
                  placeholder="http://"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </Form.Item>
              <Divider/>
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
