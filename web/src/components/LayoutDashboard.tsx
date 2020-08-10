import React from 'react'
import { NavBar, SideNav } from './DashboardComponent'

function LayoutDashboard({ className, children }: any) {
  return (
    <>
      <NavBar />
      <SideNav>{children}</SideNav>
    </>
  )
}

export default LayoutDashboard
