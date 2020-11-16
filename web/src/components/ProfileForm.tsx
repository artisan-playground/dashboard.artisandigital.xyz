import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import ReactTagInput from '@pathofdev/react-tag-input'
import { Button, Divider, Form, Input, message, Radio, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { UPDATE_USER, UPDATE_USER_CONTACT, UPDATE_USER_SKILLS } from '../services/api/user'

function ProfileForm({ data, refetch, loading, error }: any) {
  const { Text } = Typography
  const [email, setEmail] = useState(data?.email)
  const [name, setName] = useState(data?.name)
  const [position, setPosition] = useState(data?.position)
  const [department, setDepartment] = useState(data?.department)
  const [type, setType] = useState(data?.type)
  const [facebook, setFacebook] = useState(data?.contacts?.facebook)
  const [twitter, setTwitter] = useState(data?.contacts?.twitter)
  const [instagram, setInstagram] = useState(data?.contacts?.instagram)
  const [gitlab, setGitlab] = useState(data?.contacts?.gitlab)
  const [github, setGithub] = useState(data?.contacts?.github)
  const [skills, setSkills] = useState(data?.skills)
  const { Option } = Select
  const [formLayout, setFormLayout] = useState('horizontal')
  const [updateSkills] = useMutation(UPDATE_USER_SKILLS)
  const [updateProfile] = useMutation(UPDATE_USER)
  const [updateContact] = useMutation(UPDATE_USER_CONTACT)

  function handleChangePosition(value: any) {
    setPosition(value)
  }

  function handleChangeDepartment(value: any) {
    setDepartment(value)
  }

  function onChangeType(e: any) {
    setType(e.target.value)
  }

  function handleUpdate() {
    message.loading({
      content: 'Loading...',
      duration: 2,
      icon: <LoadingOutlined style={{ fontSize: 20, top: -2 }} spin />,
    })
    updateProfile({
      variables: {
        id: data.id,
        email: email,
        name: name,
        position: position,
        department: department,
        type: type,
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
    updateSkills({
      variables: { id: data?.id, skills: skills },
    })
      .then((res) => {
        if (res && !loading && !error) {
          message.success({
            content: 'Successfully updated',
            duration: 2,
            icon: <CheckCircleOutlined style={{ fontSize: 20, color: 'green', top: -2 }} />,
          })
          refetch()
        }
      })
      .catch((err) => {
        message.error({
          content: `Error : ${err}`,
          duration: 2,
          icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
        })
      })
  }

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 3 },
          wrapperCol: { span: 24 },
        }
      : null

  return (
    <div>
      <Form
        {...formItemLayout}
        name="normal_edit"
        className="edit-form"
        initialValues={{ remember: true }}
      >
        <Form.Item label="Name">
          <Input
            placeholder="Name..."
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
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
          <Select defaultValue={position} onChange={handleChangePosition}>
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
        <Form.Item label="Department">
          <Select defaultValue={department} onChange={handleChangeDepartment}>
            <Option value="HR/Admin">HR/Admin</Option>
            <Option value="Development">Development</Option>
            <Option value="Marketing">Marketing</Option>
          </Select>
        </Form.Item>
        <Form.Item className="ml-24">
          <Radio.Group onChange={onChangeType} value={type}>
            <Radio value="Full-time">Full-time</Radio>
            <Radio value="Intern">Intern</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Skills">
          <ReactTagInput
            tags={skills}
            editable={true}
            readOnly={false}
            removeOnBackspace={true}
            onChange={(newTags: any) => setSkills(newTags)}
          />
        </Form.Item>
        <Divider />
        <Form.Item label="Facebook">
          <Input
            placeholder="http://"
            defaultValue={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Twitter">
          <Input
            placeholder="http://"
            defaultValue={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Instagram">
          <Input
            placeholder="http://"
            defaultValue={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Gitlab">
          <Input
            placeholder="http://"
            defaultValue={gitlab}
            onChange={(e) => setGitlab(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Github">
          <Input
            placeholder="http://"
            defaultValue={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </Form.Item>

        <Divider />
        <Form.Item className="text-center">
          <Button type="primary" onClick={handleUpdate} className="edit-form-button w-48">
            <Text strong className="text-white">
              Update Information
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ProfileForm
