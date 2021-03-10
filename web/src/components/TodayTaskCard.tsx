import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Avatar, Card, Col, Popover, Row, Tag, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UnknownUserImage from '../assets/images/unknown_user.png'
import { CREATE_NOTIFICATION } from '../services/api/notification'
import { useStoreState } from '../store'

function TodayTaskCard({ data }: any) {
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
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Link to={{ pathname: `/profile/${item[i].id}` }}>
              <Tooltip placement="top" title={item[i].name}>
                <Avatar
                  key={item[i].id}
                  src={item[i].image ? item[i].image.fullPath : UnknownUserImage}
                  className="ml-2 cursor-pointer bg-gray-300 shadow-lg"
                  alt={item[i].name}
                />
              </Tooltip>
            </Link>
          </Col>
        )
      } else {
        showItems.push(
          <Col key={(new Date().getTime() + i).toString()} className="-ml-1">
            <Popover content={renderAllMember(item)} title="Team" trigger="hover">
              <div>
                <div
                  className="absolute mx-1 left-0 right-0 w-full text-center text-white font-bold z-10"
                  style={{ marginTop: 6 }}
                >
                  +{item.length - 3}
                </div>
                <Avatar
                  src={item[3].image ? item[3].image.fullPath : null}
                  className="ml-2 bg-black flex justify-center items-center cursor-pointer z-0 shadow-lg"
                />
              </div>
            </Popover>
          </Col>
        )
        break
      }
    }
    return showItems
  }

  function renderAllMember(item: any) {
    return (
      <div>
        {item.map((items: any) => (
          <Link key={items.id} to={{ pathname: `/profile/${item.id}` }}>
            <div className="flex mx-1 my-1 p-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
              <Avatar
                key={items.id}
                src={items.image ? items.image.fullPath : UnknownUserImage}
                className="ml-2"
                alt={items.name}
              />
              <div className="ml-4 text-base">{items.name}</div>
            </div>
          </Link>
        ))}
      </div>
    )
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
      <Card hoverable className="mb-4" bodyStyle={{ padding: 6 }}>
        {days.toString() === '03' &&
          hours.toString() === '23' &&
          minutes.toString() === '59' &&
          seconds.toString() === '59' &&
          deadline(data.taskName)}
        <Row justify="space-between" className="w-full items-center">
          <Col xs={4}>
            <Row className="flex justify-start items-start">{renderShowItems(data.members)}</Row>
          </Col>
          <Col xs={7}>
            <Text className="flex justify-center items-center">{data.taskName}</Text>
          </Col>
          <Col xs={11}>
            <Text type="secondary" className="flex justify-center items-center">{`${dayjs(
              data.startTime
            ).format('DD/MMM/YYYY LT')} - ${dayjs(data.endTime).format('DD/MMM/YYYY LT')}`}</Text>
          </Col>
          <Col xs={2}>
            {data.status === 'done' ? (
              <Tag
                color="green"
                icon={<CheckCircleOutlined />}
                className="flex justify-center items-center"
              >
                Done
              </Tag>
            ) : (
              <Tag
                color="red"
                icon={<WarningOutlined />}
                className="flex justify-center items-center"
              >
                WIP
              </Tag>
            )}
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default TodayTaskCard
