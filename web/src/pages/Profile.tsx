import { RightOutlined } from '@ant-design/icons'
import { Button, Card, Col, Radio, Row, Typography } from 'antd'
import React from 'react'
import { LayoutProfile } from '../components/DashboardComponent'

function Profile() {
  const { Title } = Typography

  return (
    <>
      <LayoutProfile>
        <Col className="mb-12">
          <Title level={3}>Today's task</Title>
          <Row gutter={16}>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </Col>

        <Col>
          <Row className="mb-2">
            <Col flex={1}>
              <Row>
                <Title level={3}>Project(s)</Title>
                <Button
                  type="primary"
                  className="self-center"
                  icon={<RightOutlined className="-pt-8" />}
                  size="large"
                />
              </Row>
            </Col>
            <Col>
              <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="a">All</Radio.Button>
                <Radio.Button value="b">In progress</Radio.Button>
                <Radio.Button value="c">Closed</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable title="Project Name" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </Col>
      </LayoutProfile>
    </>
  )
}

export default Profile
