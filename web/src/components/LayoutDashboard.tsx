import { Layout } from 'antd'
import React, { useState } from 'react'
import { NavBar, SideNav } from './DashboardComponent'

const { Content } = Layout

function LayoutDashboard({ children }: any) {
  const [collapsed, setCollapsed] = useState(false)

  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="w-full min-h-screen">
      <SideNav toggle={toggle} collapsed={collapsed}>
        <Layout className="site-layout">
          <NavBar toggle={toggle} collapsed={collapsed} />
          <Content className="bg-white w-full">{children}</Content>
        </Layout>
      </SideNav>
    </Layout>
  )
}

export default LayoutDashboard
