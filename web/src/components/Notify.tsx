import {
  BellOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReadOutlined,
  UserAddOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Col, Divider, Dropdown, Menu, Row, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
// @ts-ignore
import { reactLocalStorage } from 'reactjs-localstorage'
import UnknownUserImage from '../assets/images/unknown_user.png'

function Notify(props: any) {
  dayjs.locale(navigator.languages[0].toLowerCase())
  const [showCount, setShowCount] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [readIndex, setReadIndex] = useState(0)
  const { Text } = Typography
  dayjs.extend(LocalizedFormat)
  const ref = useRef(null)

  const data = props.data
  const storageKey = props.storageKey || 'notification_timeline_storage_id'
  const key = props.notific_key
  const notificationMsg = props.notific_value
  const sortedByKey = props.sortedByKey
  const heading = props.heading || 'Notifications'
  const bellSize = props.size || 32
  const bellColor = props.color || '#FFFFFF'
  const multiLineSplitter = props.multiLineSplitter || '\n'
  const showDate = props.showDate || false

  useEffect(() => {
    let readItemLs = reactLocalStorage.getObject(storageKey)
    let readMsgId = Object.keys(readItemLs).length > 0 ? readItemLs['id'] : ''

    let readIndex =
      readMsgId === '' ? data.length : data.findIndex((elem: any) => elem[key] === readMsgId)

    readIndex === -1 && (readIndex = data.length)

    setReadIndex(readIndex)
    ;(data.length && readIndex) > 0 ? setShowCount(true) : setShowCount(false)
    setMessageCount(readIndex)
  }, [data])

  function getDayDiff(timestamp: any) {
    let a = dayjs()
    let b = dayjs(timestamp)
    let diff = a.diff(b, 'year')
    if (diff === 0) {
      diff = a.diff(b, 'month')
      if (diff === 0) {
        diff = a.diff(b, 'day')
        if (diff === 0) {
          diff = a.diff(b, 'hour')
          if (diff === 0) {
            diff = a.diff(b, 'minute')
            if (diff === 0) {
              diff = a.diff(b, 'second')
              return `${diff} seconds ago`
            } else {
              return `${diff} minutes ago`
            }
          } else {
            return `${diff} hours ago`
          }
        } else {
          return `${diff} days ago`
        }
      } else {
        return `${diff} months ago`
      }
    } else {
      return `${diff} years ago`
    }
  }

  function getContent(message: any) {
    if (message.indexOf(multiLineSplitter) >= 0) {
      let splitted = message.split(multiLineSplitter)
      let ret = '<ul>'

      for (let i = 0; i <= splitted.length - 1; i++) {
        if (splitted[i] !== '') {
          ret = ret + '<li>' + splitted[i] + '</li>'
        }
      }

      ret = ret + '</ul>'
      return {
        __html: ret,
      }
    }
    return {
      __html: `<ul><li>${message}</li></ul>`,
    }
  }

  function markAsRead() {
    reactLocalStorage.setObject(storageKey, { id: data[0][key] })
    setReadIndex(0)
    setShowCount(false)
  }

  function notifications() {
    return (
      <Menu className="w-auto" ref={ref}>
        <Text className="font-bold p-2">{heading}</Text>
        <Divider className="mt-2 mb-0" />
        {data && data.length > 0 ? (
          data
            .sort((a: any, b: any) => (a[key] < b[key] ? 1 : -1))
            .map((item: any, index: any) => (
              <Menu.Item
                className="border-t border-b relative"
                onClick={props.markAsReadFn || markAsRead}
              >
                {index < readIndex && (
                  <Divider
                    type="vertical"
                    className={'border-l-4 border-blue-700 ml-0 absolute left-0 h-full'}
                  />
                )}
                <Row key={index} justify="space-between">
                  <Col xs={4} className="relative">
                    <Avatar
                      src={item.sender.image ? item.sender.image.fullPath : UnknownUserImage}
                      className="mr-2"
                      alt="user"
                      size="large"
                    />
                    {item.type === 'comment' ? (
                      <Avatar
                        icon={<CommentOutlined />}
                        className="absolute bottom-0 right-0 flex items-center justify-center"
                        alt="type"
                        size="small"
                        style={{ backgroundColor: '#597EF7' }}
                      />
                    ) : item.type === 'delete' ? (
                      <Avatar
                        icon={<DeleteOutlined />}
                        className="absolute bottom-0 right-0 flex items-center justify-center"
                        alt="type"
                        size="small"
                        style={{ backgroundColor: '#FF4D4F' }}
                      />
                    ) : item.type === 'invite' ? (
                      <Avatar
                        icon={<UserAddOutlined />}
                        className="absolute bottom-0 right-0 flex items-center justify-center"
                        alt="type"
                        size="small"
                        style={{ backgroundColor: '#36CFC9' }}
                      />
                    ) : item.type === 'event' ? (
                      <Avatar
                        icon={<ReadOutlined />}
                        className="absolute bottom-0 right-0 flex items-center justify-center"
                        alt="type"
                        size="small"
                        style={{ backgroundColor: '#FFA940' }}
                      />
                    ) : item.type === 'edit' ? (
                      <Avatar
                        icon={<EditOutlined />}
                        className="absolute bottom-0 right-0 flex items-center justify-center"
                        alt="type"
                        size="small"
                        style={{ backgroundColor: '#9254DE' }}
                      />
                    ) : item.type === 'create' ? (
                      <Avatar
                        icon={<PlusOutlined />}
                        className="absolute bottom-0 right-0 flex items-center justify-center"
                        alt="type"
                        size="small"
                        style={{ backgroundColor: '#40A9FF' }}
                      />
                    ) : item.type === 'mark' ? (
                      <Avatar
                        icon={<CheckOutlined />}
                        className="absolute bottom-0 right-0 flex items-center justify-center"
                        alt="type"
                        size="small"
                        style={{ backgroundColor: '#64d63a' }}
                      />
                    ) : (
                      item.type === 'time' && (
                        <Avatar
                          icon={<ClockCircleOutlined />}
                          className="absolute bottom-0 right-0 flex items-center justify-center"
                          alt="type"
                          size="small"
                          style={{ backgroundColor: '#CF1322' }}
                        />
                      )
                    )}
                  </Col>
                  <Col xs={20}>
                    <Space direction="vertical" size={2} className="ml-2">
                      <Space direction="horizontal" size={2}>
                        <Text className="font-bold">{item.sender.name}</Text>
                        <Text>{item.message}</Text>
                      </Space>
                      {showDate && (
                        <Text type="secondary" className="text-sm">
                          {getDayDiff(item[key])}
                        </Text>
                      )}
                    </Space>
                  </Col>
                </Row>
              </Menu.Item>
            ))
        ) : (
          <Row className="w-full flex items-center justify-center h-24">
            <WarningOutlined className="mr-2" />
            <Text>No Notifications!</Text>
          </Row>
        )}
      </Menu>
    )
  }

  return (
    <>
      <Dropdown
        className="w-full"
        overlay={notifications}
        placement="bottomLeft"
        trigger={['click']}
        arrow
      >
        <div className="cursor-pointer">
          <Badge count={showCount ? messageCount : 0}>
            <BellOutlined style={{ fontSize: 24 }} />
          </Badge>
        </div>
      </Dropdown>
    </>
  )
}

Notify.prototype = {
  storageKey: PropTypes.string,
  notific_key: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  notific_value: PropTypes.string.isRequired,
  sortedByKey: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  heading: PropTypes.string,
  multiLineSplitter: PropTypes.string,
  showDate: PropTypes.bool,
  markAsReadFn: PropTypes.func,
}

export default Notify
