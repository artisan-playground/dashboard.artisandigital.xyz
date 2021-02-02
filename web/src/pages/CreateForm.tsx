import {
  CalendarOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  LoadingOutlined,
  MenuOutlined,
  MinusCircleTwoTone,
  PictureOutlined,
  PlusOutlined,
  RightOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  PageHeader,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import { Nexus } from 'react-mobile-devices'
import 'react-mobile-devices/dist/style.css'
import { Link } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'
import { UPLOAD_FILE } from '../services/api/file'
import { CREATE_ZONE, GET_ZONES } from '../services/api/zone'

function CreateForm() {
  const { Text } = Typography
  const { loading, error, data, refetch } = useQuery(GET_ZONES)
  const [createZone] = useMutation(CREATE_ZONE)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [formName, setFormName] = useState<any>('')
  const [latitude, setLatitude] = useState<any>()
  const [longitude, setLongitude] = useState<any>()
  const { Option } = Select
  const [form, setForm] = useState<any[]>([])
  const [optionForm, setOptionForm] = useState<any[]>([])
  const format = 'HH:mm'
  const [uploadFile, { loading: loadingUpload }] = useMutation(UPLOAD_FILE)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (!error && !loading) {
      setFilteredData(data.zones)
    }
  }, [loading, error, data])

  function handleCreateZone() {
    if (formName !== '' && latitude !== '' && longitude !== '') {
      createZone({
        variables: {
          formName: formName,
          latitude: latitude,
          longitude: longitude,
        },
      })
        .then((res) => {
          setFormName(formName)
          setLatitude(latitude)
          setLongitude(longitude)
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

  const onFinish = (values: any) => {
    console.log('Received values of form:', values)
  }

  const handleAddFields = () => {
    const values = [...form]
    values.push({ type: 'Text Field', label: '', data: '', check: false, option: optionForm })
    setForm(values)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = (index: any) => {
    const values = [...form]
    values.splice(index, 1)
    setForm(values)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleTypeChange = (index: any, event: any) => {
    const values = [...form]
    values[index].type = event
    setForm(values)
  }

  const handleInputChange = (index: any, event: any) => {
    const values = [...form]
    values[index].label = event.target.value
    setForm(values)
  }

  function handleCheck(index: any, event: any) {
    const values = [...form]
    values[index].check = event.target.checked
    setForm(values)
  }

  function handleDeviceInputChange(index: any, event: any) {
    const values = [...form]
    values[index].data = event.target.value
    setForm(values)
  }

  function onUpload({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) uploadFile({ variables: { taskId: file } })
  }

  function handleAddOptionFields(index: any) {
    const values = [...form]
    values[index].option.push({ text: '' })
    setForm(values)
  }

  const handleRemoveOptionFields = (index: any, optionIndex: any) => {
    const values = [...form]
    values[index].option.splice(optionIndex, 1)
    setForm(values)
  }

  const handleInputOptionChange = (index: any, optionIndex: any, event: any) => {
    let data: any = []
    if (form.length === 0) {
      data = [...form]
    } else {
      data = form.map((x, i) => {
        if (i === index) {
          const option = x.option.map((xx: any, ii: number) => {
            if (ii === optionIndex) {
              const a = {
                ...xx,
                ...{ text: event.target.value },
              }
              return a
            } else {
              return { ...xx }
            }
          })
          const b = {
            ...x,
            ...{ option: option },
          }
          return b
        } else {
          return { ...x }
        }
      })
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
                    <Row justify="space-between" className="w-full">
                      <Col xs={12}>
                        <Form.Item
                          name="formName"
                          label="Form name"
                          rules={[{ required: true, message: 'Please enter form name' }]}
                        >
                          <Input
                            placeholder="Please enter form name"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={12} className="flex items-center justify-end">
                        <Button onClick={() => window.history.back()} className="mr-4">
                          Cancel
                        </Button>
                        <Button onClick={handleCreateZone} type="primary">
                          Save
                        </Button>
                      </Col>
                    </Row>

                    <Row justify="space-between" className="w-full">
                      <Col xs={14} className="mt-8">
                        <Form>
                          {form.map((form, index) => (
                            <>
                              <Card className="w-full mb-8" key={index}>
                                <Row justify="space-between" className="w-full mb-4">
                                  <Col className="flex items-center justify-center">
                                    <RightOutlined />
                                    <Text>{form.type}</Text>
                                  </Col>
                                  <Col>
                                    <Button
                                      type="text"
                                      shape="circle"
                                      icon={<DeleteOutlined />}
                                      style={{ color: 'red' }}
                                      onClick={showModal}
                                    />
                                    <Modal
                                      title={<Text>Delete form element</Text>}
                                      visible={isModalVisible}
                                      onOk={() => handleOk(index)}
                                      onCancel={handleCancel}
                                    >
                                      <Text>Do you want to delete this element?</Text>
                                    </Modal>
                                  </Col>
                                </Row>
                                <Form.Item label="Type">
                                  <Row className="w-full">
                                    <Select
                                      defaultValue={form.type}
                                      onChange={(event) => handleTypeChange(index, event)}
                                    >
                                      <Option value="Text Field">
                                        <Col className="flex items-center">
                                          <MenuOutlined className="mr-2" />
                                          <Text>Text Field</Text>
                                        </Col>
                                      </Option>
                                      <Option value="Dropdown">
                                        <Col className="flex items-center">
                                          <DownCircleOutlined className="mr-2" />
                                          <Text>Dropdown</Text>
                                        </Col>
                                      </Option>
                                      <Option value="Time Picker">
                                        <Col className="flex items-center">
                                          <ClockCircleOutlined className="mr-2" />
                                          <Text>Time Picker</Text>
                                        </Col>
                                      </Option>
                                      <Option value="Checkbox">
                                        <Col className="flex items-center">
                                          <CheckSquareOutlined className="mr-2" />
                                          <Text>Checkbox</Text>
                                        </Col>
                                      </Option>
                                      <Option value="Date time Picker">
                                        <Col className="flex items-center">
                                          <CalendarOutlined className="mr-2" />
                                          <Text>Date time Picker</Text>
                                        </Col>
                                      </Option>
                                      <Option value="Date Picker">
                                        <Col className="flex items-center">
                                          <CalendarOutlined className="mr-2" />
                                          <Text>Date Picker</Text>
                                        </Col>
                                      </Option>
                                      <Option value="Image Picker">
                                        <Col className="flex items-center">
                                          <PictureOutlined className="mr-2" />
                                          <Text>Image Picker</Text>
                                        </Col>
                                      </Option>
                                      <Option value="File Picker">
                                        <Col className="flex items-center">
                                          <FileTextOutlined className="mr-2" />
                                          <Text>File Picker</Text>
                                        </Col>
                                      </Option>
                                      <Option value="Radio">
                                        <Col className="flex items-center">
                                          <Radio defaultChecked className="mr-2 border-black" />
                                          <Text>Radio</Text>
                                        </Col>
                                      </Option>
                                    </Select>
                                  </Row>
                                </Form.Item>
                                <Form.Item label="Label">
                                  <Input
                                    placeholder="Label name..."
                                    defaultValue={form.label}
                                    onChange={(event) => handleInputChange(index, event)}
                                  />
                                </Form.Item>
                                <Form.Item>
                                  <Checkbox
                                    onChange={(event) => handleCheck(index, event)}
                                    checked={form.check}
                                  >
                                    This field is required
                                  </Checkbox>
                                </Form.Item>
                                {optionForm.map((option, optionIndex) => (
                                  <>
                                    <Row className="w-full mb-4">
                                      <Form.Item key={optionIndex}>
                                        <Row className="w-full flex items-center justify-center">
                                          <Space direction="horizontal">
                                            <Input
                                              placeholder="option name..."
                                              defaultValue={option.label}
                                              style={{ width: 50 }}
                                              onChange={(event) =>
                                                handleInputOptionChange(index, optionIndex, event)
                                              }
                                            />
                                            <Button
                                              type="text"
                                              shape="circle"
                                              icon={<MinusCircleTwoTone twoToneColor="red" />}
                                              style={{ color: 'red' }}
                                              onClick={() =>
                                                handleRemoveOptionFields(index, optionIndex)
                                              }
                                            />
                                          </Space>
                                        </Row>
                                      </Form.Item>
                                    </Row>
                                  </>
                                ))}
                                {form.type === 'Dropdown' ||
                                form.type === 'Checkbox' ||
                                form.type === 'Radio' ? (
                                  <Row justify="center">
                                    <Form.Item>
                                      <Button
                                        type="ghost"
                                        onClick={() => handleAddOptionFields(index)}
                                      >
                                        Add Option
                                      </Button>
                                    </Form.Item>
                                  </Row>
                                ) : (
                                  ''
                                )}
                              </Card>
                            </>
                          ))}
                          <Form.Item>
                            <Button
                              type="primary"
                              shape="circle"
                              className="w-9 h-9"
                              onClick={() => handleAddFields()}
                              block
                            >
                              <PlusOutlined />
                            </Button>
                          </Form.Item>
                        </Form>
                      </Col>

                      <Col xs={8} className="mt-8">
                        <Nexus>
                          <div className="px-4 py-2">
                            <Form
                              onFinish={onFinish}
                              className="mt-4 w-full flex items-start justify-start"
                            >
                              <Space
                                direction="vertical"
                                className="flex items-start justify-start w-full"
                              >
                                <Text className="font-bold text-blue-700">{formName}</Text>

                                {form.map((form, index) => (
                                  <>
                                    {form.type === 'Text Field' ? (
                                      <Row className="flex items-start justify-start w-full">
                                        <Form.Item
                                          label={form.label !== '' ? form.label : 'Label'}
                                          name={form.label}
                                          rules={[
                                            {
                                              required: form.check,
                                              message: 'Please input field',
                                            },
                                          ]}
                                          className="w-72"
                                        >
                                          <Input
                                            placeholder="Text Field"
                                            value={form.data}
                                            onChange={(event) =>
                                              handleDeviceInputChange(index, event)
                                            }
                                          />
                                        </Form.Item>
                                      </Row>
                                    ) : form.type === 'Dropdown' ? (
                                      <Form.Item
                                        label={form.label !== '' ? form.label : 'Label'}
                                        name={form.label}
                                        rules={[
                                          {
                                            required: form.check,
                                            message: 'Please select an option',
                                          },
                                        ]}
                                        className="w-72"
                                      >
                                        <Select
                                          defaultValue=""
                                          placeholder="Select an option"
                                          className="flex items-start justify-start"
                                        >
                                          {form.option.map((option: any, index: any) => (
                                            <Option
                                              key={index}
                                              value="Date Picker"
                                              className="flex items-center justify-center"
                                            >
                                              {option.text}
                                            </Option>
                                          ))}
                                        </Select>
                                      </Form.Item>
                                    ) : form.type === 'Time Picker' ? (
                                      <Form.Item
                                        label={form.label !== '' ? form.label : 'Label'}
                                        name={form.label}
                                        rules={[
                                          {
                                            required: form.check,
                                            message: 'Please picker time',
                                          },
                                        ]}
                                        className="w-72"
                                      >
                                        <TimePicker format={format} className="w-72" />
                                      </Form.Item>
                                    ) : form.type === 'Checkbox' ? (
                                      <Form.Item
                                        label={form.label !== '' ? form.label : 'Label'}
                                        name={form.label}
                                        rules={[
                                          {
                                            required: form.check,
                                            message: 'Please check an option',
                                          },
                                        ]}
                                        className="flex items-start justify-start"
                                      >
                                        <Checkbox>Checkbox</Checkbox>
                                      </Form.Item>
                                    ) : form.type === 'Date time Picker' ? (
                                      <Form.Item
                                        label={form.label !== '' ? form.label : 'Label'}
                                        name={form.label}
                                        rules={[
                                          {
                                            required: form.check,
                                            message: 'Please picker date and picker time',
                                          },
                                        ]}
                                        className="flex items-start justify-start"
                                      >
                                        <Space direction="horizontal">
                                          <DatePicker />
                                          <TimePicker format={format} />
                                        </Space>
                                      </Form.Item>
                                    ) : form.type === 'Date Picker' ? (
                                      <Form.Item
                                        label={form.label !== '' ? form.label : 'Label'}
                                        name={form.label}
                                        rules={[
                                          {
                                            required: form.check,
                                            message: 'Please picker date',
                                          },
                                        ]}
                                        className="w-72"
                                      >
                                        <DatePicker className="w-72" />
                                      </Form.Item>
                                    ) : form.type === 'Image Picker' ? (
                                      <Form.Item
                                        label={form.label !== '' ? form.label : 'Label'}
                                        name={form.label}
                                        rules={[
                                          {
                                            required: form.check,
                                            message: 'Please upload image',
                                          },
                                        ]}
                                        className="flex items-start justify-start w-72"
                                      >
                                        <label
                                          style={{
                                            width: 102,
                                            height: 102,
                                            backgroundColor: '#f9f9f9',
                                          }}
                                          className="appearance-none border-dashed border-gray-300 shadow-sm border flex items-center justify-center rounded-sm py-1 px-2 mt-4 cursor-pointer hover:text-blue-400 hover:border-blue-400 transition delay-100 duration-300 relative"
                                        >
                                          <input
                                            type="file"
                                            className="invisible"
                                            onChange={onUpload}
                                          />
                                          {loadingUpload ? (
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
                                      </Form.Item>
                                    ) : form.type === 'File Picker' ? (
                                      <Form.Item
                                        label={form.label !== '' ? form.label : 'Label'}
                                        name={form.label}
                                        rules={[
                                          {
                                            required: form.check,
                                            message: 'Please upload file',
                                          },
                                        ]}
                                        className="flex items-start justify-start w-72"
                                      >
                                        <label
                                          style={{
                                            height: 25,
                                            backgroundColor: '#f9f9f9',
                                          }}
                                          className="appearance-none border-dashed border-gray-300 shadow-sm border flex items-center justify-start rounded-sm py-1 px-2 mt-4 cursor-pointer hover:text-blue-400 hover:border-blue-400 transition delay-100 duration-300 relative"
                                        >
                                          <input
                                            type="file"
                                            className="invisible"
                                            onChange={onUpload}
                                          />
                                          {loadingUpload ? (
                                            <div className="absolute flex items-center justify-center">
                                              <LoadingOutlined className="mr-2" spin />
                                            </div>
                                          ) : (
                                            <div className="absolute flex items-center justify-center">
                                              Choose file
                                              <FileTextOutlined className="mr-2" />
                                            </div>
                                          )}
                                        </label>
                                      </Form.Item>
                                    ) : (
                                      form.type === 'Radio' && (
                                        <Form.Item
                                          label={form.label !== '' ? form.label : 'Label'}
                                          name={form.label}
                                          rules={[
                                            {
                                              required: form.check,
                                              message: 'Please choose an option',
                                            },
                                          ]}
                                          className="flex items-start justify-start"
                                        >
                                          <Radio>Radio</Radio>
                                        </Form.Item>
                                      )
                                    )}
                                  </>
                                ))}
                              </Space>
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
