import { CameraOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProfileEditor() {
  const { Text } = Typography

  return (
    <LayoutDashboard>
      <Row>
        <Col span={17} push={7}>
          <Card></Card>
        </Col>
        <Col span={6} pull={17}>
          <Card className="flex items-center justify-center text-center mb-4">
            <Avatar
              src="https://source.unsplash.com/600x600/?people"
              alt="user"
              size={125}
              className="mb-8"
            />
            <Button type="primary" ghost icon={<CameraOutlined />}>
              Upload an image
            </Button>
            <Button type="text">Remove an image</Button>
          </Card>
          <Card>
            <Text className="text-lg font-bold">Skill(s)</Text>
          </Card>
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default ProfileEditor
