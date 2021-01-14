import {
  CalendarOutlined,
  FileDoneOutlined,
  PlusOutlined,
  ProfileOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  Modal,
  PageHeader,
  Row,
  Spin,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  LayoutDashboard,
  LoadingComponent,
  LogList,
  ProjectContent,
  TaskCard,
} from '../components/DashboardComponent'
import { GET_PROJECT_BY_ID } from '../services/api/project'
import { TASKS_BY_ID } from '../services/api/task'

function ProjectDetail() {
  const { Text } = Typography
  const { projectId }: any = useParams()
  const { loading, error, data, refetch } = useQuery(TASKS_BY_ID, {
    variables: { id: Number(projectId) },
    notifyOnNetworkStatusChange: true,
  })
  const [filteredTasks, setFilteredTasks] = useState<any[]>([])
  const [filteredTodayTasks, setFilteredTodayTasks] = useState<any[]>([])
  const [filteredDoneTasks, setFilteredDoneTasks] = useState<any[]>([])
  const [filteredLog, setFilteredLog] = useState([])
  const [keyword, setKeyword] = useState('')
  const [keywordTodayTask, setKeywordTodayTask] = useState('')
  const [keywordDoneTask, setKeywordDoneTask] = useState('')
  const [filteredData, setFilteredData] = useState<any>()
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
    refetch: projectRefetch,
  } = useQuery(GET_PROJECT_BY_ID, { variables: { id: Number(projectId) } })
  const [todayTaskVisible, setTodayTaskVisible] = useState(false)
  const [doneTaskVisible, setDoneTaskVisible] = useState(false)
  const [filterloading, setLoading] = useState(false)

  useEffect(() => {
    if (!error && !loading && !projectLoading && !projectError) {
      data.getTaskByProjectId
        .filter((filteredId: any) => filteredId.project.id === projectId.id)
        .filter((filteredStatus: any) => filteredStatus.isDone === true)

      setFilteredTasks(data.getTaskByProjectId)
      setFilteredTodayTasks(data.getTaskByProjectId)
      setFilteredDoneTasks(data.getTaskByProjectId)
      setFilteredLog(data.getTaskByProjectId)
      setFilteredData(projectData.project)
    }
  }, [projectId, loading, error, projectLoading, projectError, data, projectData])

  function handleKeywordChange(e: any) {
    setLoading(true)
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredTasks(data.getTaskByProjectId)
      setLoading(false)
    } else {
      const kw: any[] = data.getTaskByProjectId.filter((item: any) =>
        item.taskName.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredTasks(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function handleKeywordTodayTaskChange(e: any) {
    setLoading(true)
    setKeywordTodayTask(e.target.value)
    if (e.target.value === '') {
      setFilteredTodayTasks(data.getTaskByProjectId)
      setLoading(false)
    } else {
      const kw: any[] = data.getTaskByProjectId.filter((item: any) =>
        item.taskName.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredTodayTasks(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function handleKeywordDoneTaskChange(e: any) {
    setLoading(true)
    setKeywordDoneTask(e.target.value)
    if (e.target.value === '') {
      setFilteredDoneTasks(data.getTaskByProjectId)
      setLoading(false)
    } else {
      const kw: any[] = data.getTaskByProjectId.filter((item: any) =>
        item.taskName.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredDoneTasks(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function showModalTodayTask() {
    setTodayTaskVisible(true)
  }

  function showModalDoneTask() {
    setDoneTaskVisible(true)
  }

  function handleCancel() {
    setTodayTaskVisible(false)
    setDoneTaskVisible(false)
  }

  return projectLoading || !filteredData ? (
    <LayoutDashboard>
      <Spin size="large" className="flex justify-center pt-4" />
    </LayoutDashboard>
  ) : (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>
          <Link to={{ pathname: `/projects` }}>Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{filteredData.projectName}</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        className="site-page-header"
        title={filteredData.projectName}
        onBack={() => window.history.back()}
      />
      <Divider />

      <Row className="w-full mb-8 px-8">
        <Row className="w-full">
          <Col xs={24}>
            <ProjectContent data={filteredData} refetch={() => projectRefetch()} />
          </Col>
        </Row>
        <Row className="w-full">
          <Col xl={6} lg={6} md={12} className="py-8 px-4">
            <div className="flex flex-col sm:flex-row lg:flex-col ">
              <Col xl={24} lg={24} md={12} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card hoverable className="min-w-full min-h-full">
                  <div className="flex flex-col justify-center items-center">
                    <CalendarOutlined className="text-blue-700 text-4xl" />
                    <Text className="text-center font-bold text-lg">
                      {dayjs(filteredData.dueDate).format('DD MMM YYYY')}
                    </Text>
                    <Text type="secondary" className="text-center">
                      Release Date
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col xl={24} lg={24} md={12} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card hoverable className="min-w-full min-h-full">
                  <div className="flex flex-col justify-center items-center">
                    <UsergroupAddOutlined className="text-blue-700 text-4xl" />
                    <Text className="text-center font-bold text-lg">
                      {filteredData.members.length}
                    </Text>
                    <Text type="secondary" className="text-center">
                      Members
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col xl={24} lg={24} md={12} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card hoverable className="min-w-full min-h-full">
                  <div
                    className="flex flex-col justify-center items-center"
                    onClick={showModalTodayTask}
                  >
                    <ProfileOutlined className="text-blue-700 text-4xl" />
                    <Text className="text-center font-bold text-lg">
                      {filteredTasks &&
                        filteredTasks.filter((item: any) => item.isDone === false).length}
                    </Text>
                    <Text type="secondary" className="text-center">
                      Today's tasks
                    </Text>
                  </div>
                  <Modal
                    visible={todayTaskVisible}
                    width={'80%'}
                    title={<Text className="font-bold">Today's tasks</Text>}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <Row justify="end" className="mb-4">
                      <Input
                        placeholder="Search Today's Tasks"
                        value={keywordTodayTask}
                        onChange={handleKeywordTodayTaskChange}
                        suffix={<SearchOutlined type="secondary" />}
                        className="w-96"
                      />
                    </Row>
                    <Col className="px-24 w-full">
                      {filteredTodayTasks && !loading ? (
                        filteredTodayTasks.filter((item: any) => item.isDone === false).length !==
                        0 ? (
                          filteredTodayTasks
                            .filter((item: any) => item.isDone === false)
                            .map((item: any) => (
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
                              description={<Text type="secondary">No Tasks</Text>}
                            />
                          </div>
                        )
                      ) : (
                        <LoadingComponent task />
                      )}
                    </Col>
                  </Modal>
                </Card>
              </Col>
              <Col xl={24} lg={24} md={12} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card hoverable className="min-w-full min-h-full">
                  <div
                    className="flex flex-col justify-center items-center"
                    onClick={showModalDoneTask}
                  >
                    <FileDoneOutlined className="text-blue-700 text-4xl" />
                    <Text className="text-center font-bold text-lg">
                      {filteredTasks && filteredTasks.filter((item: any) => item.isDone).length}
                    </Text>
                    <Text type="secondary" className="text-center">
                      Done tasks
                    </Text>
                  </div>
                  <Modal
                    visible={doneTaskVisible}
                    width={'80%'}
                    title={<Text className="font-bold">Done tasks</Text>}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <Row justify="end" className="mb-4">
                      <Input
                        placeholder="Search Done Tasks"
                        value={keywordDoneTask}
                        onChange={handleKeywordDoneTaskChange}
                        suffix={<SearchOutlined type="secondary" />}
                        className="w-96"
                      />
                    </Row>
                    <Col className="px-24 w-full">
                      {filteredDoneTasks && !loading ? (
                        filteredDoneTasks.filter((item: any) => item.isDone === true).length !==
                        0 ? (
                          filteredDoneTasks
                            .filter((item: any) => item.isDone === true)
                            .map((item: any) => (
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
                              description={<Text type="secondary">No Tasks</Text>}
                            />
                          </div>
                        )
                      ) : (
                        <LoadingComponent task />
                      )}
                    </Col>
                  </Modal>
                </Card>
              </Col>
            </div>
          </Col>
          <Col xl={18} lg={18} md={24}>
            <div className="py-8 px-4">
              <Row justify="space-between">
                <Text className="font-bold text-lg mb-4">Tasks</Text>
                <Row>
                  <Input
                    placeholder="Search Tasks"
                    value={keyword}
                    onChange={handleKeywordChange}
                    suffix={<SearchOutlined type="secondary" />}
                    className="w-96 h-8"
                  />
                  <Button
                    className="flex items-center justify-center bg-secondary hover:bg-primary transition duration-200 ease-in border-none"
                    type="primary"
                  >
                    <PlusOutlined />
                    Create
                  </Button>
                </Row>
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
                      description={<Text type="secondary">No Tasks</Text>}
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
            <Text className="font-bold text-lg">Recent Activity</Text>
            <div className="h-64">
              {filteredLog.length === 0 ? (
                <div className="flex justify-center items-center p-8">
                  <Text type="secondary">No recent activity</Text>
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
