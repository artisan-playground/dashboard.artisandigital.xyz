import { Card, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function WelcomeCard({ data }: any) {
  const { Text } = Typography
  const { Meta } = Card

  return (
    <Card
      hoverable
      className="w-full rounded-md h-36 pl-12 mt-28"
      style={{
        background: 'linear-gradient(110deg, #0036C7 -20%, #ffffff 30%, #ffffff 50%, #0036C7 120%)',
      }}
    >
      <Link to="/projects">
        <div className="relative z-50">
          <Meta
            title={<Text className="text-lg z-30">{!data.name ? `Hi!` : `Hi ${data.name} !`}</Text>}
            description={
              <Text className="text-xl font-bold mr-2">Check your daily task & project</Text>
            }
          />
        </div>
        <div className="absolute right-0 bottom-0 overflow-hidden z-20 ml-8 -mb-2 mt-8">
          <img
            alt="logo"
            src={require('../assets/images/welcome_image.png')}
            style={{ width: 400 }}
          />
        </div>
      </Link>
    </Card>
  )
}

export default WelcomeCard
