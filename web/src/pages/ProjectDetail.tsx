import {
  FileDoneOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Button, Card, Col, Row, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TASKS_BY_ID } from '../services/api/task'
import {
  LayoutDashboard,
  LoadingComponent,
  LogCard,
  TaskCard,
  TaskDrawer,
} from '../components/DashboardComponent'

function ProjectDetail(props: any) {
  const { Title, Text } = Typography
  const projectData = props.location.state.data
  const { projectId }: any = useParams()
  const { loading, error, data, refetch } = useQuery(TASKS_BY_ID, {
    variables: { id: Number(projectId) },
    notifyOnNetworkStatusChange: true,
  })
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filteredLog, setFilteredLog] = useState([])
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    if (!error && !loading) {
      let tempLog: any = data.getTaskByProjectId
        .filter((filteredId: any) => filteredId.project.id === projectId.id)
        .filter((filteredStatus: any) => filteredStatus.isDone === true)

      setFilteredTasks(data.getTaskByProjectId)
      setFilteredLog(tempLog)
    }
  }, [projectId, loading]) // eslint-disable-line react-hooks/exhaustive-deps

  function closeDawer() {
    setDrawerVisible(false)
  }

  return (
    <LayoutDashboard noCard>
      <Row className="w-full">
        <Row className="w-full">
          <Col span={24}>
            <Row className="w-full">
              <Col span={24} lg={{ span: 4 }} className="flex justify-center items-start">
                <Avatar size={112} src={projectData.projectImage} />
              </Col>
              <Col span={24} lg={{ span: 20 }} className="px-4">
                <Row>
                  <Title level={2}>{projectData.projectName}</Title>
                </Row>
                <Row>
                  <Text disabled className="text-md -mt-4 mb-2">
                    {projectData.projectType}
                  </Text>
                </Row>
                <Row>
                  <Text className="text-lg">{projectData.projectDetail}</Text>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="w-full">
          <Col span={24} lg={{ span: 6 }} className="py-8 px-4">
            <div className="flex flex-col sm:flex-row lg:flex-col ">
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md min-h-full">
                  <div className="flex flex-col justify-center items-center">
                    <ScheduleOutlined
                      style={{ color: '#105EFC', fontSize: '2.5rem', marginBottom: 8 }}
                    />
                    <Title level={3} className="text-center">
                      {new Date(projectData.dueDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Title>
                    <Text disabled className="text-md -mt-2 text-center">
                      Release Date
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md min-h-full">
                  <div className="flex flex-col justify-center items-center">
                    <SmileOutlined
                      style={{ color: '#105EFC', fontSize: '2.5rem', marginBottom: 8 }}
                    />
                    <Title level={3} className="text-center">
                      {projectData.members.length}
                    </Title>
                    <Text disabled className="text-md -mt-2 text-center">
                      Developer
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md min-h-full">
                  <div className="flex flex-col justify-center items-center">
                    <ProfileOutlined
                      style={{ color: '#105EFC', fontSize: '2.5rem', marginBottom: 8 }}
                    />
                    <Title level={3} className="text-center">
                      {filteredTasks &&
                        filteredTasks.filter((item: any) => item).length}
                    </Title>
                    <Text disabled className="text-md -mt-2 text-center">
                      Today's tasks
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md min-h-full">
                  <div className="flex flex-col justify-center items-center">
                    <FileDoneOutlined
                      style={{ color: '#105EFC', fontSize: '2.5rem', marginBottom: 8 }}
                    />
                    <Title level={3} className="text-center">
                    {filteredTasks &&
                        filteredTasks.filter((item: any) => item.isDone).length}
                    </Title>
                    <Text disabled className="text-md -mt-2 text-center">
                      Done tasks
                    </Text>
                  </div>
                </Card>
              </Col>
            </div>
          </Col>
          <Col span={24} lg={{ span: 18 }}>
            <div className="py-8 px-4">
              <Row justify="space-between">
                <div className="font-bold text-2xl mb-4">Tasks</div>
                <div>
                  <Button
                    className="flex items-center justify-center bg-primaryopacity shadow-md hover:shadow-lg hover:bg-primary transition duration-200 ease-in outline-none border-0 "
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={() => setDrawerVisible(true)}
                  >
                    <PlusCircleOutlined className="hover:scale-150 " />
                    <Text className="hidden hover:block text-white">Create</Text>
                  </Button>
                  <TaskDrawer
                    visibillity={drawerVisible}
                    onCloseDrawer={closeDawer}
                    project={projectData}
                    refetch={() => refetch()}
                  />
                </div>
              </Row>

              {filteredTasks && !loading ? (
                filteredTasks.length !== 0 ? (
                  filteredTasks.map((item: any) => (
                    <TaskCard
                      key={item.id}
                      data={item}
                      project={projectData}
                      refetch={() => refetch()}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center p-8">
                    <Text disabled>No task</Text>
                  </div>
                )
              ) : (
                <LoadingComponent task />
              )}
            </div>
          </Col>
        </Row>
        <Row className="w-full px-2">
          <Col span={24}>
            <div className="font-bold text-2xl mb-4">Recent Activity</div>
            <div className="h-64">
              {filteredLog.length === 0 ? (
                <div className="flex justify-center items-center p-8">
                  <Text disabled>No recent activity</Text>
                </div>
              ) : (
                <LogCard data={filteredLog} />
              )}
            </div>
          </Col>
        </Row>
      </Row>
    </LayoutDashboard>
  )
}

export default ProjectDetail
