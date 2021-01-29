import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Popover, Row, Space, Tag, Tooltip, Typography } from 'antd'
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
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Link to={{ pathname: `/profile/${item[i].id}` }}>
              <Tooltip placement="top" title={item[i].name}>
                <Avatar
                  key={item[i].id}
                  src={item[i].image ? item[i].image.fullPath : UnknownUserImage}
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
                  src={item[3].image ? item[3].image.fullPath : null}
                  className="ml-2 bg-black flex justify-center items-center cursor-pointer z-0 shadow-lg"
                />
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
              <Avatar
                key={items.id}
                src={items.image ? items.image.fullPath : UnknownUserImage}
                className="ml-2"
                alt={items.name}
              />
              <div className="ml-4 text-base">{items.name}</div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <Link to={{ pathname: `/projects/${data.id}` }}>
      <Card
        hoverable
        className="min-w-full"
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
              <Col xs={6}>
                {data.status === 'done' ? (
                  <Tag color="green" icon={<CheckCircleOutlined />}>
                    Done
                  </Tag>
                ) : (
                  <Tag color="red" icon={<WarningOutlined />}>
                    WIP
                  </Tag>
                )}
              </Col>
            </Row>

            <Row className="mt-2">
              <Col xs={24} lg={16}>
                <Text>{data.projectDetail}</Text>
              </Col>
              <Col xs={24} lg={8}>
                <Row className="flex justify-end items-end">{renderShowItems(data.members)}</Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default ProjectCard
