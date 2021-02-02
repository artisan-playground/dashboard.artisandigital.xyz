import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Empty,
  Input,
  PageHeader,
  Pagination,
  Row,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ContentCard,
  EventCard,
  LayoutDashboard,
  LoadingComponent,
} from '../components/DashboardComponent'
import { CONTENT } from '../services/api/content'
import { EVENT } from '../services/api/event'

function News() {
  const { Text } = Typography
  const { data, loading: eventLoading, error: eventError, refetch } = useQuery(EVENT)
  const { data: contentData, loading: contentLoading, error: contentError } = useQuery(CONTENT)
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [totalPage, setTotalPage] = useState(0)
  const [current, setCurrent] = useState(1)
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const pageSize = 3

  useEffect(() => {
    if (
      !eventError &&
      !eventLoading &&
      !loading &&
      !contentLoading &&
      !contentError &&
      contentData &&
      data
    ) {
      setFilteredData(contentData.contents)
      setTotalPage(data.length / pageSize)
      setMinIndex(0)
      setMaxIndex(pageSize)
    }
  }, [
    eventError,
    eventLoading,
    loading,
    contentLoading,
    contentError,
    contentData,
    data,
    totalPage,
  ])

  function handleKeywordChange(e: any) {
    setLoading(true)
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setFilteredData(contentData.contents)
      setLoading(false)
    } else {
      const kw: any[] = contentData.contents.filter((item: any) =>
        item.subject.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredData(kw)
      setLoading(false)
    }
    setLoading(false)
  }

  function handleChange(page: any) {
    setCurrent(page)
    setMinIndex((page - 1) * pageSize)
    setMaxIndex(page * pageSize)
  }

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>News</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="News" />
      <Divider />
      <div className="px-8">
        <div className="font-bold mb-4">Event</div>

        <Row className="w-full overflow-y-auto mb-4">
          <EventCard data={data} />
        </Row>

        <Row justify="space-between">
          <Text className="font-bold text-lg mb-4">Contents</Text>
          <Row>
            <Input
              placeholder="Search Contents"
              value={keyword}
              onChange={handleKeywordChange}
              suffix={<SearchOutlined type="secondary" />}
              className="w-96 h-8"
            />
            <Link to={{ pathname: `/create-content` }}>
              <Button type="primary">
                <PlusOutlined />
                Create
              </Button>
            </Link>
          </Row>
        </Row>

        {contentLoading || contentError ? (
          <LoadingComponent project />
        ) : (
          <div className="site-card-wrapper">
            <Row gutter={[8, 24]}>
              {filteredData && !contentError && !contentLoading ? (
                filteredData.length !== 0 ? (
                  filteredData
                    .slice()
                    .sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
                    .map(
                      (items: any, index: any) =>
                        index >= minIndex &&
                        index < maxIndex && (
                          <Col xs={24} xl={8} key={items.id} className="w-full px-2 py-2">
                            <ContentCard data={items} refetch={() => refetch()} />
                          </Col>
                        )
                    )
                ) : (
                  <div className="flex w-full justify-center my-8">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<Text disabled>No Content Found</Text>}
                    />
                  </div>
                )
              ) : (
                <div className="flex w-full justify-center my-8">
                  <Text disabled>Error</Text>
                  <Text disabled>{contentError} </Text>
                </div>
              )}
            </Row>
          </div>
        )}
        <div className="flex items-end justify-end mb-8">
          <Pagination
            pageSize={pageSize}
            current={current}
            total={filteredData.length}
            onChange={handleChange}
            hideOnSinglePage={true}
          />
        </div>
      </div>
    </LayoutDashboard>
  )
}

export default News
