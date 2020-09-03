import { CheckCircleOutlined } from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import React from 'react'

function LogCard({ data }: any) {
  const { Text } = Typography

  return (
    <Card className="w-full rounded-lg shadow-md p-2">
      <div className="flex flex-col justify-center items-center">
        {data.map((item: any) => (
          <Row key={item.id} className="p-2 text-black justify-between w-full">
            <Col span={24} md={{ span: 12 }} className="w-full mr-2">
              <Row className="w-full">
                <CheckCircleOutlined
                  className="mr-2 py-1"
                  style={{ fontSize: 24, color: '#105EFC' }}
                />
                <Text className="text-lg">{new Date(item.time).toLocaleDateString()}</Text>

                <Text disabled className="mx-2 text-lg">
                  at
                </Text>
                <Text disabled className="text-lg">
                  {new Date(item.time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Row>
            </Col>
            <Col span={24} md={{ span: 11 }} className=" w-full">
              <Row className="justify-end">
                <Text className="text-lg"> {item.taskName + ','}</Text>
                <Text className="mx-2 text-lg">by</Text>
                {item.memberIds.map((team: any) => (
                  <Text key={team.id} className="font-bold text-lg mr-2">
                    {team.name}
                  </Text>
                ))}
              </Row>
            </Col>
          </Row>
        ))}
      </div>
    </Card>
  )
}

export default LogCard
