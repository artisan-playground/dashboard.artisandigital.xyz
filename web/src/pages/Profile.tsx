import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Col, Empty, Radio, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import ItemsCarousel from 'react-items-carousel'
import {
  LayoutProfile,
  ProfileProjectCard,
  ProfileTaskCard,
} from '../components/DashboardComponent'
import { DATA, TASK_DATA } from '../DATA'

function Profile() {
  const { Title } = Typography
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const [activeItemIndex, setActiveItemIndex] = useState(0)

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
      <div className="relative mr-auto ml-auto mb-12 max-w-screen-md">
        <div className="w-full">
          <ItemsCarousel
            infiniteLoop={false}
            gutter={16}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={3}
            slidesToScroll={3}
            outsideChevron={true}
            showSlither={true}
            firstAndLastGutter={true}
            activeItemIndex={activeItemIndex}
            requestToChangeActive={setActiveItemIndex}
            rightChevron={<RightOutlined />}
            leftChevron={<LeftOutlined />}
          >
            {TASK_DATA.map((items, index) => (
              <Col lg={{ span: 24 }} key={index}>
                <ProfileTaskCard data={items} />
              </Col>
            ))}
          </ItemsCarousel>
        </div>
      </div>

      <Row className="mb-2">
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

      <Row>
        {filteredData.length !== 0 ? (
          filteredData.map((items, index) => {
            return (
              <Col xs={24} xl={{ span: 8 }} key={index} className="w-full px-2 py-2">
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
