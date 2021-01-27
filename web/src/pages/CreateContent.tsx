import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  PageHeader,
  Row,
  Space,
  Typography,
} from 'antd'
import React, { useState } from 'react'
// @ts-ignore
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Gallery from 'react-photo-gallery'
import { Link } from 'react-router-dom'
import UnknownImage from '../assets/images/unknown_image.jpg'
import { LayoutDashboard } from '../components/DashboardComponent'

function CreateContent() {
  const { Text } = Typography
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [collage, setCollage] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [photos, setPhotos] = useState([
    { src: 'https://i.imgur.com/1gyXv58.png', width: 4, height: 3 },
    { src: 'https://i.imgur.com/pJHSAQD.png', width: 4, height: 3 },
    { src: 'https://i.imgur.com/MjyYvIm.png', width: 2, height: 1 },
    { src: 'https://i.imgur.com/TmMHHzU.png', width: 2, height: 3 },
    { src: 'https://i.imgur.com/CvZHABZ.png', width: 3, height: 2 },
    { src: 'https://i.imgur.com/shJluCu.png', width: 3, height: 2 },
    { src: 'https://i.imgur.com/7B0JlcB.png', width: 2, height: 1 },
  ])

  function handleShowGallery() {
    setShowGallery(!showGallery)
  }

  const handleDragStart = (e: any) => e.preventDefault()

  const chooseType = () => {
    setShowGallery(false)
    setCollage(true)
  }

  const cancelType = () => {
    setShowGallery(false)
    setCollage(false)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const items = [
    <img
      src="https://i.imgur.com/9RtFz1c.png"
      onDragStart={handleDragStart}
      style={{ width: 500, height: 200, marginRight: 2 }}
      onClick={chooseType}
    />
  ]

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  }

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Link to={{ pathname: `/news` }}>
          <Breadcrumb.Item>News</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item>Create content</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader className="site-page-header" title="Create content" />
      <Divider />
      <div className="px-8">
        <Row className="w-full">
          <Col xs={24} className="mb-4">
            <Row justify="space-between" className="w-full">
              <Col xs={12}>
                <Space direction="horizontal">
                  <Button type="primary" shape="circle" block onClick={handleShowGallery}>
                    <PlusOutlined />
                  </Button>
                  <Text className="ml-2">Add gallery</Text>
                </Space>
              </Col>
              <Col xs={12} className="flex items-center justify-end">
                <Button onClick={() => window.history.back()} className="mr-4">
                  Cancel
                </Button>
                <Button type="primary">Submit</Button>
              </Col>
            </Row>
          </Col>

          <Row className="w-full mb-4">
            {showGallery ? (
              <div className="static">
                <AliceCarousel
                  mouseTracking
                  items={items}
                  paddingLeft={50}
                  paddingRight={50}
                  responsive={responsive}
                  disableButtonsControls={true}
                  disableDotsControls={true}
                />
              </div>
            ) : collage ? (
              <Row>
                <Button onClick={showModal} className="mr-4 mb-4">
                  Manage Image
                </Button>
                <Modal
                  title={<Text className="font-bold">Organize your gallery</Text>}
                  width={'80%'}
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Row justify="space-between" className="w-full">
                    <Col xs={24}>
                      <Row justify="space-between" className="w-full">
                        <Col xs={15}>
                          <Row justify="space-between" className="w-full">
                            <Space direction="horizontal" size={2}>
                              <Text className="text-blue-700">Select</Text>
                              <Text type="secondary">|</Text>
                              <Button type="text">Select all</Button>
                              <Text type="secondary">|</Text>
                              <Button type="text" className="text-red-600">
                                Delete
                              </Button>
                            </Space>

                            <Col>
                              <Button type="primary">
                                <PlusOutlined />
                                Image
                              </Button>
                            </Col>
                          </Row>
                          <Divider />
                        </Col>

                        <Col xs={9} className="flex items-center justify-center">
                          <Divider type="vertical" className="h-full" />

                          <img
                            src={UnknownImage}
                            alt="unknown-image"
                            onDragStart={handleDragStart}
                            style={{ width: 300, height: 200 }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Modal>
                <Button onClick={cancelType}>
                  <DeleteOutlined />
                </Button>
                <Gallery photos={photos} />
              </Row>
            ) : (
              <Row className="p-24"></Row>
            )}
          </Row>

          <Row className="w-full">
            <Form layout="vertical" className="w-full">
              <Text className="font-bold">Add detail</Text>
              <Form.Item
                name="Subject"
                label="Subject"
                rules={[{ required: true, message: 'Please enter subject' }]}
              >
                <Input
                  placeholder="Please enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="Content"
                label="Content"
                rules={[{ required: true, message: 'Please enter content' }]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event: any, editor: any) => {
                    const data = editor.getData()
                    setContent(data)
                  }}
                  onInit={(editor: any) => {
                    editor.editing.view.change((writer: any) => {
                      writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                    })
                  }}
                  config={{
                    toolbar: {
                      items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'alignment',
                        'imageUpload',
                        'blockQuote',
                        'undo',
                        'redo',
                      ],
                    },
                    alignment: {
                      options: ['left', 'right', 'center', 'justify'],
                    },
                  }}
                />
              </Form.Item>
            </Form>
          </Row>
        </Row>
      </div>
    </LayoutDashboard>
  )
}

export default CreateContent
