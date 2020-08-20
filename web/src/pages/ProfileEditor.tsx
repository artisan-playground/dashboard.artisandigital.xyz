import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
// @ts-ignore
import ReactTagInput from '@pathofdev/react-tag-input'
import '@pathofdev/react-tag-input/build/index.css'
import { Card, Col, Row, Typography, Upload } from 'antd'
import React, { useState } from 'react'
import { LayoutDashboard, ProfileForm } from '../components/DashboardComponent'
import { USER_DATA } from '../DATA'

function ProfileEditor() {
  const { Text } = Typography
  const [skills, setSkills] = useState(['HTML', 'JavaScript', 'React', 'Redux', 'UI', 'UX'])
  const [imageUrl, setImageUrl] = useState()
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

  return (
    <LayoutDashboard>
      <Row>
        <Col xs={24} xl={6} className="mr-12 mb-4">
          <Card className="flex items-center justify-center text-center mb-4">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div className="ant-upload-text">Upload</div>
                </div>
              )}
            </Upload>
          </Card>
          <Card>
            <Text className="text-lg font-bold">Skill(s)</Text>
            <ReactTagInput
              tags={skills}
              editable={true}
              readOnly={false}
              removeOnBackspace={true}
              onChange={(newTags: any) => setSkills(newTags)}
            />
          </Card>
        </Col>

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
