import { Col, Empty, Radio, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
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
      <div className="relative mr-auto ml-auto max-w-screen-md">
        <div className="w-full">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={true}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 2000,
                  min: 1024,
                },
                items: 2,
                partialVisibilityGutter: 40,
              },
            }}
            showDots={true}
            sliderClass=""
            slidesToSlide={3}
            swipeable
          >
            {TASK_DATA.map((items, index) => (
              <Col lg={{ span: 24 }} key={index} className="mr-4 my-4">
                <ProfileTaskCard data={items} />
              </Col>
            ))}
          </Carousel>
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
