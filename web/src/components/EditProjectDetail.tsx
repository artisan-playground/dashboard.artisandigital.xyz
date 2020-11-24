import { CloseCircleOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Mentions,
  message,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { UPDATE_PROJECT } from '../services/api/project'
import { UPDATE_PROJECT_IMAGE } from '../services/api/projectImage'

function EditProjectDetail({ visibillity, onCloseDrawer, data, refetch }: any) {
  const { Text } = Typography
  const { Option } = Select
  const { Option: MentionOption } = Mentions
  const [updateProject] = useMutation(UPDATE_PROJECT)
  const [userList, setUserList] = useState([])

  const [projectData, setProjectData] = useState<any>()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [projectId, setProjectId] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectDetail, setProjectDetail] = useState('')
  const [members, setMembers] = useState([])
  const [dueDate, setDueDate] = useState(new Date())
  const [projectType, setProjectType] = useState('')
  const [projectImage, setProjectImage] = useState('')
  const [updateImage] = useMutation(UPDATE_PROJECT_IMAGE)
  const [status, setStatus] = useState<any>(data.status)

  useEffect(() => {
    setVisible(visibillity)
    if (!loading && data) {
      setProjectData(data)
      setProjectId(data.id)
      setProjectName(data.projectName)
      setProjectDetail(data.projectDetail)
      setDueDate(data.dueDate)
      setProjectType(data.projectType)
      setProjectImage(data.projectImage)
    }
  }, [visibillity, data, loading, updateProject, updateImage])

  function onClose() {
    setVisible(false)
    refetch()
    onCloseDrawer()
  }

  function handleStatus(e: any) {
    setStatus(e.target.value)
  }

  function handleType(value: any) {
    setProjectType(value)
  }

  function handleMention(value: any) {
    let ids = userList
      .filter((item: any) => value.slice(0, -1).split('@').includes(item.name))
      .map((val: any) => val.id)
    setMembers(ids[0])
  }

  function onChange(_: any, dateString: any) {
    setDueDate(dateString[0])
  }

  function onChangeImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) updateImage({ variables: { id: Number(projectId), file } })
  }

  function handleUpdateProject() {
    if (projectName !== '') {
      updateProject({
        variables: {
          id: Number(projectId),
          projectName: projectName,
          projectDetail: projectDetail,
          projectType: projectType,
          status: status,
        },
      })
        .then((res) => {
          setProjectName(projectName)
          refetch()
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

  return !projectData ? (
    <Skeleton active />
  ) : (
    <Drawer
      title={`Edit ${projectData.projectName}`}
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
          <Button shape="round" onClick={handleUpdateProject} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <div className="flex items-end justify-end">
              <Radio.Group
                defaultValue={status}
                size="small"
                buttonStyle="solid"
                onChange={handleStatus}
              >
                <Radio.Button value="done">Done</Radio.Button>
                <Radio.Button value="undone">Undone</Radio.Button>
              </Radio.Group>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={
                  projectData.projectImage
                    ? projectData.projectImage.fullPath
                    : require('../assets/images/logo5.png')
                }
                alt="avatar"
                className="w-40 rounded-full"
              />
            </div>
            <Row className="flex items-center justify-center">
              <label className="appearance-none border border-gray-300 flex items-center justify-center rounded-sm py-1 px-2 mt-4 cursor-pointer hover:text-blue-400 hover:border-blue-400 transition delay-100 duration-300 w-1/2 relative">
                <input type="file" className="invisible" onChange={onChangeImage} />
                <div className="absolute">
                  <UploadOutlined className="mr-2" />
                  Change Image
                </div>
              </label>
            </Row>
            <Form.Item
              name="projectName"
              label="Project name"
              rules={[{ required: true, message: 'Please enter project name' }]}
            >
              <Input
                placeholder="Please enter project name"
                defaultValue={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please choose the type' }]}
            >
              <Select
                defaultValue={projectType}
                placeholder="Please choose the type"
                onChange={handleType}
              >
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
                      src={
                        value.image ? value.image.fullPath : require('../assets/images/logo5.png')
                      }
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
                defaultValue={projectDetail}
                onChange={(e) => setProjectDetail(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default EditProjectDetail
