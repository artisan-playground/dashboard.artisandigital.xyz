import { FundProjectionScreenOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Avatar, Card, Col, List, Row, Typography } from 'antd'
import { Axis, Chart, Coordinate, Interaction, Interval, Tooltip } from 'bizcharts'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, LoadingComponent, WelcomeCard } from '../components/DashboardComponent'
import { PROJECT } from '../services/api/project'
import { TASKS } from '../services/api/task'
import { GET_USERS, GET_USER_BY_ID } from '../services/api/user'
import { useStoreState } from '../store'

function Dashboard() {
  const { Title, Text } = Typography
  const { loading, data: projectData } = useQuery(PROJECT)
  const { data: taskData } = useQuery(TASKS)
  const { data: userData } = useQuery(GET_USERS)
  const user = useStoreState((s) => s.userState.user)
  const { loading: userLoading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(user?.id) },
  })
  const [currentUserData, setCurrentUserData] = useState<any>()

  const overDue = currentUserData
    ? currentUserData.projects.filter(
        (item: any) =>
          item.status === 'undone' &&
          item.dueDate <
            new Date().toLocaleDateString('en-US', {
              day: 'numeric',
            })
      ).length
    : 0

  const done = currentUserData
    ? currentUserData.projects.filter((item: any) => item.status === 'done').length
    : 0

  const inProgress = currentUserData
    ? currentUserData.projects.filter((item: any) => item.status === 'undone').length
    : 0

  const value = done + inProgress
  const valueOverall = overDue + done + inProgress

  function calProjects() {
    let num =
      !loading && projectData !== undefined
        ? projectData.projects.filter(
            (project: any) => project.members.filter((member: any) => member.id === user?.id).length
          ).length
        : 0
    return num
  }

  useEffect(() => {
    if (!error && !userLoading) {
      setCurrentUserData(data.user)
    }
  }, [data, error, userLoading])

  const charts = [
    {
      item: 'Done',
      count: currentUserData ? currentUserData.projects.length : null,
      percent: done,
    },
    {
      item: 'In Progress',
      count: currentUserData ? currentUserData.projects.length : null,
      percent: inProgress,
    },
    {
      item: 'Overdue',
      count: currentUserData ? currentUserData.projects.length : null,
      percent: overDue,
    },
  ]

  const cols = {
    percent: {
      formatter: (val: any) => {
        if (overDue === 0) {
          val = ((val / value) * 100).toFixed(2) + '%'
          return val
        } else {
          val = ((val / valueOverall) * 100).toFixed(2) + '%'
          return val
        }
      },
    },
  }

  return (
    <LayoutDashboard noCard>
      <div>
        <div className="site-card-wrapper">
          <Row gutter={[10, 24]}>
            <Col md={{ span: 24 }}>
              {currentUserData ? (
                <WelcomeCard
                  data={currentUserData}
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
              ) : (
                0
              )}
            </Col>
          </Row>
          <Row gutter={[14, 24]}>
            <Col xl={14} className="w-full">
              <Card className="mb-4">
                <Link to="/projects">
                  <Card.Grid>
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
                  </Card.Grid>
                </Link>
                <Card.Grid>
                  <Link to="/member">
                    <div className="flex flex-col justify-center items-center">
                      <TeamOutlined
                        style={{ color: '#105EFC', fontSize: '40px', marginBottom: 8 }}
                      />
                      <Title level={2}>{userData ? userData.users.length : 0}</Title>
                      <Text disabled className="text-lg -mt-4">
                        Paticipants
                      </Text>
                    </div>
                  </Link>
                </Card.Grid>
                <Card.Grid>
                  <Link to={`/profile/${user?.id}`}>
                    <div className="flex flex-col justify-center items-center">
                      <ProfileOutlined
                        style={{ color: '#105EFC', fontSize: '40px', marginBottom: 8 }}
                      />
                      <Title level={2}>
                        {taskData
                          ? taskData.tasks.filter(
                              (task: any) =>
                                task.isDone === false &&
                                task.members.filter((member: any) => member.id === user?.id).length
                            ).length
                          : 0}
                      </Title>
                      <Text disabled className="text-lg -mt-4">
                        Today's tasks
                      </Text>
                    </div>
                  </Link>
                </Card.Grid>
              </Card>

              {loading ? (
                <LoadingComponent projects />
              ) : (
                <List
                  className="bg-white p-4"
                  header={<div>Active Projects</div>}
                  bordered={false}
                  dataSource={
                    projectData &&
                    projectData.projects.filter(
                      (filtered: any) =>
                        filtered.members.filter((member: any) => member.id === user?.id).length
                    )
                  }
                  renderItem={(items: any) => (
                    <List.Item>
                      <Avatar
                        src={
                          items.projectImage
                            ? items.projectImage.fullPath
                            : require('../assets/images/logo5.png')
                        }
                        className="mr-4"
                      />
                      {items.projectName}
                    </List.Item>
                  )}
                />
              )}
            </Col>

            <Col xl={10} xs={24}>
              <Card title="Project Charts">
                <Chart
                  height={250}
                  data={charts}
                  scale={cols}
                  autoFit
                  onGetG2Instance={(c: any) => {
                    c.geometries[0].elements.forEach((e: any, idx: any) => {
                      e.setState('selected', idx === 0 ? true : false)
                    })
                  }}
                >
                  <Coordinate type="theta" radius={0.75} />
                  <Tooltip showTitle={false} />
                  <Axis visible={false} />
                  <Interval
                    position="percent"
                    adjust="stack"
                    color="item"
                    style={{
                      lineWidth: 1,
                      stroke: '#fff',
                    }}
                    label={[
                      'count',
                      {
                        content: (data) => {
                          if (overDue === 0) {
                            const val = ((data.percent / value) * 100).toFixed(2) + '%'
                            return `${data.item}: ${val}`
                          } else {
                            const val = ((data.percent / valueOverall) * 100).toFixed(2) + '%'
                            return `${data.item}: ${val}`
                          }
                        },
                      },
                    ]}
                  />
                  <Interaction type="element-single-selected" />
                </Chart>
              </Card>
            </Col>
          </Row>

          <Row gutter={[8, 24]}></Row>
        </div>
      </div>
    </LayoutDashboard>
  )
}

export default Dashboard
