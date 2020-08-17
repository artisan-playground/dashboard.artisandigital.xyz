import { CheckCircleOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'
import React from 'react'

function LogCard({ data }: any) {
  const { Text } = Typography

  return (
    <Card className="w-full rounded-lg shadow-md p-8">
      <div className="flex flex-col justify-center items-center">
        {data.map((item: any) => {
          return (
            <div key={item.id} className="p-2 text-black flex justify-between w-full">
              <div className="flex">
                <CheckCircleOutlined
                  className="mr-2 py-1"
                  style={{ fontSize: 24, color: '#105EFC' }}
                />
                <Text className="text-lg">{new Date(item.time).toLocaleDateString()}</Text>
                <Text className="mx-2 text-lg">at</Text>
                <Text className="text-lg">
                  {new Date(item.time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }) || '...'}
                </Text>
              </div>
              <div className="flex">
                <Text className="text-lg"> {item.taskName + ','}</Text>
                <Text className="mx-2 text-lg">by</Text>
                {item.team.map((team: any) => {
                  return <Text className="font-bold text-lg">{team.name}</Text>
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default LogCard
