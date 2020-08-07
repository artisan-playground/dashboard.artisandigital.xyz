import React from 'react'
import '../styles/main.css'
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  ProfileOutlined,
  NotificationOutlined,
  ProjectOutlined,
  TeamOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu
const { Sider } = Layout

function SideNav() {
  return (
    <Layout>
      <Sider width={240} className="site-layout-background min-h-screen shadow-lg">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          className="h-full"
        >
          <Menu.Item key="1" icon={<ProfileOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="sub2" icon={<ProjectOutlined />} title="Project">
            <Menu.Item key="7">New</Menu.Item>
            <Menu.Item key="5">In Progress</Menu.Item>
            <Menu.Item key="6">Closed</Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<NotificationOutlined />}>
            News
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            Members
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  )
}

export default SideNav
