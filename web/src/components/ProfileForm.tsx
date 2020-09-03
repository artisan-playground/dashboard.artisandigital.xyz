import { Button, Divider, Form, Input, Select, Typography } from 'antd'
import React, { useState } from 'react'

function ProfileForm({ data }: any) {
  const { Text } = Typography
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [gitlab, setGitlab] = useState('')
  const [github, setGithub] = useState('')
  const { Option } = Select

  function handleChange() {
    setPosition(position)
  }

  return (
    <Form name="normal_edit" className="edit-form" initialValues={{ remember: true }}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your Firstname!' }]}
      >
        <Input placeholder="Name..." defaultValue={data.name} onChange={() => setName(name)} />
      </Form.Item>
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
        <Input placeholder="Email..." defaultValue={data.email} onChange={() => setEmail(email)} />
      </Form.Item>
      <Form.Item label="Job Position">
        <Select defaultValue={data.position} style={{ width: '50%' }} onChange={handleChange}>
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
          defaultValue={data.contacts.facebook}
          onChange={() => setFacebook(facebook)}
        />
      </Form.Item>
      <Form.Item name="twitter" label="Twitter">
        <Input
          placeholder="http://"
          defaultValue={data.contacts.twitter}
          onChange={(e) => setTwitter(twitter)}
        />
      </Form.Item>
      <Form.Item name="instagram" label="Instagram">
        <Input
          placeholder="http://"
          defaultValue={data.contacts.instagram}
          onChange={() => setInstagram(instagram)}
        />
      </Form.Item>
      <Form.Item name="gitlab" label="Gitlab">
        <Input
          placeholder="http://"
          defaultValue={data.contacts.gitlab}
          onChange={() => setGitlab(gitlab)}
        />
      </Form.Item>
      <Form.Item name="github" label="Github">
        <Input
          placeholder="http://"
          defaultValue={data.contacts.github}
          onChange={() => setGithub(github)}
        />
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
  )
}

export default ProfileForm
