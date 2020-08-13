import {
  LeftOutlined,
  NotificationOutlined,
  ProfileOutlined,
  ProjectOutlined,
  RightOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Typography } from 'antd'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/main.css'

const { Text } = Typography
const { SubMenu } = Menu
const { Sider } = Layout

function SideNav({ children }: any) {
  const [collapse, setcollapse] = useState(false)

  function onCollapseClick() {
    setcollapse(!collapse)
  }

  return (
    <Layout className="flex flex-row justify-center">
      <div>
        <Sider
          trigger={
            <div className="bg-white">
              <Text>{collapse ? <RightOutlined /> : <LeftOutlined />}</Text>
            </div>
          }
          collapsed={collapse}
          collapsible
          onCollapse={onCollapseClick}
          breakpoint={'lg'}
          className="min-h-screen shadow-lg bg-white h-full"
        >
          <Menu mode="inline" selectedKeys={[window.location.pathname]}>
            <Menu.Item key="/" icon={<ProfileOutlined />}>
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <SubMenu key="sub/project-list" icon={<ProjectOutlined />} title="Project">
              <Menu.Item key="/project-list">
                <NavLink to="/project-list">All</NavLink>
              </Menu.Item>
              <Menu.Item key="/project-list/new">
                <NavLink to="/project-list">New</NavLink>
              </Menu.Item>
              <Menu.Item key="7">In Progress</Menu.Item>
              <Menu.Item key="8">Closed</Menu.Item>
            </SubMenu>
            <Menu.Item key="/news" icon={<NotificationOutlined />}>
              <NavLink to="/news">News</NavLink>
            </Menu.Item>
            <Menu.Item key="/member" icon={<TeamOutlined />}>
              <NavLink to="/member">Members</NavLink>
            </Menu.Item>
            <Menu.Item key="/profile" icon={<UserOutlined />}>
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
      <div className="min-h-screen w-full">{children}</div>
    </Layout>
  )
}

export default SideNav
