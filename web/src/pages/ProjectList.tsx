import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Empty,
  Input,
  PageHeader,
  Row,
  Select,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, LoadingComponent, ProjectCard } from '../components/DashboardComponent'
import { PROJECT } from '../services/api/project'

function ProjectList() {
  const { Option } = Select
  const { Text } = Typography
  const { loading, error, data, refetch } = useQuery(PROJECT)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [filterloading, setLoading] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)

  useEffect(() => {
    if (!error && !loading) {
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
    }
  }, [types, loading, error, data])

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
            <Link to={{ pathname: `/new-zone` }}>
              <Button
                className="flex items-center justify-center bg-secondary hover:bg-primary transition duration-200 ease-in border-none"
                type="primary"
              >
                <PlusOutlined />
                Create
              </Button>
            </Link>
          </Row>

          <Row>
            <Input
              placeholder="Search Projects"
              value={keyword}
              onChange={handleKeywordChange}
              suffix={<SearchOutlined type="secondary" />}
              className="w-96"
            />
            <Select defaultValue={types} className="w-20" onChange={handleChange}>
              <Option value="all">All</Option>
              <Option value="done">Done</Option>
              <Option value="undone">WIP</Option>
            </Select>
          </Row>
        </Row>
        {loading || error ? (
          <LoadingComponent project />
        ) : (
          <div className="site-card-wrapper">
            <Row gutter={[8, 24]}>
              {filteredData && !error && !loading ? (
                filteredData.length !== 0 ? (
                  filteredData.map((items) => (
                    <Col xs={24} xl={6} key={items.id} className="w-full px-2 py-2">
                      <ProjectCard data={items} refetch={() => refetch()} />
                    </Col>
                  ))
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
      </div>
    </LayoutDashboard>
  )
}

export default ProjectList
