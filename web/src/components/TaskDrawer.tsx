import { useQuery } from '@apollo/client'
import { Button, Col, DatePicker, Drawer, Form, Input, Mentions, Row, Select } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { GET_USERS } from '../api'

function TaskDrawer({ visibillity, onCloseDrawer, project }: any) {
  const { Option } = Select
  const { RangePicker } = DatePicker
  const { Option: MentionOption } = Mentions

  const { loading, data } = useQuery(GET_USERS)

  const [visible, setVisible] = useState(false)
  const [userList, setUserList] = useState([])
  const [memberList, setMemberList] = useState([])

  useEffect(() => {
    setVisible(visibillity)
    if (!loading && data) {
      // let temp = data.getUsers.map((item: any) => item.name)
      setUserList(data.getUsers)
    }
    if (project) {
      // let temp = project.memberIds.map((item: any) => item.name)
      setMemberList(project.memberIds)
    }
  }, [visibillity, data, project])

  function onClose() {
    setVisible(false)
    onCloseDrawer()
  }
  console.log('project', memberList)
  function onChange(value: any, dateString: any) {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }

  function onOk(value: any) {
    console.log('onOk: ', value)
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
            <Button shape="round" onClick={onClose} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="taskName"
                label="Task name"
                rules={[{ required: true, message: 'Please enter task name' }]}
              >
                <Input placeholder="Please enter task name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
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
                      <Avatar shape="circle" size="default" src={value.image} className="mr-2" />
                      {value.name}
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
                      <Avatar shape="circle" size="default" src={value.image} className="mr-2" />
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
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                  onOk={onOk}
                />
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
                <Input.TextArea rows={4} placeholder="please enter task description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default TaskDrawer
