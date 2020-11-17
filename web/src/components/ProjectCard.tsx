import { CheckCircleOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons'
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
            <Link to={{ pathname: `/profile/${item[i].id}` }}>
              <Tooltip placement="top" title={item[i].name}>
                {item[i].image ? (
                  <Avatar
                    key={item[i].id}
                    src={item[i].image ? item[i].image.fullPath : null}
                    className="ml-2 cursor-pointer bg-gray-300 shadow-lg"
                    alt={item[i].name}
                  />
                ) : (
                  <Avatar
                    key={item[i].id}
                    icon={<UserOutlined />}
                    className="ml-2 cursor-pointer bg-gray-300 shadow-lg bg-primary flex items-center justify-center"
                    alt={item[i].name}
                  />
                )}
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
                {item[3].image ? (
                  <Avatar
                    src={item[3].image ? item[3].image.fullPath : null}
                    className="ml-2 bg-black flex justify-center items-center cursor-pointer z-0 shadow-lg"
                  />
                ) : (
                  <Avatar
                    icon={<UserOutlined />}
                    className="ml-2 cursor-pointer bg-gray-300 shadow-lg bg-primary flex items-center justify-center"
                  />
                )}
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
              <Avatar key={items.id} src={items.image.fullPath} className="ml-2" alt={items.name} />
              <div className="ml-4 text-base">{items.name}</div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <Link to={{ pathname: `/projects/${data.id}` }}>
      <>
        <Card hoverable className="min-w-full rounded-lg">
          <Row gutter={[8, 8]} className="w-full">
            <Col span={24}>
              <Row className="flex justify-between">
                <Title level={4} className="font-bold">
                  {data.projectName}
                </Title>
                <div>
                  {data.status === 'done' ? (
                    <Tag
                      className="rounded-full py-1 px-2 bg-successop border-0 flex items-center"
                      icon={<CheckCircleOutlined />}
                    >
                      <Text className="font-bold">Done</Text>
                    </Tag>
                  ) : (
                    <Tag
                      className="rounded-full py-1 px-2 bg-progressop border-0 flex items-center"
                      icon={<SyncOutlined />}
                    >
                      <Text className="font-bold">In Progress</Text>
                    </Tag>
                  )}
                </div>
              </Row>
              <Text disabled className="text-md -">
                {data.projectType}
              </Text>
              <Row>
                <Col span={24} lg={{ span: 16 }}>
                  <div className="mt-4">
                    <Text className="text-lg">{data.projectDetail.split('.', 1)}</Text>
                  </div>
                </Col>
                <Col span={24} lg={{ span: 8 }}>
                  <div className="items-end">
                    <Row className="justify-end items-end">{renderShowItems(data.members)}</Row>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </>
    </Link>
  )
}

export default ProjectCard
