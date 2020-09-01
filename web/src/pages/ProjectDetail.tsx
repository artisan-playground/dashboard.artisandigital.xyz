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
// import { TASK_DATA } from '../DATA'
import { TASKS_BY_ID } from '../api'
import {
  LayoutDashboard,
  LoadingComponent,
  LogCard,
  TaskCard,
} from '../components/DashboardComponent'

function ProjectDetail(props: any) {
  const { Title, Text } = Typography
  const projectData = props.location.state.data

  const { projectId } = useParams()
  const { loading, error, data, refetch } = useQuery(TASKS_BY_ID, {
    variables: { projectId: projectId },
  })

  const [filteredTasks, setFilteredTasks] = useState([])
  const [filteredLog, setFilteredLog] = useState([])

  useEffect(() => {
    if (!error && !loading) {
      let tempLog: any = data.getTaskByProjectId
        .filter((filteredId: any) => filteredId.projectId === projectId)
        .filter((filteredStatus: any) => filteredStatus.isDone === true)

      setFilteredTasks(data.getTaskByProjectId)
      setFilteredLog(tempLog)
    }
  }, [projectId, loading]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LayoutDashboard noCard>
      <Row className="w-full">
        <Row className="w-full">
          <Col span={24}>
            <Row className="w-full">
              <Col span={24} lg={{ span: 4 }} className="flex justify-center items-start">
                <Avatar size={112}>P</Avatar>
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
                      {projectData.memberIds.length}
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
                        filteredTasks.filter((item: any) => item.projectId === projectId).length}
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
                      {filteredLog.length}
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
                    className="flex items-center justify-center bg-primaryopacity shadow-lg hover:bg-primary transition duration-200 ease-in outline-none"
                    type="primary"
                    size="large"
                    shape="circle"
                  >
                    <PlusCircleOutlined style={{ fontSize: 36, marginTop: -3, color: '#fff' }} />
                  </Button>
                </div>
              </Row>

              {filteredTasks && !loading ? (
                filteredTasks.length !== 0 ? (
                  filteredTasks.map((item: any) => (
                    <TaskCard key={item.id} data={item} project={projectData} refetch={refetch} />
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
