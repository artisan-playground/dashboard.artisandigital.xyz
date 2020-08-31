import { Card, Col, Row, Skeleton } from 'antd'
import React from 'react'

function LoadingComponent({ project, task, overlay }: any) {
  return project ? (
    <>
      <Card className="mb-4 rounded-lg shadow-md">
        <Row justify="space-between">
          <Col span={18} className="justify-end">
            <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          </Col>
          <Col className="pt-8">
            <div className="mb-8">
              <Skeleton.Button active size="small" shape="round" />
            </div>
            <div>
              <Skeleton.Avatar active size="default" shape="circle" />
              <Skeleton.Avatar active size="default" shape="circle" />
              <Skeleton.Avatar active size="default" shape="circle" />
            </div>
          </Col>
        </Row>
      </Card>
      <Card className="mb-4">
        <Row justify="space-between">
          <Col span={18} className="justify-end">
            <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          </Col>
          <Col className="pt-8">
            <div className="mb-8">
              <Skeleton.Button active size="small" shape="round" />
            </div>
            <div>
              <Skeleton.Avatar active size="default" shape="circle" />
              <Skeleton.Avatar active size="default" shape="circle" />
              <Skeleton.Avatar active size="default" shape="circle" />
            </div>
          </Col>
        </Row>
      </Card>
      <Card>
        <Row justify="space-between">
          <Col span={18} className="justify-end">
            <Skeleton loading={true} active paragraph={{ rows: 3 }} />
          </Col>
          <Col className="pt-8">
            <div className="mb-8">
              <Skeleton.Button active size="small" shape="round" />
            </div>
            <div>
              <Skeleton.Avatar active size="default" shape="circle" />
              <Skeleton.Avatar active size="default" shape="circle" />
              <Skeleton.Avatar active size="default" shape="circle" />
            </div>
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
