import { Card, Col, Row, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { EventCard, LayoutDashboard } from '../components/DashboardComponent'
import { useQuery } from '@apollo/client'
import { EVENT } from '../services/api/event'

function News() {
  const { Text } = Typography
  const { Meta } = Card
  const { data } = useQuery(EVENT)

  return (
    <LayoutDashboard noCard>
      <div className="font-bold text-2xl mb-4">Event</div>
      <Row className="w-full  overflow-y-auto mb-4 p-4"><EventCard data={data} /></Row>

      <div className="font-bold text-2xl mb-4">Paragraph #2</div>
      <Row className="w-full  overflow-y-auto mb-4 p-4">
        <Card hoverable className="w-full rounded-lg shadow-lg">
          <Row>
            <Col span={24} md={{ span: 10 }}>
              <img
                src="https://source.unsplash.com/600x600/?seal"
                alt="kityy1"
                className="rounded-lg"
              />
            </Col>
            <Col span={24} md={{ span: 10 }} className="p-4 ml-4">
              <Text className="font-bold text-lg">News #1</Text>
              <br />
              <Text>
                Vitae auctor eu augue ut lectus arcu bibendum at varius. Ultricies lacus sed turpis
                tincidunt id aliquet risus feugiat in. Pharetra massa massa ultricies mi quis
                hendrerit dolor magna. Leo duis ut diam quam nulla. Commodo sed egestas egestas
                fringilla phasellus faucibus scelerisque. Gravida neque convallis a cras semper
                auctor neque. Viverra orci sagittis eu volutpat odio facilisis mauris sit. Justo
                donec enim diam vulputate. Pellentesque pulvinar pellentesque habitant morbi.
                Bibendum arcu vitae elementum curabitur vitae. Sapien nec sagittis aliquam malesuada
                bibendum arcu vitae elementum. Risus sed vulputate odio ut enim. Habitant morbi
                tristique senectus et netus et malesuada fames ac. Nec ullamcorper sit amet risus.
                Nam libero justo laoreet sit amet cursus sit amet dictum. Facilisi cras fermentum
                odio eu feugiat pretium nibh ipsum consequat.
              </Text>
            </Col>
          </Row>
        </Card>
      </Row>

      <div className="font-bold text-2xl mb-4">Paragraph #1</div>
      <Row className="w-full justify-center overflow-y-auto mb-4 p-2">
        <Col span={24} md={{ span: 7 }} className="mx-2 mb-2">
          <Card
            hoverable
            className="w-full rounded-lg shadow-lg"
            cover={<img src="https://source.unsplash.com/600x600/?cat" alt="kityy1" />}
          >
            <Meta
              avatar={<Avatar src="https://source.unsplash.com/600x600/?user" />}
              title="Kitty 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua."
            />
            <Row className="justify-between mt-4 pl-12">
              <Col span={24} xl={{ span: 12 }}>
                <Text disabled>{new Date().toLocaleDateString()}</Text>
              </Col>
              <Col span={24} xl={{ span: 12 }}>
                <a href="/news">Read more</a>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={{ span: 7 }} className="mx-2 mb-2">
          <Card
            hoverable
            className="w-full rounded-lg shadow-lg"
            cover={<img src="https://source.unsplash.com/600x601/?cat" alt="kityy2" />}
          >
            <Meta
              avatar={<Avatar src="https://source.unsplash.com/600x601/?user" />}
              title="Kitty 2"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua."
            />
            <Row className="justify-between mt-4 pl-12">
              <Col span={24} xl={{ span: 12 }}>
                <Text disabled>{new Date().toLocaleDateString()}</Text>
              </Col>
              <Col span={24} xl={{ span: 12 }}>
                <a href="/news">Read more</a>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} md={{ span: 7 }} className="mx-2 mb-2">
          <Card
            hoverable
            className="w-full rounded-lg shadow-lg"
            cover={<img src="https://source.unsplash.com/601x600/?cat" alt="kityy1" />}
          >
            <Meta
              avatar={<Avatar src="https://source.unsplash.com/601x600/?user" />}
              title="Kitty 3"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua."
            />
            <Row className="justify-between mt-4 pl-12">
              <Col span={24} xl={{ span: 12 }}>
                <Text disabled>{new Date().toLocaleDateString()}</Text>
              </Col>
              <Col span={24} xl={{ span: 12 }}>
                <a href="/news">Read more</a>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default News
