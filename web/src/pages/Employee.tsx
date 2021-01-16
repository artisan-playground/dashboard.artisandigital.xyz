import {
  CloseCircleOutlined,
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
import { EmployeeCard, LayoutDashboard, LoadingComponent } from '../components/DashboardComponent'
import { UPDATE_IMAGE, UPLOAD_IMAGE } from '../services/api/image'
import { CREATE_USER, GET_USERS } from '../services/api/user'

function Employee() {
  const { Option } = Select
  const { TextArea } = Input
  const { Text } = Typography
  const { TabPane } = Tabs
  const { loading, error, data, refetch } = useQuery(GET_USERS)
  const [filteredData, setFilteredData] = useState<any>()
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

  useEffect(() => {
    if (!error && !loading) {
      switch (types) {
        case 'HR/Admin':
          let admin: any[] = data.users.filter((item: any) => item.department === 'HR/Admin')
          setFilteredData(admin)
          break
        case 'Development':
          let dev: any[] = data.users.filter((item: any) => item.department === 'Development')
          setFilteredData(dev)
          break
        case 'Design':
          let design: any[] = data.users.filter((item: any) => item.department === 'Design')
          setFilteredData(design)
          break
        case 'Digital Marketing':
          let market: any[] = data.users.filter(
            (item: any) => item.department === 'Digital Marketing'
          )
          setFilteredData(market)
          break
        case 'HR/Admin':
          setFilteredData(data.users)
          break
        default:
          setFilteredData(data.users)
          break
      }
    }
    setUserList(data && data.users)
    setImage(
      imageData ? imageData.uploadImage.id : imageUpdateData && imageUpdateData.updateImage.id
    )
  }, [types, loading, error, data, loading, data])

  function handleKeywordChange(e: any) {
    setLoading(true)
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredData(data.users)
      setTypes('HR/Admin')
      setLoading(false)
    } else {
      const kw: any[] = data.users.filter((item: any) => {
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
  console.log('image', image)

  console.log(imageData && imageData.uploadImage)
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
        <Breadcrumb.Item>Employees</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="Employees" />
      <Divider />
      <div className="px-8">
        <Row className="justify-between mb-8">
          <Row>
            <Button
              className="flex items-center justify-center bg-secondary hover:bg-primary transition duration-200 ease-in border-none"
              type="primary"
              onClick={showAddEmployee}
            >
              Add Employee
            </Button>
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

          <Row>
            <Input
              placeholder="Search Employee"
              value={keyword}
              onChange={handleKeywordChange}
              suffix={<SearchOutlined type="secondary" />}
              className="w-96"
            />
          </Row>
        </Row>
        {loading || error ? (
          <LoadingComponent project />
        ) : (
          <div className="site-card-wrapper">
            <Tabs defaultActiveKey="1">
              <TabPane tab="HR/Admin" key="1">
                <Row gutter={[8, 24]}>
                  {filteredData && !error && !loading ? (
                    filteredData.filter((item: any) => item.department === 'HR/Admin').length !==
                    0 ? (
                      filteredData
                        .filter((item: any) => item.department === 'HR/Admin')
                        .map((items: any) => (
                          <Col xs={24} xl={6} key={items.id} className="w-full px-2 py-2">
                            <EmployeeCard data={items} refetch={() => refetch()} />
                          </Col>
                        ))
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
              </TabPane>
              <TabPane tab="Development" key="2">
                <Row gutter={[8, 24]}>
                  {filteredData && !error && !loading ? (
                    filteredData.filter((item: any) => item.department === 'Development').length !==
                    0 ? (
                      filteredData
                        .filter((item: any) => item.department === 'Development')
                        .map((items: any) => (
                          <Col xs={24} xl={6} key={items.id} className="w-full px-2 py-2">
                            <EmployeeCard data={items} refetch={() => refetch()} />
                          </Col>
                        ))
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
              </TabPane>
              <TabPane tab="Design" key="3">
                <Row gutter={[8, 24]}>
                  {filteredData && !error && !loading ? (
                    filteredData.filter((item: any) => item.department === 'Design').length !==
                    0 ? (
                      filteredData
                        .filter((item: any) => item.department === 'Design')
                        .map((items: any) => (
                          <Col xs={24} xl={6} key={items.id} className="w-full px-2 py-2">
                            <EmployeeCard data={items} refetch={() => refetch()} />
                          </Col>
                        ))
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
              </TabPane>
              <TabPane tab="Digital Marketing" key="4">
                <Row gutter={[8, 24]}>
                  {filteredData && !error && !loading ? (
                    filteredData.filter((item: any) => item.department === 'Digital Marketing')
                      .length !== 0 ? (
                      filteredData
                        .filter((item: any) => item.department === 'Digital Marketing')
                        .map((items: any) => (
                          <Col xs={24} xl={6} key={items.id} className="w-full px-2 py-2">
                            <EmployeeCard data={items} refetch={() => refetch()} />
                          </Col>
                        ))
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
              </TabPane>
            </Tabs>
          </div>
        )}
      </div>
    </LayoutDashboard>
  )
}

export default Employee
