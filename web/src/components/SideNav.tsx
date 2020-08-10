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
        <Sider collapsed={collapse} className="min-h-screen shadow-lg bg-white">
          <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <SubMenu key="sub2" icon={<ProjectOutlined />} title="Project">
              <Menu.Item key="5">
                <NavLink to="/project-list">All</NavLink>
              </Menu.Item>
              <Menu.Item key="6">
                <NavLink to="/project-list">New</NavLink>
              </Menu.Item>
              <Menu.Item key="7">In Progress</Menu.Item>
              <Menu.Item key="8">Closed</Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<NotificationOutlined />}>
              <NavLink to="/news">News</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <NavLink to="/member">Members</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item
              key="9"
              icon={collapse ? <RightOutlined /> : <LeftOutlined />}
              onClick={onCollapseClick}
            >
              <Text>Hide</Text>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
      <div className="min-h-screen w-full">{children}</div>
    </Layout>
  )
}

export default SideNav
