import { CheckCircleOutlined } from '@ant-design/icons'
import { Col, Divider, Row, Typography } from 'antd'
import React from 'react'

function LogList({ data }: any) {
  const { Text } = Typography

  return (
    <div className="flex flex-col justify-center items-center">
      {data.map((item: any) => (
        <Row key={item.id} className="p-2 text-black justify-between w-full">
          <Col span={24} className="w-full mr-2">
          <Text className="text-lg font-bold">{`Task ${item.taskName}`}</Text>
            <Divider />
          </Col>
          <Col span={24} md={{ span: 12 }} className="w-full mr-2">
            <Row className="w-full">
              <CheckCircleOutlined
                className="mr-2 py-1"
                style={{ fontSize: 24, color: '#105EFC' }}
              />
              <Text className="text-lg">{new Date(item.startTime).toLocaleDateString()}</Text>
              <Text disabled className="mx-2 text-lg">
                at
              </Text>
              <Text disabled className="text-lg">
                {new Date(item.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </Row>
          </Col>
          <Col span={24} md={{ span: 11 }} className=" w-full">
            <Row className="justify-end">
              <Text className="text-lg"> {`Create Task ,`}</Text>
              <Text className="mx-2 text-lg">by</Text>
              {item.members.map((member: any) => (
                <Text key={member.id} className="font-bold text-lg mr-2">
                  {member.name}
                </Text>
              ))}
            </Row>
          </Col>

          {item.comments.map((comment: any) => (
            <Row key={comment.id} className="p-2 text-black justify-between w-full">
              <Col span={24} md={{ span: 12 }} className="w-full mr-2">
                <Row className="w-full">
                  <CheckCircleOutlined
                    className="mr-2 py-1"
                    style={{ fontSize: 24, color: '#105EFC' }}
                  />
                  <Text className="text-lg">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </Text>
                  <Text disabled className="mx-2 text-lg">
                    at
                  </Text>
                  <Text disabled className="text-lg">
                    {new Date(comment.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </Row>
              </Col>
              <Col span={24} md={{ span: 11 }} className=" w-full">
                <Row className="justify-end">
                  <Text className="text-lg"> {`Comment`}</Text>
                  <Text className="mx-2 text-lg">by</Text>
                  <Text key={comment.user.id} className="font-bold text-lg mr-2">
                    {comment.user.name}
                  </Text>
                </Row>
              </Col>
            </Row>
          ))}
        </Row>
      ))}
    </div>
  )
}
export default LogList
