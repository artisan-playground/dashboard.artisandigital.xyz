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

  const projectId = useParams()
  const query = useQuery()
  const [collapse, setcollapse] = useState(false)
  const type = query.get('types') === null ? '' : query.get('types')

  function useQuery() {
    return new URLSearchParams(useLocation().search)
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
          <Menu mode="inline" selectedKeys={[window.location.pathname + type?.toString()]}>
            <Menu.Item key="/" icon={<ProfileOutlined />}>
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <SubMenu key={`/projects/${projectId}`} icon={<ProjectOutlined />} title="Project">
              <Menu.Item key="/projects">
                <NavLink to="/projects">All</NavLink>
              </Menu.Item>
              <Menu.Item key="/projectsnew">
                <NavLink to="/projects?types=new">New</NavLink>
              </Menu.Item>
              <Menu.Item key="/projectsdeveloping">
                <NavLink to="/projects?types=developing">Deveolping</NavLink>
              </Menu.Item>
              <Menu.Item key="/projectsclosed">
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
