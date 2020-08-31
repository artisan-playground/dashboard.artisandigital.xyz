import { FundProjectionScreenOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Card, Col, Row, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PROJECT } from '../api'
import {
  LayoutDashboard,
  LoadingComponent,
  ProjectCard,
  WelcomeCard,
} from '../components/DashboardComponent'
import { TASK_DATA, USER_DATA } from '../DATA'
import '../styles/main.css'

function Dashboard() {
  const { Title, Text } = Typography
  const { loading, data } = useQuery(PROJECT)

  return (
    <LayoutDashboard>
      <div>
        <div className="font-bold text-2xl mb-4">Dashboard</div>
        <div className="site-card-wrapper">
          <Row gutter={[8, 24]}>
            <Col md={{ span: 24 }}>
              <WelcomeCard name="John Doe" project={2} task={4} />
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col lg={{ span: 8 }} className="w-full">
              <Link to="/projects">
                <Card hoverable className="min-w-full rounded-lg shadow-md">
                  <div className="flex flex-col justify-center items-center">
                    <FundProjectionScreenOutlined
                      style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }}
                    />
                    <Title level={2}>{data ? data.getProjects.length : 0}</Title>
                    <Text disabled className="text-lg -mt-4">
                      Projects
                    </Text>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col lg={{ span: 8 }} className="w-full">
              <Link to="/member">
                <Card hoverable className="min-w-full rounded-lg shadow-md">
                  <div className="flex flex-col justify-center items-center">
                    <TeamOutlined style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }} />
                    <Title level={2}>{USER_DATA.length}</Title>
                    <Text disabled className="text-lg -mt-4">
                      Paticipants
                    </Text>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col lg={{ span: 8 }} className="w-full">
              <Link to="/projects">
                <Card hoverable className="min-w-full rounded-lg shadow-md">
                  <div className="flex flex-col justify-center items-center">
                    <ProfileOutlined
                      style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }}
                    />
                    <Title level={2}>{TASK_DATA.length}</Title>
                    <Text disabled className="text-lg -mt-4">
                      Today's tasks
                    </Text>
                  </div>
                </Card>
              </Link>
            </Col>
          </Row>
          <Row gutter={[8, 24]}>
            {loading ? (
              <LoadingComponent project />
            ) : (
              data.getProjects
                .filter((filtered: any) => filtered.status === 'undone')
                .map((items: any, index: any) => {
                  return (
                    <Col lg={{ span: 24 }} key={index}>
                      <ProjectCard data={items} />
                    </Col>
                  )
                })
            )}
          </Row>
        </div>
      </div>
    </LayoutDashboard>
  )
}

export default Dashboard
