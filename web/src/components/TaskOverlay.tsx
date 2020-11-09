import {
  BorderOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FundProjectionScreenOutlined,
  LoadingOutlined,
  MoreOutlined,
  PaperClipOutlined,
  PlusOutlined,
  RollbackOutlined,
  SendOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Mentions,
  Menu,
  message as Message,
  Modal,
  Row,
  Typography,
  Upload,
} from 'antd'
import { useStoreState } from 'easy-peasy'
import React, { useEffect, useState } from 'react'
import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'
import { ComponentVisible, LoadingComponent } from '../components/DashboardComponent'
import { COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from '../services/api/comment'
import {
  TOGGLE_TASK_DONE,
  UPDATE_TASK_DETAIL,
  UPDATE_TASK_MEMBER,
  UPDATE_TASK_NAME,
} from '../services/api/task'
import { Task } from '../typings'

function TaskOverlay({ project, visibleTask, onCloseModal, data, refetch }: any) {
  const { Text } = Typography
  const { confirm } = Modal
  const { TextArea } = Input
  const [toggleIsDone, { loading: loadingMutation }] = useMutation(TOGGLE_TASK_DONE)
  const [createComment] = useMutation(COMMENT)
  const [deleteComment] = useMutation(DELETE_COMMENT)
  const [updateComment] = useMutation(UPDATE_COMMENT)
  const [updateTaskName] = useMutation(UPDATE_TASK_NAME)
  const [updateTaskDetail] = useMutation(UPDATE_TASK_DETAIL)
  const [updateTaskMember] = useMutation(UPDATE_TASK_MEMBER)

  const [isDone] = useState(false)
  const user = useStoreState((s) => s.userState.user)

  const [taskData, setTaskData] = useState<Task | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  // const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskDetail, setTaskDetail] = useState('')
  const [isHovering, setIsHovering]: any = useState(false)
  const [visibleMember, setVisibleMember] = useState(false)
  const [memberList, setMemberList] = useState([])
  const [members, setMembers] = useState([])
  const { Option: MentionOption } = Mentions

  const {
    taskNameRef,
    taskDetailRef,
    editTaskName,
    setEditTaskName,
    editTaskDetail,
    setEditTaskDetail,
  } = ComponentVisible(false)

  useEffect(() => {
    setTaskData(data)
    setTaskName(data.taskName)
    setTaskDetail(data.taskDetail)
    if (project) {
      setMemberList(project.members)
    }
  }, [data, loadingMutation, project])

  useEffect(() => {
    setModalVisible(visibleTask)
  }, [visibleTask])

  function onUnDoneClick() {
    toggleIsDone({ variables: { id: data.id, isDone: isDone } })
  }

  function onDoneClick() {
    toggleIsDone({ variables: { id: data.id, isDone: !isDone } })
  }

  function onCancelClick(event: any) {
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
        // setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  function handleSubmit() {
    if (message !== '') {
      if (taskData) {
        createComment({
          variables: {
            userId: user?.id,
            taskId: data.id,
            timestamp: new Date(),
            message: message,
          },
        })
          .then((res) => {
            if (res) {
              const tempData: Task = taskData
                ? { ...taskData, comments: [...taskData.comments!] }
                : { ...data }

              setTaskData(tempData)
              refetch()
            }
          })
          .catch((err) => {
            Message.error({
              content: `Error : ${err}`,
              duration: 2,
              icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
            })
          })
      }
      setMessage('')
    }
  }

  function handleDelete(id: any) {
    if (taskData) {
      deleteComment({
        variables: {
          id: id,
        },
      })
        .then((res) => {
          setTaskData({ ...taskData, comments: res.data.deleteComment })
        })
        .catch((err) => {
          Message.error({
            content: `Error : ${err}`,
            duration: 2,
            icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
          })
        })
    }
  }

  function menu(item: any) {
    return (
      <Menu>
        <Menu.Item className="flex flex-row px-4 items-center" icon={<RollbackOutlined />}>
          Reply
        </Menu.Item>
        {item.user.id === user?.id && (
          <Menu>
            <Menu.Item
              icon={<DeleteOutlined />}
              className="flex flex-row px-4 items-center text-red-400 hover:bg-red-400 hover:text-white"
              onClick={() => {
                confirm({
                  title: 'Are you sure to delete this comment?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'Yes',
                  okType: 'danger',
                  cancelText: 'No',
                  onOk() {
                    handleDelete(item.id)
                  },
                })
              }}
            >
              Delete
            </Menu.Item>
          </Menu>
        )}
      </Menu>
    )
  }

  function showModal() {
    setVisibleMember(true)
  }

  function handleCancel() {
    setVisibleMember(false)
  }

  function handleMention(value: any) {
    let ids = memberList
      .filter((item: any) => value.slice(0, -1).split('@').includes(item.name))
      .map((val: any) => val.id)
    setMembers(ids[0])
  }

  function handleUpdateMember() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    updateTaskMember({
      variables: {
        id: data.id,
        members: members,
      },
    })
  }

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
      onCancel={(e) => onCancelClick(e)}
      destroyOnClose
      closeIcon={<CloseCircleOutlined style={{ color: 'red', fontSize: 24 }} />}
    >
      {!taskData ? (
        <LoadingComponent overlay />
      ) : (
        <>
          <div ref={taskNameRef}>
            {!editTaskName ? (
              <div
                onClick={() => {
                  setEditTaskName(true)
                }}
              >
                <Text className="font-bold text-4xl ml-2">{taskData.taskName}</Text>
              </div>
            ) : (
              <Input
                className="font-bold text-4xl ml-2"
                autoFocus
                defaultValue={taskName}
                onChange={(e) => {
                  if (taskName) {
                    setTaskName(e.target.value)
                    updateTaskName({
                      variables: { id: data.id, taskName: e.target.value },
                    })
                  }
                }}
              />
            )}
          </div>

          <Row className="py-4">
            <Col span={24} lg={{ span: 18 }} className="pl-4 pr-4 pt-2 border-0 lg:border-r-2">
              <div ref={taskDetailRef}>
                {!editTaskDetail ? (
                  <div
                    onClick={() => {
                      setEditTaskDetail(true)
                    }}
                    className="mb-8"
                  >
                    <Text className="text-lg pl-4 pr-4">{taskData.taskDetail}</Text>
                  </div>
                ) : (
                  <TextArea
                    className="text-lg pl-4 pr-4 mb-8 w-full"
                    autoSize
                    autoFocus
                    defaultValue={taskDetail}
                    onChange={(e) => {
                      if (taskDetail) {
                        setTaskDetail(e.target.value)
                        updateTaskDetail({
                          variables: { id: data.id, taskDetail: e.target.value },
                        })
                      }
                    }}
                  />
                )}
              </div>
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
                          <Link to={{ pathname: `/profile/${item.user.id}` }}>
                            <Avatar size="large" src={item.user.image.fullPath} />
                          </Link>
                        </Col>
                        <Col span={18} lg={{ span: 20 }}>
                          <div className="w-full py-2 pl-4 mx-0 bg-white shadow-lg rounded-lg">
                            <div className="flex flex-row justify-between">
                              <div>
                                <Link to={{ pathname: `/profile/${item.user.id}` }}>
                                  <Text className="font-bold text-lg mr-2">{item.user.name}</Text>
                                </Link>
                                <Text disabled>
                                  {new Date(item.timestamp).toLocaleDateString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </Text>
                              </div>
                              <div>
                                <Dropdown overlay={menu(item)}>
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
                                {item.user.id === user?.id ? (
                                  <Text
                                    editable={{
                                      onChange: (message) => {
                                        if (taskData) {
                                          updateComment({
                                            variables: {
                                              id: item.id,
                                              message: message,
                                            },
                                          })
                                        }
                                      },
                                    }}
                                  >
                                    {item.message}
                                  </Text>
                                ) : (
                                  <Text>{item.message}</Text>
                                )}
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
                    src={user?.image.fullPath}
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

              <Row
                className="items-center"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <TeamOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
                <Text className="text-lg font-bold">Team</Text>
                {isHovering ? (
                  <Button
                    type="text"
                    shape="circle"
                    icon={<EditOutlined />}
                    style={{ color: '#105EFC' }}
                    className="flex items-center justify-center"
                    onClick={showModal}
                  />
                ) : null}
                <Modal visible={visibleMember} onCancel={handleCancel} footer={null}>
                  <Form className="mt-8">
                    <Form.Item name="Member" label="Member">
                      <Input.Group compact>
                        <Mentions
                          style={{ width: '70%' }}
                          placeholder="input @ to mention people"
                          prefix={['@']}
                          onChange={(e) => {
                            handleMention(e)
                          }}
                          onPressEnter={handleUpdateMember}
                        >
                          {(memberList || []).map((value: any) => (
                            <MentionOption
                              key={value.id}
                              value={value.name}
                              className="hover:bg-primary hover:text-white py-2 px-4"
                            >
                              <Avatar
                                shape="circle"
                                size="default"
                                src={value.image.fullPath}
                                className="mr-2"
                              />
                              {value.name}
                              <Text className="text-gray-400 text-md ml-2">{value.email}</Text>
                            </MentionOption>
                          ))}
                        </Mentions>
                        <Button
                          style={{ width: '30%' }}
                          loading={loading}
                          onClick={handleUpdateMember}
                          type="primary"
                        >
                          Add Member
                        </Button>
                      </Input.Group>
                    </Form.Item>
                  </Form>

                  {taskData.members ? (
                    taskData.members.map((items: any) => (
                      <div className="flex mx-0 my-1 p-2">
                        <Avatar key={items.id} src={items.image.fullPath} alt={items.name} />
                        <div className="ml-4 text-lg">{items.name}</div>
                        <Row className="flex items-end justify-end w-full">
                          <Button
                            danger
                            type="text"
                            shape="circle"
                            className="flex items-center justify-center"
                          >
                            <DeleteOutlined />
                          </Button>
                        </Row>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </Modal>
              </Row>

              <Row className="ml-2 mb-4 overflow-y-auto">
                {taskData.members ? (
                  taskData.members.map((items: any) => (
                    <Link
                      className="w-full"
                      key={items.id}
                      to={{ pathname: `/profile/${items.id}` }}
                    >
                      <div className="flex mx-0 my-1 p-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
                        <Avatar key={items.id} src={items.image.fullPath} alt={items.name} />
                        <div className="ml-4 text-lg">{items.name}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div></div>
                )}
              </Row>
              <Row className="justify-center">
                {taskData.isDone ? (
                  <Button
                    className="flex items-center justify-center py-4 m-4 text-md font-bold w-full shadow-md hover:shadow-lg bg-green-400 focus:bg-green-600 hover:bg-red-600 transition duration-800 ease-in border-0 "
                    type="primary"
                    icon={
                      loadingMutation ? (
                        <LoadingOutlined style={{ fontSize: 14 }} spin />
                      ) : (
                        <CheckSquareOutlined style={{ fontSize: 14 }} />
                      )
                    }
                    shape="round"
                    onClick={onUnDoneClick}
                  >
                    Mark as Undone
                  </Button>
                ) : (
                  <Button
                    className="flex items-center justify-center py-4 m-4 text-md font-bold w-full shadow-md hover:shadow-lg bg-red-400 focus:bg-red-600 hover:bg-green-600 transition duration-800 ease-in border-0 "
                    type="primary"
                    icon={
                      loadingMutation ? (
                        <LoadingOutlined style={{ fontSize: 14 }} spin />
                      ) : (
                        <BorderOutlined style={{ fontSize: 14 }} />
                      )
                    }
                    shape="round"
                    onClick={onDoneClick}
                  >
                    Mark as Done
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Modal>
  )
}

export default TaskOverlay
