import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row, Skeleton, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditProjectDetail } from '../components/DashboardComponent'

function ProjectContent({ data, refetch }: any) {
  const { Text } = Typography

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [projectData, setProjectData]: any = useState()

  useEffect(() => {
    setProjectData(data)
  }, [data])

  function closeDawer() {
    setDrawerVisible(false)
  }

  return !projectData ? (
    <Skeleton active />
  ) : (
    <Row className="w-full">
      <Col span={24} lg={{ span: 4 }} className="flex justify-center items-start">
        <Avatar
          size={112}
          src={
            projectData.projectImage
              ? projectData.projectImage.fullPath
              : require('../assets/images/logo5.png')
          }
        />
      </Col>
      <Col span={24} lg={{ span: 20 }} className="px-4">
        <Row justify="space-between">
          <Text className="font-bold text-3xl ml-2">{data.projectName}</Text>
          <Button
            icon={<EditOutlined />}
            type="ghost"
            className="flex flex-row items-center"
            onClick={() => setDrawerVisible(true)}
          >
            Edit
          </Button>
          <EditProjectDetail
            visibillity={drawerVisible}
            onCloseDrawer={closeDawer}
            refetch={() => refetch()}
            data={projectData}
          />
        </Row>
        <Row>
          <Text className="text-md mt-4 mb-2 text-gray-500">{data.projectType}</Text>
        </Row>

        <Text className="text-lg">{data.projectDetail}</Text>
      </Col>
    </Row>
  )
}

export default ProjectContent
