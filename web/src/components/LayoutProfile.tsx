import { Layout } from 'antd'
import React from 'react'
import { NavBar, SideNav } from './DashboardComponent'
import SideProfile from './SideProfile'

function LayoutProfile({ children, data, project, contact }: any) {
  const { Content } = Layout

  return (
    <>
      <NavBar />
      <SideNav>
        <Layout className="p-0 w-full">
          <Content className="pt-8 pb-24 px-8 w-full">{children}</Content>
          <SideProfile data={data} project={project} contact={contact} />
        </Layout>
      </SideNav>
    </>
  )
}

export default LayoutProfile
