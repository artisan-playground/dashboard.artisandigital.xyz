import { Col, Empty, Radio, Row, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {
  LayoutProfile,
  ProfileProjectCard,
  ProfileTaskCard,
} from '../components/DashboardComponent'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

function Profile(props: any) {
  const { Title } = Typography
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const data = props.location.state.data

  useEffect(() => {
    switch (types) {
      case 'undone':
        let wip: any[] = data.projectIds.filter((item: any) => item.status === 'undone')
        setFilteredData(wip)
        break
      case 'done':
        let closed: any[] = data.projectIds.filter((item: any) => item.status === 'done')
        setFilteredData(closed)
        break
      case 'all':
        setFilteredData(data.projectIds)
        break
      default:
        setFilteredData(data.projectIds)
        break
    }
  }, [types, data])

  function handleTypeChange(e: any) {
    setTypes(e.target.value)
  }

  const CustomDot = ({ onClick, active }: any) => {
    return (
      <Button
        style={{ backgroundColor: active ? '#105EFC' : '#AAAAAA' }}
        className="rounded-full h-1 w-1"
        onClick={() => onClick()}
      >
        &nbsp;
      </Button>
    )
  }

  const CustomLeftArrow = ({ onClick }: any) => (
    <Button
      type="primary"
      className="absolute left-0 rounded-full flex items-center w-12 h-12"
      onClick={() => onClick()}
    >
      <LeftOutlined className="text-lg" />
    </Button>
  )
  const CustomRightArrow = ({ onClick }: any) => (
    <Button
      type="primary"
      className="absolute right-0 rounded-full flex items-center w-12 h-12"
      onClick={() => onClick()}
    >
      <RightOutlined className="text-lg" />
    </Button>
  )

  return (
    <LayoutProfile data={data}>
      <Title level={3}>Today's Tasks</Title>
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
            renderDotsOutside={true}
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
            customDot={<CustomDot />}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
          >
            {data.taskIds ? (
              data.taskIds.map((items: any, index: any) => (
                <Col lg={{ span: 24 }} key={index} className="mr-4 my-4">
                  <ProfileTaskCard data={items} />
                </Col>
              ))
            ) : (
              <Col lg={{ span: 24 }}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  className="flex items-center justify-center text-center"
                />
              </Col>
            )}
          </Carousel>
        </div>
      </div>

      <Row className="mb-2">
        <Col flex={1}>
          <Row>
            <Title level={3}>Projects</Title>
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
          <Col xs={24} className="flex items-center justify-center text-center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Col>
        )}
      </Row>
    </LayoutProfile>
  )
}

export default Profile
