import { Col, Input, Radio, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { LayoutDashboard, ProjectCard } from '../components/DashboardComponent'
import { DATA } from '../DATA'

function ProjectList() {
  const { Search } = Input
  const { Text } = Typography

  const [filteredData, setFilteredData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    switch (types) {
      case 'undone':
        let wip: any[] = DATA.filter((item) => item.status === 'undone')
        setFilteredData(wip)
        break
      case 'done':
        let closed: any[] = DATA.filter((item) => item.status === 'done')
        setFilteredData(closed)
        break
      case 'all':
        setFilteredData(DATA)
        break
      default:
        setFilteredData(DATA)
        break
    }
  }, [types]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleKeywordChange(e: any) {
    setLoading(true)
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredData(DATA)
      setTypes('all')
      setLoading(false)
    } else {
      const kw: any[] = DATA.filter((item) => {
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
    <LayoutDashboard>
      <Row className="justify-between">
        <div className="font-bold text-2xl mb-4">Projects</div>
        <Row className="justify-end">
          <Search
            placeholder="input search loading default"
            value={keyword}
            onChange={handleKeywordChange}
            loading={loading}
          />
          <Radio.Group className="my-4" value={types} onChange={(e) => setTypes(e.target.value)}>
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="undone">WIP</Radio.Button>
            <Radio.Button value="done">Closed</Radio.Button>
          </Radio.Group>
        </Row>
      </Row>
      <div className="site-card-wrapper">
        <Row gutter={[8, 24]}>
          {filteredData.length !== 0 ? (
            filteredData.map((items, index) => (
              <Col span={24} key={index}>
                <ProjectCard data={items} />
              </Col>
            ))
          ) : (
            <div className="flex w-full justify-center my-8">
              <Text disabled>Not found</Text>
            </div>
          )}
        </Row>
      </div>
    </LayoutDashboard>
  )
}

export default ProjectList
