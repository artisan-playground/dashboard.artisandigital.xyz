import { Card, Col, Layout, Row } from 'antd'
import React from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'
import '../styles/main.css'

const { Content } = Layout

function Dashboard() {
  return (
    <LayoutDashboard>
      <div>
        <div className="font-bold text-2xl">Dashboard</div>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </div>

        <button>
          <a href="/project-list">to project</a>
        </button>
      </div>
    </LayoutDashboard>
  )
}

export default Dashboard
