import { CloseCircleOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
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
  const [addUser] = useMutation(CREATE_USER)
  const [updateImage, { loading: loadingUpdate, data: imageUpdateData }] = useMutation(UPDATE_IMAGE)
  const [uploadImage, { loading: loadingUpload, data: imageData }] = useMutation(UPLOAD_IMAGE)
  const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [member, setMember] = useState<any[]>([])
  const [dueDate, setDueDate] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [userList, setUserList] = useState([])
  const dateFormat = 'DD MMM YYYY'
  const customFormat = (value: any) => `${value.format(dateFormat)}`
  const [form] = Form.useForm()

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
  function handleAddEmployee() {
    if (email !== '' && name !== '') {
      addUser({
        variables: {
          id: data.id,
          email: email,
          name: name,
        },
      })
        .then((res) => {
          setEmail(email)
          setName(name)
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
            <Button type="primary" onClick={showAddEmployee}>
              Add Employee
            </Button>
            <Modal
              visible={createProjectVisible}
              width={'40%'}
              title={<Text className="font-bold">Add employee</Text>}
              onCancel={handleCancel}
              footer={null}
            >
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input email' },
                    {
                      pattern: /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@artisan([\.])co([\.])th/g,
                      message: 'Email must be @artisan.co.th',
                    },
                  ]}
                  required
                >
                  <Input
                    value={email}
                    placeholder="Please input email"
                    onChange={(e) => e.target.value}
                  />
                </Form.Item>
                <Form.Item
                  name="Name"
                  label="Name"
                  rules={[{ required: true, message: 'Please input name' }]}
                  required
                >
                  <Input
                    value={name}
                    placeholder="Please input name"
                    onChange={(e) => e.target.value}
                  />
                </Form.Item>

                <Form.Item shouldUpdate={true}>
                  {() => (
                    <Button
                      type="primary"
                      className="w-full"
                      onClick={handleAddEmployee}
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                      }
                    >
                      Submit
                    </Button>
                  )}
                </Form.Item>
              </Form>
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
