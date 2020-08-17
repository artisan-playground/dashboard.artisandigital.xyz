import {
  BorderOutlined,
  CheckSquareOutlined,
  CommentOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Col, Row, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import TaskOverlay from './TaskOverlay'

function TaskCard({ data, project }: any) {
  const { Text } = Typography

  const [modalVisible, setModalVisible] = useState(false)

  function toggleModal() {
    setModalVisible(!modalVisible)
  }
  return (
    <Card className="w-full rounded-lg shadow-md px-2 py-1 mb-4" onClick={() => toggleModal()}>
      <TaskOverlay visible={modalVisible} data={data} project={project} />
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
            <Text disabled>{data.time.toLocaleTimeString()}</Text>
          </div>
        </div>

        <Col span={24}>
          <Text className="text-lg">{data.taskDetail}</Text>
        </Col>
        <Col span={24}>
          <Row className="justify-between">
            <Col>
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#fff', backgroundColor: '#222', filter: 'brightness(0.6)' }}
              >
                {data.team.map((item: any) => {
                  return (
                    <Avatar key={item.id} src={item.image} alt={item.name}>
                      <Tooltip title={item.src}></Tooltip>
                    </Avatar>
                  )
                })}
              </Avatar.Group>
            </Col>
            <Col className="flex items-center justify-end">
              {data.isDone ? (
                <CheckSquareOutlined style={{ fontSize: 24 }} />
              ) : (
                <BorderOutlined style={{ fontSize: 24 }} />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default TaskCard
