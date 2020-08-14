import {
  FileDoneOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { useParams } from 'react-router-dom'
import { LayoutDashboard, LogCard, TaskCard } from '../components/DashboardComponent'
import { TASK_DATA } from '../DATA'

function ProjectDetail(props: any) {
  const { projectId } = useParams()
  const data = props.location.state.data

  const { Title, Text } = Typography

  return (
    <LayoutDashboard noCard>
      <Row className="w-full">
        <Row className="w-full">
          <Col span={24}>
            <Row className="w-full">
              <Col span={24} lg={{ span: 4 }} className="flex justify-center items-start">
                <Avatar size={112}>P</Avatar>
              </Col>
              <Col span={24} lg={{ span: 20 }} className="p-4">
                <Row>
                  <Title level={3}>{data.projectName}</Title>
                  <Text disabled className="my-1 ml-4 text-md">
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
          <Col span={24} lg={{ span: 6 }} className="p-8">
            <div className="flex flex-col sm:flex-row lg:flex-col ">
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md">
                  <div className="flex flex-col justify-center items-center">
                    <ScheduleOutlined
                      style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }}
                    />
                    <Title level={2} className="text-center">
                      24 DEC 20
                    </Title>
                    <Text disabled className="text-lg -mt-4 text-center">
                      Release Date
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md">
                  <div className="flex flex-col justify-center items-center">
                    <SmileOutlined
                      style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }}
                    />
                    <Title level={2} className="text-center">
                      3
                    </Title>
                    <Text disabled className="text-lg -mt-4 text-center">
                      Developer
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md">
                  <div className="flex flex-col justify-center items-center">
                    <ProfileOutlined
                      style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }}
                    />
                    <Title level={2} className="text-center">
                      67
                    </Title>
                    <Text disabled className="text-lg -mt-4 text-center">
                      Today's tasks
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md">
                  <div className="flex flex-col justify-center items-center">
                    <FileDoneOutlined
                      style={{ color: '#105EFC', fontSize: '3rem', marginBottom: 8 }}
                    />
                    <Title level={2} className="text-center">
                      2
                    </Title>
                    <Text disabled className="text-lg -mt-4 text-center">
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
              {TASK_DATA.filter((filtered) => filtered.projectId === projectId).map((item) => {
                return <TaskCard data={item} />
              })}
            </div>
          </Col>
        </Row>
        <Row className="w-full">
          <Col span={24}>
            <div className="h-64">
              <LogCard />
            </div>
          </Col>
        </Row>
      </Row>
    </LayoutDashboard>
  )
}

export default ProjectDetail
