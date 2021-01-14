import { AimOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Avatar, Button, Card, Col, Modal, Row, Space, Switch, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DELETE_ZONE, UPDATE_SHOW_ZONE } from '../services/api/zone'

function ZoneCard({ data, refetch }: any) {
  const { Text } = Typography
  const [updateZone] = useMutation(UPDATE_SHOW_ZONE)
  const [deleteZone] = useMutation(DELETE_ZONE)
  const [check, setCheck] = useState(data.open)
  const [isModalVisible, setIsModalVisible] = useState(false)

  function onChange(checked: any) {
    setCheck(!checked)
    updateZone({
      variables: {
        id: data.id,
        open: checked,
      },
    })
  }

  function showModal() {
    setIsModalVisible(true)
  }

  function handleOk() {
    deleteZone({
      variables: {
        id: data.id,
      },
    })
    setIsModalVisible(false)
    refetch()
  }

  function handleCancel() {
    setIsModalVisible(false)
  }

  return (
    <>
      <Card hoverable className="min-w-full">
        <Row className="w-full">
          <Col xs={24}>
            <Row justify="space-between">
              <Col xs={2}>
                <Avatar
                  icon={<AimOutlined />}
                  className="mr-2 flex items-center justify-center bg-yellow-500"
                  alt="zone"
                  size="large"
                />
              </Col>
              <Col xs={19}>
                <Space direction="vertical" size={2}>
                  <Text className="font-bold text-base text-blue-700">{data.name}</Text>
                  <Text type="secondary" className="text-sm">
                    GPS Zone
                  </Text>
                  <Text className="text-sm">{`Location: ${data.latitude} - ${data.longitude}`}</Text>
                </Space>
              </Col>
              <Col xs={3}>
                <Row className="flex items-end justify-end">
                  <Switch defaultChecked={check} onClick={onChange} />
                </Row>
                <Row className="flex items-end justify-end mt-5">
                  <Link to={{ pathname: `/zones/${data.id}` }}>
                    <Button
                      shape="circle"
                      type="text"
                      className="flex items-center justify-center text-blue-700 hover:text-blue-700 focus:text-blue-700"
                    >
                      <EditOutlined />
                    </Button>
                  </Link>
                  <Button
                    shape="circle"
                    type="text"
                    className="flex items-center justify-center text-red-500 hover:text-red-500 focus:text-red-500"
                    onClick={showModal}
                  >
                    <DeleteOutlined />
                  </Button>
                  <Modal
                    title={<Text className="font-bold">Do you want to delete "{data.name}"</Text>}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Text>You can't undo this action. Are you sure to delete {data.name}</Text>
                  </Modal>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default ZoneCard
