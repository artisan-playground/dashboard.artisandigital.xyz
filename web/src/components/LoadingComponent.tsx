import { Card, Col, Row, Skeleton } from 'antd'
import React from 'react'

function LoadingComponent({ projects, task, overlay }: any) {
  return projects ? (
    <>
      <Card className="mb-4 rounded-lg">
        <Row justify="space-between">
          <Col span={18} className="justify-end">
            <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          </Col>
        </Row>
      </Card>
    </>
  ) : task ? (
    <Card className="mb-4 rounded-lg">
      <Skeleton loading={true} active avatar paragraph={{ rows: 3 }} />
      <div className="pl-16 mt-4">
        <Skeleton.Avatar className="pr-2" active size="default" shape="circle" />
        <Skeleton.Avatar className="pr-2" active size="default" shape="circle" />
        <Skeleton.Avatar className="pr-2" active size="default" shape="circle" />
      </div>
    </Card>
  ) : overlay ? (
    <>
      <Row>
        <Col span={18} className="px-4">
          <Skeleton loading={true} active paragraph={{ rows: 4 }} />
          <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          <Skeleton loading={true} active paragraph={{ rows: 3 }} />
        </Col>
        <Col span={6} className="px-4">
          <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          <div className="mt-4">
            <Skeleton.Avatar className="pr-2" active size="default" shape="circle" />
            <Skeleton.Avatar className="pr-2" active size="default" shape="circle" />
            <Skeleton.Avatar className="pr-2" active size="default" shape="circle" />
          </div>
        </Col>
      </Row>
    </>
  ) : (
    <Card>
      <Skeleton loading={true} active avatar paragraph={{ rows: 4 }} />
    </Card>
  )
}

export default LoadingComponent
