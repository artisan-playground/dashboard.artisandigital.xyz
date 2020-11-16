import { CloseCircleOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Table,
  Tag,
  Typography,
} from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'
import { CREATE_USER, DELETE_USER, GET_USERS } from '../services/api/user'
import { User } from '../typings'

function Member() {
  const { Text } = Typography
  const { Search } = Input
  const { loading, error, data, refetch } = useQuery(GET_USERS)
  const [deleteUser] = useMutation(DELETE_USER)
  const [createUser] = useMutation(CREATE_USER)
  const [dataSource, setDataSource] = useState<any>()
  const [value, setValue] = useState('')
  const [searchLoading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  const [type, setType] = useState('')
  const [skill, setSkill] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!error && !loading) {
      setDataSource(data.users)
    }
  }, [loading, error, data, deleteUser, createUser])

  function handleKeywordChange(e: any) {
    setLoading(true)
    setValue(e.target.value)
    if (e.target.value === '') {
      setDataSource(data.users)
      setLoading(false)
    } else {
      const kw: any[] = data.users.filter((item: any) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setDataSource(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function handleDelete(key: any) {
    const dataTable = [...dataSource]
    setDataSource(dataTable.filter((item: any) => item.key !== key))
    deleteUser({ variables: { id: key } })
    refetch()
  }

  function handleAdd() {
    if (dataSource) {
      createUser({
        variables: {
          email: email,
          name: name,
          department: department,
          type: type,
          position: position,
        },
      })
        .then((res) => {
          if (res) {
            const tempData: User = dataSource ? { ...dataSource } : { ...data }
            setDataSource(tempData)
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
      render: (image: any) => (
        <>
          {data.users
            .filter((item: any) => item.image === image)
            .map((item: any) => (
              <Link key={item.id} to={{ pathname: `/profile/${item.id}` }}>
                {image ? (
                  <Avatar src={image.fullPath} />
                ) : (
                  <Avatar
                    icon={<UserOutlined />}
                    className="bg-primary flex items-center justify-center"
                  />
                )}
              </Link>
            ))}
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      render: (name: any) => (
        <>
          {data.users
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
      title: 'Department',
      dataIndex: 'department',
      width: '15%',
      sorter: (a: any, b: any) => a.department.length - b.department.length,
    },
    {
      title: 'Job Position',
      dataIndex: 'position',
      width: '20%',
      sorter: (a: any, b: any) => a.position.length - b.position.length,
    },
    {
      dataIndex: 'type',
      width: '10%',
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      width: '35%',
      render: (skills: any) => (
        <>
          {skills.map((skill: any, index: any) => (
            <Tag color="blue" key={index}>
              {skill}
            </Tag>
          ))}
        </>
      ),
      sorter: (a: any, b: any) => a.skills.length - b.skills.length,
    },
    {
      title: 'Projects',
      dataIndex: 'projects',
      width: '10%',
      render: (projects: any) => <>{projects.filter((item: any) => item).length}</>,
      sorter: (a: any, b: any) => a.projects.length - b.projects.length,
    },
    {
      dataIndex: 'operation',
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Are you sure to delete this member?"
            placement="topRight"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="text" shape="circle" className="flex items-center justify-center">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        ) : null,
    },
  ]

  return (
    <LayoutDashboard noCard>
      <Row>
        <Col xs={24} xl={24}>
          <Col className="flex justify-start">
            <Button
              onClick={openModal}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Add member
            </Button>
            <Modal visible={visible} onCancel={handleCancel} footer={null}>
              <Form className="mt-8">
                <Form.Item label="Email" rules={[{ type: 'email' }]}>
                  <Input
                    placeholder="Please enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Name">
                  <Input
                    placeholder="Please enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handleAdd}>
                    Add member
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Col>
          <Col className="flex justify-end">
            <Search
              placeholder="Search Name"
              value={value}
              onChange={handleKeywordChange}
              loading={searchLoading}
              allowClear
              className="w-1/3 mb-4"
            />
          </Col>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1000 }}
            rowKey={(record) => record.id}
          />
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default Member
