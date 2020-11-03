import { PlusCircleOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Button, Col, Empty, Input, Radio, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  LoadingComponent,
  ProjectCard,
  ProjectDrawer,
} from '../components/DashboardComponent'
import { PROJECT } from '../services/api/project'

function ProjectList() {
  const { Search } = Input
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

  function closeDawer() {
    setDrawerVisible(false)
  }

  return (
    <LayoutDashboard noCard>
      <Row className="justify-between">
        <Row>
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
          <ProjectDrawer
            visibillity={drawerVisible}
            onCloseDrawer={closeDawer}
            refetch={() => refetch()}
          />
        </Row>

        <Row>
          <Row className="justify-end">
            <Search
              placeholder="input search loading default"
              value={keyword}
              onChange={handleKeywordChange}
              loading={filterloading}
            />
            <Radio.Group className="my-4" value={types} onChange={(e) => setTypes(e.target.value)}>
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="undone">WIP</Radio.Button>
              <Radio.Button value="done">Closed</Radio.Button>
            </Radio.Group>
          </Row>
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
                  <Col span={24} key={items.id}>
                    <ProjectCard data={items} />
                  </Col>
                ))
              ) : (
                <div className="flex w-full justify-center my-8">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<Text disabled>No Projects Found</Text>}
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
    </LayoutDashboard>
  )
}

export default ProjectList
