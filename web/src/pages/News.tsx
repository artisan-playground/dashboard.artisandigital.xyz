import { Card, Col, Row } from 'antd'
import React from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'

function News() {
  return (
    <LayoutDashboard noCard>
      <div className="font-bold text-2xl mb-4">Paragraph #1</div>

      <Row className="w-full justify-center overflow-y-auto">
        <Col span={24} md={{ span: 7 }} className="mx-2 mb-2">
          <Card className="w-full h-24 rounded-lg">1</Card>
        </Col>
        <Col span={24} md={{ span: 7 }} className="mx-2 mb-2">
          <Card className="w-full h-24 rounded-lg">2</Card>
        </Col>
        <Col span={24} md={{ span: 7 }} className="mx-2 mb-2">
          <Card className="w-full h-24 rounded-lg">3</Card>
        </Col>
      </Row>
      <div className="font-bold text-2xl mb-4">Paragraph #2</div>

      <Row>
        <Card></Card>
      </Row>
      <div className="font-bold text-2xl mb-4">Paragraph #3</div>

      <Row>
        <Card></Card>
      </Row>
    </LayoutDashboard>
  )
}

export default News
