import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Row, Tag, Typography } from 'antd'
import React from 'react'
function ProjectCard({ data }: any) {
  const { Title, Text } = Typography

  return (
    <Card className="w-full rounded-lg shadow-md">
      <div className="absolute right-0 top-0 mt-8 mr-4">
        {data.status === 'done' ? (
          <Tag
            className="rounded-full py-1 px-2 bg-successop"
            icon={<CheckCircleOutlined className="animate-bounce" />}
          >
            <Text className="font-bold">success</Text>
          </Tag>
        ) : (
          <Tag className="rounded-full py-1 px-2 bg-progressop " icon={<SyncOutlined spin />}>
            <Text className="font-bold"> In Progress</Text>
          </Tag>
        )}
      </div>
      <Row>
        <Col span={16}>
          <Title level={3}>{data.projectName}</Title>
          <Text disabled className="text-md -">
            {data.projectType}
          </Text>
          <div className="mt-4">
            <Text className="text-xl">{data.ProjectDetail}</Text>
          </div>
        </Col>
        <Col span={8}>
          <div className="absolute bottom-0 right-0 mb-2 mr-2">
            {data.team.map((item: any) => {
              return <Avatar src={item.image} className="ml-2" alt={item.name} />
            })}
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default ProjectCard
