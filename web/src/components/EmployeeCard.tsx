import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import UnknownImage from '../assets/images/unknown_user.png'

function EmployeeCard({ data }: any) {
  const { Text } = Typography

  return (
    <Link to={{ pathname: `/profile/${data.id}` }}>
      <Card
        hoverable
        className="min-w-full"
        cover={
          <Row className="bg-blue-100 w-full py-4 relative">
            <Col xs={24}>
              <Space direction="vertical" size={2} className="flex items-center justify-center">
                <Avatar
                  src={data.image ? data.image.fullPath : UnknownImage}
                  alt="user"
                  className="mr-2"
                  size={120}
                />
                <Text className="font-bold text-blue-700">{data.name}</Text>
                <Text>{data.position}</Text>
              </Space>
            </Col>
            <Button
              className="absolute top-0 right-0 flex items-center justify-center text-blue-700 hover:text-blue-700 transition duration-200 ease-in border-none"
              type="text"
              shape="circle"
            >
              <EditOutlined />
            </Button>
          </Row>
        }
      >
        <Row>
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={1}>
              <Text>{`Email: ${data.email ? data.email : '-'}`}</Text>
              <Text>{`Department: ${data.department ? data.department : '-'}`}</Text>
              <Text>{`Full-time/Intern: ${data.type ? data.type : '-'}`}</Text>
              <Text>{`Telephone: ${data.phone ? data.phone : '-'}`}</Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default EmployeeCard
