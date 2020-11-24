import { useQuery } from '@apollo/client'
import { Button, Col, DatePicker, Drawer, Form, Input, Mentions, Row, Select } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Text from 'antd/lib/typography/Text'
import React, { useEffect, useState } from 'react'
import { GET_USERS } from '../services/api/user'

function EventDrawer({ visibillity, onCloseDrawer, refetch }: any) {
  const { Option } = Select
  const { RangePicker } = DatePicker
  const { Option: MentionOption } = Mentions

  const { loading, data } = useQuery(GET_USERS)

  const [visible, setVisible] = useState(false)
  const [userList, setUserList] = useState([])
  const [memberList, setMemberList] = useState([])

  const [taskName, setTaskName] = useState('')
  const [taskDetail, setTaskDetail] = useState('')

  useEffect(() => {
    setVisible(visibillity)
    if (!loading && data) {
      setUserList(data.users)
    }
  }, [visibillity, data, loading])

  function onClose() {
    setVisible(false)
    refetch()
    onCloseDrawer()
  }

  return (
    <>
      <Drawer
        title="Create a task"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button shape="round" onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button shape="round" type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="taskName"
                label="Task name"
                rules={[{ required: true, message: 'Please enter task name' }]}
              >
                <Input
                  placeholder="Please enter task name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Member"
                label="Member"
                rules={[{ required: true, message: 'Please select a member' }]}
              >
                <Mentions
                  style={{ width: '100%' }}
                  placeholder="input @ to mention people"
                  prefix={['@']}
                >
                  {(memberList || []).map((value: any) => (
                    <MentionOption
                      key={value.id}
                      value={value.name}
                      className="hover:bg-primary hover:text-white py-2 px-4"
                    >
                      <Avatar
                        shape="circle"
                        size="default"
                        src={
                          value.image ? value.image.fullPath : require('../assets/images/logo5.png')
                        }
                        className="mr-2"
                      />
                      {value.name}
                      <Text className="text-gray-400 text-md ml-2">{value.email}</Text>
                    </MentionOption>
                  ))}
                </Mentions>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Mentions
                  style={{ width: '100%' }}
                  placeholder="input @ to mention people"
                  prefix={['@']}
                >
                  {(userList || []).map((value: any) => (
                    <MentionOption
                      key={value.id}
                      value={value.name}
                      className="hover:bg-primary hover:text-white py-2 px-4"
                    >
                      <Avatar
                        shape="circle"
                        size="default"
                        src={
                          value.image ? value.image.fullPath : require('../assets/images/logo5.png')
                        }
                        className="mr-2"
                      />
                      {value.name}
                    </MentionOption>
                  ))}
                </Mentions>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="Date"
                rules={[{ required: true, message: 'Please choose the due date' }]}
              >
                <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter task description',
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter task description"
                  value={taskDetail}
                  onChange={(e) => setTaskDetail(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default EventDrawer
