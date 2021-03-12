import {
  FileProtectOutlined,
  FundProjectionScreenOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Calendar, Card, Col, Empty, Row, Typography } from 'antd'
import { Axis, Chart, Coordinate, Interaction, Interval, Tooltip } from 'bizcharts'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, TodayTaskCard, WelcomeCard } from '../components/DashboardComponent'
import { PROJECT } from '../services/api/project'
import { TASKS } from '../services/api/task'
import { GET_USERS, GET_USER_BY_ID } from '../services/api/user'
import { useStoreState } from '../store'

function Dashboard() {
  const { Text } = Typography
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
        (item: any) => item.status === 'undone' && item.dueDate < dayjs().format('DD MMM YYYY')
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
    <LayoutDashboard>
      <div className="px-8 py-8">
        <Row justify="space-between">
          <Col xs={23} md={23} lg={15}>
            <div className="site-card-wrapper">
              <Row className="mb-8">
                <Col xs={24}>
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
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col className="w-full">
                  <Card title="Project Charts">
                    {projectData ? (
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
                              content: (data: any) => {
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
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={<Text disabled>No Chart Now</Text>}
                      />
                    )}
                  </Card>
                </Col>

                <Col className="w-full mt-8">
                  {taskData && !error && !loading ? (
                    taskData.length !== 0 ? (
                      taskData.tasks
                        .filter(
                          (task: any) =>
                            task.members.filter((member: any) => member.id === user?.id).length &&
                            dayjs().isSame(dayjs(task.startTime), 'day') &&
                            dayjs().isSame(dayjs(task.startTime), 'month') &&
                            dayjs().isSame(dayjs(task.startTime), 'year')
                        )
                        .map((items: any) => (
                          <>
                            <Text className="font-bold text-lg">Today’s task</Text>
                            <Row justify="space-between" className="w-full mb-4 mt-4">
                              <Col xs={4} className="flex justify-center">
                                <Text className="font-bold">Members</Text>
                              </Col>
                              <Col xs={7} className="flex justify-center">
                                <Text className="font-bold">Task name</Text>
                              </Col>
                              <Col xs={11} className="flex justify-center">
                                <Text className="font-bold">Date</Text>
                              </Col>
                              <Col xs={2}>
                                <Text className="font-bold">Status</Text>
                              </Col>
                            </Row>
                            <Col span={24} key={items.id}>
                              <TodayTaskCard data={items} />
                            </Col>
                          </>
                        ))
                    ) : (
                      <div className="flex w-full justify-center my-8">
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<Text disabled>Don't have any task to do</Text>}
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex w-full justify-center my-8">
                      <Text disabled>Error</Text>
                      <Text disabled>{error} </Text>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </Col>

          <Col xs={23} md={23} lg={8}>
            <div className="site-calendar-customize-header-wrapper border">
              <Calendar fullscreen={false} />
            </div>

            <Col className="w-full">
              <Link to="/projects">
                <Card hoverable className="my-4">
                  <Row>
                    <Col className="flex items-center justify-center">
                      <FundProjectionScreenOutlined
                        style={{ color: '#0036C7', fontSize: '40px', marginBottom: 8 }}
                      />
                    </Col>
                    <Col className="ml-4">
                      <Text type="secondary" className="text-lg block">
                        Projects
                      </Text>
                      <Text className="text-lg font-bold block">
                        {projectData
                          ? projectData.projects.filter((project: any) =>
                              project.members.filter((member: any) => member.id === user?.id)
                            ).length
                          : 0}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Link>

              <Link to={`/profile/${user?.id}`}>
                <Card hoverable className="my-4">
                  <Row>
                    <Col className="flex items-center justify-center">
                      <FileProtectOutlined
                        style={{ color: '#0036C7', fontSize: '40px', marginBottom: 8 }}
                      />
                    </Col>
                    <Col className="ml-4">
                      <Text className="text-lg -mt-4 block" type="secondary">
                        Complete tasks
                      </Text>
                      <Text className="text-lg font-bold block">
                        {taskData
                          ? taskData.tasks.filter(
                              (task: any) =>
                                task.isDone === true &&
                                task.members.filter((member: any) => member.id === user?.id).length
                            ).length
                          : 0}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Link>

              <Link to="/employee">
                <Card hoverable className="my-4">
                  <Row>
                    <Col className="flex items-center justify-center">
                      <UsergroupAddOutlined
                        style={{ color: '#0036C7', fontSize: '40px', marginBottom: 8 }}
                      />
                    </Col>
                    <Col className="ml-4">
                      <Text type="secondary" className="text-lg -mt-4 block">
                        Employees
                      </Text>
                      <Text className="text-lg font-bold block">
                        {userData ? userData.users.length : 0}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          </Col>
        </Row>
      </div>
    </LayoutDashboard>
  )
}

export default Dashboard
