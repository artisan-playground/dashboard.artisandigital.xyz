import {
  BorderOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  FundProjectionScreenOutlined,
  InboxOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  PlusOutlined,
  SendOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Modal, Row, Skeleton, Typography, Upload } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Dragger from 'antd/lib/upload/Dragger'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function TaskOverlay({ data, project, visible, onCloseModal }: any) {
  const { Text } = Typography

  const [taskData, setTaskData]: any = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTaskData(data)
  }, [data])

  useEffect(() => {
    setModalVisible(visible)
  }, [visible])

  function onDoneClick() {
    let tempData = { ...taskData }
    setTaskData({ ...tempData, isDone: !tempData.isDone })
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
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      alert('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      alert('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = (info: any) => {
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

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      let { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`)
      }
    },
  }

  return Object.keys(taskData).length === 0 ? (
    <Modal visible={modalVisible}>
      <Skeleton />
    </Modal>
  ) : (
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
      <Text className="absolute top-0 left-0 text-2xl font-bold mt-4 ml-4">
        {taskData.taskName}
      </Text>
      <Row className="py-4">
        <Col span={24} lg={{ span: 18 }} className="pl-4 pr-4 pt-2 border-r-2">
          <Row>
            <Text className="text-lg pl-2 mb-8">{taskData.taskDetail}</Text>
          </Row>
          <Row className="items-center">
            <PaperClipOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
            <Text className="text-lg font-bold">Clipboard</Text>
          </Row>
          <Row className="py-2 px-2 overflow-y-auto flex w-full">
            {taskData.files.length !== 0 ? (
              taskData.files.map((item: any) => {
                return (
                  <div className="w-24 h-24 bg-gray-200 ml-2 mb-2 mr-1 flex justify-center items-center col-4">
                    <PaperClipOutlined style={{ color: '#444' }} />
                  </div>
                )
              })
            ) : (
              <div className="flex w-full h-56 justify-center p-4 mb-4">
                <Dragger {...props} className="w-full h-56">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company
                    data or other band files
                  </p>
                </Dragger>
              </div>
            )}
            {taskData.files.length === 0 ? (
              <div />
            ) : (
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader w-full h-32 ml-1/8 mb-1 flex flex-row p-0"
                showUploadList={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" className="w-20 h-20 m-auto p-0" />
                ) : (
                  <div className="w-20 h-20 mx-auto my-auto flex flex-row justify-center items-center p-0">
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
            )}
          </Row>
          <Row className="items-center">
            <CommentOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
            <Text className="text-lg font-bold">Comment</Text>
          </Row>
          <Row className="py-2 px-2">
            {taskData.comments.length !== 0 ? (
              taskData.comments.map((item: any) => {
                return (
                  <div className="w-full ml-1 mb-2">
                    <Row>
                      <Col span={2} className="flex justify-center items-center">
                        <Avatar size="large" src={item.userImg} />
                      </Col>
                      <Col span={22}>
                        <div className="w-full py-2 px-4 mx-0 bg-white shadow-lg rounded-lg">
                          <Text className="font-bold text-lg mr-2">{item.userName}</Text>
                          <Text disabled>
                            {item.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Text>
                          <br />
                          <Text className="text-md">{item.message}</Text>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )
              })
            ) : (
              <div className="flex justify-center items-center p-8 w-full">
                <Text disabled>No comment</Text>
              </div>
            )}
            <Input
              className="rounded-lg"
              placeholder="Say something"
              prefix={
                <Avatar
                  className="flex justify-center items-center"
                  size="small"
                  icon={<UserOutlined className="mx-2" />}
                />
              }
              suffix={<SendOutlined />}
            />
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
          <Row className="ml-2 mb-2">
            <Text className="text-lg">{project.projectName}</Text>
          </Row>
          <Row className="items-center">
            <ClockCircleOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
            <Text className="text-lg font-bold">Due Date</Text>
          </Row>
          <Row className="ml-2 mb-2">
            <Text className="text-lg">{project.dueDate.toLocaleDateString('en-Gb')}</Text>
          </Row>
          <Row className="items-center">
            <TeamOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
            <Text className="text-lg font-bold">Team</Text>
          </Row>
          <Row className="ml-2 mb-4 overflow-y-auto h-56">
            {taskData.team.map((items: any) => {
              return (
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
              )
            })}
          </Row>
          <Row className="justify-center">
            <Button
              className="flex items-center p-4 m-4"
              type="primary"
              danger={taskData.isDone ? true : false}
              icon={
                taskData.isDone ? (
                  <BorderOutlined style={{ fontSize: 16 }} />
                ) : (
                  <CheckSquareOutlined style={{ fontSize: 16 }} />
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
    </Modal>
  )
}

export default TaskOverlay
