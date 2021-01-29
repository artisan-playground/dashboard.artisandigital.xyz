import {
  CameraOutlined,
  CloseCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import dayjs, { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  default as UnknownImage,
  default as UnknownUserImage,
} from '../assets/images/unknown_user.png'
import { UPDATE_IMAGE, UPLOAD_IMAGE } from '../services/api/image'
import { UPDATE_USER } from '../services/api/user'
import { useStoreState } from '../store'

function EmployeeCard({ data, loading, error, refetch }: any) {
  const { Text } = Typography
  const { Option } = Select
  const user = useStoreState((s) => s.userState.user)
  const [editProfile] = useMutation(UPDATE_USER)
  const [editVisible, setEditVisible] = useState(false)
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
  const dateFormat = 'DD MMM YYYY'
  const customFormat = (value: any) => `${value.format(dateFormat)}`

  useEffect(() => {
    if (!loading && !error) {
      setImage(
        imageData ? imageData.uploadImage.id : imageUpdateData && imageUpdateData.updateImage.id
      )
      setName(data.name)
      setEmail(data.email)
      setPosition(data.position)
      setDepartment(data.department)
      setTelephone(data.telephone)
      setType(data.type)
      setStartDate(data.startDate)
      setDueDate(data.dueDate)
    }
  }, [data, loading, error])

  function handleChangePosition(value: any) {
    setPosition(value)
  }

  function handleChangeDepartment(value: any) {
    setDepartment(value)
  }

  function showEditProfile() {
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
          id: data.id,
          name: name,
          email: email,
          position: position,
          department: department,
          phone: telephone ? telephone : '',
          type: type,
          startDate: startDate ? new Date(startDate) : new Date(),
          dueDate: dueDate ? new Date(dueDate) : new Date(),
          file: data.image
            ? data.image.id
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

  return (
    <Card
      hoverable
      extra={
        user?.role === 'ADMIN' && (
          <Row className="border-none">
            <Button
              className="absolute top-2 right-2 text-blue-700 hover:text-blue-700 focus:text-blue-700 z-40"
              type="text"
              shape="circle"
              onClick={showEditProfile}
            >
              <EditOutlined />
            </Button>
          </Row>
        )
      }
      cover={
        <Link to={{ pathname: `/profile/${data.id}` }}>
          <Row className="bg-blue-100 -mt-6 pb-4">
            <Col xs={24}>
              <Space direction="vertical" size={2} className="flex items-center justify-center">
                <Avatar
                  src={data.image ? data.image.fullPath : UnknownImage}
                  alt="user"
                  className="mr-2"
                  size={120}
                />
                <Text className="font-bold text-blue-700">{data.name}</Text>
                <Text>{data.position}</Text>
              </Space>
            </Col>
          </Row>
        </Link>
      }
      className="bg-blue-100"
      bodyStyle={{ padding: 0 }}
    >
      <Link to={{ pathname: `/profile/${data.id}` }}>
        <Row className="bg-white w-full py-4 px-4">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={1}>
              <Text>{`Email: ${data.email ? data.email : '-'}`}</Text>
              <Text>{`Department: ${data.department ? data.department : '-'}`}</Text>
              <Text>{`Full-time/Intern: ${data.type ? data.type : '-'}`}</Text>
              <Text>{`Telephone: ${data.phone ? data.phone : '-'}`}</Text>
            </Space>
          </Col>
        </Row>
      </Link>

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
                          data.image
                            ? data.image.fullPath
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
                        data.image
                          ? data.image.fullPath
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
                    <Option value="Accountant & Administrator">Accountant & Administrator</Option>
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
    </Card>
  )
}

export default EmployeeCard
