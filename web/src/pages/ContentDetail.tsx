import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
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
  Modal,
  PageHeader,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd'
import parse from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'
import { DELETE_CONTENT, GET_CONTENT_BY_ID, UPDATE_CONTENT } from '../services/api/content'

function ContentDetail() {
  const { Text } = Typography
  const { id }: any = useParams()
  const { loading, error, data, refetch } = useQuery(GET_CONTENT_BY_ID, {
    variables: { id: Number(id) },
    notifyOnNetworkStatusChange: true,
  })
  const [filteredData, setFilteredData] = useState<any>()
  const [showEditor, setShowEditor] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [updateContent] = useMutation(UPDATE_CONTENT)
  const [deleteContent] = useMutation(DELETE_CONTENT)

  useEffect(() => {
    if (!error && !loading) {
      setFilteredData(data.getContentById)
      setSubject(data.getContentById.subject)
      setContent(data.getContentById.content)
    }
  }, [id, loading, error, data])

  function handleShowEditor() {
    setShowEditor(!showEditor)
  }

  function handleCancel() {
    setShowDeleteModal(false)
  }

  function handleOk() {
    deleteContent({
      variables: {
        id: filteredData.id,
      },
    })
      .then((res) => {
        setShowDeleteModal(false)
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
  }

  function openModal() {
    setShowDeleteModal(true)
  }

  function handleCreateTask() {
    if (subject !== '' && content !== '') {
      updateContent({
        variables: {
          id: filteredData.id,
          subject: subject,
          content: content,
        },
      })
        .then((res) => {
          setSubject(subject)
          setContent(content)
          setShowEditor(false)
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

  return loading || !filteredData ? (
    <LayoutDashboard>
      <Spin size="large" className="flex justify-center pt-4" />
    </LayoutDashboard>
  ) : (
    <LayoutDashboard>
      <Breadcrumb className="pl-6 pt-4">
        <Breadcrumb.Item>
          <Link to={{ pathname: `/news` }}>News</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{filteredData.subject}</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        className="site-page-header"
        title={filteredData.subject}
        onBack={() => window.history.back()}
      />
      <Divider />

      <Row className="w-full mb-8 px-8">
        {!showEditor ? (
          <Row justify="end" className="w-full mb-4">
            <Button
              shape="circle"
              type="text"
              onClick={handleShowEditor}
              className="mr-4 text-blue-700 hover:text-blue-700 focus:text-blue-700"
            >
              <EditOutlined />
            </Button>
            <Button
              shape="circle"
              type="text"
              onClick={openModal}
              className="text-red-600 hover:text-red-600 focus:text-red-600"
            >
              <DeleteOutlined />
            </Button>
            <Modal
              title={
                <Text className="font-bold">Do you want to delete "{filteredData.subject}"</Text>
              }
              visible={showDeleteModal}
              onOk={handleOk}
              onCancel={handleCancel}
              centered={true}
            >
              <Text>You confirm to delete this content.</Text>
            </Modal>
          </Row>
        ) : (
          <Row justify="end" className="w-full mb-4">
            <Button onClick={handleShowEditor} className="mr-4">
              Cancel
            </Button>
            <Button type="primary" onClick={handleCreateTask}>
              Submit
            </Button>
          </Row>
        )}

        <Row className="w-full flex items-center justify-center">
          {filteredData.contentImage.map((image: any, index: any) => (
            <Col key={index} className="mr-2 mb-4 flex items-center justify-center">
              <img src={image.fullPath} className="h-56" alt="content" />
            </Col>
          ))}
        </Row>
        <Row className="w-full">
          {!showEditor ? (
            <Space direction="vertical" size={4}>
              <Text className="font-bold text-base">{filteredData.subject}</Text>
              <Text>{parse(filteredData.content)}</Text>
            </Space>
          ) : (
            <Row className="w-full">
              <Space direction="vertical" size={4} className="w-full">
                <Form layout="vertical" className="w-full">
                  <Form.Item
                    name="Subject"
                    label="Subject"
                    rules={[{ required: true, message: 'Please enter subject' }]}
                  >
                    <Input
                      placeholder="Please enter subject"
                      defaultValue={subject}
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
              </Space>
            </Row>
          )}
        </Row>
      </Row>
    </LayoutDashboard>
  )
}

export default ContentDetail
