import { SearchOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Breadcrumb, Button, Col, Divider, Empty, Input, PageHeader, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, LoadingComponent, ZoneCard } from '../components/DashboardComponent'
import { GET_ZONES } from '../services/api/zone'

function Zone() {
  const { Text } = Typography
  const { loading, error, data, refetch } = useQuery(GET_ZONES)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (!error && !loading) {
      setFilteredData(data.zones)
    }
  }, [types, loading, error, data])

  function handleKeywordChange(e: any) {
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredData(data.zones)
      setTypes('all')
    } else {
      const kw: any[] = data.zones.filter((item: any) => {
        if (types === 'all') {
          return item.name.toLowerCase().includes(e.target.value.toLowerCase())
        } else {
          return (
            item.status === types && item.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        }
      })

      setFilteredData(kw)
    }
  }

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>GPS Zone</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="GPS Zone" />
      <Divider />
      <div className="px-8">
        <Row className="justify-between mb-8">
          <Row>
            <Link to={{ pathname: `/new-zone` }}>
              <Button
                className="flex items-center justify-center bg-secondary hover:bg-primary transition duration-200 ease-in border-none"
                type="primary"
              >
                <Text className="hidden hover:block text-white">New GPS zone</Text>
              </Button>
            </Link>
          </Row>

          <Row>
            <Input
              placeholder="Search GPS zone"
              value={keyword}
              onChange={handleKeywordChange}
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
                    <Col xs={24} xl={12} key={items.id} className="w-full px-2 py-2">
                      <ZoneCard data={items} refetch={() => refetch()} />
                    </Col>
                  ))
                ) : (
                  <div className="flex w-full justify-center my-8">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<Text disabled>No Zone Found</Text>}
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

export default Zone
