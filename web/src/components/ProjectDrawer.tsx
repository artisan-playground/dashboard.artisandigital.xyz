import { CloseCircleOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Mentions,
  message,
  Row,
  Select,
  Upload,
} from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Text from 'antd/lib/typography/Text'
import React, { useEffect, useState } from 'react'
import { CREATE_PROJECT } from '../services/api/project'
import { GET_USERS } from '../services/api/user'

function ProjectDrawer({ visibillity, onCloseDrawer, refetch }: any) {
  const { Option } = Select
  const { Option: MentionOption } = Mentions

  const { loading, data } = useQuery(GET_USERS)
  const [createProject] = useMutation(CREATE_PROJECT)

  const [visible, setVisible] = useState(false)
  const [userList, setUserList] = useState([])

  const [projectName, setProjectName] = useState('')
  const [projectDetail, setProjectDetail] = useState('')
  const [members, setMembers] = useState([])
  const [dueDate, setDueDate] = useState(new Date())
  const [projectType, setProjectType] = useState('')
  const [projectImage, setProjectImage] = useState('')
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    setVisible(visibillity)
    if (!loading && data) {
      setUserList(data.users)
    }
  }, [visibillity, data, loading])

  function onClose() {
    setVisible(false)
    refetch()
    onCloseDrawer()
  }

  function onChange(_: any, dateString: any) {
    setDueDate(dateString[0])
  }

  function handleCreateProject() {
    if (projectName !== '' && projectType !== '' && projectDetail !== '' && members.length !== 0) {
      createProject({
        variables: {
          projectName: projectName,
          projectType: projectType,
          projectDetail: projectDetail,
          projectImage: projectImage,
          dueDate: new Date(dueDate),
          members: members,
        },
      })
        .then((res) => {
          setProjectName(projectName)
          setProjectType(projectType)
          setProjectDetail(projectDetail)
          setProjectImage(projectImage)
          setDueDate(new Date(dueDate))
          setMembers(members)
          onClose()
        })
        .catch((err) => {
          message.error({
            content: `Error : ${err}`,
            duration: 2,
            icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
          })
        })
    } else {
      message.warning({
        content: `Please insert all field`,
        duration: 2,
        icon: <ExclamationCircleOutlined style={{ fontSize: 20, top: -2 }} />,
      })
    }
  }

  function handleMention(value: any) {
    let ids = userList
      .filter((item: any) => value.slice(0, -1).split('@').includes(item.name))
      .map((val: any) => val.id)
    setMembers(ids[0])
  }

  function getBase64(img: any, callback: any) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  function handleChange(info: any) {
    if (info.file.status === 'uploading') {
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => setImageUrl(imageUrl))
    }
  }
  return (
    <>
      <Drawer
        title="Create a project"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button shape="round" onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button shape="round" onClick={handleCreateProject} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="projectName"
                label="Project name"
                rules={[{ required: true, message: 'Please enter project name' }]}
              >
                <Input
                  placeholder="Please enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="projectImage"
                label="Project Image"
                rules={[{ required: true, message: 'Please enter image link' }]}
              >
                <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange}>
                  <Input.Group compact>
                    <Input
                      style={{ width: '54%' }}
                      defaultValue={imageUrl}
                      placeholder="Upload Image..."
                    />
                    <Button
                      icon={<UploadOutlined />}
                      className="flex items-center justify-center"
                      type="primary"
                    >
                      Upload Image
                    </Button>
                  </Input.Group>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select defaultValue={projectType} placeholder="Please choose the type">
                  <Option value="Design">Design</Option>
                  <Option value="Mobile">Mobile</Option>
                  <Option value="Web">Web</Option>
                  <Option value="Web">Web Application</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Member"
                label="Member"
                rules={[{ required: true, message: 'Please select a member' }]}
              >
                <Mentions
                  style={{ width: '100%' }}
                  placeholder="input @ to mention people"
                  prefix={['@']}
                  onChange={(e) => handleMention(e)}
                >
                  {(userList || []).map((value: any) => (
                    <MentionOption
                      key={value.id}
                      value={value.name}
                      className="hover:bg-primary hover:text-white py-2 px-4"
                    >
                      <Avatar
                        shape="circle"
                        size="default"
                        src={value.image.fullPath}
                        className="mr-2"
                      />
                      {value.name}
                      <Text className="text-gray-400 text-md ml-2">{value.email}</Text>
                    </MentionOption>
                  ))}
                </Mentions>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="Due Date"
                rules={[{ required: true, message: 'Please choose the due date' }]}
              >
                <DatePicker
                  className="w-full"
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter project description',
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter project description"
                  value={projectDetail}
                  onChange={(e) => setProjectDetail(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default ProjectDrawer
