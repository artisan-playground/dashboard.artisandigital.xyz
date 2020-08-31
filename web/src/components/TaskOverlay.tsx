import {
  BorderOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  FundProjectionScreenOutlined,
  LoadingOutlined,
  MoreOutlined,
  PaperClipOutlined,
  PlusOutlined,
  RollbackOutlined,
  SendOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  message as Message,
  Modal,
  Row,
  Typography,
  Upload,
} from 'antd'
import React, { useEffect, useState } from 'react'
import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'
import { Task } from '../typings'
import LoadingComponent from './LoadingComponent'

function TaskOverlay({ project, visible, onCloseModal, data }: any) {
  const { Text } = Typography

  const [taskData, setTaskData] = useState<Task | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  // eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  console.log('taskData', taskData)

  useEffect(() => {
    setTaskData(data)
  }, [data])

  useEffect(() => {
    setModalVisible(visible)
  }, [visible])

  function onDoneClick() {
    Message.loading({
      content: 'Loading...',
      duration: 2,
      icon: <LoadingOutlined style={{ fontSize: 20, top: -2 }} spin />,
    })
    setTimeout(() => {
      // const tempData: Task = taskData
      //   ? {
      //       ...taskData,
      //       isDone: !taskData.isDone,
      //     }
      //   : {
      //       ...data,
      //       isDone: !data.isDone,
      //     }
      // setTaskData(tempData)
      Message.success({
        content: 'Successfully updated',
        duration: 2,
        icon: <CheckCircleOutlined style={{ fontSize: 20, color: 'green', top: -2 }} />,
      })
    }, 2200)
  }

  function onCancleClick(event: any) {
    event.stopPropagation()
    setModalVisible(false)
    onCloseModal()
  }
  function getBase64(img: any, callback: any) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  function beforeUpload(file: any) {
    const isValid = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isValid) {
      alert('You upload invalid file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      alert('Image must smaller than 2MB!')
    }
    return isValid && isLt2M
  }

  function handleChange(info: any) {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  function handleSubmit() {
    if (message !== '') {
      // let commentId = data.getTaskById.comments.length
      // let commentsTemp: Comment = {
      //   id: (commentId + 1).toString(),
      //   timestamp: new Date(),
      //   userId: '33',
      //   image: '',
      //   userImg: 'https://source.unsplash.com/600x600/?cat',
      //   userName: 'John Doe',
      //   message,
      // }

      // const tempData: Task = taskData
      //   ? { ...taskData, comments: [...taskData.comments!, commentsTemp] }
      //   : { ...data }

      // setTaskData(tempData)
      setMessage('')
    }
  }

  const menu = (
    <Menu>
      <Menu.Item className="flex flex-row px-4 items-center">
        <RollbackOutlined />
        <a target="_blank" rel="noopener noreferrer" href="/">
          Reply
        </a>
      </Menu.Item>
      <Menu.Item className="flex flex-row px-4 items-center">
        <EditOutlined />
        <a target="_blank" rel="noopener noreferrer" href="/">
          Edit
        </a>
      </Menu.Item>
      <Menu.Item danger className="flex flex-row px-4 items-center">
        <DeleteOutlined />
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <Modal
      visible={modalVisible}
      footer={null}
      bodyStyle={{
        paddingTop: 56,
        paddingLeft: 24,
        paddingRight: 24,
      }}
      width={'80%'}
      maskClosable={true}
      closable={true}
      onCancel={(e) => onCancleClick(e)}
      destroyOnClose
      closeIcon={<CloseCircleOutlined style={{ color: 'red', fontSize: 24 }} />}
    >
      {!taskData ? (
        <LoadingComponent overlay />
      ) : (
        <>
          <Text className="font-bold text-4xl ml-2">{taskData.taskName}</Text>
          <Row className="py-4">
            <Col span={24} lg={{ span: 18 }} className="pl-4 pr-4 pt-2 border-r-2">
              <Row>
                <Text className="text-lg pl-4 pr-4 mb-8">{taskData.taskDetail}</Text>
              </Row>
              <Row className="items-center">
                <PaperClipOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
                <Text className="text-lg font-bold">Clipboard</Text>
              </Row>
              <Row className="py-2 px-4 overflow-y-auto flex flex-row clearfix">
                <Upload
                  fileList={taskData.files}
                  name="avatar"
                  listType="picture-card"
                  showUploadList={true}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  key={new Date().toString()}
                >
                  <div className="flex flex-row justify-center items-center">
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className="ant-upload-text">Upload</div>
                  </div>
                </Upload>
              </Row>
              <Row className="items-center">
                <CommentOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
                <Text className="text-lg font-bold">Comment</Text>
              </Row>
              <Row className="py-2 px-2">
                {taskData.comments ? (
                  taskData.comments.map((item: any) => (
                    <div className="w-full ml-1 mb-2" key={item.id}>
                      <Row>
                        <Col
                          span={4}
                          lg={{ span: 2 }}
                          className="flex justify-center items-center mr-2"
                        >
                          <Link to={{ pathname: '/profile', state: { profileId: item.id } }}>
                            <Avatar size="large" src={item.userImg} />
                          </Link>
                        </Col>
                        <Col span={18} lg={{ span: 20 }}>
                          <div className="w-full py-2 pl-4 mx-0 bg-white shadow-lg rounded-lg">
                            <div className="flex flex-row justify-between">
                              <div>
                                <Link to={{ pathname: '/profile', state: { profileId: item.id } }}>
                                  <Text className="font-bold text-lg mr-2">{item.userName}</Text>
                                </Link>
                                <Text disabled>
                                  {new Date(item.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </Text>
                              </div>
                              <div>
                                <Dropdown overlay={menu}>
                                  <Button
                                    className="flex items-center justify-center"
                                    type="text"
                                    shape="circle"
                                  >
                                    <MoreOutlined />
                                  </Button>
                                </Dropdown>
                              </div>
                            </div>
                            <div className="pr-8 pl-2">
                              <Linkify>
                                <Text className="text-md">{item.message}</Text>
                              </Linkify>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center p-8 w-full">
                    <Text disabled>No comment</Text>
                  </div>
                )}
                <div className="flex flex-row w-full h-24 items-center">
                  <Avatar
                    className="flex justify-center items-center mr-4 mt-2"
                    size="large"
                    icon={<UserOutlined />}
                  />
                  <Input
                    className="rounded-lg mt-4"
                    placeholder="Say something"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    suffix={
                      <Button
                        className="flex justify-center items-center hover:bg-primary hover:text-white rounded-lg"
                        type="text"
                      >
                        <SendOutlined className="" onClick={handleSubmit} />
                      </Button>
                    }
                    onPressEnter={handleSubmit}
                  />
                </div>
              </Row>
            </Col>
            <Col span={24} lg={{ span: 6 }} className="pl-4">
              <Row className="items-center">
                <FundProjectionScreenOutlined
                  className="mr-2"
                  style={{ color: '#105EFC', fontSize: 24 }}
                />
                <Text className="text-lg font-bold">Project Name</Text>
              </Row>
              <Row className="ml-2 mb-8 mt-2">
                <Text className="text-lg">{project.projectName}</Text>
              </Row>
              <Row className="items-center">
                <ClockCircleOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
                <Text className="text-lg font-bold">Due Date</Text>
              </Row>
              <Row className="ml-2 mb-8 mt-2">
                <Text className="text-lg">
                  {new Date(project.dueDate).toLocaleDateString('en-Gb')}
                </Text>
              </Row>
              <Row className="items-center">
                <TeamOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
                <Text className="text-lg font-bold">Team</Text>
              </Row>
              <Row className="ml-2 mb-4 overflow-y-auto">
                {taskData.memberIds ? (
                  taskData.memberIds.map((items: any) => (
                    <Link
                      className="w-full"
                      key={items.id}
                      to={{ pathname: '/profile', state: { profileId: items.id } }}
                    >
                      <div className="flex mx-0 my-1 p-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
                        <Avatar key={items.id} src={items.image} alt={items.name} />
                        <div className="ml-4 text-lg">{items.name}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div></div>
                )}
              </Row>
              <Row className="justify-center">
                <Button
                  className="flex items-center justify-center py-4 m-4 text-md font-bold w-full"
                  type="primary"
                  danger={taskData.isDone ? true : false}
                  icon={
                    taskData.isDone ? (
                      <BorderOutlined style={{ fontSize: 14 }} />
                    ) : (
                      <CheckSquareOutlined style={{ fontSize: 14 }} />
                    )
                  }
                  shape="round"
                  onClick={onDoneClick}
                >
                  {taskData.isDone ? 'Mark as Undone' : 'Mark as Done'}
                </Button>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Modal>
  )
}

export default TaskOverlay
