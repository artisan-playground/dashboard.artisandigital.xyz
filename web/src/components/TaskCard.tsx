import {
  CheckCircleOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  PaperClipOutlined,
  MoreOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Menu,
  Modal,
  Popover,
  Row,
  Tooltip,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TOGGLE_TASK_DONE } from '../services/api/task'
import LoadingComponent from './LoadingComponent'
import TaskOverlay from './TaskOverlay'

function TaskCard({ data, project, refetch }: any) {
  const { Text } = Typography
  const showItems: any[] = []
  const [modalVisible, setModalVisible] = useState(false)
  const [taskData, setTaskData]: any = useState({})
  const [toggleIsDone, { loading }] = useMutation(TOGGLE_TASK_DONE)
  const [isDone] = useState(false)
  const [isHovering, setIsHovering]: any = useState(false)
  const { confirm } = Modal

  useEffect(() => {
    setTaskData(data)
  }, [data])

  function toggleModal() {
    refetch()
    setModalVisible(false)
  }

  function openModal() {
    setModalVisible(true)
  }

  function onUnDoneClick() {
    toggleIsDone({ variables: { id: data.id, isDone: isDone } })
    refetch()
  }

  function onDoneClick() {
    toggleIsDone({ variables: { id: data.id, isDone: !isDone } })
    refetch()
  }

  function renderShowItems(item: any) {
    for (let i = 0; i < item.length; ++i) {
      if (i < 3) {
        showItems.push(
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Link to={{ pathname: `/profile/${item[i].id}` }}>
              <Tooltip placement="top" title={item[i].name}>
                <Avatar
                  key={item[i].id}
                  src={item[i].image}
                  className="ml-2 cursor-pointer bg-gray-300 shadow-lg"
                  alt={item[i].name}
                />
              </Tooltip>
            </Link>
          </Col>
        )
      } else {
        showItems.push(
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Popover content={renderAllMember(item)} title="Team" trigger="hover">
              <div>
                <div
                  className="absolute mx-1 left-0 right-0 w-full text-center text-white font-bold z-10"
                  style={{ marginTop: 6 }}
                >
                  +{item.length - 3}
                </div>
                <Avatar
                  src={item[3].image}
                  className="ml-2 bg-black flex justify-center items-center cursor-pointer z-0 shadow-lg"
                  style={{ filter: 'brightness(0.6)' }}
                ></Avatar>
              </div>
            </Popover>
          </Col>
        )
        break
      }
    }
    return showItems
  }

  function renderAllMember(item: any) {
    return (
      <div>
        {item.map((items: any) => (
          <Link key={items.id} to={{ pathname: `/profile/${item.id}` }}>
            <div className="flex mx-1 my-1 p-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
              <Avatar key={items.id} src={items.image} className="ml-2" alt={items.name} />
              <div className="ml-4 text-lg">{items.name}</div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  function menu() {
    return (
      <Menu>
        <Menu.Item
          icon={<DeleteOutlined />}
          className="flex flex-row px-4 items-center text-red-400 hover:bg-red-400 hover:text-white"
          onClick={() => {
            confirm({
              title: 'Are you sure to delete this task?',
              icon: <ExclamationCircleOutlined />,
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
            })
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    )
  }

  return loading || !taskData ? (
    <LoadingComponent task />
  ) : (
    <Card
      hoverable
      className="w-full rounded-lg px-2 py-1 mb-4 cursor-pointer"
      onClick={openModal}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <TaskOverlay
        onCloseModal={toggleModal}
        visible={modalVisible}
        data={taskData}
        project={project}
        refetch={refetch}
      />
      <Row gutter={[8, 16]}>
        <Row className="flex items-start justify-center">
          <Col>
            <Row className="flex items-center w-full">
              <Row className="flex items-center space-between">
                <Text className="font-bold text-xl ml-2">{data.taskName}</Text>
                {data.files.length !== 0 ? (
                  <PaperClipOutlined className="ml-2 text-gray-500" />
                ) : (
                  <div />
                )}
                {data.comments.length !== 0 ? (
                  <CommentOutlined className="ml-2 text-gray-500" />
                ) : (
                  <div />
                )}

                <div>
                  {isHovering ? (
                    <Dropdown overlay={menu} className="flex justify-end items-end">
                      <Button
                        type="text"
                        shape="circle"
                        icon={<MoreOutlined />}
                        className="flex items-center justify-center"
                      />
                    </Dropdown>
                  ) : (
                    ''
                  )}
                </div>
              </Row>
            </Row>
            <Col className="ml-2">
              {data.endTime ? (
                <Text disabled>
                  {new Date(data.startTime || 0).toLocaleDateString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  -{' '}
                  {new Date(data.endTime || 0).toLocaleDateString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              ) : (
                <Text disabled>
                  {new Date(data.startTime || 0).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              )}
            </Col>
          </Col>
        </Row>

        <Col span={24}>
          <Text className="text-lg">{data.taskDetail}</Text>
        </Col>
        <Col span={24}>
          <Row className="justify-between">
            <Col className=" min-h-full">
              <Row className="justify-end items-end">{renderShowItems(data.members)}</Row>
            </Col>

            <Row className="flex items-center justify-center">
              {taskData.isDone ? (
                <Button
                  className="flex items-center justify-center shadow-md hover:shadow-lg bg-green-400 focus:bg-green-600 hover:bg-red-600 transition duration-800 ease-in border-0 w-24"
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={onUnDoneClick}
                >
                  <CheckCircleOutlined className="hover:hidden" />
                  <Text className="hover:block hidden text-white">Done</Text>
                </Button>
              ) : (
                <Button
                  className="flex items-center justify-center shadow-md hover:shadow-lg bg-red-400 focus:bg-red-600 hover:bg-green-600 transition duration-800 ease-in border-0 w-24"
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={onDoneClick}
                >
                  <ExclamationCircleOutlined />
                  <Text className="hover:hidden text-white">WIP</Text>
                </Button>
              )}
            </Row>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default TaskCard
