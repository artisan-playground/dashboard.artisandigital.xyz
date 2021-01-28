import { BookOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Empty, Row, Tag, Tooltip, Typography } from 'antd'
import React from 'react'
import UnknownUserImage from '../assets/images/unknown_user.png'

function EventCard({ data }: any) {
  const { Text } = Typography

  return !data ? (
    <Col xs={24} className="flex items-center justify-center text-center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<Text disabled>No Nearly Event</Text>}
      />
    </Col>
  ) : (
    data.events.map(
      (item: any) =>
        new Date(item.endDate).toLocaleDateString('en-US') >
          new Date().toLocaleDateString('en-US') && (
          <Card hoverable className="w-full mb-4" key={item.id}>
            <Row className="md: justify-around">
              <div className="flex flex-col justify-center items-center border-r-2 pr-8 pl-4">
                <Text disabled className="font-bold text-lg">
                  {new Date(item.eventDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                  <br />
                </Text>
                <Text className="font-bold text-2xl">
                  {new Date(item.eventDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                  })}
                </Text>
                <br />
                <Text disabled className="font-bold text-md -mt-4">
                  {new Date(item.eventDate).toLocaleDateString('en-US', {
                    month: 'short',
                  })}
                </Text>
              </div>

              <Col span={16} className="items-center justify-center mt-4 md:mt-0">
                <Text className="font-bold text-lg">{item.eventName}</Text>
                <br />
                <Text className="text-md ml-2">{item.note}</Text>
              </Col>

              <Col span={24} md={{ span: 4 }} className="w-full mt-4 md:mt-0 ">
                <Row className="justify-start md:justify-end">
                  <Tag color="gold" icon={<BookOutlined />}>
                    {item.tag}
                  </Tag>
                </Row>
                <Row className="absolute bottom-0 right-0">
                  <Avatar.Group
                    maxCount={4}
                    maxStyle={{ color: '#fff', backgroundColor: '#222', filter: 'brightness(0.6)' }}
                  >
                    {item.invited.map((item: any) => (
                      <Tooltip title={item.name} placement="top">
                        <Avatar
                          key={item.id}
                          src={item.image ? item.image.fullPath : UnknownUserImage}
                          alt={item.name}
                        ></Avatar>
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </Row>
              </Col>
            </Row>
          </Card>
        )
    )
  )
}

export default EventCard
