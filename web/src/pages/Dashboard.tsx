import { FundProjectionScreenOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Card, Col, Row, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PROJECT } from '../services/api/project'
import { TASKS } from '../services/api/task'
import { GET_USERS } from '../services/api/user'
import {
  LayoutDashboard,
  LoadingComponent,
  ProjectCard,
  WelcomeCard,
} from '../components/DashboardComponent'
import '../styles/main.css'
import { useStoreState } from '../store'

function Dashboard() {
  const { Title, Text } = Typography
  const { loading, data: projectData } = useQuery(PROJECT)
  const { data: taskData } = useQuery(TASKS)
  const { data: userData } = useQuery(GET_USERS)
  const user = useStoreState((s) => s.userState.user)

  function calProjects() {
    let num =
      !loading && projectData !== undefined
        ? projectData.projects.filter(
            (project: any) =>
              project.members.filter((member: any) => member.id === user?.id).length
          ).length
        : 0
    return num
  }

  return (
    <LayoutDashboard noCard>
      <div>
        <div className="site-card-wrapper">
          <Row gutter={[8, 24]}>
            <Col md={{ span: 24 }}>
              <WelcomeCard
                project={calProjects()}
                task={
                  taskData
                    ? taskData.tasks.filter(
                        (task: any) =>
                          task.isDone === false &&
                          task.members.filter((member: any) => member.id === user?.id).length
                      ).length
                    : 0
                }
              />
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col lg={{ span: 8 }} className="w-full">
              <Link to="/projects">
                <Card hoverable className="min-w-full rounded-lg">
                  <div className="flex flex-col justify-center items-center">
                    <FundProjectionScreenOutlined
                      style={{ color: '#105EFC', fontSize: '40px', marginBottom: 8 }}
                    />
                    <Title level={2}>
                      {projectData
                        ? projectData.projects.filter((project: any) =>
                            project.members.filter((member: any) => member.id === user?.id)
                          ).length
                        : 0}
                    </Title>
                    <Text disabled className="text-lg -mt-4">
                      Projects
                    </Text>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col lg={{ span: 8 }} className="w-full">
              <Link to="/member">
                <Card hoverable className="min-w-full rounded-lg">
                  <div className="flex flex-col justify-center items-center">
                    <TeamOutlined style={{ color: '#105EFC', fontSize: '40px', marginBottom: 8 }} />
                    <Title level={2}>{userData ? userData.users.length : 0}</Title>
                    <Text disabled className="text-lg -mt-4">
                      Paticipants
                    </Text>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col lg={{ span: 8 }} className="w-full">
              <Link to="/projects">
                <Card hoverable className="min-w-full rounded-lg">
                  <div className="flex flex-col justify-center items-center">
                    <ProfileOutlined
                      style={{ color: '#105EFC', fontSize: '40px', marginBottom: 8 }}
                    />
                    <Title level={2}>
                      {taskData
                        ? taskData.tasks.filter(
                            (task: any) =>
                              task.isDone === false &&
                              task.members.filter((member: any) => member.id === user?.id)
                                .length
                          ).length
                        : 0}
                    </Title>
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
              <LoadingComponent projects />
            ) : (
              projectData &&
              projectData.projects
                .filter(
                  (filtered: any) =>
                    filtered.members.filter((member: any) => member.id === user?.id).length
                )
                .map((items: any, index: any) => {
                  return (
                    <Col md={{ span: 24 }} key={index}>
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
