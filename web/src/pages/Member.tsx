import { CloseCircleOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  PageHeader,
  Row,
  Select,
  Table,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'
import { CREATE_NOTIFICATION } from '../services/api/notification'
import {
  ADD_MEMBER_TO_PROJECT,
  DELETE_MEMBER_FROM_PROJECT,
  GET_PROJECT_BY_ID,
} from '../services/api/project'
import { GET_USERS } from '../services/api/user'
import { useStoreState } from '../store'

function Member() {
  const { Text } = Typography
  const { Option } = Select
  const [deleteMember] = useMutation(DELETE_MEMBER_FROM_PROJECT)
  const [addMember] = useMutation(ADD_MEMBER_TO_PROJECT)
  const [userDataSource, setUserDataSource] = useState<any>()
  const [dataSource, setDataSource] = useState<any>()
  const [value, setValue] = useState('')
  const [members, setMembers] = useState([])
  const [visible, setVisible] = useState(false)
  const [formLayout] = useState('horizontal')
  const { projectId }: any = useParams()
  const { loading: userLoading, data: userData, error: userError } = useQuery(GET_USERS)
  const { loading, error, data, refetch } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: Number(projectId) },
    notifyOnNetworkStatusChange: true,
  })
  const user = useStoreState((s) => s.userState.user)
  const [createNotification] = useMutation(CREATE_NOTIFICATION)

  useEffect(() => {
    if (!error && !loading && !userLoading && !userError && userData && data) {
      setDataSource(data.project.members)
      setUserDataSource(userData.users)
    }
  }, [loading, error, data, deleteMember, addMember, userData, userLoading, userError])

  function handleKeywordChange(e: any) {
    setValue(e.target.value)
    if (e.target.value === '') {
      setDataSource(data.project.members)
    } else {
      const kw: any[] = data.project.members.filter((item: any) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setDataSource(kw)
    }
  }

  function handleDelete(key: any) {
    const dataTable = [...dataSource]
    if (dataSource) {
      deleteMember({ variables: { projectId: data && data.project.id, memberId: key } }).then(
        (res) => {
          if (res) {
            setDataSource(dataTable.filter((item: any) => item.key !== key))
            setVisible(false)
            refetch()
          }
        }
      )
      createNotification({
        variables: {
          update: `${user?.name} remove you from project ${data.project.name}`,
          userId: key,
          authorId: user?.id,
          type: 'delete',
        },
      }).catch((err) => {
        message.error({
          content: `Error : ${err}`,
          duration: 2,
          icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
        })
      })
    }
  }

  function handleAdd() {
    if (dataSource) {
      addMember({
        variables: { id: Number(projectId), memberId: members },
      })
      createNotification({
        variables: {
          update: `${user?.name} invited you to project ${data.project.name}`,
          userId: members,
          authorId: user?.id,
          type: 'invite',
        },
      })
        .then((res) => {
          if (res) {
            setMembers(members)
            setVisible(false)
            refetch()
          }
        })
        .catch((err) => {
          message.error({
            content: `Error : ${err}`,
            duration: 2,
            icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
          })
        })
    }
  }

  function handleCancel() {
    setVisible(false)
  }

  function openModal() {
    setVisible(true)
  }

  const columns = [
    {
      dataIndex: 'image',
      width: '5%',
      render: (text: any, item: any) => (
        <>
          <Link key={item.id} to={{ pathname: `/profile/${item.id}` }}>
            <Avatar
              src={item.image ? item.image.fullPath : require('../assets/images/unknown_user.png')}
            />
          </Link>
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      render: (name: any) => (
        <>
          {dataSource
            .filter((item: any) => item.name === name)
            .map((item: any) => (
              <Link key={item.id} to={{ pathname: `/profile/${item.id}` }}>
                <Text>{name}</Text>
              </Link>
            ))}
        </>
      ),
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '25%',
      render: (email: any) => (
        <>
          {dataSource
            .filter((item: any) => item.email === email)
            .map((item: any) => (
              <Link key={item.id} to={{ pathname: `/profile/${item.id}` }}>
                <Text>{email}</Text>
              </Link>
            ))}
        </>
      ),
      sorter: (a: any, b: any) => a.email.length - b.email.length,
    },
    {
      title: 'Telephone',
      dataIndex: 'phone',
      width: '20%',
      render: (_: any, item: any) => (
        <>
          <Link key={item.id} to={{ pathname: `/profile/${item.id}` }}>
            {item.phone ? <Text>0{item.phone}</Text> : <Text>-</Text>}
          </Link>
        </>
      ),
      sorter: (a: any, b: any) => a.phone.length - b.phone.length,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      width: '20%',
      render: (position: any) => (
        <>
          {dataSource
            .filter((item: any) => item.position === position)
            .map((item: any) => (
              <Link key={item.id} to={{ pathname: `/profile/${item.id}` }}>
                <Text>{position}</Text>
              </Link>
            ))}
        </>
      ),
      sorter: (a: any, b: any) => a.position.length - b.position.length,
    },
    {
      dataIndex: 'operation',
      width: '5%',
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <>
            <Button
              danger
              type="text"
              shape="circle"
              className="flex items-center justify-center"
              onClick={() => handleConfirm(record)}
            >
              <DeleteOutlined />
            </Button>
          </>
        ) : null,
    },
  ]

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 3 },
          wrapperCol: { span: 24 },
        }
      : null

  function onChangeMember(value: any) {
    setMembers(value[0])
  }

  function handleConfirm(record: any) {
    Modal.confirm({
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
      title: <Text className="font-bold">Delete member from project</Text>,
      content: <Text>Do you want to delete “{record.name}" from this project?</Text>,
      okText: 'Yes',
      onOk: () => {
        handleDelete(record.id)
      },
    })
  }

  return (
    <LayoutDashboard noCard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>
          <Link to={{ pathname: `/projects` }}>Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{data && data?.project.projectName}</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        className="site-page-header"
        title={<Text>Members</Text>}
        onBack={() => window.history.back()}
      />
      <Divider />
      <Row>
        <Col xs={24} xl={24}>
          <Col className="flex justify-start px-8 mb-8">
            <Row>
              <Text className="font-bold text-lg mb-4">
                Members ({dataSource ? dataSource.length : 0})
              </Text>
              <Col>
                <Button
                  onClick={openModal}
                  type="primary"
                  className="flex items-center justify-center bg-secondary hover:bg-primary border-none"
                >
                  Add member
                </Button>
              </Col>
              <Modal
                title={<Text className="font-bold">Add member</Text>}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <Form className="mt-8" {...formItemLayout}>
                  <Form.Item name="member" rules={[{ required: true, message: 'Select member' }]}>
                    <Select
                      mode="tags"
                      placeholder="Please select member"
                      onChange={onChangeMember}
                      style={{ width: '100%' }}
                    >
                      {userDataSource &&
                        userDataSource.map((item: any) => (
                          <Option value={item.id}>
                            <Avatar
                              shape="circle"
                              size="small"
                              src={
                                item.image
                                  ? item.image.fullPath
                                  : require('../assets/images/unknown_user.png')
                              }
                              className="mr-2"
                            />
                            {item.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <div className="flex items-end justify-end">
                      <Button
                        type="primary"
                        onClick={handleAdd}
                        className="flex items-center justify-center bg-secondary hover:bg-primary border-none"
                      >
                        Add
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
            </Row>
            <Col className="flex items-end justify-end w-full">
              <Input
                placeholder="Search name..."
                value={value}
                onChange={handleKeywordChange}
                suffix={<SearchOutlined className="text-gray-300" />}
                className="w-96"
              />
            </Col>
          </Col>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10, hideOnSinglePage: true }}
            scroll={{ x: 1000 }}
            rowKey={(record) => record.id}
          />
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default Member
