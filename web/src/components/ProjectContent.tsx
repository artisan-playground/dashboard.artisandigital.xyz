import {
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  Switch,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import 'antd/es/date-picker/style/index'
import dayjs, { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useEffect, useState } from 'react'
import UnknownImage from '../assets/images/unknown_image.jpg'
import { UPDATE_PROJECT, UPDATE_PROJECT_STATUS } from '../services/api/project'
import { UPDATE_PROJECT_IMAGE } from '../services/api/projectImage'

function ProjectContent({ data, refetch }: any) {
  const { Text } = Typography
  const { Option } = Select
  const { TextArea } = Input
  const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
  const [projectData, setProjectData]: any = useState()
  const [loading, setLoading] = useState(false)
  const [updateStatus] = useMutation(UPDATE_PROJECT_STATUS)
  const [updateProject] = useMutation(UPDATE_PROJECT)
  const [editProjectVisible, setEditProjectVisible] = useState(false)
  const [projectName, setProjectName] = useState()
  const [type, setType] = useState()
  const [member, setMember] = useState<any[]>([])
  const [dueDate, setDueDate] = useState()
  const [description, setDescription] = useState()
  const [status, setStatus] = useState(true)
  const selectedName = member.map(({ name }) => name)
  const dateFormat = 'DD MMM YYYY'
  const customFormat = (value: any) => `${value.format(dateFormat)}`
  const [updateImage, { loading: loadingUpdate }] = useMutation(UPDATE_PROJECT_IMAGE)

  useEffect(() => {
    setProjectData(data)
    setProjectName(data.projectName)
    setType(data.projectType)
    setMember(data.members)
    setDueDate(data.dueDate)
    setDescription(data.projectDetail)
  }, [data])

  function handleDoneStatus() {
    setLoading(true)
    updateStatus({
      variables: {
        id: data.id,
        status: 'done',
      },
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    refetch()
  }

  function handleUndoneStatus() {
    setLoading(true)
    updateStatus({
      variables: {
        id: data.id,
        status: 'undone',
      },
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    refetch()
  }

  function showEditProject() {
    setEditProjectVisible(true)
  }

  function handleCancel() {
    setEditProjectVisible(false)
  }

  function handleEditProject() {
    if (projectName !== '' && type !== '' && description !== '') {
      updateProject({
        variables: {
          id: data.id,
          projectName: projectName,
          projectType: type,
          projectDetail: description,
        },
      })
        .then((res) => {
          setProjectName(projectName)
          setType(type)
          setDescription(description)
          refetch()
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

  function handleChange(value: any) {
    setType(value)
  }

  function onChange(checked: any) {
    setStatus(checked)
  }

  function onChangeImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) updateImage({ variables: { id: data.id, file: file } })
  }

  return !projectData ? (
    <Skeleton active />
  ) : (
    <Row className="w-full">
      <Col xs={24} lg={4} className="flex justify-center items-start">
        <Space direction="vertical">
          <Avatar
            size={125}
            src={projectData.projectImage ? projectData.projectImage.fullPath : UnknownImage}
            alt="project-image"
          />
        </Space>
      </Col>
      <Col xs={24} lg={20}>
        <Row justify="space-between">
          <Text className="font-bold text-lg">{data.projectName}</Text>
          <Row>
            {data.status === 'done' ? (
              <Button
                className="bg-green-400 hover:bg-green-500 border-none focus:bg-green-500"
                type="primary"
                onClick={handleUndoneStatus}
              >
                {loading ? <LoadingOutlined /> : <CloseOutlined />}
                Mark as Undone
              </Button>
            ) : (
              <Button
                className="bg-red-400 hover:bg-red-500 border-none focus:bg-red-500"
                type="primary"
                onClick={handleDoneStatus}
              >
                {loading ? <LoadingOutlined /> : <CheckOutlined />}
                Mark as Done
              </Button>
            )}
            <Button type="primary" onClick={showEditProject}>
              <EditOutlined />
              Edit
            </Button>
            <Modal
              visible={editProjectVisible}
              width={'80%'}
              title={<Text className="font-bold">Edit {data.projectName}</Text>}
              onCancel={handleCancel}
              footer={null}
            >
              <Row className="px-24 w-full" justify="space-between">
                <Col xs={8} lg={12}>
                  <Space direction="vertical" className="flex items-center justify-center">
                    <img
                      src={data.projectImage.fullPath}
                      className="w-64 h-48"
                      alt="project-image"
                    />
                    <label
                      style={{
                        height: 30,
                        width: 90,
                      }}
                      className="appearance-none border border-gray-300 shadow-sm border flex items-center justify-center rounded-sm py-1 px-2 mt-4 cursor-pointer hover:text-blue-400 hover:border-blue-400 transition delay-100 duration-300 relative"
                    >
                      <input type="file" className="invisible" onChange={onChangeImage} />
                      {loadingUpdate ? (
                        <div className="absolute flex items-center justify-center">
                          <LoadingOutlined className="mr-2" spin />
                        </div>
                      ) : (
                        <div className="absolute flex items-center justify-center">
                          <UploadOutlined className="mr-2" />
                          Upload
                        </div>
                      )}
                    </label>
                  </Space>
                </Col>
                <Col xs={16} lg={12}>
                  <Form layout="vertical">
                    <Form.Item
                      name="Project name"
                      label="Project name"
                      rules={[{ required: true, message: 'Please input project name' }]}
                      required
                    >
                      <Input
                        defaultValue={projectName}
                        placeholder="Please input project name"
                        onChange={(e) => e.target.value}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Type"
                      label="Type"
                      rules={[{ required: true, message: 'Please input project name' }]}
                      required
                    >
                      <Select defaultValue={type} onChange={handleChange}>
                        <Option value="Data">Data</Option>
                        <Option value="Design">Design</Option>
                        <Option value="Mobile">Mobile</Option>
                        <Option value="Security">Security</Option>
                        <Option value="Web">Web</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="Members" label="Members">
                      <Select
                        mode="multiple"
                        defaultValue={selectedName}
                        disabled
                        optionLabelProp="name"
                      />
                    </Form.Item>
                    <Form.Item name="Due date" label="Due date">
                      <DatePicker
                        disabled
                        defaultValue={dayjs(dueDate)}
                        format={customFormat}
                        className="w-full"
                      />
                    </Form.Item>
                    <Form.Item
                      name="Description"
                      label="Description"
                      rules={[{ required: true, message: 'Please input project name' }]}
                      required
                    >
                      <TextArea
                        defaultValue={description}
                        rows={4}
                        onChange={(e) => e.target.value}
                        placeholder="Please input description"
                      />
                    </Form.Item>
                    <Form.Item name="Project status" label="Project status" required>
                      <Space direction="horizontal" size={2}>
                        <Switch defaultChecked={status} onChange={onChange} />
                        {status === true ? <Text>Active</Text> : <Text>Inactive</Text>}
                      </Space>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" className="w-full" onClick={handleEditProject}>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Modal>
          </Row>
        </Row>
        <Row>
          <Space direction="vertical">
            <Text type="secondary" className="mt-4 mb-2">
              {data.projectType}
            </Text>
            <Text>{data.projectDetail}</Text>
          </Space>
        </Row>
      </Col>
    </Row>
  )
}

export default ProjectContent
