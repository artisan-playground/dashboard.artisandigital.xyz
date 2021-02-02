import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Row, Space, Tag, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import UnknownUserImage from '../assets/images/unknown_user.png'

function ProjectCard({ data }: any) {
  const { Text } = Typography
  const showItems: any[] = []

  function renderShowItems(item: any) {
    for (let i = 0; i < item.length; ++i) {
      if (i < 3) {
        showItems.push(
          <Row key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Avatar
              key={item[i].id}
              src={item[i].image ? item[i].image.fullPath : UnknownUserImage}
              className="ml-2 cursor-pointer bg-gray-300 shadow-lg"
              alt={item[i].name}
            />
          </Row>
        )
      } else {
        showItems.push(
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Col className="w-full">
              <Col
                className="absolute mx-1 left-0 right-0 w-full text-center text-white font-bold z-10"
                style={{ marginTop: 6 }}
              >
                +{item.length - 3}
              </Col>
              <Avatar
                src={item[3].image ? item[3].image.fullPath : null}
                className="ml-2 bg-black flex justify-center items-center cursor-pointer z-0 shadow-lg"
                style={{ filter: 'brightness(0.6)' }}
              />
            </Col>
          </Col>
        )
        break
      }
    }
    return showItems
  }

  return (
    <Link to={{ pathname: `/projects/${data.id}` }}>
      <Card
        hoverable
        className="min-w-full mb-4"
        cover={
          <img src={data.projectImage.fullPath} className="object-cover h-48" alt="project-image" />
        }
      >
        <Row className="w-full">
          <Col xs={24}>
            <Row justify="space-between">
              <Col xs={18}>
                <Space direction="vertical" size={2}>
                  <Text className="font-bold">{data.projectName}</Text>
                  <Text type="secondary">{data.projectType}</Text>
                </Space>
              </Col>
              <Col xs={6} className="flex justify-end">
                {data.status === 'done' ? (
                  <Tag color="green" icon={<CheckCircleOutlined />} className="h-6">
                    Done
                  </Tag>
                ) : (
                  <Tag color="red" icon={<WarningOutlined />} className="h-6">
                    WIP
                  </Tag>
                )}
              </Col>
            </Row>

            <Row className="my-2">
              <Col xs={24} lg={16}>
                <Text>{data.projectDetail}</Text>
              </Col>
            </Row>
            <Row className="w-full" justify="end">
              {renderShowItems(data.members)}
            </Row>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default ProjectCard
