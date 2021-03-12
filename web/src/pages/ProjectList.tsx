import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Avatar,
  Breadcrumb,
  Button,
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
  Space,
  Spin,
  Typography,
} from 'antd'
import generatePicker from 'antd/es/date-picker/generatePicker'
import dayjs, { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import React, { useEffect, useState } from 'react'
import UnknownImage from '../assets/images/unknown_image.jpg'
import UnknownUserImage from '../assets/images/unknown_user.png'
import { LayoutDashboard, ProjectCard } from '../components/DashboardComponent'
import { CREATE_NOTIFICATION } from '../services/api/notification'
import { CREATE_PROJECT, PROJECT } from '../services/api/project'
import { UPDATE_PROJECT_IMAGE, UPLOAD_PROJECT_IMAGE } from '../services/api/projectImage'
import { GET_USERS } from '../services/api/user'
import { useStoreState } from '../store'

function ProjectList() {
  const { Option } = Select
  const { TextArea } = Input
  const { Text } = Typography
  const { loading, error, data, refetch } = useQuery(PROJECT)
  const [filteredData, setFilteredData] = useState<any>()
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [filterloading, setLoading] = useState(false)
  const [createProjectVisible, setCreateProjectVisible] = useState(false)
  const [createProject] = useMutation(CREATE_PROJECT)
  const [notify] = useMutation(CREATE_NOTIFICATION)
  const [updateImage, { loading: loadingUpdate, data: imageUpdateData }] = useMutation(
    UPDATE_PROJECT_IMAGE
  )
  const [uploadImage, { loading: loadingUpload, data: imageData }] = useMutation(
    UPLOAD_PROJECT_IMAGE
  )
  const { loading: userLoading, error: userError, data: usersData } = useQuery(GET_USERS)
  const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
  const [projectName, setProjectName] = useState<any>()
  const [type, setType] = useState<any>('')
  const [member, setMember] = useState<any[]>([])
  const [dueDate, setDueDate] = useState<any>()
  const [description, setDescription] = useState<any>()
  const [image, setImage] = useState()
  const dateFormat = 'DD MMM YYYY'
  const customFormat = (value: any) => `${value.format(dateFormat)}`
  const [totalPage, setTotalPage] = useState(0)
  const [current, setCurrent] = useState(1)
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const pageSize = 8
  const [form] = Form.useForm()
  const user = useStoreState((s) => s.userState.user)

  useEffect(() => {
    if (!error && !loading && !userLoading && !userError) {
      if (user?.role === 'ADMIN') {
        switch (types) {
          case 'undone':
            let wip: any[] = data.projects.filter((item: any) => item.status === 'undone')
            setFilteredData(wip)
            break
          case 'done':
            let closed: any[] = data.projects.filter((item: any) => item.status === 'done')
            setFilteredData(closed)
            break
          case 'all':
            setFilteredData(data.projects)
            break
          default:
            setFilteredData(data.projects)
            break
        }
      } else {
        switch (types) {
          case 'undone':
            let wip: any = user?.projects.filter((item: any) => item.status === 'undone')
            setFilteredData(wip)
            break
          case 'done':
            let closed: any = user?.projects.filter((item: any) => item.status === 'done')
            setFilteredData(closed)
            break
          case 'all':
            setFilteredData(user?.projects)
            break
          default:
            setFilteredData(user?.projects)
            break
        }
      }
      setTotalPage(data.length / pageSize)
      setMinIndex(0)
      setMaxIndex(pageSize)
    }
  }, [types, loading, error, data, userLoading, userError, totalPage, filterloading, user])

  function handleKeywordChange(e: any) {
    setLoading(true)
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredData(data.projects)
      setTypes('all')
      setLoading(false)
    } else {
      const kw: any[] = data.projects.filter((item: any) => {
        if (types === 'all') {
          return item.projectName.toLowerCase().includes(e.target.value.toLowerCase())
        } else {
          return (
            item.status === types &&
            item.projectName.toLowerCase().includes(e.target.value.toLowerCase())
          )
        }
      })
      setFilteredData(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function handleChange(value: any) {
    setTypes(value)
  }

  function handleChangeProjectType(value: any) {
    setType(value)
  }

  function showCreateProject() {
    setCreateProjectVisible(true)
  }

  function handleCancel() {
    setCreateProjectVisible(false)
  }

  function onUploadImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) {
      uploadImage({ variables: { file: file } })
      setImage(
        imageData
          ? imageData.uploadProjectImage
          : imageUpdateData && imageUpdateData.updateProjectImage
      )
    }
  }

  function onChangeImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) {
      updateImage({
        variables: {
          id: imageData
            ? imageData.uploadProjectImage.id
            : imageUpdateData && imageUpdateData.updateProjectImage.id,
          file: file,
        },
      })
      setImage(
        imageData
          ? imageData.uploadProjectImage
          : imageUpdateData && imageUpdateData.updateProjectImage
      )
    }
  }

  function handleCreateProject() {
    if (projectName !== '' && type !== '' && description !== '') {
      createProject({
        variables: {
          projectName: projectName,
          projectType: type,
          projectDetail: description,
          dueDate: new Date(dueDate),
          file: imageData
            ? imageData.uploadProjectImage.id
            : imageUpdateData && imageUpdateData.updateProjectImage.id,
          members: member,
        },
      })
      notify({
        variables: {
          message: `invited you to project ${projectName}`,
          senderId: user?.id,
          receiver: member,
          type: 'invite',
        },
      })
        .then((res) => {
          setProjectName(projectName)
          setType(type)
          setDescription(description)
          setDueDate(new Date(dueDate))
          setMember(member)
          setCreateProjectVisible(false)
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

  function handleMember(value: any) {
    const val = Number(value.reverse()[0])
    setMember([...member, { id: val }])
  }

  function onChangeDate(_: any, dateString: any) {
    setDueDate(dateString[0])
  }

  function handleChangePagination(page: any) {
    setCurrent(page)
    setMinIndex((page - 1) * pageSize)
    setMaxIndex(page * pageSize)
  }

  function disabledDate(current: any) {
    return current && current < dayjs().endOf('day')
  }

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="Projects" />
      <Divider />
      <div className="px-8">
        <Row className="justify-between mb-8">
          <Row>
            <Button type="primary" onClick={showCreateProject}>
              <PlusOutlined />
              Create
            </Button>
            <Modal
              visible={createProjectVisible}
              width={'80%'}
              title={<Text className="font-bold">Create a project</Text>}
              onCancel={handleCancel}
              footer={null}
              centered={true}
            >
              <Row className="px-24 w-full" justify="space-between">
                <Col xs={24} lg={12}>
                  <Space direction="vertical" className="flex items-center justify-center">
                    <Row className="w-full flex justify-center">
                      {loadingUpdate || loadingUpload ? (
                        <Spin>
                          <img
                            src={
                              imageData
                                ? imageData.uploadProjectImage.fullPath
                                : imageUpdateData
                                ? imageUpdateData.updateProjectImage.fullPath
                                : UnknownImage
                            }
                            className="w-10/12"
                            alt="user"
                          />
                        </Spin>
                      ) : (
                        <img
                          src={
                            imageData
                              ? imageData.uploadProjectImage.fullPath
                              : imageUpdateData
                              ? imageUpdateData.updateProjectImage.fullPath
                              : UnknownImage
                          }
                          className="w-10/12"
                          alt="user"
                        />
                      )}

                      <label
                        style={{
                          height: 30,
                          width: 90,
                        }}
                        className="appearance-none border border-gray-300 shadow-sm border flex items-center justify-center rounded-sm py-1 px-2 mt-4 cursor-pointer hover:text-blue-400 hover:border-blue-400 transition delay-100 duration-300 relative"
                      >
                        <input
                          type="file"
                          className="invisible"
                          onChange={image === undefined ? onUploadImage : onChangeImage}
                        />
                        <div className="absolute flex items-center justify-center">
                          <UploadOutlined className="mr-2" />
                          Upload
                        </div>
                      </label>
                    </Row>
                  </Space>
                </Col>
                <Col xs={24} lg={12}>
                  <Form form={form} layout="vertical">
                    <Form.Item
                      name="Project name"
                      label="Project name"
                      rules={[{ required: true, message: 'Please input project name' }]}
                      required
                    >
                      <Input
                        value={projectName}
                        placeholder="Please input project name"
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Type"
                      label="Type"
                      rules={[{ required: true, message: 'Please select type' }]}
                      required
                    >
                      <Select
                        value={type !== '' ? type : undefined}
                        placeholder="Please select type"
                        onChange={handleChangeProjectType}
                      >
                        <Option value="Data">Data</Option>
                        <Option value="Design">Design</Option>
                        <Option value="Mobile">Mobile</Option>
                        <Option value="Security">Security</Option>
                        <Option value="Web">Web</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="Members"
                      label="Members"
                      rules={[{ required: true, message: 'Please select members' }]}
                      required
                    >
                      <Select
                        mode="tags"
                        value={member.length !== 0 ? member : undefined}
                        onChange={handleMember}
                        placeholder="Please select members"
                        tokenSeparators={[',']}
                      >
                        {((usersData && usersData.users) || []).map((value: any) => (
                          <Row
                            key={value.id}
                            className="hover:bg-primary hover:text-white py-2 px-4"
                          >
                            <Avatar
                              size="small"
                              src={value.image ? value.image.fullPath : UnknownUserImage}
                              alt="user"
                              className="mr-2"
                            />
                            {value.name}
                          </Row>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="Due date"
                      label="Due date"
                      rules={[{ required: true, message: 'Please input due date' }]}
                      required
                    >
                      <DatePicker
                        value={dueDate}
                        format={customFormat}
                        className="w-full"
                        onChange={onChangeDate}
                        disabledDate={disabledDate}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Description"
                      label="Description"
                      rules={[{ required: true, message: 'Please input description' }]}
                      required
                    >
                      <TextArea
                        value={description}
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please input description"
                      />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                      {() => (
                        <Button
                          type="primary"
                          className="w-full"
                          onClick={handleCreateProject}
                          disabled={
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
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

          <Row>
            <Input
              placeholder="Search Projects"
              value={keyword}
              onChange={handleKeywordChange}
              suffix={<SearchOutlined type="secondary" />}
              className="w-96"
            />
            <Select value={types} className="w-20" onChange={handleChange}>
              <Option value="all">All</Option>
              <Option value="done">Done</Option>
              <Option value="undone">WIP</Option>
            </Select>
          </Row>
        </Row>
        {loading || error ? (
          <Row className="w-full flex justify-center">
            <Spin size="large" />
          </Row>
        ) : (
          <div className="site-card-wrapper">
            <Row gutter={[8, 24]}>
              {filteredData && !error && !loading ? (
                filteredData.length !== 0 ? (
                  filteredData
                    .slice()
                    .sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
                    .map(
                      (items: any, index: any) =>
                        index >= minIndex &&
                        index < maxIndex && (
                          <Col
                            xs={24}
                            md={10}
                            lg={8}
                            xl={6}
                            key={items.id}
                            className="w-full px-2 py-2"
                          >
                            <ProjectCard data={items} refetch={() => refetch()} />
                          </Col>
                        )
                    )
                ) : (
                  <div className="flex w-full justify-center my-8">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<Text disabled>No project Found</Text>}
                    />
                  </div>
                )
              ) : (
                <div className="flex w-full justify-center my-8">
                  <Text disabled>Error</Text>
                  <Text disabled>{error} </Text>
                </div>
              )}
            </Row>
          </div>
        )}

        <div className="flex items-end justify-end">
          <Pagination
            pageSize={pageSize}
            current={current}
            total={filteredData && filteredData.length}
            onChange={handleChangePagination}
            hideOnSinglePage={true}
          />
        </div>
      </div>
    </LayoutDashboard>
  )
}

export default ProjectList
