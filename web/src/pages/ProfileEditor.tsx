import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import '@pathofdev/react-tag-input/build/index.css'
import { Card, Col, Row, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_ID } from '../services/api/user'
import { LayoutDashboard, ProfileForm } from '../components/DashboardComponent'

function ProfileEditor() {
  const [userData, setUserData] = useState<any>()
  const { id }: any = useParams()
  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(id) },
  })

  useEffect(() => {
    if (!error && !loading) {
      setUserData(data.user)
    }
  }, [data, error, loading])

  function getBase64(img: any, callback: any) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  function beforeUpload(file: any) {
    const isValid = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isValid) {
      alert('You upload invalid file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      alert('Image must smaller than 2MB!')
    }
    return isValid && isLt2M
  }

  function handleChange(info: any) {
    if (info.file.status === 'uploading' && loading) {
      return
    }
    if (info.file.status === 'done' && !loading) {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        // setImageUrl(imageUrl)
      })
    }
  }

  const onPreview = async (file: any) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    window.open(src)
    src.document.write(image.outerHTML)
  }

  return (
    <LayoutDashboard noCard>
      <Row>
        <Col xs={24} xl={6} className="mr-12 mb-4">
          <Card className="flex items-center justify-center text-center mb-4">
            <ImgCrop rotate>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onPreview={onPreview}
              >
                {userData ? (
                  <div>
                    <img src={userData?.image} alt="avatar" style={{ width: '100%' }} />
                    <div className="ant-upload-text px-3 flex items-center">
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}Upload
                    </div>
                  </div>
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
            </ImgCrop>
          </Card>
        </Col>

        <Col xs={24} xl={17}>
          {userData ? (
            <ProfileForm
              data={userData}
              refetch={() => refetch()}
              loading={loading}
              error={error}
            />
          ) : (
            <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
          )}
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default ProfileEditor
