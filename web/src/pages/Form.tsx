import { SearchOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Divider, Empty, Input, PageHeader, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormCard, LayoutDashboard, LoadingComponent } from '../components/DashboardComponent'

function Form() {
  const { Text } = Typography
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>Form</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="Form" />
      <Divider />
      <div className="px-8">
        <Row className="justify-between mb-8">
          <Row>
            <Link to={{ pathname: `/new-form` }}>
              <Button type="primary">Create form</Button>
            </Link>
          </Row>

          <Row>
            <Input
              placeholder="Search form"
              value={keyword}
              suffix={<SearchOutlined type="secondary" />}
              className="w-96"
            />
          </Row>
        </Row>
        {loading || error ? (
          <LoadingComponent project />
        ) : (
          <div className="site-card-wrapper">
            <Row gutter={[8, 24]}>
              {filteredData && !error && !loading ? (
                filteredData.length !== 0 ? (
                  filteredData.map((items) => (
                    <Col xs={24} xl={8} key={items.id} className="w-full px-2 py-2">
                      <FormCard data={items} />
                    </Col>
                  ))
                ) : (
                  <div className="flex w-full justify-center my-8">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<Text disabled>No Form Found</Text>}
                    />
                  </div>
                )
              ) : (
                <div className="flex w-full justify-center my-8">
                  <Text disabled>Error</Text>
                  <Text disabled>{error} </Text>
                </div>
              )}
            </Row>
          </div>
        )}
      </div>
    </LayoutDashboard>
  )
}

export default Form
