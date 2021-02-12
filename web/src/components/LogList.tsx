import { CheckCircleOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

function LogList({ data }: any) {
  const { Text } = Typography

  return (
    <div className="flex flex-col justify-center items-center">
      {data.map((item: any) => (
        <Row key={item.id} className="p-2 text-black justify-between w-full">
          <Col span={24} md={{ span: 12 }} className="w-full mr-2">
            <Row className="w-full">
              <CheckCircleOutlined className="mr-2 text-blue-700 text-xl" />
              <Text type="secondary">{dayjs(item.timestamp).format('DD/MMM/YYYY HH:mm')}</Text>
            </Row>
          </Col>
          <Col span={24} md={{ span: 11 }} className=" w-full">
            <Row className="justify-end">
              <Text>{item.message}</Text>
              <Text className="mx-2">by</Text>
              <Text className="font-bold">{item.user.name}</Text>
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  )
}
export default LogList
