import { Avatar, Card, Col, Row, Tag, Tooltip, Typography } from 'antd'
import React from 'react'

function EventCard({ data }: any) {
  const { Text } = Typography
  console.log('data', data)
  return !data ? (
    <div>
      <Text disabled>No nearly event</Text>
    </div>
  ) : (
    data.map((item: any) => (
      <Card hoverable className="w-full rounded-lg shadow-lg mb-4">
        <Row className="md: justify-around">
          <div className="flex flex-col justify-center items-center border-r-2 pr-8 pl-4">
            <Text disabled className="font-bold text-lg">
              {item.eventDate.toLocaleDateString('en-US', {
                weekday: 'short',
              })}
              <br />
            </Text>
            <Text className="font-bold text-2xl">
              {item.eventDate.toLocaleDateString('en-US', {
                day: 'numeric',
              })}
            </Text>
            <br />
            <Text disabled className="font-bold text-md -mt-4">
              {item.eventDate.toLocaleDateString('en-US', {
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
              <Tag className="rounded-full py-1 px-2 bg-progressop border-0 flex items-center">
                <Text className="font-bold">{item.tag}</Text>
              </Tag>
            </Row>
            <Row className="absolute bottom-0 right-0">
              <Avatar.Group
                maxCount={4}
                maxStyle={{ color: '#fff', backgroundColor: '#222', filter: 'brightness(0.6)' }}
              >
                {item.invited.map((item: any) => (
                  <Tooltip title={item.name} placement="top">
                    <Avatar key={item.id} src={item.image} alt={item.name}></Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </Row>
          </Col>
        </Row>
      </Card>
    ))
  )
}

export default EventCard
