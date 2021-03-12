import { SearchOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Empty,
  Input,
  PageHeader,
  Row,
  Spin,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormCard, LayoutDashboard } from '../components/DashboardComponent'
import { GET_FORMS } from '../services/api/form'

function Form() {
  const { Text } = Typography
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [keyword, setKeyword] = useState('')
  const { loading, error, data } = useQuery(GET_FORMS)

  useEffect(() => {
    if (!error && !loading) {
      setFilteredData(data.forms)
    }
  }, [loading, error, data])

  function handleKeywordChange(e: any) {
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredData(data.forms)
    } else {
      const kw: any[] = data.forms.filter((item: any) => {
        return item.leaveType.toLowerCase().includes(e.target.value.toLowerCase())
      })

      setFilteredData(kw)
    }
  }

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
              placeholder="Search form type"
              value={keyword}
              onChange={handleKeywordChange}
              suffix={<SearchOutlined type="secondary" />}
              className="w-96"
            />
          </Row>
        </Row>
        {loading || error ? (
          <Row className="w-full flex justify-center">
            <Spin size="large" />
          </Row>
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
                      description={<Text disabled>No Form type</Text>}
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
