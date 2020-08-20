import { Col, Empty, Radio, Row, Typography } from 'antd'
import { useEmblaCarousel } from 'embla-carousel/react'
import React, { useEffect, useState } from 'react'
import {
  LayoutProfile,
  ProfileProjectCard,
  ProfileTaskCard,
} from '../components/DashboardComponent'
import { DATA, TASK_DATA } from '../DATA'
import '../styles/embla.css'

function Profile() {
  const { Title } = Typography
  const [EmblaCarouselReact] = useEmblaCarousel()
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [types, setTypes] = useState('all')

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
  }, [types])

  function handleTypeChange(e: any) {
    setTypes(e.target.value)
  }

  return (
    <LayoutProfile>
      <Title level={3}>Today's task</Title>
      <div className="embla">
        <EmblaCarouselReact className="embla__viewport">
          <div className="embla__container">
            {TASK_DATA.map((items, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <Col lg={{ span: 24 }} key={index}>
                    <ProfileTaskCard data={items} />
                  </Col>
                </div>
              </div>
            ))}
          </div>
        </EmblaCarouselReact>
      </div>

      <Row gutter={[8, 24]} className="mb-2">
        <Col flex={1}>
          <Row>
            <Title level={3}>Project(s)</Title>
          </Row>
        </Col>
        <Col>
          <Radio.Group defaultValue="all" size="large" onChange={handleTypeChange}>
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="undone">WIP</Radio.Button>
            <Radio.Button value="done">Closed</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      <Row gutter={[8, 24]}>
        {filteredData.length !== 0 ? (
          filteredData.map((items, index) => {
            return (
              <Col span={8} key={index}>
                <ProfileProjectCard data={items} />
              </Col>
            )
          })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="flex items-center justify-center text-center"
          />
        )}
      </Row>
    </LayoutProfile>
  )
}

export default Profile
