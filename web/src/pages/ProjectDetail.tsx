import {
  CalendarOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  FileDoneOutlined,
  PlusOutlined,
  ProfileOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  message,
  Modal,
  PageHeader,
  Pagination,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import dayjs, { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  LayoutDashboard,
  LoadingComponent,
  LogList,
  ProjectContent,
  TaskCard,
} from '../components/DashboardComponent'
import { CREATE_NOTIFICATION } from '../services/api/notification'
import { GET_PROJECT_BY_ID } from '../services/api/project'
import { ADD_TASK, TASKS_BY_ID } from '../services/api/task'
import { useStoreState } from '../store'

function ProjectDetail() {
  const { Text } = Typography
  const { TextArea } = Input
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
  const [createTaskVisible, setCreateTaskVisible] = useState(false)
  const [taskName, setTaskName] = useState()
  const [type, setType] = useState()
  const [member, setMember] = useState<any[]>([])
  const [dueDate, setDueDate] = useState()
  const [startTime, setStartTime] = useState()
  const [description, setDescription] = useState()
  const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
  const dateFormat = 'DD MMM YYYY'
  const customFormat = (value: any) => `${value.format(dateFormat)}`
  const [createTask] = useMutation(ADD_TASK)
  const [deadlineNotify] = useMutation(CREATE_NOTIFICATION)
  const { RangePicker } = DatePicker
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const user = useStoreState((s) => s.userState.user)
  const [totalPage, setTotalPage] = useState(0)
  const [current, setCurrent] = useState(1)
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const pageSize = 4
  const [form] = Form.useForm()

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
      setTotalPage(data.length / pageSize)
      setMinIndex(0)
      setMaxIndex(pageSize)
    }
    setInterval(() => {
      const now: any = dayjs()
      const then: any = dayjs('2021-01-28 08:07:17.264', 'YYYY-MM-DD HH:mm:ss')
      const countdown: any = dayjs(then - now)
      setDays(countdown.format('DD'))
      setHours(countdown.format('HH'))
      setMinutes(countdown.format('mm'))
      setSeconds(countdown.format('ss'))
    }, 1000)
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

  function showCreateTask() {
    setCreateTaskVisible(true)
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
    setCreateTaskVisible(false)
  }

  function onChangeDate(_: any, dateString: any) {
    if (dateString.length === 1) {
      setStartTime(dateString[0])
    } else if (dateString.length === 2) {
      setStartTime(dateString[0])
      setDueDate(dateString[1])
    }
  }

  function handleCreateTask() {
    if (taskName !== '' && type !== '' && description !== '') {
      createTask({
        variables: {
          id: data.id,
          taskName: taskName,
          projectType: type,
          projectDetail: description,
        },
      })
        .then((res) => {
          setTaskName(taskName)
          setType(type)
          setDescription(description)
          refetch()
        })
        .catch((err) => {
          message.error({
            content: `Error : ${err}`,
            duration: 2,
            icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
          })
        })
    } else {
      message.warning({
        content: `Please insert all field`,
        duration: 2,
        icon: <ExclamationCircleOutlined style={{ fontSize: 20, top: -2 }} />,
      })
    }
  }

  function handleChange(page: any) {
    setCurrent(page)
    setMinIndex((page - 1) * pageSize)
    setMaxIndex(page * pageSize)
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
                <Link to={{ pathname: `/members/${filteredData.id}` }}>
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
                </Link>
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
              <Row justify="space-between" className="mb-4">
                <Text className="font-bold text-lg mb-4">Tasks</Text>
                <Row>
                  <Input
                    placeholder="Search Tasks"
                    value={keyword}
                    onChange={handleKeywordChange}
                    suffix={<SearchOutlined type="secondary" />}
                    className="w-96 h-8"
                  />
                  <Button type="primary" onClick={showCreateTask}>
                    <PlusOutlined />
                    Create
                  </Button>
                  <Modal
                    visible={createTaskVisible}
                    width={'80%'}
                    title={<Text className="font-bold">Create a task</Text>}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <Row className="px-48 w-full" justify="space-between">
                      <Col xs={24}>
                        <Form layout="vertical" form={form}>
                          <Form.Item
                            name="Project name"
                            label="Project name"
                            rules={[{ required: true, message: 'Please input project name' }]}
                            required
                          >
                            <Input
                              value={taskName}
                              placeholder="Please input project name"
                              onChange={(e) => e.target.value}
                            />
                          </Form.Item>
                          <Form.Item
                            name="Type"
                            label="Type"
                            rules={[{ required: true, message: 'Please input project name' }]}
                            required
                          ></Form.Item>
                          <Form.Item name="Members" label="Members">
                            <Select mode="tags" value={member} tokenSeparators={[',']}></Select>
                          </Form.Item>
                          <Form.Item
                            name="Due date"
                            label="Due date"
                            rules={[{ required: true, message: 'Please input due date' }]}
                            required
                          >
                            <RangePicker
                              showTime
                              value={dueDate}
                              format={customFormat}
                              className="w-full"
                              onChange={onChangeDate}
                            />
                          </Form.Item>
                          <Form.Item
                            name="Description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input project name' }]}
                            required
                          >
                            <TextArea
                              value={description}
                              rows={4}
                              onChange={(e) => e.target.value}
                              placeholder="Please input description"
                            />
                          </Form.Item>
                          <Form.Item shouldUpdate={true}>
                            {() => (
                              <Button
                                type="primary"
                                className="w-full"
                                onClick={handleCreateTask}
                                disabled={
                                  !form.isFieldsTouched(true) ||
                                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                                    .length
                                }
                              >
                                Submit
                              </Button>
                            )}
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                  </Modal>
                </Row>
              </Row>

              {filteredTasks && !loading ? (
                filteredTasks.length !== 0 ? (
                  filteredTasks.map(
                    (item: any, index: any) =>
                      index >= minIndex &&
                      index < maxIndex && (
                        <TaskCard
                          key={item.id}
                          data={item}
                          project={filteredData}
                          refetch={() => refetch()}
                        />
                      )
                  )
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
              <div className="flex items-end justify-end">
                <Pagination
                  pageSize={pageSize}
                  current={current}
                  total={filteredTasks.length}
                  onChange={handleChange}
                  hideOnSinglePage={true}
                />
              </div>
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
