import {
  CameraOutlined,
  CloseCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
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
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import dayjs, { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UnknownUserImage from '../assets/images/unknown_user.png'
import {
  LayoutDashboard,
  LoadingComponent,
  ProjectCard,
  TaskCard,
} from '../components/DashboardComponent'
import { UPDATE_IMAGE, UPLOAD_IMAGE } from '../services/api/image'
import { GET_USER_BY_ID, UPDATE_USER } from '../services/api/user'

function Profile() {
  const { Option } = Select
  const { Text } = Typography
  const { TabPane } = Tabs
  const [filteredData, setFilteredData] = useState<any>()
  const [filteredDataProject, setFilteredDataProject] = useState<any>()
  const [filteredDataTask, setFilteredDataTask] = useState<any>()
  const [projectKeyword, setProjectKeyword] = useState('')
  const [taskKeyword, setTaskKeyword] = useState('')
  const [filterloading, setLoading] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [editProfile] = useMutation(UPDATE_USER)
  const [updateImage, { loading: loadingUpdate, data: imageUpdateData }] = useMutation(UPDATE_IMAGE)
  const [uploadImage, { loading: loadingUpload, data: imageData }] = useMutation(UPLOAD_IMAGE)
  const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
  const { RangePicker } = DatePicker
  const [name, setName] = useState<any>()
  const [email, setEmail] = useState<any>()
  const [position, setPosition] = useState<any>()
  const [department, setDepartment] = useState<any>()
  const [telephone, setTelephone] = useState<any>('')
  const [type, setType] = useState<any>()
  const [startDate, setStartDate] = useState<any>()
  const [dueDate, setDueDate] = useState<any>()
  const [image, setImage] = useState()
  const { id }: any = useParams()
  const { loading: userLoading, error: userError, data: userData, refetch } = useQuery(
    GET_USER_BY_ID,
    {
      variables: { id: Number(id) },
    }
  )
  const [totalPageProject, setTotalPageProject] = useState(0)
  const [currentProject, setCurrentProject] = useState(1)
  const [minIndexProject, setMinIndexProject] = useState(0)
  const [maxIndexProject, setMaxIndexProject] = useState(0)
  const [totalPageTask, setTotalPageTask] = useState(0)
  const [currentTask, setCurrentTask] = useState(1)
  const [minIndexTask, setMinIndexTask] = useState(0)
  const [maxIndexTask, setMaxIndexTask] = useState(0)
  const pageSize = 4
  const dateFormat = 'DD MMM YYYY HH:mm'
  const customFormat = (value: any) => `${value.format(dateFormat)}`

  useEffect(() => {
    if (!userLoading && !userError) {
      setImage(
        imageData ? imageData.uploadImage.id : imageUpdateData && imageUpdateData.updateImage.id
      )
      setTotalPageProject(userData.user.projects.length / pageSize)
      setMinIndexProject(0)
      setMaxIndexProject(pageSize)
      setTotalPageTask(userData.user.tasks.length / pageSize)
      setFilteredData(userData.user)
      setMinIndexTask(0)
      setMaxIndexTask(pageSize)
      setName(userData.user.name)
      setEmail(userData.user.email)
      setPosition(userData.user.position)
      setDepartment(userData.user.department)
      setTelephone(userData.user.telephone)
      setType(userData.user.type)
      setStartDate(userData.user.startDate)
      setDueDate(userData.user.dueDate)
      setFilteredDataProject(userData.user.projects)
      setFilteredDataTask(userData.user.tasks)
    }
  }, [userData, userLoading, userError])

  function handleProjectKeywordChange(e: any) {
    setLoading(true)
    setProjectKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredDataProject(userData.user.projects)
      setLoading(false)
    } else {
      const kw: any[] = userData.user.projects.filter((item: any) =>
        item.projectName.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredDataProject(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function handleTaskKeywordChange(e: any) {
    setLoading(true)
    setTaskKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredDataTask(userData.user.tasks)
      setLoading(false)
    } else {
      const kw: any[] = userData.user.tasks.filter((item: any) =>
        item.taskName.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredDataTask(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function handleChangePosition(value: any) {
    setPosition(value)
  }

  function handleChangeDepartment(value: any) {
    setDepartment(value)
  }

  function showAddEmployee() {
    setEditVisible(true)
  }

  function handleCancel() {
    setEditVisible(false)
  }

  function onUploadImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) {
      uploadImage({ variables: { file: file } })
      setImage(imageData ? imageData.uploadImage : imageUpdateData && imageUpdateData.updateImage)
    }
  }

  function onChangeImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) {
      updateImage({
        variables: {
          id: imageData
            ? imageData.uploadImage.id
            : imageUpdateData && imageUpdateData.updateImage.id,
          file: file,
        },
      })
      setImage(imageData ? imageData.uploadImage : imageUpdateData && imageUpdateData.updateImage)
    }
  }

  function handleEditProfile() {
    if (name !== '' && email !== '') {
      editProfile({
        variables: {
          id: userData.user.id,
          name: name,
          email: email,
          position: position,
          department: department,
          phone: telephone ? telephone : '',
          type: type,
          startDate: startDate ? new Date(startDate) : new Date(),
          dueDate: dueDate ? new Date(dueDate) : new Date(),
          file: userData.user.image
            ? userData.user.image.id
            : imageData
            ? imageData.uploadImage.id
            : imageUpdateData
            ? imageUpdateData.updateImage.id
            : 0,
        },
      })
        .then((res) => {
          setName(name)
          setEmail(email)
          setPosition(position)
          setDepartment(department)
          setTelephone(telephone)
          setType(type)
          setStartDate(new Date(startDate))
          setDueDate(new Date(dueDate))
          setEditVisible(false)
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

  function onChangeType(e: any) {
    setType(e.target.value)
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

  return userLoading || !filteredData ? (
    <LayoutDashboard>
      <Spin size="large" className="flex justify-center pt-4" />
    </LayoutDashboard>
  ) : (
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
                src={filteredData.image ? filteredData.image.fullPath : UnknownUserImage}
                alt="user"
                className="mr-2"
              />
              <Space direction="vertical" size={2}>
                <Text className="font-bold text-blue-700">{filteredData.name}</Text>
                <Text>{filteredData.position}</Text>
              </Space>
            </Row>
          </Col>
          <Col xs={15} className="relative">
            <Divider type="vertical" className="h-full" />
            <Space direction="vertical" size={4} className="absolute top-5 left-10">
              <Text>{`Email: ${filteredData.email ? filteredData.email : '-'}`}</Text>
              <Text>
                {`Department: ${filteredData.department ? filteredData.department : '-'}`}
              </Text>
              <Text>{`Full-time/Intern: ${filteredData.type ? filteredData.type : '-'}`}</Text>
              {filteredData.type === 'Intern' && (
                <Text>
                  {`Internship period: ${dayjs(filteredData.startDate).format(
                    'DD MMM YYYY HH:mm'
                  )} - ${dayjs(filteredData.dueDate).format('DD MMM YYYY HH:mm')}`}
                </Text>
              )}
            </Space>

            <Button
              className="absolute top-0 right-0 text-blue-700 hover:text-blue-700 focus:text-blue-700"
              type="text"
              shape="circle"
              onClick={showAddEmployee}
            >
              <EditOutlined />
            </Button>
          </Col>

          <Row>
            <Modal
              visible={editVisible}
              width={'80%'}
              title={<Text className="font-bold">Edit profile</Text>}
              onCancel={handleCancel}
              footer={null}
            >
              <Row className="px-24 w-full" justify="space-between">
                <Col xs={8} lg={12}>
                  <Space direction="vertical" className="flex items-center justify-center">
                    <Col className="relative">
                      {loadingUpdate || loadingUpload ? (
                        <Spin>
                          <Avatar
                            src={
                              userData.user.image
                                ? userData.user.image.fullPath
                                : imageData
                                ? imageData.uploadImage.fullPath
                                : imageUpdateData
                                ? imageUpdateData.updateImage.fullPath
                                : UnknownUserImage
                            }
                            className="w-56 h-56"
                            alt="user"
                          />
                        </Spin>
                      ) : (
                        <Avatar
                          src={
                            userData.user.image
                              ? userData.user.image.fullPath
                              : imageData
                              ? imageData.uploadImage.fullPath
                              : imageUpdateData
                              ? imageUpdateData.updateImage.fullPath
                              : UnknownUserImage
                          }
                          className="w-56 h-56"
                          alt="user"
                        />
                      )}
                      <label className="absolute bottom-5 right-5 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer transition delay-100 duration-300 text-white hover:text-white bg-secondary hover:bg-blue-900">
                        <input
                          type="file"
                          className="invisible"
                          onChange={image === undefined ? onUploadImage : onChangeImage}
                        />
                        <div className="absolute bottom-0 flex items-center justify-center">
                          <CameraOutlined className="text-2xl" />
                        </div>
                      </label>
                    </Col>
                  </Space>
                </Col>
                <Col xs={16} lg={12}>
                  <Form layout="vertical">
                    <Form.Item
                      name="Name"
                      label="Name"
                      rules={[{ required: true, message: 'Please input name' }]}
                      required
                    >
                      <Input
                        defaultValue={name}
                        placeholder="Please input name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Email"
                      label="Email"
                      rules={[{ required: true, message: 'Please input email' }]}
                      required
                    >
                      <Input
                        defaultValue={email}
                        placeholder="Please input email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Jop position"
                      label="Jop position"
                      rules={[{ required: true, message: 'Please select jop position' }]}
                      required
                    >
                      <Select defaultValue={position} onChange={handleChangePosition}>
                        <Option value="Account Executive">Account Executive</Option>
                        <Option value="Accountant & Administrator">
                          Accountant & Administrator
                        </Option>
                        <Option value="Back - End Developer">Back - End Developer</Option>
                        <Option value="Community Manager">Community Manager</Option>
                        <Option value="Content Creator">Content Creator</Option>
                        <Option value="Course Developer">Course Developer</Option>
                        <Option value="Creative Podcast">Creative Podcast</Option>
                        <Option value="Digital Marketing">Digital Marketing</Option>
                        <Option value="Filmmaker">Filmmaker</Option>
                        <Option value="Front - End Developer">Front - End Developer</Option>
                        <Option value="Graphic Designer">Graphic Designer</Option>
                        <Option value="Legal Officer">Legal Officer</Option>
                        <Option value="Mid - Level & Senior Developer">
                          Mid - Level & Senior Developer
                        </Option>
                        <Option value="Mobile Developer">Mobile Developer</Option>
                        <Option value="Secretary">Secretary</Option>
                        <Option value="Software Business Analyst">Software Business Analyst</Option>
                        <Option value="Software Tester">Software Tester</Option>
                        <Option value="UX / UI Designer">UX / UI Designer</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="Department"
                      label="Department"
                      rules={[{ required: true, message: 'Please select department' }]}
                      required
                    >
                      <Select defaultValue={department} onChange={handleChangeDepartment}>
                        <Option value="HR/Admin">HR/Admin</Option>
                        <Option value="Development">Development</Option>
                        <Option value="Design">Design</Option>
                        <Option value="Digital Marketing">Digital Marketing</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="Telephone" label="Telephone">
                      <Input
                        defaultValue={telephone}
                        addonBefore="+66"
                        placeholder="xx-xxx-xxxx"
                        onChange={(e) => setTelephone(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Full-time / Intern"
                      label="Full-time / Intern"
                      rules={[{ required: true, message: 'Please select type' }]}
                      required
                    >
                      <Radio.Group defaultValue={type} onChange={onChangeType}>
                        <Radio value="Full-time">Full-time</Radio>
                        <Radio value="Intern">Intern</Radio>
                      </Radio.Group>
                    </Form.Item>
                    {type === 'Intern' && (
                      <Form.Item
                        name="Internship period"
                        label="Internship period"
                        rules={[{ required: true, message: 'Please input time period' }]}
                        required
                      >
                        <RangePicker
                          className="w-full"
                          showTime={{ format: 'HH:mm' }}
                          defaultValue={[dayjs(startDate), dayjs(dueDate)]}
                          format={customFormat}
                          onChange={onChangeDate}
                        />
                      </Form.Item>
                    )}
                    <Form.Item>
                      <Button type="primary" className="w-full" onClick={handleEditProfile}>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Modal>
          </Row>
        </Row>
        {userLoading || userError ? (
          <LoadingComponent project />
        ) : (
          <div className="site-card-wrapper">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Projects" key="1">
                <Row justify="end" className="w-full mb-4">
                  <Input
                    placeholder="Search project"
                    value={projectKeyword}
                    onChange={handleProjectKeywordChange}
                    suffix={<SearchOutlined type="secondary" />}
                    className="w-96"
                  />
                </Row>
                <Row>
                  {filteredDataProject && !userError && !userLoading ? (
                    filteredDataProject.length !== 0 ? (
                      filteredDataProject.map(
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
                          description={<Text disabled>No project Found</Text>}
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex w-full justify-center my-8">
                      <Text disabled>Error</Text>
                      <Text disabled>{userError} </Text>
                    </div>
                  )}
                </Row>
                <div className="flex items-end justify-end mb-4">
                  <Pagination
                    pageSize={pageSize}
                    current={currentProject}
                    total={filteredDataProject.length}
                    onChange={handleChangePaginationProject}
                    hideOnSinglePage={true}
                  />
                </div>
              </TabPane>
              <TabPane tab="Tasks" key="2">
                <Row justify="end" className="w-full mb-4">
                  <Input
                    placeholder="Search task"
                    value={taskKeyword}
                    onChange={handleTaskKeywordChange}
                    suffix={<SearchOutlined type="secondary" />}
                    className="w-96"
                  />
                </Row>
                <Row>
                  {filteredDataTask && !userError && !userLoading ? (
                    filteredDataTask.length !== 0 ? (
                      filteredDataTask.map(
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
                          description={<Text disabled>No task Found</Text>}
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex w-full justify-center my-8">
                      <Text disabled>Error</Text>
                      <Text disabled>{userError} </Text>
                    </div>
                  )}
                </Row>
                <div className="flex items-end justify-end">
                  <Pagination
                    pageSize={pageSize}
                    current={currentTask}
                    total={filteredDataTask.length}
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
