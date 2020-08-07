import {
  NotificationOutlined,
  ProfileOutlined,
  ProjectOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/main.css'

const { SubMenu } = Menu
const { Sider } = Layout

function SideNav() {
  return (
    <Sider className="bg-white min-h-screen shadow-lg">
      <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} className="">
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
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <NavLink to="/member">Members</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Profile
            <NavLink to="/profile">Profile</NavLink>
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
      </Menu>
    </Sider>
  )
}

export default SideNav
