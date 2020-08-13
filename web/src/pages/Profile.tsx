import { CheckCircleOutlined, RightOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Card, Col, Empty, Radio, Row, Tag, Typography } from 'antd'
import React from 'react'
import { LayoutProfile } from '../components/DashboardComponent'

function Profile() {
  const { Title, Text } = Typography
  const projects = [
    {
      id: '1',
      projectName: 'Project #1',
      projectType: 'Web design',
      ProjectDetail: 'Commodo adipiscing ornare sit lorem sit tempus urna, vestibulum, neque.',
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
      ProjectDetail: 'Consequat tempus nisi, orci, ligula duis.',
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
                      <Text>{value.ProjectDetail.substr(0, 100) + '...'}</Text>
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
              <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="a">All</Radio.Button>
                <Radio.Button value="b">In progress</Radio.Button>
                <Radio.Button value="c">Closed</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </Col>
      </LayoutProfile>
    </>
  )
}

export default Profile
