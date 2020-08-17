import {
  FileDoneOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LayoutDashboard, LogCard, TaskCard } from '../components/DashboardComponent'
import { TASK_DATA } from '../DATA'

function ProjectDetail(props: any) {
  const { projectId } = useParams()
  const { Title, Text } = Typography

  const data = props.location.state.data

  const [filteredTasks, setFilteredTasks] = useState([])
  const [filteredLog, setFilteredLog] = useState([])

  useEffect(() => {
    let tempTask: any = TASK_DATA.filter((filtered) => filtered.projectId === projectId)
    let tempLog: any = TASK_DATA.filter(
      (filteredId: any) => filteredId.projectId === projectId
    ).filter((filteredStatus: any) => filteredStatus.isDone === true)

    setFilteredTasks(tempTask)
    setFilteredLog(tempLog)
  }, [projectId])

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
                  <Title level={2}>{data.projectName}</Title>
                </Row>
                <Row>
                  <Text disabled className="text-md -mt-4 mb-2">
                    {data.projectType}
                  </Text>
                </Row>
                <Row>
                  <Text className="text-lg">{data.projectDetail}</Text>
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
                      24 DEC 20
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
                      3
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
                      67
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
                      2
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
              <div className="font-bold text-2xl mb-4">Tasks</div>
              {filteredTasks.length !== 0 ? (
                filteredTasks.map((item, key) => {
                  return <TaskCard key={key} data={item} />
                })
              ) : (
                <div className="flex justify-center items-center p-8">
                  <Text disabled>No task</Text>
                </div>
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
