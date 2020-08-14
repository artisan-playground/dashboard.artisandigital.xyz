import { Layout } from 'antd'
import React from 'react'
import { NavBar, ProfileSide } from './DashboardComponent'

function LayoutProfile({ className, children }: any) {
  const { Content } = Layout

  return (
    <>
      <NavBar />
      <ProfileSide>
        <Layout className="pt-8 pb-24 px-8 w-full ">
          <Content className="p-8 w-full">{children}</Content>
        </Layout>
      </ProfileSide>
    </>
  )
}

export default LayoutProfile
