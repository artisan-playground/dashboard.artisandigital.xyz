import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LayoutDashboard, ProjectCard } from '../components/DashboardComponent'
import { DATA } from '../DATA'

function ProjectList() {
  const location = useLocation()
  const [filteredData, setFilteredData] = useState<any[]>([])

  function getTypes() {
    const params = new URLSearchParams(location.search)
    return params.get('types') ? params.get('types') : ''
  }

  useEffect(() => {
    switch (getTypes()) {
      case 'wip':
        let wip: any[] = DATA.filter((item) => item.status === 'undone')
        setFilteredData(wip)
        break
      case 'closed':
        let closed: any[] = DATA.filter((item) => item.status === 'done')
        setFilteredData(closed)
        break
      case '':
        setFilteredData(DATA)
        break
      default:
        setFilteredData(DATA)
        break
    }
  }, [getTypes()]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LayoutDashboard>
      <div className="font-bold text-2xl mb-4">Projects</div>
      <div className="site-card-wrapper">
        <Row gutter={[8, 24]}>
          {filteredData.map((items, index) => {
            return (
              <Col span={24} key={index}>
                <ProjectCard data={items} />
              </Col>
            )
          })}
        </Row>
      </div>
    </LayoutDashboard>
  )
}

export default ProjectList
