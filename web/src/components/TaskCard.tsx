import {
  CheckCircleOutlined,
  CommentOutlined,
  PaperClipOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Avatar, Card, Col, Row, Space, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UnknownUserImage from '../assets/images/unknown_user.png'
import { CREATE_NOTIFICATION } from '../services/api/notification'
import { useStoreState } from '../store'

function TaskCard({ data }: any) {
  const { Text } = Typography
  const showItems: any[] = []
  dayjs.locale(navigator.languages[0].toLowerCase())
  dayjs.extend(LocalizedFormat)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const user = useStoreState((s) => s.userState.user)
  const [deadlineNotify] = useMutation(CREATE_NOTIFICATION)

  useEffect(() => {
    setInterval(() => {
      const now: any = dayjs()
      const then: any = dayjs(data.endTime, 'YYYY-MM-DD HH:mm:ss')
      const countdown: any = dayjs(then - now)
      setDays(countdown.format('DD'))
      setHours(countdown.format('HH'))
      setMinutes(countdown.format('mm'))
      setSeconds(countdown.format('ss'))
    }, 1000)
  })

  function renderShowItems(item: any) {
    for (let i = 0; i < item.length; ++i) {
      if (i < 3) {
        showItems.push(
          <Row key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Avatar
              key={item[i].id}
              src={item[i].image ? item[i].image.fullPath : UnknownUserImage}
              className="ml-2 cursor-pointer bg-gray-300 shadow-lg"
              alt={item[i].name}
            />
          </Row>
        )
      } else {
        showItems.push(
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Col className="w-full">
              <Col
                className="absolute mx-1 left-0 right-0 w-full text-center text-white font-bold z-10"
                style={{ marginTop: 6 }}
              >
                +{item.length - 3}
              </Col>
              <Avatar
                src={item[3].image ? item[3].image.fullPath : null}
                className="ml-2 bg-black flex justify-center items-center cursor-pointer z-0 shadow-lg"
                style={{ filter: 'brightness(0.6)' }}
              />
            </Col>
          </Col>
        )
        break
      }
    }
    return showItems
  }

  function deadline(item: any) {
    deadlineNotify({
      variables: {
        message: `Your ${item} is almost deadline.`,
        receiverId: Number(user?.id),
        senderId: Number(user?.id),
        type: 'time',
      },
    })
  }

  return (
    <Link to={{ pathname: `/task/${data.id}` }}>
      <Card hoverable className="min-w-full mb-4">
        {days.toString() === '03' &&
          hours.toString() === '23' &&
          minutes.toString() === '59' &&
          seconds.toString() === '59' &&
          deadline(data.taskName)}
        <Row className="w-full">
          <Col xs={24}>
            <Row justify="space-between">
              <Col xs={21}>
                <Space direction="horizontal" size={2}>
                  <Text className="font-bold">{data.taskName}</Text>
                  {data.files.length !== 0 ? (
                    <PaperClipOutlined className="ml-2 text-blue-700" />
                  ) : (
                    <div />
                  )}
                  {data.comments.length !== 0 ? (
                    <CommentOutlined className="ml-2 text-blue-700" />
                  ) : (
                    <div />
                  )}
                </Space>
              </Col>
              <Col xs={3} className="flex justify-end">
                {data.isDone ? (
                  <Tag color="green" icon={<CheckCircleOutlined />}>
                    Done
                  </Tag>
                ) : (
                  <Tag color="red" icon={<WarningOutlined />}>
                    WIP
                  </Tag>
                )}
              </Col>
            </Row>

            <Row className="my-2">
              <Col xs={24} lg={16}>
                <Space direction="vertical">
                  <Text type="secondary">{`${dayjs(data.startTime).format(
                    'DD/MMM/YYYY LT'
                  )} - ${dayjs(data.endTime).format('DD/MMM/YYYY LT')}`}</Text>
                  <Text>{data.taskDetail}</Text>
                </Space>
              </Col>
            </Row>
            <Row className="w-full" justify="end">
              {renderShowItems(data.members)}
            </Row>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default TaskCard
