import { CheckCircleOutlined, RightOutlined, SyncOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Empty, Radio, Row, Tag, Typography } from 'antd'
import React from 'react'
import { LayoutProfile } from '../components/DashboardComponent'

function Profile() {
  const { Title, Text } = Typography
  const { Meta } = Card
  const projects = [
    {
      id: '1',
      projectName: 'Project #1',
      projectType: 'Web design',
      projectDetail: 'Commodo adipiscing ornare sit lorem sit tempus urna, vestibulum, neque.',
      projectImage: 'https://source.unsplash.com/600x600/?work',
      status: 'undone',
      team: [
        {
          id: '1',
          name: 'test 1',
          image: 'https://source.unsplash.com/600x600/?people',
        },
        {
          id: '2',
          name: 'test 2',
          image: 'https://source.unsplash.com/600x600/?people',
        },
        {
          id: '3',
          name: 'test 3',
          image: 'https://source.unsplash.com/600x600/?people',
        },
      ],
    },
    {
      id: '2',
      projectName: 'Project #2',
      projectType: 'Marketing',
      projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
      projectImage: 'https://source.unsplash.com/600x600/?work',
      status: 'done',
      team: [
        {
          id: '3',
          name: 'test 11',
          image: 'https://source.unsplash.com/600x600/?people',
        },
        {
          id: '4',
          name: 'test 12',
          image: 'https://source.unsplash.com/600x600/?people',
        },
      ],
    },
    {
      id: '3',
      projectName: 'Project #3',
      projectType: 'Marketing',
      projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
      projectImage: 'https://source.unsplash.com/600x600/?work',
      status: 'done',
      team: [
        {
          id: '3',
          name: 'test 11',
          image: 'https://source.unsplash.com/600x600/?people',
        },
        {
          id: '4',
          name: 'test 12',
          image: 'https://source.unsplash.com/600x600/?people',
        },
      ],
    },
    {
      id: '4',
      projectName: 'Project #4',
      projectType: 'Marketing',
      projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
      projectImage: 'https://source.unsplash.com/600x600/?work',
      status: 'done',
      team: [
        {
          id: '3',
          name: 'test 11',
          image: 'https://source.unsplash.com/600x600/?people',
        },
        {
          id: '4',
          name: 'test 12',
          image: 'https://source.unsplash.com/600x600/?people',
        },
      ],
    },
  ]

  return (
    <>
      <LayoutProfile>
        <Col className="mb-12">
          <Title level={3}>Today's task</Title>
          <Row gutter={16}>
            {projects ? (
              projects.map((value, index) => (
                <Col span={8} key={index}>
                  <Card
                    hoverable
                    title={value.projectName}
                    headStyle={{ fontWeight: 'bold' }}
                    bordered={false}
                  >
                    <Col className="flex flex-col">
                      <Text className="font-bold">{value.projectType}</Text>
                      <Text>{value.projectDetail.substr(0, 100) + '...'}</Text>
                    </Col>
                    <Row className="mt-6">
                      <Col span={13}>
                        <Text className="font-bold">Status</Text>
                      </Col>
                      <Col>
                        {value.status === 'done' ? (
                          <Tag
                            color="green"
                            className="rounded-full py-1 px-2"
                            icon={<CheckCircleOutlined className="animate-bounce" />}
                          >
                            <Text className="font-bold">Success</Text>
                          </Tag>
                        ) : (
                          <Tag
                            color="gold"
                            className="rounded-full py-1 px-2"
                            icon={<SyncOutlined spin />}
                          >
                            <Text className="font-bold">In Progress</Text>
                          </Tag>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Row>
        </Col>

        <Col>
          <Row className="mb-2">
            <Col flex={1}>
              <Row>
                <Title level={3}>Project(s)</Title>
                <Button
                  type="primary"
                  className="self-center"
                  icon={<RightOutlined className="-pt-8" />}
                  size="large"
                />
              </Row>
            </Col>
            <Col>
              <Radio.Group defaultValue="all" size="large">
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="undone">In progress</Radio.Button>
                <Radio.Button value="done">Closed</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={16}>
            {projects ? (
              projects.map((value, index) => (
                <Col span={8} key={index}>
                  <Card hoverable bordered={false} className="mb-4">
                    <Meta
                      avatar={<Avatar size={60} src={value.projectImage} />}
                      title={value.projectName}
                      description={`${value.projectType} | ...Tasks`}
                    />
                    <Text className="font-bold">Member(s)</Text>
                    <Row className="pl-16 mt-2">
                      {value
                        ? value.team.map((team, index) => (
                            <Avatar key={index} src={team.image} className="ml-2" alt={team.name} />
                          ))
                        : ''}
                    </Row>
                    <Row className="flex items-end justify-end mt-6">
                      <Col>
                        {value.status === 'done' ? (
                          <Tag
                            color="green"
                            className="rounded-full py-1 px-2"
                            icon={<CheckCircleOutlined className="animate-bounce" />}
                          >
                            <Text className="font-bold">Success</Text>
                          </Tag>
                        ) : (
                          <Tag
                            color="gold"
                            className="rounded-full py-1 px-2"
                            icon={<SyncOutlined spin />}
                          >
                            <Text className="font-bold">In Progress</Text>
                          </Tag>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Row>
        </Col>
      </LayoutProfile>
    </>
  )
}

export default Profile
