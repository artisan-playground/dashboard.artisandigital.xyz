import {
  BorderOutlined,
  CheckSquareOutlined,
  CommentOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Popover, Row, Skeleton, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TaskOverlay from './TaskOverlay'

function TaskCard({ data, project }: any) {
  const { Text } = Typography

  const [modalVisible, setModalVisible] = useState(false)
  const [taskData, setTaskData]: any = useState({})
  const showItems: any[] = []
  useEffect(() => {
    setTaskData(data)
  }, [data])

  function toggleModal() {
    setModalVisible(false)
  }

  function openModal() {
    setModalVisible(true)
  }

  function onDoneClick(event: any) {
    event.stopPropagation()
    if (taskData) setTaskData({ ...taskData, isDone: !taskData.isDone })
  }

  function renderShowItems(item: any) {
    for (let i = 0; i < item.length; ++i) {
      if (i < 3) {
        showItems.push(
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Link to={{ pathname: '/profile', state: { profileId: item[i].id } }}>
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
          <Link key={items.id} to={{ pathname: '/profile', state: { profileId: items.id } }}>
            <div className="flex mx-1 my-1 p-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
              <Avatar key={items.id} src={items.image} className="ml-2" alt={items.name} />
              <div className="ml-4 text-lg">{items.name}</div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return !taskData && !data ? (
    <Card>
      <Skeleton />
    </Card>
  ) : (
    <Card
      hoverable
      className="w-full rounded-lg shadow-md px-2 py-1 mb-4 cursor-pointer"
      onClick={openModal}
    >
      <TaskOverlay
        onCloseModal={toggleModal}
        visible={modalVisible}
        data={taskData}
        project={project}
      />
      <Row gutter={[8, 16]}>
        <div className="flex flex-col col-12 items-start justify-center">
          <div className="flex flex-row items-center">
            <Text className="font-bold text-xl">{data.taskName}</Text>
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
          </div>
          <div className="flex flex-row">
            <Text disabled>{data.time.toLocaleTimeString() || '...'}</Text>
          </div>
        </div>

        <Col span={24}>
          <Text className="text-lg">{data.taskDetail}</Text>
        </Col>
        <Col span={24}>
          <Row className="justify-between">
            <Col className=" min-h-full">
              <Row className="justify-end items-end">{renderShowItems(data.team)}</Row>
            </Col>
            <Col className="absolute bottom-0 right-0 flex items-center justify-end">
              {taskData.isDone ? (
                <Button
                  className="flex items-center justify-center"
                  type="text"
                  shape="circle"
                  size="large"
                  onClick={onDoneClick}
                >
                  <CheckSquareOutlined style={{ fontSize: 24 }} />
                </Button>
              ) : (
                <Button
                  className="flex items-center justify-center"
                  type="text"
                  shape="circle"
                  size="large"
                  onClick={onDoneClick}
                >
                  <BorderOutlined style={{ fontSize: 24 }} />
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default TaskCard
