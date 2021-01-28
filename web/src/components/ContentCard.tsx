import { Avatar, Card, Col, Row, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import parse from 'html-react-parser'
import React from 'react'
import { Link } from 'react-router-dom'
import UnknownImage from '../assets/images/unknown_user.png'

function ContentCard({ data }: any) {
  const { Paragraph, Text } = Typography
  dayjs.extend(LocalizedFormat)

  return (
    <Link to={{ pathname: `/content/${data.id}` }}>
      <Card
        hoverable
        className="min-w-full"
        cover={
          <>
            <Row justify="space-between" className="p-2 flex items-center">
              <Col>
                <Avatar
                  src={data.user.image ? data.user.image.fullPath : UnknownImage}
                  alt="user"
                />
                <Text className="ml-2 font-bold text-blue-700">{data.user.name}</Text>
              </Col>
              <Col>
                <Text type="secondary">{dayjs(data.timestamp).format('DD MMM YYYY LT')}</Text>
              </Col>
            </Row>
            <img src={data.contentImage[0].fullPath} className="object-cover h-48" alt="user" />
          </>
        }
      >
        <Row className="w-full">
          <Col xs={24}>
            <Space direction="vertical" size={2} className="w-full">
              <Text className="font-bold">{data.subject}</Text>
              <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                {parse(data.content)}
              </Paragraph>
            </Space>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default ContentCard
