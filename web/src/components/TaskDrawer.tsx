import { CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Col, DatePicker, Drawer, Form, Input, Mentions, message, Row, Select } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Text from 'antd/lib/typography/Text'
import React, { useEffect, useState } from 'react'
import { ADD_TASK } from '../services/api/task'
import { GET_USERS } from '../services/api/user'

function TaskDrawer({ visibillity, onCloseDrawer, project, refetch }: any) {
  const { Option } = Select
  const { RangePicker } = DatePicker
  const { Option: MentionOption } = Mentions

  const { loading, data } = useQuery(GET_USERS)
  const [createTask] = useMutation(ADD_TASK)

  const [visible, setVisible] = useState(false)
  const [userList, setUserList] = useState([])
  const [memberList, setMemberList] = useState([])

  const [taskName, setTaskName] = useState('')
  const [taskDetail, setTaskDetail] = useState('')
  const [memberIds, setMemberIds] = useState([])
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())

  useEffect(() => {
    setVisible(visibillity)
    if (!loading && data) {
      setUserList(data.getUsers)
    }
    if (project) {
      setMemberList(project.memberIds)
    }
  }, [visibillity, data, project, loading])

  function onClose() {
    setVisible(false)
    refetch()
    onCloseDrawer()
  }

  function onChange(_: any, dateString: any) {
    if (dateString.length === 1) {
      setStartTime(dateString[0])
    } else if (dateString.length === 2) {
      setStartTime(dateString[0])
      setEndTime(dateString[1])
    }
  }

  function handleCreateTask() {
    if (taskName !== '' && taskDetail !== '' && memberIds.length !== 0) {
      const temp = {
        projectId: project.id,
        taskName,
        taskDetail,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        memberIds,
      }
      createTask({ variables: { input: temp } })
        .then((res) => {
          console.log('res', res)
          setTaskName('')
          setTaskDetail('')
          setMemberIds([])
          setStartTime(new Date())
          setEndTime(new Date())
          onClose()
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

  function handleMention(value: any) {
    //find id by name
    let ids = memberList
      .filter((item: any) => value.slice(0, -1).split('@').includes(item.name))
      .map((val: any) => val.id)
    let tempList: any = memberIds
    if (value !== '') {
      tempList.push(ids[0])
    }
    //set and remove `undefined && ""`
    setMemberIds(tempList.filter((x: any) => x))
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
            <Button shape="round" onClick={handleCreateTask} type="primary">
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
                <Input
                  placeholder="Please enter task name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
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
                  onChange={(e) => handleMention(e)}
                >
                  {(memberList || []).map((value: any) => (
                    <MentionOption
                      key={value.id}
                      value={value.name}
                      className="hover:bg-primary hover:text-white py-2 px-4"
                    >
                      <Avatar shape="circle" size="default" src={value.image} className="mr-2" />
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

export default TaskDrawer
