import { FundProjectionScreenOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import React from 'react'
import { LayoutDashboard, ProjectCard, WelcomeCard } from '../components/DashboardComponent'
import '../styles/main.css'

function Dashboard() {
  const { Title, Text } = Typography

  const data = [
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
    <LayoutDashboard>
      <div>
        <div className="font-bold text-2xl mb-4">Dashboard</div>
        <div className="site-card-wrapper">
          <Row gutter={[8, 24]}>
            <Col md={{ span: 24 }}>
              <WelcomeCard name="John" project={2} task={4} />
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col lg={{ span: 8 }}>
              <Card className="min-w-full rounded-lg shadow-md">
                <div className="flex flex-col justify-center items-center">
                  <FundProjectionScreenOutlined
                    style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }}
                  />
                  <Title level={2}>123</Title>
                  <Text disabled className="text-lg -mt-4">
                    Projects
                  </Text>
                </div>
              </Card>
            </Col>
            <Col lg={{ span: 8 }}>
              <Card className="min-w-full rounded-lg shadow-md">
                <div className="flex flex-col justify-center items-center">
                  <TeamOutlined style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }} />
                  <Title level={2}>45</Title>
                  <Text disabled className="text-lg -mt-4">
                    Paticipants
                  </Text>
                </div>
              </Card>
            </Col>
            <Col lg={{ span: 8 }}>
              <Card className="min-w-full rounded-lg shadow-md">
                <div className="flex flex-col justify-center items-center">
                  <ProfileOutlined
                    style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }}
                  />
                  <Title level={2}>67</Title>
                  <Text disabled className="text-lg -mt-4">
                    Today's tasks
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter={[8, 24]}>
            {data.map((items) => {
              return (
                <Col lg={{ span: 24 }}>
                  <ProjectCard data={items} />
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </LayoutDashboard>
  )
}

export default Dashboard
