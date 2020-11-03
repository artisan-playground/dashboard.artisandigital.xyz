import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import '@pathofdev/react-tag-input/build/index.css'
import { Button, Card, Col, Row, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LayoutDashboard, ProfileForm } from '../components/DashboardComponent'
import { UPLOAD_IMAGE } from '../services/api/image'
import { GET_USER_BY_ID } from '../services/api/user'

function ProfileEditor() {
  const [userData, setUserData] = useState<any>()
  const [image, setImageUrl] = useState<any>()
  const [generateFile, mimetype] = useState<any>(image)
  const { id }: any = useParams()
  const [uploadImage] = useMutation(UPLOAD_IMAGE)
  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(id) },
  })

  const dataImage = {
    fileName: generateFile,
    path: `./upload/${generateFile}`,
    fullPath: `${process.env.FILE_ENDPOINT}/${process.env.BUCKET}/upload/${generateFile}`,
    extension: mimetype,
    endpoint: `${process.env.FILE_ENDPOINT}`,
  }

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
    console.log(info)
    if (info.file.status === 'uploading' && loading) {
      return
    }
    if (info.file.status === 'done' && !loading) {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
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
      <Card>
        <Row>
          <Col span={14}>
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

          <Col span={10}>
            <Col className="flex flex-col justify-center items-center">
              {userData ? (
                <img src={userData?.image.fullPath} alt="avatar" className="w-40 rounded-full" />
              ) : (
                <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
              )}
              <ImgCrop rotate>
                <Upload
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  onPreview={onPreview}
                >
                  <Button icon={<UploadOutlined />} className="flex flex-row items-center mt-4">
                    Change Image
                  </Button>
                </Upload>
              </ImgCrop>
            </Col>
          </Col>
        </Row>
      </Card>
    </LayoutDashboard>
  )
}

export default ProfileEditor
