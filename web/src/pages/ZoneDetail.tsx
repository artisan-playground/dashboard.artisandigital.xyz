import { CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  PageHeader,
  Row,
  Slider,
  Spin,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import MapboxMap, { Circle } from 'react-mapbox-wrapper'
import { Link, useParams } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'
import { GET_ZONE, UPDATE_ZONE } from '../services/api/zone'

function ZoneDetail() {
  const { Text } = Typography
  const { id }: any = useParams()
  const { loading, error, data, refetch } = useQuery(GET_ZONE, {
    variables: { id: Number(id) },
    notifyOnNetworkStatusChange: true,
  })
  const [updateZone] = useMutation(UPDATE_ZONE)
  const [filteredData, setFilteredData] = useState<any>()
  const [zoneName, setZoneName] = useState<any>()
  const [latitude, setLatitude] = useState<any>()
  const [longitude, setLongitude] = useState<any>()
  const [radius, setRadius] = useState<any>()
  const [map, setMap] = useState<any>()

  useEffect(() => {
    if (!error && !loading) {
      setFilteredData(data.getZoneById)
      setZoneName(data.getZoneById.name)
      setLatitude(data.getZoneById.latitude)
      setLongitude(data.getZoneById.longitude)
      setRadius(data.getZoneById.radius)
    }
  }, [loading, error, data])

  function onChange(value: any) {
    setRadius(value)
  }

  function onAfterChange(value: any) {
    setRadius(value)
  }

  function handleEditZone() {
    if (zoneName !== '' && latitude !== '' && longitude !== '') {
      updateZone({
        variables: {
          id: data.getZoneById.id,
          name: zoneName,
          latitude: String(latitude),
          longitude: String(longitude),
          radius: String(radius),
        },
      })
        .then((res) => {
          setZoneName(zoneName)
          setLatitude(latitude)
          setLongitude(longitude)
          setRadius(radius)
          window.history.back()
          refetch()
        })
        .catch((err) => {
          message.error({
            content: `Error : ${err}`,
            duration: 2,
            icon: <CloseCircleOutlined style={{ fontSize: 20, top: -2 }} />,
          })
        })
    } else {
      message.warning({
        content: `Please insert all field`,
        duration: 2,
        icon: <ExclamationCircleOutlined style={{ fontSize: 20, top: -2 }} />,
      })
    }
  }

  function onMapLoad(map: any) {
    setMap(map)
  }

  let circle
  if (map) {
    circle = (
      <Circle
        key="radius"
        id="radius"
        coordinates={{ lat: latitude, lng: longitude }}
        map={map}
        radius={radius}
        unit="meters"
        paint={{
          'fill-color': '#0074e4',
          'fill-opacity': 0.33,
        }}
      />
    )
  }

  return loading || !filteredData ? (
    <LayoutDashboard>
      <Spin size="large" className="flex justify-center" />
    </LayoutDashboard>
  ) : (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>
          <Link to={{ pathname: `/zones` }}>GPS Zone</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{zoneName}</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        className="site-page-header"
        title={zoneName}
        onBack={() => window.history.back()}
      />
      <Divider className="mb-0" />

      <Row justify="space-around" className="w-full mb-8">
        <Col xs={14}>
          <div style={{ height: 525 }}>
            <MapboxMap
              accessToken="pk.eyJ1Ijoia3VsbGFuYW4iLCJhIjoiY2tpcGN3eXVsMWxleTJxcDcxMzgxN2w3MSJ9.1eX-7iYYJaS9B09S8ZI8AQ"
              coordinates={{ lat: latitude, lng: longitude }}
              className="map-container"
              onLoad={onMapLoad}
            >
              {circle}
            </MapboxMap>
          </div>
        </Col>
        <Col xs={8} className="mt-8">
          <Form layout="vertical">
            <Row className="w-full">
              <Col xs={24}>
                <Form.Item
                  name="zoneName"
                  label="Zone name"
                  rules={[{ required: true, message: 'Please enter zone name' }]}
                >
                  <Input
                    placeholder="Please enter zone name"
                    defaultValue={zoneName}
                    onChange={(e) => setZoneName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="coordinate"
                  label="Coordinate"
                  rules={[{ required: true, message: 'Please enter coordinate' }]}
                >
                  <Row>
                    <Input
                      placeholder="Please enter latitude"
                      defaultValue={latitude}
                      className="w-52 mr-4"
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                    <Input
                      placeholder="Please enter longitude"
                      className="w-52"
                      defaultValue={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </Row>
                </Form.Item>
                <Form.Item
                  name="radius"
                  label={
                    <Text>
                      Radius <Text type="secondary">[Meters]</Text>
                    </Text>
                  }
                  rules={[{ required: true }]}
                >
                  <Slider
                    defaultValue={radius}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                    marks={{ 0: '0', 100: '100' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="end">
              <Button onClick={() => window.history.back()} className="mr-4">
                Cancel
              </Button>
              <Button onClick={handleEditZone} type="primary">
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default ZoneDetail
