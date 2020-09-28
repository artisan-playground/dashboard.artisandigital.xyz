import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Popover, Row, Tag, Tooltip, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { Link } from 'react-router-dom'

function ProfileProjectCard({ data }: any) {
  const { Text } = Typography
  const showItems: any[] = []

  function renderShowItems(item: any) {
    for (let i = 0; i < item.length; ++i) {
      if (i < 4) {
        showItems.push(
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Link to={{ pathname: `/profile/${item[i].user.name}`, state: { data: data } }}>
              <Tooltip placement="top" title={item[i].user.name}>
                <Avatar
                  key={item[i].user.id}
                  src={item[i].user.image}
                  className="ml-2 cursor-pointer bg-gray-300 shadow-lg"
                  alt={item[i].user.name}
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
                  +{item.length - 4}
                </div>
                <Avatar
                  src={item[4].user.image}
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
            <Link
              key={items.user.id}
              to={{ pathname: `/profile/${items.user.name}`, state: { data: items.user } }}
            >
              <div className="flex mx-1 my-1 p-1 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
                <Avatar key={items.user.id} src={items.user.image} className="ml-2" alt={items.user.name} />
                <div className="ml-4">{items.user.name}</div>
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
        pathname: `/projects/${data.project.id}`,
        state: {
          data: data,
        },
      }}
    >
      <Card hoverable bordered={false}>
        <Meta
          avatar={<Avatar size={60} src={data.project.projectImage} />}
          title={data.project.projectName}
          description={`${data.project.projectType} | ...Tasks`}
        />
        <Text className="font-bold">Member(s)</Text>
        <Row className="pl-16 mt-2">{renderShowItems(data.project.members)}</Row>
        <Row className="flex items-end justify-end mt-6">
          <Col>
            {data.project.status === 'done' ? (
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
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default ProfileProjectCard
