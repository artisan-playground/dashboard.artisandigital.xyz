import { CloseCircleOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'
import React, { useState } from 'react'

const { Title } = Typography

function WelcomeCard({ name, task, project }: any) {
  const [disable, setDisable] = useState(false)

  function onCloseClick() {
    setDisable(true)
  }
  return disable ? null : (
    <Card className="w-full bg-primaryopacity rounded-lg h-36 pl-12 py-4">
      <CloseCircleOutlined
        className="absolute top-0 right-0 mt-4 mr-4"
        onClick={onCloseClick}
        style={{ fontSize: '24px', color: '#fff' }}
      />
      {!name ? <Title level={4}>{`Hi!`}</Title> : <Title level={4}>{`Hi ${name} !`}</Title>}

      <p>{`You have ${task} projects and ${project} tasks to finish.`}</p>
      <p>Keep going, keep growing</p>
    </Card>
  )
}

export default WelcomeCard
