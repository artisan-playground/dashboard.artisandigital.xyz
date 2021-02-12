import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  CommentOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FileExcelTwoTone,
  FilePdfTwoTone,
  FilePptTwoTone,
  FileTextTwoTone,
  FileTwoTone,
  FileWordTwoTone,
  FileZipTwoTone,
  FundProjectionScreenOutlined,
  LoadingOutlined,
  MoreOutlined,
  PaperClipOutlined,
  PlusOutlined,
  SendOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  Menu,
  message as Message,
  Modal,
  PageHeader,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import dayjs, { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UnknownUserImage from '../assets/images/unknown_user.png'
import { LayoutDashboard } from '../components/DashboardComponent'
import { COMMENT, DELETE_COMMENT, REPLY_COMMENT, UPDATE_COMMENT } from '../services/api/comment'
import { DELETE_FILE, UPLOAD_FILE } from '../services/api/file'
import { ADD_RECENT_ACTIVITY } from '../services/api/recentActivity'
import {
  DELETE_MEMBER_FROM_TASK,
  DELETE_TASK,
  TASKS_BY_TASKID,
  TOGGLE_TASK_DONE,
  UPDATE_TASK,
  UPDATE_TASK_MEMBER,
} from '../services/api/task'
import { useStoreState } from '../store'
import { Task } from '../typings'

function TaskDetail() {
  const { Paragraph, Text } = Typography
  const { TextArea } = Input
  const { Option } = Select
  const { confirm } = Modal
  const [toggleIsDone, { loading: toggleLoading }] = useMutation(TOGGLE_TASK_DONE)
  const [createComment] = useMutation(COMMENT)
  const [replyComment] = useMutation(REPLY_COMMENT)
  const [deleteComment] = useMutation(DELETE_COMMENT)
  const [updateComment] = useMutation(UPDATE_COMMENT)
  const [updateTask] = useMutation(UPDATE_TASK)
  const [deleteTask] = useMutation(DELETE_TASK)
  const [updateTaskMember] = useMutation(UPDATE_TASK_MEMBER)
  const [uploadFile, { loading: uploadLoading }] = useMutation(UPLOAD_FILE)
  const [deleteFile] = useMutation(DELETE_FILE)
  const [removeMember] = useMutation(DELETE_MEMBER_FROM_TASK)
  const { id }: any = useParams()
  const { loading, error, data, refetch } = useQuery(TASKS_BY_TASKID, {
    variables: { id: Number(id) },
    notifyOnNetworkStatusChange: true,
  })
  const [filteredData, setFilteredData] = useState<any>()
  const [isDone] = useState(false)
  const user = useStoreState((s) => s.userState.user)
  const [message, setMessage] = useState('')
  const [visibleMember, setVisibleMember] = useState(false)
  const [status, setStatus] = useState(true)
  const [memberList, setMemberList] = useState<any[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [modalFileVisible, setModalFileVisible] = useState(false)
  const [userDataSource, setUserDataSource] = useState<any>()
  const [editTaskVisible, setEditTaskVisible] = useState(false)
  const [taskName, setTaskName] = useState<any>()
  const [type, setType] = useState<any>()
  const [member, setMember] = useState<any[]>([])
  const [memberName, setMemberName] = useState<any[]>([])
  const [dueDate, setDueDate] = useState<any>()
  const [startTime, setStartTime] = useState<any>()
  const [description, setDescription] = useState<any>()
  const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
  const dateFormat = 'DD MMM YYYY HH:mm'
  const { RangePicker } = DatePicker
  const customFormat = (value: any) => `${value.format(dateFormat)}`
  const selectedName = member.map(({ name }) => name)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [imageData, setImageData] = useState<any>()
  const [edit, setEdit] = useState<any>()
  const [comment, setComment] = useState<any>('')
  const [addRecentActivity] = useMutation(ADD_RECENT_ACTIVITY)

  useEffect(() => {
    if (!error && !loading) {
      setFilteredData(data.getTaskById)
      setUserDataSource(data.getTaskById.project.members)
      setMemberList(data.getTaskById.members)
      setTaskName(data.getTaskById.taskName)
      setDescription(data.getTaskById.taskDetail)
      setType(data.getTaskById.taskType)
      setDueDate(data.getTaskById.dueDate)
      setStartTime(data.getTaskById.startTime)
      setMember(data.getTaskById.members)
    }
  }, [
    loading,
    error,
    data,
    createComment,
    deleteComment,
    updateComment,
    updateTaskMember,
    uploadFile,
    replyComment,
  ])

  function onUnDoneClick() {
    toggleIsDone({ variables: { id: filteredData.id, isDone: isDone } })
    addRecentActivity({
      variables: {
        message: `Marked task ${taskName} as done`,
        userId: user?.id,
        projectId: filteredData.project.id,
      },
    })
    refetch()
  }

  function onDoneClick() {
    toggleIsDone({ variables: { id: filteredData.id, isDone: !isDone } })
    addRecentActivity({
      variables: {
        message: `Marked task ${taskName} as undone`,
        userId: user?.id,
        projectId: filteredData.project.id,
      },
    })
    refetch()
  }

  function handleSubmit() {
    if (message !== '') {
      if (filteredData) {
        createComment({
          variables: {
            userId: Number(user?.id),
            taskId: filteredData.id,
            message: message,
          },
        })
        addRecentActivity({
          variables: {
            message: `Commented task ${taskName}`,
            userId: user?.id,
            projectId: filteredData.project.id,
          },
        })
          .then((res) => {
            if (res) {
              const tempData: Task = filteredData
                ? { ...filteredData, comments: [...filteredData.comments!] }
                : { ...data }

              setFilteredData(tempData)
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

  function handleReply() {
    if (message !== '') {
      if (filteredData) {
        replyComment({
          variables: {
            userId: Number(user?.id),
            taskId: filteredData.id,
            commentId: filteredData.id,
            message: message,
          },
        })
        addRecentActivity({
          variables: {
            message: `Replyed a comment in task ${taskName}`,
            userId: user?.id,
            projectId: filteredData.project.id,
          },
        })
          .then((res) => {
            if (res) {
              const tempData: Task = filteredData
                ? { ...filteredData, comments: [...filteredData.comments!] }
                : { ...data }

              setFilteredData(tempData)
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
    if (filteredData) {
      deleteComment({
        variables: {
          id: id,
        },
      })
        .then((res) => {
          setFilteredData({ ...filteredData, comments: res.data.deleteComment })
          refetch()
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

  function handleEdit(data: any) {
    setEdit(data)
    setComment(data.message)
  }

  function handleEditConfirm() {
    updateComment({
      variables: {
        id: edit.id,
        message: comment,
      },
    })
    setEdit({})
    refetch()
  }

  function menu(item: any) {
    return (
      <Menu>
        <Menu.Item>Reply</Menu.Item>
        {item.user.id === user?.id && (
          <>
            <Menu.Item onClick={() => handleEdit(item)}>Edit</Menu.Item>
            <Menu.Item
              onClick={() => {
                confirm({
                  title: 'Are you sure to delete this comment?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'Remove',
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
          </>
        )}
      </Menu>
    )
  }

  function showModal() {
    setVisibleMember(true)
  }

  function handleCancel() {
    setVisibleMember(false)
    setEditTaskVisible(false)
  }

  function handleMember(value: any) {
    const val = Number(value.reverse()[0])
    const memberName = userDataSource.find((item: any) => item.id === val)
    const name = memberName.name
    setMembers((prevState) => [...prevState, { id: val }])
    setMemberName((prevState) => [...prevState, name])
  }

  function handleAddMember() {
    updateTaskMember({
      variables: { id: Number(id), members: members },
    })
    addRecentActivity({
      variables: {
        message: `Invited ${memberName} to task ${taskName}`,
        userId: user?.id,
        projectId: filteredData.project.id,
      },
    })
      .then((res) => {
        if (res) {
          setMembers(members)
          setVisibleMember(false)
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

  function onUpload({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid)
      uploadFile({ variables: { taskId: Number(filteredData.id), file } }).then((res) => {
        refetch()
      })
    addRecentActivity({
      variables: {
        message: `Added attachment in task ${taskName}`,
        userId: user?.id,
        projectId: filteredData.project.id,
      },
    }).catch((err) => {
      Message.error({
        content: `Error : ${err}`,
        duration: 2,
        icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
      })
    })
  }

  function openModal(item: any) {
    setModalFileVisible(true)
    setImageData(item)
  }

  function closeModal() {
    setModalFileVisible(false)
  }

  function handleDeleteFile(id: any) {
    if (filteredData) {
      deleteFile({
        variables: {
          id: id,
        },
      })
      addRecentActivity({
        variables: {
          message: `Removed attachment in task ${taskName}`,
          userId: user?.id,
          projectId: filteredData.project.id,
        },
      })
        .then((res) => {
          setFilteredData({ ...filteredData, files: res.data.deleteFile })
          refetch()
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

  function handleConfirm(record: any) {
    Modal.confirm({
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
      title: <Text className="font-bold">Delete member from task</Text>,
      content: <Text>Do you want to delete “{record.name}" from this task?</Text>,
      okText: 'Yes',
      onOk: () => {
        handleRemoveMember(record.id, record.name)
      },
    })
  }

  function handleRemoveMember(memberId: any, memberName: any) {
    removeMember({
      variables: {
        taskId: Number(id),
        members: memberId,
      },
    })
    addRecentActivity({
      variables: {
        message: `Removed ${memberName} from task ${taskName}`,
        userId: user?.id,
        projectId: filteredData.project.id,
      },
    })
      .then((res) => {
        setVisibleMember(false)
        refetch()
      })
      .catch((err) => {
        Message.error({
          content: `Error : ${err}`,
          duration: 2,
          icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
        })
      })
  }

  function showEditTask() {
    setEditTaskVisible(true)
  }

  function handleEditTask() {
    if (taskName !== '' && type !== '' && description !== '') {
      updateTask({
        variables: {
          id: filteredData.id,
          taskName: taskName,
          taskDetail: description,
          taskType: type,
        },
      })
      addRecentActivity({
        variables: {
          message: `Updated task ${taskName} detail`,
          userId: user?.id,
          projectId: filteredData.project.id,
        },
      })
        .then((res) => {
          setTaskName(taskName)
          setType(type)
          setDescription(description)
          setEditTaskVisible(false)
          setConfirmVisible(false)
          setDeleteVisible(false)
          refetch()
        })
        .catch((err) => {
          Message.error({
            content: `Error : ${err}`,
            duration: 2,
            icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
          })
        })
    } else {
      Message.warning({
        content: `Please insert all field`,
        duration: 2,
        icon: <ExclamationCircleOutlined style={{ fontSize: 20, top: -2 }} />,
      })
    }
  }

  function handleChangeType(value: any) {
    setType(value)
  }

  function filterFile(data: any) {
    if (
      data.extension === 'image/png' ||
      data.extension === 'image/jpg' ||
      data.extension === 'image/jpeg' ||
      data.extension === 'image/svg+xml'
    ) {
      return (
        <Row
          key={data.id}
          style={{
            width: 102,
            height: 102,
          }}
          className="bg-file border-gray-300 shadow-sm border flex items-center justify-center rounded-sm py-1 px-2 cursor-pointer transition delay-100 duration-300 relative"
        >
          <div
            style={{
              width: 85,
              height: 85,
            }}
            className="absolute hover:bg-black hover:bg-opacity-50 transition delay-100 duration-300 py-1 px-2 opacity-0 hover:opacity-100"
          >
            <Col style={{ top: '50%' }} className="flex items-center justify-center">
              <Button
                className="absolute mr-8 hover:opacity-100 text-gray-300 focus:text-white hover:text-white"
                type="text"
                shape="circle"
                onClick={() => openModal(data)}
              >
                <EyeOutlined />
              </Button>
              <Modal
                title={imageData && imageData.fileName}
                visible={modalFileVisible}
                onCancel={closeModal}
                footer={null}
                className="flex items-center justify-center"
              >
                <img src={imageData && imageData.fullPath} alt="file" />
              </Modal>
              <Popconfirm
                title="Are you sure to delete this file?"
                placement="topRight"
                onConfirm={() => handleDeleteFile(data.id)}
              >
                <Button
                  className="absolute ml-8 hover:opacity-100 text-gray-300 focus:text-white hover:text-white"
                  type="text"
                  shape="circle"
                >
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Col>
          </div>
          <img src={data.fullPath} alt="file" className="object-cover h-20" />
        </Row>
      )
    } else {
      return (
        <Row
          key={data.id}
          style={{
            width: 102,
            height: 102,
          }}
          className="bg-file border-gray-300 shadow-sm border flex items-center justify-center rounded-sm py-1 px-2 cursor-pointer transition delay-100 duration-300 relative"
        >
          <div
            style={{
              width: 85,
              height: 85,
            }}
            className="absolute hover:bg-black hover:bg-opacity-50 transition delay-100 duration-300 py-1 px-2 opacity-0 hover:opacity-100"
          >
            <Col style={{ top: '50%' }} className="flex items-center justify-center">
              <Button
                className="absolute mr-8 hover:opacity-100 text-gray-300 focus:text-white hover:text-white"
                type="text"
                shape="circle"
              >
                <a href={data.fullPath} download target="_blank">
                  <DownloadOutlined />
                </a>
              </Button>
              <Popconfirm
                title="Are you sure to delete this file?"
                placement="topRight"
                onConfirm={() => handleDeleteFile(data.id)}
              >
                <Button
                  className="absolute ml-8 hover:opacity-100 text-gray-300 focus:text-white hover:text-white"
                  type="text"
                  shape="circle"
                >
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Col>
          </div>
          {data.extension ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
            <Space direction="vertical" className="text-center mt-3" size={2}>
              <FileExcelTwoTone className="text-2xl text-blue-600" />
              <Paragraph ellipsis={{ rows: 1, suffix: data.fileName.slice(-4) }}>
                {data.fileName}
              </Paragraph>
            </Space>
          ) : data.extension ===
            'application/vnd.openxmlformats-officedocument.presentationml.presentation' ? (
            <Space direction="vertical" className="text-center mt-3" size={2}>
              <FilePptTwoTone className="text-2xl text-blue-600" />
              <Paragraph ellipsis={{ rows: 1, suffix: data.fileName.slice(-4) }}>
                {data.fileName}
              </Paragraph>
            </Space>
          ) : data.extension ===
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            data.extension === 'application/msword' ? (
            <Space direction="vertical" className="text-center mt-3" size={2}>
              <FileWordTwoTone className="text-2xl text-blue-600" />
              <Paragraph ellipsis={{ rows: 1, suffix: data.fileName.slice(-4) }}>
                {data.fileName}
              </Paragraph>
            </Space>
          ) : data.extension === 'text/plain' ? (
            <Space direction="vertical" className="text-center mt-3" size={2}>
              <FileTextTwoTone className="text-2xl text-blue-600" />
              <Paragraph ellipsis={{ rows: 1, suffix: data.fileName.slice(-4) }}>
                {data.fileName}
              </Paragraph>
            </Space>
          ) : data.extension === 'application/pdf' ? (
            <Space direction="vertical" className="text-center mt-3" size={2}>
              <FilePdfTwoTone className="text-2xl text-blue-600" />
              <Paragraph ellipsis={{ rows: 1, suffix: data.fileName.slice(-4) }}>
                {data.fileName}
              </Paragraph>
            </Space>
          ) : data.extension === 'application/octet-stream' ||
            data.extension === 'application/x-zip-compressed' ? (
            <Space direction="vertical" className="text-center mt-3" size={2}>
              <FileZipTwoTone className="text-2xl text-blue-600" />
              <Paragraph ellipsis={{ rows: 1, suffix: data.fileName.slice(-4) }}>
                {data.fileName}
              </Paragraph>
            </Space>
          ) : (
            <Space direction="vertical" className="text-center mt-3" size={2}>
              <FileTwoTone className="text-2xl text-blue-600" />
              <Paragraph ellipsis={{ rows: 1, suffix: data.fileName.slice(-4) }}>
                {data.fileName}
              </Paragraph>
            </Space>
          )}
        </Row>
      )
    }
  }

  function onChange(checked: any) {
    setStatus(checked)
  }

  function showConfirm() {
    setConfirmVisible(true)
  }

  function showDelete() {
    setDeleteVisible(true)
  }

  function handleConfirmCancel() {
    setConfirmVisible(false)
  }

  function handleDeleteCancel() {
    setDeleteVisible(false)
  }

  function handleDeleteTask() {
    deleteTask({
      variables: {
        id: filteredData.id,
      },
    })
    addRecentActivity({
      variables: {
        message: `Removed task ${taskName}`,
        userId: user?.id,
        projectId: filteredData.project.id,
      },
    })
      .then((res) => {
        setEditTaskVisible(false)
        setConfirmVisible(false)
        setDeleteVisible(false)
        window.history.back()
        refetch()
      })
      .catch((err) => {
        Message.error({
          content: `Error : ${err}`,
          duration: 2,
          icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
        })
      })
  }

  return loading || !filteredData ? (
    <LayoutDashboard>
      <Spin size="large" className="flex justify-center pt-4" />
    </LayoutDashboard>
  ) : (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>
          <Link to={{ pathname: `/projects` }}>Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={{ pathname: `/projects/${filteredData.project.id}` }}>
            {filteredData.project.projectName}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{filteredData.taskName}</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        className="site-page-header"
        title={filteredData.taskName}
        onBack={() => window.history.back()}
      />
      <Divider />

      <Row justify="space-between" className="w-full px-8 pb-8">
        <Col xs={24} lg={18} className="lg:border-r relative">
          <Space direction="vertical">
            <Text className="font-bold text-lg">{filteredData.taskName}</Text>
            <Text type="secondary">{filteredData.taskType}</Text>
            <Text>{filteredData.taskDetail}</Text>
          </Space>
          <Row className="mt-6">
            <PaperClipOutlined className="mr-2 text-2xl text-blue-700" />
            <Text className="text-lg font-bold">Attachments</Text>
          </Row>
          <Row className="py-2 overflow-y-auto flex flex-row clearfix">
            {filteredData.files ? (
              filteredData.files.map((item: any) => (
                <Row>
                  <Col>{filterFile(item)}</Col>
                </Row>
              ))
            ) : (
              <div className="flex justify-center items-center p-8 w-full">
                <Text disabled>No comment</Text>
              </div>
            )}
            <label
              style={{
                width: 102,
                height: 102,
                backgroundColor: '#f9f9f9',
              }}
              className="appearance-none border-dashed border-gray-300 shadow-sm border flex items-center justify-center rounded-sm cursor-pointer hover:text-blue-400 hover:border-blue-400 transition delay-100 duration-300"
            >
              <input type="file" className="hidden" onChange={onUpload} />
              <Space direction="vertical" className="text-center">
                {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                Upload
              </Space>
            </label>
          </Row>
          <Row className="mt-6">
            <CommentOutlined className="mr-2 text-2xl text-blue-700" />
            <Text className="text-lg font-bold">Comment</Text>
          </Row>
          <Row className="py-2 px-2">
            {filteredData.comments ? (
              filteredData.comments
                .slice()
                .sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
                .map((item: any) =>
                  !item.reply ? (
                    <Row className="w-full ml-1 mb-2" key={item.id}>
                      <Col xs={22} lg={22}>
                        <Row className="flex flex-row justify-between">
                          <Col>
                            <Link to={{ pathname: `/profile/${item.user.id}` }} className="mr-2">
                              <Avatar
                                size="large"
                                src={item.user.image ? item.user.image.fullPath : UnknownUserImage}
                                alt="user"
                              />
                            </Link>
                            <Link to={{ pathname: `/profile/${item.user.id}` }}>
                              <Text className="font-bold text-base text-blue-700 mr-2">
                                {item.user.name}
                              </Text>
                            </Link>
                            <Text type="secondary">
                              {dayjs(item.timestamp).format('DD/MMM/YYYY HH:mm')}
                            </Text>
                          </Col>
                          <Col>
                            <Dropdown overlay={menu(item)} trigger={['click']}>
                              <Button type="text" shape="circle">
                                <MoreOutlined />
                              </Button>
                            </Dropdown>
                          </Col>
                        </Row>
                        <Row className="pl-12 w-full">
                          {edit && edit.id === item.id ? (
                            <Form layout="horizontal" className="w-full">
                              <Form.Item name="Message">
                                <Input.Group compact>
                                  <Input
                                    defaultValue={comment}
                                    placeholder="Comment..."
                                    style={{ width: '93%' }}
                                    onChange={(e: any) => setComment(e.target.value)}
                                  />
                                  <Button
                                    style={{ width: '7%' }}
                                    loading={loading}
                                    type="primary"
                                    onClick={handleEditConfirm}
                                  >
                                    <SendOutlined />
                                  </Button>
                                </Input.Group>
                              </Form.Item>
                            </Form>
                          ) : (
                            <Text>{item.message}</Text>
                          )}
                        </Row>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="w-full mb-2" key={item.id}>
                      <Col xs={22} lg={22}>
                        <Row className="flex flex-row justify-between">
                          <Col className="pl-12">
                            <Link to={{ pathname: `/profile/${item.user.id}` }} className="mr-2">
                              <Avatar
                                size="large"
                                src={item.user.image ? item.user.image.fullPath : UnknownUserImage}
                                alt="user"
                              />
                            </Link>
                            <Link to={{ pathname: `/profile/${item.user.id}` }}>
                              <Text className="font-bold text-base text-blue-700 mr-2">
                                {item.user.name}
                              </Text>
                            </Link>
                            <Text type="secondary">
                              {dayjs(item.timestamp).format('DD/MMM/YYYY HH:mm')}
                            </Text>
                          </Col>
                          <Col>
                            <Dropdown overlay={menu(item)}>
                              <Button type="text" shape="circle">
                                <MoreOutlined />
                              </Button>
                            </Dropdown>
                          </Col>
                        </Row>
                        <Row className="pl-24 w-full">
                          {edit && edit.id === item.id ? (
                            <Form layout="horizontal" className="w-full">
                              <Form.Item name="Message" className="mb-0">
                                <Input.Group compact>
                                  <Input
                                    defaultValue={comment}
                                    placeholder="Comment..."
                                    style={{ width: '93%' }}
                                    onChange={(e: any) => setComment(e.target.value)}
                                  />
                                  <Button
                                    style={{ width: '7%' }}
                                    loading={loading}
                                    type="primary"
                                    onClick={handleEditConfirm}
                                  >
                                    <SendOutlined />
                                  </Button>
                                </Input.Group>
                              </Form.Item>
                            </Form>
                          ) : (
                            <Text>{item.message}</Text>
                          )}
                        </Row>
                      </Col>
                    </Row>
                  )
                )
            ) : (
              <Row className="flex justify-center items-center p-8 w-full">
                <Text disabled>No comment</Text>
              </Row>
            )}

            <Row className="w-full pr-4 mt-4" justify="space-between">
              <Col xs={2} className="w-full">
                <Avatar
                  className="mr-4"
                  size="large"
                  src={user?.image ? user?.image.fullPath : UnknownUserImage}
                  alt="user"
                />
              </Col>
              <Col xs={22}>
                <TextArea
                  placeholder="Comment..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  allowClear
                />
                <Button type="primary" className="mt-4" onClick={handleSubmit}>
                  Add Comment
                </Button>
              </Col>
            </Row>
          </Row>

          <Row className="absolute top-0 right-5">
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined />}
              className="text-blue-700 hover:text-blue-700 focus:text-blue-700"
              onClick={showEditTask}
            />
          </Row>

          <Modal
            visible={editTaskVisible}
            width={'80%'}
            title={<Text className="font-bold">Edit a task</Text>}
            onCancel={handleCancel}
            footer={null}
          >
            <Row className="px-56 w-full" justify="space-between">
              <Col xs={24}>
                <Form layout="vertical">
                  <Form.Item
                    name="Task name"
                    label="Task name"
                    rules={[{ required: true, message: 'Please input task name' }]}
                    required
                  >
                    <Input
                      defaultValue={taskName}
                      placeholder="Please input task name"
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="Type"
                    label="Type"
                    rules={[{ required: true, message: 'Please input type' }]}
                    required
                  >
                    <Select defaultValue={type} onChange={handleChangeType}>
                      <Option value="Data">Data</Option>
                      <Option value="Design">Design</Option>
                      <Option value="Mobile">Mobile</Option>
                      <Option value="Security">Security</Option>
                      <Option value="Web">Web</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="Members" label="Members">
                    <Select
                      mode="multiple"
                      defaultValue={selectedName}
                      disabled
                      optionLabelProp="name"
                    />
                  </Form.Item>
                  <Form.Item name="Due date" label="Due date">
                    <RangePicker
                      className="w-full"
                      showTime={{ format: 'HH:mm' }}
                      format={customFormat}
                      disabled
                      defaultValue={[dayjs(startTime), dayjs(dueDate)]}
                    />
                  </Form.Item>
                  <Form.Item
                    name="Description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input project name' }]}
                    required
                  >
                    <TextArea
                      defaultValue={description}
                      rows={4}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please input description"
                    />
                  </Form.Item>
                </Form>

                <Form layout="horizontal">
                  <Form.Item name="Task status" label="Task status" required>
                    <Space direction="horizontal" size={2}>
                      <Switch defaultChecked={status} onChange={onChange} className="mr-2" />
                      {status === true ? <Text>Active</Text> : <Text>Inactive</Text>}
                    </Space>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="w-full"
                      onClick={status === true ? showConfirm : showDelete}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                  <Modal
                    visible={confirmVisible}
                    title={
                      <Text className="font-bold">
                        Do you want to edit "{filteredData.taskName}"
                      </Text>
                    }
                    onCancel={handleConfirmCancel}
                    onOk={handleEditTask}
                  >
                    <Text>You confirm to edit this task.</Text>
                  </Modal>
                  <Modal
                    visible={deleteVisible}
                    title={
                      <Text className="font-bold">
                        Do you want to delete "{filteredData.taskName}"
                      </Text>
                    }
                    onCancel={handleDeleteCancel}
                    onOk={handleDeleteTask}
                  >
                    <Text>You confirm to delete this task.</Text>
                  </Modal>
                </Form>
              </Col>
            </Row>
          </Modal>
        </Col>
        <Col xs={24} lg={6} className="pl-4">
          <Row className="mt-6">
            <FundProjectionScreenOutlined className="mr-2 text-2xl text-blue-700" />
            <Space direction="vertical">
              <Text className="text-lg font-bold">{filteredData.project.projectName}</Text>
              <Text type="secondary">Project Name</Text>
            </Space>
          </Row>
          <Row className="mt-6">
            <ClockCircleOutlined className="mr-2 text-2xl text-blue-700" />
            <Space direction="vertical">
              <Text className="text-lg font-bold">
                {dayjs(filteredData.project.dueDate).format('DD MMM YYYY')}
              </Text>
              <Text type="secondary">Due Date</Text>
            </Space>
          </Row>

          <Row justify="space-between" className="mt-6">
            <Col xs={16}>
              <TeamOutlined className="mr-2 text-2xl text-blue-700" />
              <Text className="text-lg font-bold">Teams</Text>{' '}
            </Col>
            <Col xs={8} className="flex justify-end">
              <Button
                type="text"
                shape="circle"
                icon={<EditOutlined />}
                className="text-blue-700 hover:text-blue-700 focus:text-blue-700"
                onClick={showModal}
              />
            </Col>

            <Modal visible={visibleMember} onCancel={handleCancel} footer={null}>
              <Form className="mt-8">
                <Form.Item name="Member">
                  <Input.Group compact>
                    <Select
                      mode="tags"
                      onChange={handleMember}
                      tokenSeparators={[', ']}
                      style={{ width: '85%' }}
                    >
                      {userDataSource &&
                        userDataSource
                          .filter(
                            (user: any) =>
                              !memberList.find((member: any) => user.name === member.name)
                          )
                          .map((item: any) => (
                            <Row key={item.id}>
                              <Avatar
                                shape="circle"
                                size="default"
                                src={item.image ? item.image.fullPath : UnknownUserImage}
                                alt="user"
                                className="mr-2"
                              />
                              {item.name}
                            </Row>
                          ))}
                    </Select>
                    <Button
                      style={{ width: '15%' }}
                      loading={loading}
                      onClick={handleAddMember}
                      type="primary"
                    >
                      Add
                    </Button>
                  </Input.Group>
                </Form.Item>
              </Form>

              {filteredData.members &&
                filteredData.members.map((items: any) => (
                  <Row className="w-full mt-4" justify="space-between">
                    <Col>
                      <Avatar
                        key={items.id}
                        src={items.image ? items.image.fullPath : UnknownUserImage}
                        alt="user"
                      />
                      <Text className="ml-2">{items.name}</Text>
                    </Col>
                    <Col>
                      <Button
                        danger
                        type="text"
                        shape="circle"
                        onClick={() => handleConfirm(items)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Col>
                  </Row>
                ))}
            </Modal>
          </Row>

          <Row className="ml-2 mb-4 overflow-y-auto">
            {filteredData.members &&
              filteredData.members.map((items: any) => (
                <Link className="w-full" key={items.id} to={{ pathname: `/profile/${items.id}` }}>
                  <Row className="flex mx-0 my-1 p-2 cursor-pointer hover:bg-blue-100">
                    <Avatar
                      key={items.id}
                      src={items.image ? items.image.fullPath : UnknownUserImage}
                      alt="user"
                    />
                    <Text className="ml-4 text-lg">{items.name}</Text>
                  </Row>
                </Link>
              ))}
          </Row>
          <Row className="justify-center">
            {filteredData.isDone ? (
              <Button
                className="mr-2 w-full bg-green-400 hover:bg-green-500 border-none focus:bg-green-500"
                type="primary"
                onClick={onUnDoneClick}
              >
                {toggleLoading ? <LoadingOutlined /> : <CloseOutlined />}
                Mark as Undone
              </Button>
            ) : (
              <Button
                className="mr-2 w-full bg-red-400 hover:bg-red-500 border-none focus:bg-red-500"
                type="primary"
                onClick={onDoneClick}
              >
                {toggleLoading ? <LoadingOutlined /> : <CheckOutlined />}
                Mark as Done
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default TaskDetail
