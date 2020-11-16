import {
  FileDoneOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Avatar, Button, Card, Col, Empty, List, Modal, Row, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  LayoutDashboard,
  LoadingComponent,
  LogList,
  ProjectContent,
  TaskCard,
  TaskDrawer,
} from '../components/DashboardComponent'
import { GET_PROJECT_BY_ID } from '../services/api/project'
import { TASKS_BY_ID } from '../services/api/task'

function ProjectDetail() {
  const { Title, Text } = Typography
  const { projectId }: any = useParams()
  const { loading, error, data, refetch } = useQuery(TASKS_BY_ID, {
    variables: { id: Number(projectId) },
    notifyOnNetworkStatusChange: true,
  })
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filteredLog, setFilteredLog] = useState([])
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [filteredData, setFilteredData] = useState<any>()
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
    refetch: projectRefetch,
  } = useQuery(GET_PROJECT_BY_ID, { variables: { id: Number(projectId) } })

  const [developerVisible, setDeveloperVisible] = useState(false)
  const [todayTaskVisible, setTodayTaskVisible] = useState(false)
  const [doneTaskVisible, setDoneTaskVisible] = useState(false)

  useEffect(() => {
    if (!error && !loading && !projectLoading && !projectError) {
      data.getTaskByProjectId
        .filter((filteredId: any) => filteredId.project.id === projectId.id)
        .filter((filteredStatus: any) => filteredStatus.isDone === true)

      setFilteredTasks(data.getTaskByProjectId)
      setFilteredLog(data.getTaskByProjectId)
      setFilteredData(projectData.project)
    }
  }, [projectId, loading, error, projectLoading, projectError, data, projectData])

  function closeDawer() {
    setDrawerVisible(false)
  }

  function showModalDeveloper() {
    setDeveloperVisible(true)
  }

  function showModalTodayTask() {
    setTodayTaskVisible(true)
  }

  function showModalDoneTask() {
    setDoneTaskVisible(true)
  }

  function handleCancel() {
    setDeveloperVisible(false)
    setTodayTaskVisible(false)
    setDoneTaskVisible(false)
  }

  return projectLoading || !filteredData ? (
    <LayoutDashboard noCard>
      <Spin size="large" className="flex justify-center" />
    </LayoutDashboard>
  ) : (
    <LayoutDashboard noCard>
      <Row className="w-full">
        <Row className="w-full">
          <Col span={24}>
            <ProjectContent data={filteredData} refetch={() => projectRefetch()} />
          </Col>
        </Row>
        <Row className="w-full">
          <Col xl={6} lg={6} md={12} className="py-8 px-4">
            <div className="flex flex-col sm:flex-row lg:flex-col ">
              <Col xl={24} lg={24} md={12} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card hoverable className="min-w-full rounded-lg min-h-full">
                  <div className="flex flex-col justify-center items-center">
                    <ScheduleOutlined
                      style={{ color: '#105EFC', fontSize: '2.5rem', marginBottom: 8 }}
                    />
                    <Title level={3} className="text-center">
                      {new Date(filteredData.dueDate).toLocaleDateString('en-GB', {
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
              <Col xl={24} lg={24} md={12} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card hoverable className="min-w-full rounded-lg min-h-full">
                  <div
                    className="flex flex-col justify-center items-center"
                    onClick={showModalDeveloper}
                  >
                    <SmileOutlined
                      style={{ color: '#105EFC', fontSize: '2.5rem', marginBottom: 8 }}
                    />
                    <Title level={3} className="text-center">
                      {filteredData.members.length}
                    </Title>
                    <Text disabled className="text-md -mt-2 text-center">
                      Developer
                    </Text>
                  </div>
                  <Modal visible={developerVisible} onCancel={handleCancel} footer={null}>
                    <List
                      itemLayout="horizontal"
                      dataSource={filteredData.members}
                      renderItem={(item: any) => (
                        <Link to={`/profile/${item.id}`}>
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={item.image.fullPath} />}
                              title={<Text>{item.name}</Text>}
                            />
                          </List.Item>
                        </Link>
                      )}
                    />
                  </Modal>
                </Card>
              </Col>
              <Col xl={24} lg={24} md={12} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card hoverable className="min-w-full rounded-lg min-h-full">
                  <div
                    className="flex flex-col justify-center items-center"
                    onClick={showModalTodayTask}
                  >
                    <ProfileOutlined
                      style={{ color: '#105EFC', fontSize: '2.5rem', marginBottom: 8 }}
                    />
                    <Title level={3} className="text-center">
                      {filteredTasks &&
                        filteredTasks.filter((item: any) => item.isDone === false).length}
                    </Title>
                    <Text disabled className="text-md -mt-2 text-center">
                      Today's tasks
                    </Text>
                  </div>
                  <Modal visible={todayTaskVisible} onCancel={handleCancel} footer={null}>
                    <List
                      itemLayout="horizontal"
                      dataSource={filteredTasks.filter((item: any) => item.isDone === false)}
                      renderItem={(item: any) => (
                        <List.Item>
                          <List.Item.Meta title={<Text>{item.taskName}</Text>} />
                        </List.Item>
                      )}
                    />
                  </Modal>
                </Card>
              </Col>
              <Col xl={24} lg={24} md={12} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card hoverable className="min-w-full rounded-lg min-h-full">
                  <div
                    className="flex flex-col justify-center items-center"
                    onClick={showModalDoneTask}
                  >
                    <FileDoneOutlined
                      style={{ color: '#105EFC', fontSize: '2.5rem', marginBottom: 8 }}
                    />
                    <Title level={3} className="text-center">
                      {filteredTasks && filteredTasks.filter((item: any) => item.isDone).length}
                    </Title>
                    <Text disabled className="text-md -mt-2 text-center">
                      Done tasks
                    </Text>
                  </div>
                  <Modal visible={doneTaskVisible} onCancel={handleCancel} footer={null}>
                    <List
                      itemLayout="horizontal"
                      dataSource={filteredTasks.filter((item: any) => item.isDone === true)}
                      renderItem={(item: any) => (
                        <List.Item>
                          <List.Item.Meta title={<Text>{item.taskName}</Text>} />
                        </List.Item>
                      )}
                    />
                  </Modal>
                </Card>
              </Col>
            </div>
          </Col>
          <Col xl={18} lg={18} md={24}>
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
                    project={filteredData}
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
                      project={filteredData}
                      refetch={() => refetch()}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center p-8">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<Text disabled>No Tasks</Text>}
                    />
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
                <LogList data={filteredLog} />
              )}
            </div>
          </Col>
        </Row>
      </Row>
    </LayoutDashboard>
  )
}

export default ProjectDetail
