import {
  BorderOutlined,
  CheckSquareOutlined,
  CommentOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Row, Skeleton, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import TaskOverlay from './TaskOverlay'

function TaskCard({ data, project }: any) {
  const { Text } = Typography

  const [modalVisible, setModalVisible] = useState(false)
  const [taskData, setTaskData]: any = useState({})

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

  return !taskData && !data ? (
    <Card>
      <Skeleton />
    </Card>
  ) : (
    <Card className="w-full rounded-lg shadow-md px-2 py-1 mb-4 cursor-pointer" onClick={openModal}>
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
            <Col className=" min-h-full overflow-y-scroll overflow-x-auto">
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#fff', backgroundColor: '#222', filter: 'brightness(0.6)' }}
              >
                {data.team.map((item: any) => (
                  <Tooltip title={item.name} placement="top">
                    <Avatar key={item.id} src={item.image} alt={item.name}></Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
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
