import {
  FileDoneOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { TASKS_BY_ID } from '../services/api/task'
import {
  LayoutDashboard,
  LoadingComponent,
  LogList,
  TaskCard,
  TaskDrawer,
} from '../components/DashboardComponent'
import {
  GET_PROJECT_BY_ID,
  UPDATE_PROJECT_NAME,
  UPDATE_PROJECT_DETAIL,
  UPDATE_PROJECT_TYPE,
  UPDATE_PROJECT_STATUS,
} from '../services/api/project'

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
  const [updateProjectName] = useMutation(UPDATE_PROJECT_NAME)
  const [updateProjectDetail] = useMutation(UPDATE_PROJECT_DETAIL)
  const [updateProjectType] = useMutation(UPDATE_PROJECT_TYPE)
  const [updateProjectStatus] = useMutation(UPDATE_PROJECT_STATUS)
  const ref = useRef(document.createElement('div'))
  const { TextArea } = Input

  const [projectName, setProjectName] = useState<any>()
  const [projectDetail, setProjectDetail] = useState<any>()
  const [projectType, setProjectType] = useState<any>()
  const [status, setStatus] = useState<any>()
  const [editProjectName, setEditProjectName] = useState(false)
  const [editProjectDetail, setEditProjectDetail] = useState(false)
  const [editProjectType, setEditProjectType] = useState(false)

  useEffect(() => {
    if (!error && !loading && !projectLoading && !projectError) {
      data.getTaskByProjectId
        .filter((filteredId: any) => filteredId.project.id === projectId.id)
        .filter((filteredStatus: any) => filteredStatus.isDone === true)

      setFilteredTasks(data.getTaskByProjectId)
      setFilteredLog(data.getTaskByProjectId)
      setFilteredData(projectData.project)
      setProjectName(projectData.project.projectName)
      setProjectDetail(projectData.project.projectDetail)
      setProjectType(projectData.project.projectType)
      setStatus(projectData.project.status)
    }
  }, [projectId, loading, error, projectLoading, projectError, data, projectData])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setEditProjectName(false)
      setEditProjectDetail(false)
      setEditProjectType(false)
    }
  }

  function closeDawer() {
    setDrawerVisible(false)
  }

  function onUnDoneClick() {
    updateProjectStatus({
      variables: { id: Number(projectId), status: 'undone' },
    })
    projectRefetch()
  }

  function onDoneClick() {
    updateProjectStatus({
      variables: { id: Number(projectId), status: 'done' },
    })
    projectRefetch()
  }

  return projectLoading || !filteredData ? (
    <LoadingComponent overlay />
  ) : (
    <LayoutDashboard noCard>
      <Row className="w-full">
        <Row className="w-full">
          <Col span={24}>
            <Row className="w-full">
              <Col span={24} lg={{ span: 4 }} className="flex justify-center items-start">
                <Avatar size={112} src={filteredData.projectImage} />
              </Col>
              <Col span={24} lg={{ span: 20 }} className="px-4">
                <Row justify="space-between">
                  <div>
                    {!editProjectName ? (
                      <div
                        onClick={() => {
                          setEditProjectName(true)
                        }}
                      >
                        <Text className="font-bold text-3xl ml-2">{projectName}</Text>
                      </div>
                    ) : (
                      <Input
                        className="font-bold text-3xl ml-2"
                        autoFocus
                        defaultValue={projectName}
                        onChange={(e) => {
                          if (filteredData) {
                            setProjectName(e.target.value)
                            updateProjectName({
                              variables: { id: Number(projectId), projectName: e.target.value },
                            })
                          }
                        }}
                      />
                    )}
                  </div>
                  {filteredData.status === 'done' ? (
                    <Button
                      className="flex items-center justify-center shadow-md hover:shadow-lg bg-green-400 focus:bg-green-600 hover:bg-red-600 transition duration-800 ease-in border-0 w-24"
                      type="primary"
                      shape="round"
                      size="large"
                      onClick={onUnDoneClick}
                    >
                      <CheckCircleOutlined className="hover:hidden" />
                      <Text className="hover:block hidden text-white">Done</Text>
                    </Button>
                  ) : (
                    <Button
                      className="flex items-center justify-center shadow-md hover:shadow-lg bg-red-400 focus:bg-red-600 hover:bg-green-600 transition duration-800 ease-in border-0 w-24"
                      type="primary"
                      shape="round"
                      size="large"
                      onClick={onDoneClick}
                    >
                      <ExclamationCircleOutlined />
                      <Text className="hover:hidden text-white">WIP</Text>
                    </Button>
                  )}
                </Row>
                <Row>
                  {!editProjectType ? (
                    <div
                      onClick={() => {
                        setEditProjectType(true)
                      }}
                    >
                      <Text className="text-md mt-4 mb-2 text-gray-500">{projectType}</Text>
                    </div>
                  ) : (
                    <Input
                      className="text-md mt-4 mb-2"
                      autoFocus
                      defaultValue={projectType}
                      onChange={(e) => {
                        if (filteredData) {
                          setProjectType(e.target.value)
                          updateProjectType({
                            variables: { id: Number(projectId), projectType: e.target.value },
                          })
                        }
                      }}
                    />
                  )}
                </Row>

                {!editProjectDetail ? (
                  <div
                    onClick={() => {
                      setEditProjectDetail(true)
                    }}
                  >
                    <Text className="text-lg">{projectDetail}</Text>
                  </div>
                ) : (
                  <TextArea
                    className="text-lg w-full"
                    autoSize
                    autoFocus
                    defaultValue={projectDetail}
                    onChange={(e) => {
                      if (filteredData) {
                        setProjectDetail(e.target.value)
                        updateProjectDetail({
                          variables: { id: Number(projectId), projectDetail: e.target.value },
                        })
                      }
                    }}
                  />
                )}
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
              <Col lg={{ span: 24 }} className="w-full mb-4 sm:mr-4 lg:mb-4">
                <Card className="min-w-full rounded-lg shadow-md min-h-full">
                  <div className="flex flex-col justify-center items-center">
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
                        filteredTasks.filter((item: any) => item.isDone === false).length}
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
                      {filteredTasks && filteredTasks.filter((item: any) => item.isDone).length}
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
