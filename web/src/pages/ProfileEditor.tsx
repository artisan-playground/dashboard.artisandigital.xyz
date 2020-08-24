import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import '@pathofdev/react-tag-input/build/index.css'
import { Card, Col, Row, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useState } from 'react'
import { LayoutDashboard, ProfileForm, ProfileSkillTags } from '../components/DashboardComponent'
import { USER_DATA } from '../DATA'

function ProfileEditor() {
  // esLint-disable-next-line
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

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
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setLoading(false)
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
    <LayoutDashboard>
      <Row>
        {USER_DATA.map((items, index) => (
          <Col xs={24} xl={6} className="mr-12 mb-4" key={index}>
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
                  {items ? (
                    <div>
                      <img src={items.image} alt="avatar" style={{ width: '100%' }} />
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
            <ProfileSkillTags data={items} />
          </Col>
        ))}

        <Col xs={24} xl={17}>
          <Card title="Edit Profile" headStyle={{ fontWeight: 'bold' }}>
            {USER_DATA.map((items, index) => (
              <ProfileForm data={items} key={index} />
            ))}
          </Card>
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default ProfileEditor
