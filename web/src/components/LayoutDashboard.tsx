import { Layout } from 'antd'
import React from 'react'
import { NavBar, SideNav } from './DashboardComponent'

const { Content } = Layout

function LayoutDashboard({ className, children }: any) {
  return (
    <>
      <NavBar />
      <SideNav>
        <Layout className="pt-8 pb-24 px-8 w-full ">
          <Content className="p-8 w-full">{children}</Content>
        </Layout>
      </SideNav>
    </>
  )
}

export default LayoutDashboard
