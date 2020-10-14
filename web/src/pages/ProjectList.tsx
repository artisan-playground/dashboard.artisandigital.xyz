import { useQuery } from '@apollo/client'
import { Col, Input, Radio, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { PROJECT } from '../services/api/project'
import { LayoutDashboard, LoadingComponent, ProjectCard } from '../components/DashboardComponent'

function ProjectList() {
  const { Search } = Input
  const { Text } = Typography
  const { loading, error, data } = useQuery(PROJECT)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [filterloading, setLoading] = useState(false)

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

  return (
    <LayoutDashboard noCard>
      <Row className="justify-end">
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
                  <Text disabled>No Projects Found</Text>
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
