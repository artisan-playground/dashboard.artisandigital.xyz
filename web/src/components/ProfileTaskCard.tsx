import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Card, Col, Row, Tag, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function ProfileTaskCard({ data }: any) {
  const { Text } = Typography

  return (
    <Link
      to={{
        pathname: `/projects/${data.project.id}`,
        state:{data:data.project}
      }}
    >
      <Card
        hoverable
        title={data.taskName}
        headStyle={{ fontWeight: 'bold' }}
        bordered={false}
      >
        <Col className="flex flex-col">
          <Text>{data.taskDetail.substr(0, 50) + '...'}</Text>
        </Col>
        <Row className="flex items-end justify-end mt-6">
          <Col>
            {data.isDone === true ? (
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

export default ProfileTaskCard
