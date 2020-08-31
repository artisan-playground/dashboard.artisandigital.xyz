import { Table, Tag, Col, Row, Tooltip, Typography, Input } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'
import { USER_DATA } from '../DATA'
import { Link } from 'react-router-dom'

function Member() {
  const { Text } = Typography
  const { Search } = Input
  const [dataSource, setDataSource] = useState(USER_DATA)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  function handleKeywordChange(e: any) {
    setLoading(true)
    setValue(e.target.value)
    if (e.target.value === '') {
      setDataSource(USER_DATA)
      setLoading(false)
    } else {
      const kw: any[] = USER_DATA.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setDataSource(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  const columns = [
    {
      dataIndex: 'image',
      width: '5%',
      render: (image: any) => (
        <>
          {USER_DATA.filter((item: any) => item.image === image).map((item: any, index: any) => (
            <Link key={index} to={{ pathname: '/profile', state: { data: item } }}>
              <Avatar src={image} />
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
          {USER_DATA.filter((item: any) => item.name === name).map((item: any, index: any) => (
            <Link key={index} to={{ pathname: '/profile', state: { data: item } }}>
              <Text>{name}</Text>
            </Link>
          ))}
        </>
      ),
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: 'Job Position',
      dataIndex: 'position',
      width: '30%',
      sorter: (a: any, b: any) => a.position.length - b.position.length,
    },
    {
      title: 'Skill(s)',
      dataIndex: 'skills',
      width: '25%',
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
      title: 'Project(s)',
      dataIndex: 'projects',
      width: '20%',
      render: (projects: any) => (
        <>
          {projects
            ? projects.map((project: any, index: any) => (
                <Link to={{ pathname: `/projects/${project.id}`, state: { data: project } }}>
                  <Tooltip placement="top" title={project.projectName}>
                    <Avatar src={project.projectImage} key={index} className="mr-1" />
                  </Tooltip>
                </Link>
              ))
            : ''}
        </>
      ),
      sorter: (a: any, b: any) => a.projects.length - b.projects.length,
    },
  ]

  return (
    <LayoutDashboard noCard>
      <Row>
        <Col xs={24} xl={24}>
          <Col className='flex justify-end'>
            <Search
              placeholder="Search Name"
              value={value}
              onChange={handleKeywordChange}
              loading={loading}
              allowClear
              className="w-1/3 mb-4"
            />
          </Col>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1000 }}
          />
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default Member
