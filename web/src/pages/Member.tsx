import { UserOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Col, Input, Row, Table, Tag, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'
import { GET_USERS } from '../services/api/user'

function Member() {
  const { Text } = Typography
  const { Search } = Input
  const { loading, error, data } = useQuery(GET_USERS)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [value, setValue] = useState('')
  const [searchLoading, setLoading] = useState(false)

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

  useEffect(() => {
    if (!error && !loading) {
      setDataSource(data.users)
    }
  }, [loading, error, data])

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
  ]

  return (
    <LayoutDashboard noCard>
      <Row>
        <Col xs={24} xl={24}>
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
