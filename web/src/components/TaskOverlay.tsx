import {
  ClockCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  FundProjectionScreenOutlined,
  PaperClipOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Col, Modal, Row, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { Link } from 'react-router-dom'

function TaskOverlay({ data, project, visible }: any) {
  const { Text } = Typography

  function hideModal() {}

  return (
    <Modal
      visible={visible}
      onCancel={hideModal}
      bodyStyle={{
        borderRadius: 120,
        paddingTop: 56,
        paddingLeft: 24,
        paddingRight: 24,
      }}
      style={{
        borderRadius: 120,
      }}
      width={'80%'}
      closeIcon={<CloseCircleOutlined style={{ color: 'red', fontSize: 24 }} />}
    >
      <Text className="absolute top-0 left-0 text-2xl font-bold mt-4 ml-4">{data.taskName}</Text>
      <Row className="py-4">
        <Col span={24} lg={{ span: 18 }} className="pl-2 pr-2 pt-2 border-r-2">
          <Row>
            <Text className="text-lg pl-2 mb-2">{data.taskDetail}</Text>
          </Row>
          <Row className="items-center">
            <PaperClipOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
            <Text className="text-lg font-bold">Clipboard</Text>
          </Row>
          <Row className="items-center">
            <CommentOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
            <Text className="text-lg font-bold">Comment</Text>
          </Row>
        </Col>
        <Col span={24} lg={{ span: 6 }} className="pl-2">
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
          <Row className="ml-2">
            {data.team.map((items: any) => {
              return (
                <Link key={items.id} to={{ pathname: '/profile', state: { profileId: items.id } }}>
                  <div className="flex mx-0 my-1 p-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
                    <Avatar key={items.id} src={items.image} alt={items.name} />
                    <div className="ml-4 text-lg">{items.name}</div>
                  </div>
                </Link>
              )
            })}
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default TaskOverlay
