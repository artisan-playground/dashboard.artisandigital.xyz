import {
  CloseCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PictureOutlined,
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
  Pagination,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  LoadingComponent,
  ProjectCard,
  TaskCard,
} from '../components/DashboardComponent'
import { UPDATE_IMAGE, UPLOAD_IMAGE } from '../services/api/image'
import { CREATE_USER, GET_USERS, GET_USER_BY_ID } from '../services/api/user'
import { useStoreState } from '../store'

function Profile() {
  const { Option } = Select
  const { TextArea } = Input
  const { Text } = Typography
  const { TabPane } = Tabs
  const { loading, error, data, refetch } = useQuery(GET_USERS)
  const [filteredData, setFilteredData] = useState<any>()
  const [filteredProjectData, setFilteredProjectData] = useState<any>()
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [filterloading, setLoading] = useState(false)
  const [createProjectVisible, setCreateProjectVisible] = useState(false)
  const [createProject] = useMutation(CREATE_USER)
  const [updateImage, { loading: loadingUpdate, data: imageUpdateData }] = useMutation(UPDATE_IMAGE)
  const [uploadImage, { loading: loadingUpload, data: imageData }] = useMutation(UPLOAD_IMAGE)
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
  const user = useStoreState((s) => s.userState.user)
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(user?.id) },
  })
  const [totalPageProject, setTotalPageProject] = useState(0)
  const [currentProject, setCurrentProject] = useState(1)
  const [minIndexProject, setMinIndexProject] = useState(0)
  const [maxIndexProject, setMaxIndexProject] = useState(0)
  const [totalPageTask, setTotalPageTask] = useState(0)
  const [currentTask, setCurrentTask] = useState(1)
  const [minIndexTask, setMinIndexTask] = useState(0)
  const [maxIndexTask, setMaxIndexTask] = useState(0)
  const pageSize = 4

  useEffect(() => {
    if (!error && !loading) {
      switch (types) {
        case 'HR/Admin':
          let admin: any[] = userData.user.filter((item: any) => item.department === 'HR/Admin')
          setFilteredData(admin)
          break
        case 'Development':
          let dev: any[] = userData.user.filter((item: any) => item.department === 'Development')
          setFilteredData(dev)
          break
        case 'Design':
          let design: any[] = userData.user.filter((item: any) => item.department === 'Design')
          setFilteredData(design)
          break
        case 'Digital Marketing':
          let market: any[] = userData.user.filter(
            (item: any) => item.department === 'Digital Marketing'
          )
          setFilteredData(market)
          break
        case 'HR/Admin':
          setFilteredData(userData.user)
          break
        default:
          setFilteredData(userData.user)
          break
      }
      setUserList(data && data.users)
      setImage(
        imageData ? imageData.uploadImage.id : imageUpdateData && imageUpdateData.updateImage.id
      )
      setTotalPageProject(data.length / pageSize)
      setMinIndexProject(0)
      setMaxIndexProject(pageSize)
      setTotalPageTask(data.length / pageSize)
      setMinIndexTask(0)
      setMaxIndexTask(pageSize)
    }
  }, [types, loading, error, data, loading, data])

  function handleKeywordChange(e: any) {
    setLoading(true)
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredData(userData.user)
      setTypes('HR/Admin')
      setLoading(false)
    } else {
      const kw: any[] = userData.user.filter((item: any) => {
        if (types === 'HR/Admin') {
          return item.name.toLowerCase().includes(e.target.value.toLowerCase())
        } else {
          return (
            item.department === types &&
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
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

  function showAddEmployee() {
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
            ? imageData.uploadImage.id
            : imageUpdateData && imageUpdateData.updateImage.id,
          file: file,
        },
      })
  }

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

  function onChangeDate(_: any, dateString: any) {
    setDueDate(dateString[0])
  }

  function handleChangePaginationProject(page: any) {
    setCurrentProject(page)
    setMinIndexProject((page - 1) * pageSize)
    setMaxIndexProject(page * pageSize)
  }

  function handleChangePaginationTask(page: any) {
    setCurrentTask(page)
    setMinIndexTask((page - 1) * pageSize)
    setMaxIndexTask(page * pageSize)
  }

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="Profile" />
      <Divider />
      <div className="px-8">
        <Row className="justify-between mb-8">
          <Col xs={9}>
            <Row className="flex items-center justify-center">
              <Avatar
                shape="circle"
                size={150}
                src={
                  filteredData
                    ? filteredData.image.fullPath
                    : require('../assets/images/unknown_user.png')
                }
                className="mr-2"
              />
              <Space direction="vertical" size={2}>
                <Text className="font-bold text-blue-700">{filteredData && filteredData.name}</Text>
                <Text>{filteredData && filteredData.position}</Text>
              </Space>
            </Row>
          </Col>
          <Col xs={15} className="relative">
            <Divider type="vertical" className="h-full" />
            <Space direction="vertical" size={2} className="-mt-6">
              <Text>
                {`Email: ${filteredData && filteredData.email ? filteredData.email : '-'}`}
              </Text>
              <Text>
                {`Department: ${
                  filteredData && filteredData.department ? filteredData.department : '-'
                }`}
              </Text>
              <Text>
                {`Full-time/Intern: ${filteredData && filteredData.type ? filteredData.type : '-'}`}
              </Text>
              {filteredData && filteredData.type === 'Intern' && (
                <Text>
                  {`Internship period: ${filteredData.startDate} - ${filteredData.dueDate}`}
                </Text>
              )}
            </Space>

            <Button
              className="absolute top-0 right-0 flex items-center justify-center text-blue-700 hover:text-blue-700 transition duration-200 ease-in border-none"
              type="text"
              shape="circle"
              onClick={showAddEmployee}
            >
              <EditOutlined />
            </Button>
          </Col>

          <Row>
            <Modal
              visible={createProjectVisible}
              width={'80%'}
              title={<Text className="font-bold">Create </Text>}
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
                            ? imageData.uploadImage.fullPath
                            : imageUpdateData && imageUpdateData.updateImage.fullPath
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
        </Row>
        {loading || error ? (
          <LoadingComponent project />
        ) : (
          <div className="site-card-wrapper">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Projects" key="1">
                <Row justify="end" className="w-full mb-4">
                  <Input
                    placeholder="Search project"
                    value={keyword}
                    onChange={handleKeywordChange}
                    suffix={<SearchOutlined type="secondary" />}
                    className="w-96"
                  />
                </Row>
                <Row>
                  {filteredData && !error && !loading ? (
                    filteredData.length !== 0 ? (
                      filteredData.projects.map(
                        (items: any, index: any) =>
                          index >= minIndexProject &&
                          index < maxIndexProject && (
                            <Col xs={24} xl={6} key={items.id} className="w-full px-2">
                              <ProjectCard data={items} refetch={() => refetch()} />
                            </Col>
                          )
                      )
                    ) : (
                      <div className="flex w-full justify-center my-8">
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<Text disabled>No employee Found</Text>}
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
                <div className="flex items-end justify-end mb-4">
                  <Pagination
                    pageSize={pageSize}
                    current={currentProject}
                    total={filteredData && filteredData.projects.length}
                    onChange={handleChangePaginationProject}
                    hideOnSinglePage={true}
                  />
                </div>
              </TabPane>
              <TabPane tab="Tasks" key="2">
                <Row justify="end" className="w-full mb-4">
                  <Input
                    placeholder="Search task"
                    value={keyword}
                    onChange={handleKeywordChange}
                    suffix={<SearchOutlined type="secondary" />}
                    className="w-96"
                  />
                </Row>
                <Row>
                  {filteredData && !error && !loading ? (
                    filteredData.length !== 0 ? (
                      filteredData.tasks.map(
                        (items: any, index: any) =>
                          index >= minIndexTask &&
                          index < maxIndexTask && (
                            <Col xs={24} xl={12} key={items.id} className="w-full px-2">
                              <TaskCard data={items} refetch={() => refetch()} />
                            </Col>
                          )
                      )
                    ) : (
                      <div className="flex w-full justify-center my-8">
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<Text disabled>No employee Found</Text>}
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
                <div className="flex items-end justify-end">
                  <Pagination
                    pageSize={pageSize}
                    current={currentTask}
                    total={filteredData && filteredData.tasks.length}
                    onChange={handleChangePaginationTask}
                    hideOnSinglePage={true}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        )}
      </div>
    </LayoutDashboard>
  )
}

export default Profile
