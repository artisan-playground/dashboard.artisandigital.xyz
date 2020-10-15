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
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_ID } from '../services/api/user'

function Profile() {
  const { Title, Text } = Typography
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [filteredTaskData, setFilteredTaskData] = useState<any[]>([])
  const [userData, setUserData] = useState<any[]>([])
  const [userContactData, setUserContactData] = useState<any[]>([])
  const [projectData, setProjectData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const { id }: any = useParams()
  const { loading, error, data } = useQuery(GET_USER_BY_ID, { variables: { id: Number(id) } })

  useEffect(() => {
    switch (types) {
      case 'undone':
        let wip: any[] = data.user.projects.filter((item: any) => item.status === 'undone')
        setFilteredData(wip)
        break
      case 'done':
        let closed: any[] = data.user.projects.filter((item: any) => item.status === 'done')
        setFilteredData(closed)
        break
      case 'all':
        if (!error && !loading) {
          setFilteredData(data.user.projects)
        }
        break
      default:
        if (!error && !loading) {
          setFilteredData(data.user.projects)
        }
        break
    }
  }, [types, data, error, loading])

  useEffect(() => {
    if (!error && !loading) {
      setFilteredTaskData(data.user.tasks)
      setUserData(data.user)
      setUserContactData(data.user.contacts)
      setProjectData(data.user.projects)
    }
  }, [data, error, loading])

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
    <LayoutProfile data={userData} project={projectData} contact={userContactData}>
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
            {filteredTaskData ? (
              filteredTaskData
                .filter((tasks: any) => tasks.isDone === false)
                .map((items: any) => (
                  <Col lg={{ span: 24 }} key={items.id} className="mr-4 my-4">
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
        {filteredData ? (
          filteredData.length !== 0 ? (
            filteredData.map((items) => (
              <Col xs={24} xl={{ span: 8 }} key={items.id} className="w-full px-2 py-2">
                <ProfileProjectCard data={items} />
              </Col>
            ))
          ) : (
            <Col xs={24} className="flex items-center justify-center text-center">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          )
        ) : (
          <div className="flex w-full justify-center my-8">
            <Text disabled>Error</Text>
          </div>
        )}
      </Row>
    </LayoutProfile>
  )
}

export default Profile
