import { CloseCircleOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
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
  message,
  PageHeader,
  Row,
  Space,
  Typography,
} from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'
import { CREATE_CONTENT } from '../services/api/content'
import { UPLOAD_CONTENT_IMAGE } from '../services/api/contentImage'
import { useStoreState } from '../store'

function CreateContent() {
  const { Text } = Typography
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<any>()
  const [form] = Form.useForm()
  const [createContent] = useMutation(CREATE_CONTENT)
  const [uploadImage, { data: imageData }] = useMutation(UPLOAD_CONTENT_IMAGE)
  const user = useStoreState((s) => s.userState.user)

  function onUploadImage({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) {
      uploadImage({ variables: { file: file } })
    }
  }

  function handleCreateContent() {
    if (subject !== '' && content !== '') {
      createContent({
        variables: {
          subject: subject,
          content: content,
          userId: user?.id,
          file: { ...images, id: imageData ? imageData.uploadContentImage.id : 0 },
        },
      })
        .then((res) => {
          setSubject(subject)
          setContent(content)
          setImages(images)
          window.history.back()
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

  return (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Link to={{ pathname: `/news` }}>
          <Breadcrumb.Item>News</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item>Create content</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        className="site-page-header"
        title="Create content"
        onBack={() => window.history.back()}
      />
      <Divider />
      <div className="px-8">
        <Row className="w-full">
          <Col xs={24} className="mb-4">
            <Row justify="space-between" className="w-full">
              <Col xs={12}>
                <Space direction="horizontal">
                  <label className="rounded-full h-8 w-8 flex items-center justify-center cursor-pointer transition delay-100 duration-300 text-white hover:text-white bg-secondary hover:bg-blue-900">
                    <input type="file" className="invisible" multiple onChange={onUploadImage} />
                    <div className="absolute top-1 flex items-center justify-center">
                      <PlusOutlined className="text-xl" />
                    </div>
                  </label>
                  <Text className="ml-2">Add image</Text>
                </Space>
              </Col>
              <Col xs={12} className="flex items-center justify-end">
                <Form.Item>
                  <Button onClick={() => window.history.back()} className="mr-4">
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                  {() => (
                    <Button
                      type="primary"
                      onClick={handleCreateContent}
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                      }
                    >
                      Submit
                    </Button>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Row className="w-full mb-4 flex justify-center">
            {imageData && (
              <img
                src={imageData && imageData.uploadContentImage.fullPath}
                width={500}
                alt="content"
              />
            )}
          </Row>

          <Row className="w-full">
            <Text className="font-bold mb-4">Add detail</Text>
            <Form layout="vertical" form={form} className="w-full">
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
                        'blockQuote',
                        'undo',
                        'redo',
                      ],
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
