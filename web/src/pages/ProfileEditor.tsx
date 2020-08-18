import { CameraOutlined } from '@ant-design/icons'
// @ts-ignore
import ReactTagInput from '@pathofdev/react-tag-input'
import '@pathofdev/react-tag-input/build/index.css'
import { Button, Card, Col, Divider, Form, Input, Row, Select, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProfileEditor() {
  const { Text } = Typography
  const [email, setEmail] = useState('test@mail.com')
  const [firstname, setFirstname] = useState('John')
  const [lastname, setLastname] = useState('Doe')
  const [position, setPosition] = useState('Designers/Programmers')
  const [skills, setSkills] = useState(['HTML', 'JavaScript', 'React', 'Redux', 'UI', 'UX'])
  const [facebook, setFacebook] = useState('http://localhost:3000/profile')
  const [twitter, setTwitter] = useState('http://localhost:3000/profile')
  const [instagram, setInstagram] = useState('http://localhost:3000/profile')
  const [gitlab, setGitlab] = useState('http://localhost:3000/profile')
  const [github, setGithub] = useState('http://localhost:3000/profile')
  const { Option } = Select

  function handleChange() {
    setPosition(position)
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
                    value={firstname}
                    onChange={() => setFirstname(firstname)}
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
                    value={lastname}
                    onChange={() => setLastname(lastname)}
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
                <Input placeholder="Email..." value={email} onChange={() => setEmail(email)} />
              </Form.Item>
              <Form.Item label="Job Position">
                <Select defaultValue={position} style={{ width: '50%' }} onChange={handleChange}>
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
              </Form.Item>
              <Divider />
              <Form.Item name="facebook" label="Facebook">
                <Input
                  placeholder="http://"
                  value={facebook}
                  onChange={() => setFacebook(facebook)}
                />
              </Form.Item>
              <Form.Item name="twitter" label="Twitter">
                <Input placeholder="http://" value={twitter} onChange={() => setTwitter(twitter)} />
              </Form.Item>
              <Form.Item name="instagram" label="Instagram">
                <Input
                  placeholder="http://"
                  value={instagram}
                  onChange={() => setInstagram(instagram)}
                />
              </Form.Item>
              <Form.Item name="gitlab" label="Gitlab">
                <Input placeholder="http://" value={gitlab} onChange={() => setGitlab(gitlab)} />
              </Form.Item>
              <Form.Item name="github" label="Github">
                <Input placeholder="http://" value={github} onChange={() => setGithub(github)} />
              </Form.Item>

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
            <ReactTagInput
              tags={skills}
              editable={true}
              readOnly={false}
              removeOnBackspace={true}
              onChange={(newTags: any) => setSkills(newTags)}
            />
          </Card>
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default ProfileEditor
