import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Popover, Row, Tag, Tooltip, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({ data }: any) {
  const { Title, Text } = Typography
  const showItems: any[] = []

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
        {item.map((items: any) => {
          return (
            <Link key={items.id} to={{ pathname: '/profile', state: { profileId: items.id } }}>
              <div className="flex mx-1 my-1 p-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
                <Avatar key={items.id} src={items.image} className="ml-2" alt={items.name} />
                <div className="ml-4 text-lg">{items.name}</div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <Link
      to={{
        pathname: `/projects/${data.id}`,
        state: {
          data: data,
        },
      }}
    >
      <Card className="w-full rounded-lg shadow-md">
        <div className="absolute right-0 top-0 mt-8 mr-12">
          {data.status === 'done' ? (
            <Tag
              className="rounded-full py-1 px-2 bg-successop"
              icon={<CheckCircleOutlined className="animate-bounce" />}
            >
              <Text className="font-bold">success</Text>
            </Tag>
          ) : (
            <Tag className="rounded-full py-1 px-2 bg-progressop " icon={<SyncOutlined spin />}>
              <Text className="font-bold"> In Progress</Text>
            </Tag>
          )}
        </div>
        <Row gutter={[48, 8]} className="w-full">
          <Col span={16}>
            <Title level={3}>{data.projectName}</Title>
            <Text disabled className="text-md -">
              {data.projectType}
            </Text>
            <div className="mt-4">
              <Text className="text-xl">{data.projectDetail.split('.', 1)}</Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="absolute bottom-0 right-0 mb-2 mr-2 ">
              <Row className="justify-end items-end">{renderShowItems(data.team)}</Row>
            </div>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default ProjectCard
