import {
  BorderOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  FundProjectionScreenOutlined,
  PaperClipOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Button, Col, Modal, Row, Skeleton, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
//@ts-ignore
import ItemsCarousel from 'react-items-carousel'
import { Link } from 'react-router-dom'

function TaskOverlay({ data, project, visible, onCloseModal }: any) {
  const { Text } = Typography

  const [taskData, setTaskData]: any = useState({})
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setTaskData(data)
  }, [data])

  useEffect(() => {
    setModalVisible(visible)
  }, [visible])

  function onDoneClick() {
    let tempData = { ...data }
    setTaskData({ ...tempData, isDone: !tempData.isDone })
  }

  function onCancleClick(event: any) {
    event.stopPropagation()
    setModalVisible(false)
    onCloseModal()
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
            <Text className="text-lg pl-2 mb-2">{taskData.taskDetail}</Text>
          </Row>
          <Row className="items-center">
            <PaperClipOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
            <Text className="text-lg font-bold">Clipboard</Text>
          </Row>
          <Row className="py-2 px-2">
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={4}
              gutter={8}
              leftChevron={<Button type="primary">{'<'}</Button>}
              rightChevron={<Button type="primary">{'>'}</Button>}
              chevronWidth={24}
            >
              <div style={{ height: 180, background: '#EEE', width: 180 }}>First card</div>
              <div style={{ height: 180, background: '#EEE', width: 180 }}>Second card</div>
              <div style={{ height: 180, background: '#EEE', width: 180 }}>Third card</div>
              <div style={{ height: 180, background: '#EEE', width: 180 }}>Fourth card</div>
            </ItemsCarousel>
          </Row>
          <Row className="items-center">
            <CommentOutlined className="mr-2" style={{ color: '#105EFC', fontSize: 24 }} />
            <Text className="text-lg font-bold">Comment</Text>
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
          <Row className="ml-2 overflow-y-scroll">
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
