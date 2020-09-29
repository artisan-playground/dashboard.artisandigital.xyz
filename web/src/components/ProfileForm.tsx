import { useMutation } from '@apollo/client'
import { Button, Divider, Form, Input, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { UPDATE_USER, UPDATE_USER_CONTACT } from '../services/api/user'

function ProfileForm({ data }: any) {
  const { Text } = Typography
  const [email, setEmail] = useState(data.email ? data.email : '')
  const [name, setName] = useState(data.name ? data.name : '')
  const [position, setPosition] = useState(data.position ? data.position : '')
  const [facebook, setFacebook] = useState(data.contacts.facebook ? data.contacts.facebook : '')
  const [twitter, setTwitter] = useState(data.contacts.twitter ? data.contacts.twitter : '')
  const [instagram, setInstagram] = useState(data.contacts.instagram ? data.contacts.instagram : '')
  const [gitlab, setGitlab] = useState(data.contacts.gitlab ? data.contacts.gitlab : '')
  const [github, setGithub] = useState(data.contacts.github ? data.contacts.github : '')
  const { Option } = Select
  const [updateProfile] = useMutation(UPDATE_USER)
  const [updateContact] = useMutation(UPDATE_USER_CONTACT)

  function handleChange(value: any) {
    setPosition(value)
  }

  return (
    <Form
      name="normal_edit"
      className="edit-form"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        updateProfile({
          variables: {
            id: data.id,
            email: email,
            name: name,
            position: position,
          },
        })
        updateContact({
          variables: {
            id: data.id,
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            gitlab: gitlab,
            github: github,
          },
        })
      }}
    >
      <Form.Item name="name" label="Name">
        <Input
          placeholder="Name..."
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input
          placeholder="Email..."
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          defaultValue={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="twitter" label="Twitter">
        <Input
          placeholder="http://"
          defaultValue={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="instagram" label="Instagram">
        <Input
          placeholder="http://"
          defaultValue={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="gitlab" label="Gitlab">
        <Input
          placeholder="http://"
          defaultValue={gitlab}
          onChange={(e) => setGitlab(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="github" label="Github">
        <Input
          placeholder="http://"
          defaultValue={github}
          onChange={(e) => setGithub(e.target.value)}
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
