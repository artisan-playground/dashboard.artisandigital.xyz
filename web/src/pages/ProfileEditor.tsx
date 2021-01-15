import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import '@pathofdev/react-tag-input/build/index.css'
import { Card, Col, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LayoutDashboard, ProfileForm } from '../components/DashboardComponent'
import { UPDATE_IMAGE } from '../services/api/image'
import { GET_USER_BY_ID } from '../services/api/user'

function ProfileEditor() {
  const [userData, setUserData] = useState<any>()

  const { id }: any = useParams()
  const [updateImage] = useMutation(UPDATE_IMAGE)
  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(id) },
  })

  useEffect(() => {
    if (!error && !loading) {
      setUserData(data.user)
    }
  }, [data, error, loading, updateImage])

  function onChange({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) updateImage({ variables: { id: Number(id), file } })
  }

  return loading || !userData ? (
    <LayoutDashboard>
      <Card>
        <Spin size="large" className="flex justify-center" />
      </Card>
    </LayoutDashboard>
  ) : (
    <LayoutDashboard>
      <Card>
        <Row>
          <Col span={14}>
            {userData && <ProfileForm data={userData} refetch={() => refetch()} error={error} />}
          </Col>
          <Col span={10}>
            <Col className="flex flex-col justify-center items-center">
              {userData ? (
                <>
                  <img
                    src={
                      userData?.image
                        ? userData?.image.fullPath
                        : require('../assets/images/logo5.png')
                    }
                    alt="avatar"
                    className="w-40 rounded-full"
                  />
                  <label className="appearance-none border border-gray-300 flex items-center justify-center rounded-sm py-1 px-2 mt-4 cursor-pointer hover:text-blue-400 hover:border-blue-400 transition delay-100 duration-300">
                    <input type="file" className="hidden" onChange={onChange} />
                    <UploadOutlined className="mr-2" />
                    Change Image
                  </label>
                </>
              ) : (
                <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
              )}
            </Col>
          </Col>
        </Row>
      </Card>
    </LayoutDashboard>
  )
}

export default ProfileEditor
