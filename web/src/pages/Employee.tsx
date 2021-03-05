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
  Spin,
  Tabs,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { EmployeeCard, LayoutDashboard, LoadingComponent } from '../components/DashboardComponent'
import { CREATE_USER, GET_USERS } from '../services/api/user'
import { useStoreState } from '../store'

function Employee() {
  const { Text } = Typography
  const { TabPane } = Tabs
  const { loading, error, data, refetch } = useQuery(GET_USERS)
  const [filteredData, setFilteredData] = useState<any>()
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [filterloading, setLoading] = useState(false)
  const [addEmployeeVisible, setAddEmployeeVisible] = useState(false)
  const [addUser] = useMutation(CREATE_USER)
  const [name, setName] = useState<any>()
  const [email, setEmail] = useState<any>()
  const [form] = Form.useForm()
  const user = useStoreState((s) => s.userState.user)

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
        case 'Others':
          let other: any[] = data.users.filter(
            (item: any) =>
              item.department !== 'HR/Admin' &&
              item.department !== 'Development' &&
              item.department !== 'Design' &&
              item.department !== 'Digital Marketing'
          )
          setFilteredData(other)
          break
        case 'HR/Admin':
          setFilteredData(data.users)
          break
        default:
          setFilteredData(data.users)
          break
      }
    }
  }, [types, loading, error, data, filterloading])

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

  function showAddEmployee() {
    setAddEmployeeVisible(true)
  }

  function handleCancel() {
    setAddEmployeeVisible(false)
  }

  function handleAddEmployee() {
    if (email !== '' && name !== '') {
      addUser({
        variables: {
          email: email,
          name: name,
        },
      })
        .then((res) => {
          setEmail(email)
          setName(name)
          setAddEmployeeVisible(false)
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

  return loading || !data ? (
    <LayoutDashboard>
      <Spin size="large" className="flex justify-center pt-4" />
    </LayoutDashboard>
  ) : (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>Employees</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="Employees" />
      <Divider />
      <div className="px-8">
        <Row className="justify-between mb-8">
          <Row>
            {user?.role === 'ADMIN' && (
              <Button type="primary" onClick={showAddEmployee}>
                Add Employee
              </Button>
            )}
            <Modal
              visible={addEmployeeVisible}
              width={'40%'}
              title={<Text className="font-bold">Add employee</Text>}
              onCancel={handleCancel}
              footer={null}
              centered={true}
            >
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input email' },
                    {
                      pattern: /([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)@artisan([.])co([.])th/g,
                      message: 'Email must be @artisan.co.th',
                    },
                  ]}
                  required
                >
                  <Input
                    value={email}
                    placeholder="Please input email"
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setName(e.target.value)}
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
                        .slice()
                        .sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
                        .map((items: any) => (
                          <Col xs={24} xl={6} key={items.id} className="w-full px-2 py-2">
                            <EmployeeCard
                              data={items}
                              loading={loading}
                              error={error}
                              refetch={() => refetch()}
                            />
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
                        .slice()
                        .sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
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
                        .slice()
                        .sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
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
              <TabPane tab="Others" key="4">
                <Row gutter={[8, 24]}>
                  {filteredData && !error && !loading ? (
                    filteredData.filter(
                      (item: any) =>
                        item.department !== 'HR/Admin' &&
                        item.department !== 'Development' &&
                        item.department !== 'Design' &&
                        item.department !== 'Digital Marketing'
                    ).length !== 0 ? (
                      filteredData
                        .filter(
                          (item: any) =>
                            item.department !== 'HR/Admin' &&
                            item.department !== 'Development' &&
                            item.department !== 'Design' &&
                            item.department !== 'Digital Marketing'
                        )
                        .slice()
                        .sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
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
