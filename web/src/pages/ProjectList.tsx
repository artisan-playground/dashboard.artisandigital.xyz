import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PictureOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  message,
  Modal,
  PageHeader,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useEffect, useState } from 'react'
import { LayoutDashboard, LoadingComponent, ProjectCard } from '../components/DashboardComponent'
import { CREATE_PROJECT, PROJECT } from '../services/api/project'
import { UPDATE_PROJECT_IMAGE, UPLOAD_PROJECT_IMAGE } from '../services/api/projectImage'
import { GET_USERS } from '../services/api/user'

function ProjectList() {
  const { Option } = Select
  const { TextArea } = Input
  const { Text } = Typography
  const { loading, error, data, refetch } = useQuery(PROJECT)
  const [filteredData, setFilteredData] = useState<any>()
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [filterloading, setLoading] = useState(false)
  const [createProjectVisible, setCreateProjectVisible] = useState(false)
  const [createProject] = useMutation(CREATE_PROJECT)
  const [updateImage, { loading: loadingUpdate, data: imageUpdateData }] = useMutation(
    UPDATE_PROJECT_IMAGE
  )
  const [uploadImage, { loading: loadingUpload, data: imageData }] = useMutation(
    UPLOAD_PROJECT_IMAGE
  )
  const { loading: userLoading, data: userData } = useQuery(GET_USERS)
  const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
  const [projectName, setProjectName] = useState()
  const [type, setType] = useState()
  const [member, setMember] = useState<any[]>([])
  const [dueDate, setDueDate] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [userList, setUserList] = useState([])
  const dateFormat = 'DD MMM YYYY'
  const customFormat = (value: any) => `${value.format(dateFormat)}`

  useEffect(() => {
    if (!error && !loading && !userLoading) {
      switch (types) {
        case 'undone':
          let wip: any[] = data.projects.filter((item: any) => item.status === 'undone')
          setFilteredData(wip)
          break
        case 'done':
          let closed: any[] = data.projects.filter((item: any) => item.status === 'done')
          setFilteredData(closed)
          break
        case 'all':
          setFilteredData(data.projects)
          break
        default:
          setFilteredData(data.projects)
          break
      }
    }
    setUserList(userData && userData.users)
    setImage(
      imageData
        ? imageData.uploadProjectImage.id
        : imageUpdateData && imageUpdateData.updateProjectImage.id
    )
  }, [types, loading, error, data, userLoading, userData])

  function handleKeywordChange(e: any) {
    setLoading(true)
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredData(data.projects)
      setTypes('all')
      setLoading(false)
    } else {
      const kw: any[] = data.projects.filter((item: any) => {
        if (types === 'all') {
          return item.projectName.toLowerCase().includes(e.target.value.toLowerCase())
        } else {
          return (
            item.status === types &&
            item.projectName.toLowerCase().includes(e.target.value.toLowerCase())
          )
        }
      })
      setFilteredData(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function handleChange(value: any) {
    setTypes(value)
  }

  function showCreateProject() {
    setCreateProjectVisible(true)
  }

  function handleCancel() {
    setCreateProjectVisible(false)
  }

  function onUploadImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) uploadImage({ variables: { file: file } })
  }

  function onChangeImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid)
      updateImage({
        variables: {
          id: imageData
            ? imageData.uploadProjectImage.id
            : imageUpdateData && imageUpdateData.updateProjectImage.id,
          file: file,
        },
      })
  }
  console.log('image', image)

  console.log(imageData && imageData.uploadProjectImage)
  function handleCreateProject() {
    if (projectName !== '' && type !== '' && description !== '') {
      createProject({
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

  function handleMember(value: any) {
    const val = Number(value.reverse()[0])
    return member.push({ id: val })
  }
  console.log(handleMember)

  function onChangeDate(_: any, dateString: any) {
    setDueDate(dateString[0])
  }

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="Projects" />
      <Divider />
      <div className="px-8">
        <Row className="justify-between mb-8">
          <Row>
            <Button
              className="flex items-center justify-center bg-secondary hover:bg-primary transition duration-200 ease-in border-none"
              type="primary"
              onClick={showCreateProject}
            >
              <PlusOutlined />
              Create
            </Button>
            <Modal
              visible={createProjectVisible}
              width={'80%'}
              title={<Text className="font-bold">Create a project</Text>}
              onCancel={handleCancel}
              footer={null}
            >
              <Row className="px-24 w-full" justify="space-between">
                <Col xs={8} lg={12}>
                  <Space direction="vertical" className="flex items-center justify-center">
                    {image !== undefined ? (
                      <img
                        src={
                          imageData
                            ? imageData.uploadProjectImage.fullPath
                            : imageUpdateData && imageUpdateData.updateProjectImage.fullPath
                        }
                        className="w-64 h-48"
                      />
                    ) : (
                      <PictureOutlined className="text-9xl" />
                    )}

                    <label
                      style={{
                        height: 30,
                        width: 90,
                      }}
                      className="appearance-none border border-gray-300 shadow-sm border flex items-center justify-center rounded-sm py-1 px-2 mt-4 cursor-pointer hover:text-blue-400 hover:border-blue-400 transition delay-100 duration-300 relative"
                    >
                      <input
                        type="file"
                        className="invisible"
                        onChange={image === undefined ? onUploadImage : onChangeImage}
                      />
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
                        value={projectName}
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
                      <Select value={type} onChange={handleChange}>
                        <Option value="Data">Data</Option>
                        <Option value="Design">Design</Option>
                        <Option value="Mobile">Mobile</Option>
                        <Option value="Security">Security</Option>
                        <Option value="Web">Web</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="Members" label="Members">
                      <Select
                        mode="tags"
                        value={member}
                        onChange={handleMember}
                        tokenSeparators={[',']}
                      >
                        {(userList || []).map((value: any) => (
                          <Row
                            key={value.id}
                            className="hover:bg-primary hover:text-white py-2 px-4"
                          >
                            <Avatar
                              shape="circle"
                              size="default"
                              src={
                                value.image
                                  ? value.image.fullPath
                                  : require('../assets/images/unknown_user.png')
                              }
                              className="mr-2"
                            />
                            {value.name}
                          </Row>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name="Due date" label="Due date">
                      <DatePicker
                        value={dueDate}
                        format={customFormat}
                        className="w-full"
                        onChange={onChangeDate}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Description"
                      label="Description"
                      rules={[{ required: true, message: 'Please input project name' }]}
                      required
                    >
                      <TextArea
                        value={description}
                        rows={4}
                        onChange={(e) => e.target.value}
                        placeholder="Please input description"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" className="w-full" onClick={handleCreateProject}>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Modal>
          </Row>

          <Row>
            <Input
              placeholder="Search Projects"
              value={keyword}
              onChange={handleKeywordChange}
              suffix={<SearchOutlined type="secondary" />}
              className="w-96"
            />
            <Select value={types} className="w-20" onChange={handleChange}>
              <Option value="all">All</Option>
              <Option value="done">Done</Option>
              <Option value="undone">WIP</Option>
            </Select>
          </Row>
        </Row>
        {loading || error ? (
          <LoadingComponent project />
        ) : (
          <div className="site-card-wrapper">
            <Row gutter={[8, 24]}>
              {filteredData && !error && !loading ? (
                filteredData.length !== 0 ? (
                  filteredData.map((items: any) => (
                    <Col xs={24} xl={6} key={items.id} className="w-full px-2 py-2">
                      <ProjectCard data={items} refetch={() => refetch()} />
                    </Col>
                  ))
                ) : (
                  <div className="flex w-full justify-center my-8">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<Text disabled>No project Found</Text>}
                    />
                  </div>
                )
              ) : (
                <div className="flex w-full justify-center my-8">
                  <Text disabled>Error</Text>
                  <Text disabled>{error} </Text>
                </div>
              )}
            </Row>
          </div>
        )}
      </div>
    </LayoutDashboard>
  )
}

export default ProjectList
