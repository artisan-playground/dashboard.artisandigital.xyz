import { Layout } from 'antd'
import React from 'react'
import { NavBar, SideNav } from './DashboardComponent'

const { Content } = Layout

function LayoutDashboard({ children, noCard }: any) {
  return (
    <>
      <NavBar />
      <SideNav>
        <Layout className="pt-8 pb-24 px-8 w-full ">
          {noCard ? (
            <Content className="bg-transparent p-8 w-full">{children}</Content>
          ) : (
            <Content className="bg-white p-8 w-full rounded-lg">{children}</Content>
          )}
        </Layout>
      </SideNav>
    </>
  )
}

export default LayoutDashboard
