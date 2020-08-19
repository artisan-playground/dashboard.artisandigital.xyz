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
import { NavLink, useLocation } from 'react-router-dom'
import '../styles/main.css'

function SideNav({ children }: any) {
  const { Text } = Typography
  const { Sider } = Layout
  const location = useLocation()
  const [collapse, setcollapse] = useState(false)

  function getSelectedKeys() {
    const params = new URLSearchParams(location.search)
    return params.get('types')
      ? [`${location.pathname}?types=${params.get('types')}`]
      : [location.pathname]
  }

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
          <Menu mode="inline" selectedKeys={getSelectedKeys()}>
            <Menu.Item key="/" icon={<ProfileOutlined />}>
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="/projects" icon={<ProjectOutlined />}>
              <NavLink to="/projects">Projects</NavLink>
            </Menu.Item>
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
