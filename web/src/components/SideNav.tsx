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
import { NavLink, useLocation, useParams } from 'react-router-dom'
import '../styles/main.css'

function SideNav({ children }: any) {
  const { Text } = Typography
  const { SubMenu } = Menu
  const { Sider } = Layout
  const { projectId } = useParams()
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
            <SubMenu key={`/projects/${projectId}`} icon={<ProjectOutlined />} title="Project">
              <Menu.Item key="/projects">
                <NavLink to="/projects">All</NavLink>
              </Menu.Item>
              <Menu.Item key="/projects?types=wip">
                <NavLink to="/projects?types=wip">WIP</NavLink>
              </Menu.Item>
              <Menu.Item key="/projects?types=closed">
                <NavLink to="/projects?types=closed">Closed</NavLink>
              </Menu.Item>
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
