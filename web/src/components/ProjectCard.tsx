import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Row, Tag, Typography } from 'antd'
import React from 'react'
const { Title, Text } = Typography
function ProjectCard({ data }: any) {
  return (
    <Card className="w-full rounded-lg">
      <div className="absolute right-0 top-0 mt-4 mr-4">
        {data.status === 'done' ? (
          <Tag className="rounded-full py-1 px-2" icon={<CheckCircleOutlined />} color="success">
            success
          </Tag>
        ) : (
          <Tag className="rounded-full py-1 px-2" icon={<SyncOutlined spin />} color="processing">
            processing
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
          <div className="absolute bottom-0 right-0 mb-4 br-4">
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
