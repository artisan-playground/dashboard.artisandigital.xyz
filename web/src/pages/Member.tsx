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
import UnknownUserImage from '../assets/images/unknown_user.png'
import { LayoutDashboard } from '../components/DashboardComponent'
import {
  ADD_MEMBER_TO_PROJECT,
  DELETE_MEMBER_FROM_PROJECT,
  GET_PROJECT_BY_ID,
} from '../services/api/project'
import { ADD_RECENT_ACTIVITY } from '../services/api/recentActivity'
import { GET_USERS } from '../services/api/user'
import { useStoreState } from '../store'

function Member() {
  const { Text } = Typography
  const [deleteMember] = useMutation(DELETE_MEMBER_FROM_PROJECT)
  const [addMember] = useMutation(ADD_MEMBER_TO_PROJECT)
  const [userDataSource, setUserDataSource] = useState<any>()
  const [dataSource, setDataSource] = useState<any>()
  const [value, setValue] = useState('')
  const [members, setMembers] = useState<any[]>([])
  const [userList, setUserList] = useState<any[]>([])
  const [visible, setVisible] = useState(false)
  const [formLayout] = useState('horizontal')
  const [memberName, setMemberName] = useState<any[]>([])
  const { projectId }: any = useParams()
  const { loading: userLoading, data: userData, error: userError } = useQuery(GET_USERS)
  const { loading, error, data, refetch } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: Number(projectId) },
    notifyOnNetworkStatusChange: true,
  })
  const user = useStoreState((s) => s.userState.user)
  const [addRecentActivity] = useMutation(ADD_RECENT_ACTIVITY)

  useEffect(() => {
    if (!error && !loading && !userLoading && !userError && userData && data) {
      setDataSource(data.project.members)
      setUserDataSource(userData.users)
      setUserList(data.project.members)
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

  function handleDelete(key: any, memberName: any) {
    const dataTable = [...dataSource]
    if (dataSource) {
      deleteMember({ variables: { projectId: data && data.project.id, members: key } }).then(
        (res) => {
          if (res) {
            setDataSource(dataTable.filter((item: any) => item.key !== key))
            setVisible(false)
            refetch()
          }
        }
      )
      addRecentActivity({
        variables: {
          message: `Removed ${memberName} from project`,
          userId: user?.id,
          projectId: Number(projectId),
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
        variables: { id: Number(projectId), members: members },
      })
      addRecentActivity({
        variables: {
          message: `Invited ${memberName} to project`,
          userId: user?.id,
          projectId: Number(projectId),
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

  function handleMember(value: any) {
    const val = Number(value.reverse()[0])
    const memberName = userDataSource.find((item: any) => item.id === val)
    const name = memberName.name
    setMembers((prevState) => [...prevState, { id: val }])
    setMemberName((prevState) => [...prevState, name])
  }

  const columns = [
    {
      dataIndex: 'image',
      width: '5%',
      render: (text: any, item: any) => (
        <>
          <Link key={item.id} to={{ pathname: `/profile/${item.id}` }}>
            <Avatar src={item.image ? item.image.fullPath : UnknownUserImage} alt="user" />
          </Link>
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      render: (position: any) => (
        <>
          {dataSource
            .filter((item: any) => item.position === position)
            .map((item: any) => (
              <Link key={item.id} to={{ pathname: `/profile/${item.id}` }}>
                {item.position ? <Text>{item.position}</Text> : <Text>-</Text>}
              </Link>
            ))}
        </>
      ),
      sorter: (a: any, b: any) => a.position.length - b.position.length,
    },
    {
      dataIndex: 'operation',
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <>
            <Button danger type="text" shape="circle" onClick={() => handleConfirm(record)}>
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

  function handleConfirm(record: any) {
    Modal.confirm({
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
      title: <Text className="font-bold">Delete member from project</Text>,
      content: <Text>Do you want to delete “{record.name}" from this project?</Text>,
      okText: 'Yes',
      onOk: () => {
        handleDelete(record.id, record.name)
      },
    })
  }

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>
          <Link to={{ pathname: `/projects` }}>Projects</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={{ pathname: `/projects/${projectId}` }}>
            {data && data?.project.projectName}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Members</Breadcrumb.Item>
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
                <Button onClick={openModal} type="primary">
                  Add member
                </Button>
              </Col>
              <Modal
                title={<Text className="font-bold">Add member</Text>}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                centered={true}
              >
                <Form className="mt-8" {...formItemLayout}>
                  <Form.Item
                    name="member"
                    rules={[{ required: true, message: 'Select member' }]}
                    required
                  >
                    <Select
                      mode="tags"
                      value={userList}
                      onChange={handleMember}
                      tokenSeparators={[', ']}
                      style={{ width: '100%' }}
                    >
                      {userDataSource &&
                        userDataSource
                          .filter(
                            (user: any) =>
                              !userList.find((member: any) => user.name === member.name)
                          )
                          .map((item: any) => (
                            <Row
                              key={item.id}
                              className="hover:bg-primary hover:text-white py-2 px-4"
                            >
                              <Avatar
                                size="small"
                                src={item.image ? item.image.fullPath : UnknownUserImage}
                                alt="user"
                                className="mr-2"
                              />
                              {item.name}
                            </Row>
                          ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <div className="flex items-end justify-end">
                      <Button type="primary" onClick={handleAdd}>
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
            rowKey={(record) => record.id}
          />
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default Member
