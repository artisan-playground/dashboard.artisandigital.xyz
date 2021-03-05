import { CloseCircleOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  PageHeader,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import dayjs, { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useState } from 'react'
// @ts-ignore
import { Nexus } from 'react-mobile-devices'
import 'react-mobile-devices/dist/style.css'
import { Link } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'
import { CREATE_FORM } from '../services/api/form'

function CreateForm() {
  const { Text } = Typography
  const [createform] = useMutation(CREATE_FORM)
  const [filteredData, setFilteredData] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    leaveStart: new Date(),
    leaveEnd: new Date(),
    leaveType: 'Vacation',
    leaveDetail: '',
  })
  const { Option } = Select
  const { TextArea } = Input
  const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
  const { RangePicker } = DatePicker

  function handleCreateForm() {
    createform({
      variables: {
        leaveType: filteredData.leaveType,
      },
    })
      .then((res) => {
        window.history.back()
      })
      .catch((err) => {
        message.error({
          content: `Error : ${err}`,
          duration: 2,
          icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
        })
      })
  }

  function onChangeType(e: any) {
    setFilteredData({ ...filteredData, leaveType: e.target.value })
  }

  function disabledDate(current: any) {
    return current && current < dayjs().endOf('day')
  }

  function onChangeDate(_: any, dateString: any) {
    if (dateString.length === 1) {
      setFilteredData({ ...filteredData, leaveStart: dateString[0] })
    } else if (dateString.length === 2) {
      setFilteredData({ ...filteredData, leaveStart: dateString[0] })
      setFilteredData({ ...filteredData, leaveEnd: dateString[1] })
    }
  }

  return (
    filteredData && (
      <LayoutDashboard>
        <Breadcrumb className="pl-6 pt-4">
          <Breadcrumb.Item>
            <Link to={{ pathname: `/forms` }}>Form</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>New Form</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader
          className="site-page-header"
          title="New Form"
          onBack={() => window.history.back()}
        />
        <Divider className="mb-0" />

        <Row justify="space-around" className="w-full px-8">
          <Col xs={24}>
            <div style={{ height: 525 }}>
              <Form layout="vertical">
                <Row className="w-full">
                  <Col xs={24}>
                    <Row justify="space-between" className="w-full mt-4">
                      <Col xs={12}>
                        <Text>Leave Type :</Text>
                        <Radio.Group
                          value={filteredData.leaveType}
                          buttonStyle="solid"
                          onChange={onChangeType}
                          className="ml-2"
                        >
                          <Radio.Button value="Vacation">Vacation</Radio.Button>
                          <Radio.Button value="Sick">Sick</Radio.Button>
                          <Radio.Button value="Emergency">Emergency</Radio.Button>
                          <Radio.Button value="Other">Other</Radio.Button>
                        </Radio.Group>
                      </Col>
                      <Col xs={12} className="flex items-center justify-end">
                        <Button onClick={() => window.history.back()} className="mr-4">
                          Cancel
                        </Button>
                        <Button onClick={handleCreateForm} type="primary">
                          Create
                        </Button>
                      </Col>
                    </Row>

                    <Row justify="space-between" className="w-full">
                      <Col xs={14} className="mt-8">
                        <Card>
                          <Text className="flex justify-center font-bold text-lg text-blue-800 mb-4">
                            Leave Form
                          </Text>
                          <Form layout="vertical">
                            <Row className="w-full">
                              <Col xs={24}>
                                <Row className="flex w-full">
                                  <Form.Item
                                    name="First name"
                                    label="First name"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                  >
                                    <Input
                                      placeholder="Please enter first name"
                                      value={filteredData.firstName}
                                      className="mr-4"
                                      style={{ width: '20.8rem' }}
                                      onChange={(e) =>
                                        setFilteredData({
                                          ...filteredData,
                                          firstName: e.target.value,
                                        })
                                      }
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name="Last name"
                                    label="Last name"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                  >
                                    <Input
                                      placeholder="Please enter last name"
                                      value={filteredData.lastName}
                                      style={{ width: '20.8rem' }}
                                      onChange={(e) =>
                                        setFilteredData({
                                          ...filteredData,
                                          lastName: e.target.value,
                                        })
                                      }
                                    />
                                  </Form.Item>
                                </Row>
                                <Form.Item
                                  name="E-mail"
                                  label="E-mail"
                                  rules={[{ required: true, message: 'Please enter email' }]}
                                >
                                  <Row>
                                    <Input
                                      placeholder="Please enter last name"
                                      value={filteredData.email}
                                      className="w-full"
                                      onChange={(e) =>
                                        setFilteredData({ ...filteredData, email: e.target.value })
                                      }
                                    />
                                  </Row>
                                </Form.Item>
                                <Form.Item
                                  name="Telephone numbers"
                                  label="Telephone numbers"
                                  rules={[
                                    { required: true, message: 'Please enter telephone numbers' },
                                  ]}
                                >
                                  <Row>
                                    <Input
                                      placeholder="Please enter telephone numbers"
                                      value={filteredData.phone}
                                      className="w-full"
                                      onChange={(e) =>
                                        setFilteredData({ ...filteredData, phone: e.target.value })
                                      }
                                    />
                                  </Row>
                                </Form.Item>
                                <Form.Item
                                  name="Jop position"
                                  label="Jop position"
                                  rules={[
                                    { required: true, message: 'Please select jop position' },
                                  ]}
                                  required
                                >
                                  <Select
                                    value={
                                      filteredData.position !== ''
                                        ? filteredData.position
                                        : undefined
                                    }
                                    placeholder="Please select jop position"
                                    onChange={(e) => {
                                      setFilteredData({ ...filteredData, position: e })
                                    }}
                                  >
                                    <Option value="Account Executive">Account Executive</Option>
                                    <Option value="Accountant & Administrator">
                                      Accountant & Administrator
                                    </Option>
                                    <Option value="Back - End Developer">
                                      Back - End Developer
                                    </Option>
                                    <Option value="Community Manager">Community Manager</Option>
                                    <Option value="Content Creator">Content Creator</Option>
                                    <Option value="Course Developer">Course Developer</Option>
                                    <Option value="Creative Podcast">Creative Podcast</Option>
                                    <Option value="Digital Marketing">Digital Marketing</Option>
                                    <Option value="Filmmaker">Filmmaker</Option>
                                    <Option value="Front - End Developer">
                                      Front - End Developer
                                    </Option>
                                    <Option value="Graphic Designer">Graphic Designer</Option>
                                    <Option value="Legal Officer">Legal Officer</Option>
                                    <Option value="Mid - Level & Senior Developer">
                                      Mid - Level & Senior Developer
                                    </Option>
                                    <Option value="Mobile Developer">Mobile Developer</Option>
                                    <Option value="Secretary">Secretary</Option>
                                    <Option value="Software Business Analyst">
                                      Software Business Analyst
                                    </Option>
                                    <Option value="Software Tester">Software Tester</Option>
                                    <Option value="UX / UI Designer">UX / UI Designer</Option>
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  name="Internship period"
                                  label="Internship period"
                                  rules={[{ required: true, message: 'Please input time period' }]}
                                  required
                                >
                                  <RangePicker
                                    className="w-full"
                                    showTime={{ format: 'HH:mm' }}
                                    value={[
                                      dayjs(filteredData.leaveStart),
                                      dayjs(filteredData.leaveEnd),
                                    ]}
                                    onChange={onChangeDate}
                                    disabledDate={disabledDate}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name="Detail"
                                  label="Detail"
                                  rules={[{ required: true, message: 'Please input detail' }]}
                                  required
                                >
                                  <TextArea
                                    value={filteredData.leaveDetail}
                                    rows={4}
                                    onChange={(e) =>
                                      setFilteredData({
                                        ...filteredData,
                                        leaveDetail: e.target.value,
                                      })
                                    }
                                    placeholder="Please input detail"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form>
                        </Card>
                      </Col>

                      <Col xs={8} className="my-8">
                        <Nexus>
                          <div className="overflow-y-scroll h-full p-4">
                            <Text className="flex justify-center font-bold text-lg text-blue-800 mb-4">
                              Leave Form
                            </Text>
                            <Form layout="vertical">
                              <Row className="w-full">
                                <Col xs={24} className="text-left">
                                  <Form.Item
                                    name="First name"
                                    label="First name"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                  >
                                    <Input
                                      placeholder="Please enter first name"
                                      value={filteredData.firstName}
                                      className="mr-4"
                                      onChange={(e) =>
                                        setFilteredData({
                                          ...filteredData,
                                          firstName: e.target.value,
                                        })
                                      }
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name="Last name"
                                    label="Last name"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                  >
                                    <Input
                                      placeholder="Please enter last name"
                                      value={filteredData.lastName}
                                      onChange={(e) =>
                                        setFilteredData({
                                          ...filteredData,
                                          lastName: e.target.value,
                                        })
                                      }
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name="E-mail"
                                    label="E-mail"
                                    rules={[{ required: true, message: 'Please enter email' }]}
                                  >
                                    <Row>
                                      <Input
                                        placeholder="Please enter last name"
                                        value={filteredData.email}
                                        className="w-full"
                                        onChange={(e) =>
                                          setFilteredData({
                                            ...filteredData,
                                            email: e.target.value,
                                          })
                                        }
                                      />
                                    </Row>
                                  </Form.Item>
                                  <Form.Item
                                    name="Telephone numbers"
                                    label="Telephone numbers"
                                    rules={[
                                      { required: true, message: 'Please enter telephone numbers' },
                                    ]}
                                  >
                                    <Row>
                                      <Input
                                        placeholder="Please enter telephone numbers"
                                        value={filteredData.phone}
                                        className="w-full"
                                        onChange={(e) =>
                                          setFilteredData({
                                            ...filteredData,
                                            phone: e.target.value,
                                          })
                                        }
                                      />
                                    </Row>
                                  </Form.Item>
                                  <Form.Item
                                    name="Jop position"
                                    label="Jop position"
                                    rules={[
                                      { required: true, message: 'Please select jop position' },
                                    ]}
                                    required
                                  >
                                    <Select
                                      value={
                                        filteredData.position !== ''
                                          ? filteredData.position
                                          : undefined
                                      }
                                      placeholder="Please select jop position"
                                      onChange={(e) => {
                                        setFilteredData({ ...filteredData, position: e })
                                      }}
                                    >
                                      <Option value="Account Executive">Account Executive</Option>
                                      <Option value="Accountant & Administrator">
                                        Accountant & Administrator
                                      </Option>
                                      <Option value="Back - End Developer">
                                        Back - End Developer
                                      </Option>
                                      <Option value="Community Manager">Community Manager</Option>
                                      <Option value="Content Creator">Content Creator</Option>
                                      <Option value="Course Developer">Course Developer</Option>
                                      <Option value="Creative Podcast">Creative Podcast</Option>
                                      <Option value="Digital Marketing">Digital Marketing</Option>
                                      <Option value="Filmmaker">Filmmaker</Option>
                                      <Option value="Front - End Developer">
                                        Front - End Developer
                                      </Option>
                                      <Option value="Graphic Designer">Graphic Designer</Option>
                                      <Option value="Legal Officer">Legal Officer</Option>
                                      <Option value="Mid - Level & Senior Developer">
                                        Mid - Level & Senior Developer
                                      </Option>
                                      <Option value="Mobile Developer">Mobile Developer</Option>
                                      <Option value="Secretary">Secretary</Option>
                                      <Option value="Software Business Analyst">
                                        Software Business Analyst
                                      </Option>
                                      <Option value="Software Tester">Software Tester</Option>
                                      <Option value="UX / UI Designer">UX / UI Designer</Option>
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    name="Internship period"
                                    label="Internship period"
                                    rules={[
                                      { required: true, message: 'Please input time period' },
                                    ]}
                                    required
                                  >
                                    <RangePicker
                                      className="w-full"
                                      showTime={{ format: 'HH:mm' }}
                                      value={[
                                        dayjs(filteredData.leaveStart),
                                        dayjs(filteredData.leaveEnd),
                                      ]}
                                      onChange={onChangeDate}
                                      disabledDate={disabledDate}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name="Detail"
                                    label="Detail"
                                    rules={[{ required: true, message: 'Please input detail' }]}
                                    required
                                  >
                                    <TextArea
                                      value={filteredData.leaveDetail}
                                      rows={4}
                                      onChange={(e) =>
                                        setFilteredData({
                                          ...filteredData,
                                          leaveDetail: e.target.value,
                                        })
                                      }
                                      placeholder="Please input detail"
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </Nexus>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </LayoutDashboard>
    )
  )
}

export default CreateForm
