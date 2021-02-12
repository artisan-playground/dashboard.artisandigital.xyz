import {
  EnvironmentOutlined,
  ProfileOutlined,
  ProjectOutlined,
  ReadOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Divider, Layout, Menu, Typography } from 'antd'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import MiniLogo from '../assets/images/Artisan Digital_logo_mini.png'
import Logo from '../assets/images/Artisan_Digital_logo.png'
import { useStoreState } from '../store'

function SideNav({ children, collapsed, toggle }: any) {
  const { Text } = Typography
  const { Sider } = Layout
  const location = useLocation()
  const user = useStoreState((s) => s.userState.user)

  function getSelectedKeys() {
    const params = new URLSearchParams(location.search)
    return params.get('types')
      ? [`${location.pathname}?types=${params.get('types')}`]
      : [location.pathname]
  }

  return (
    <Layout className="flex flex-row justify-center">
      <div>
        <Sider
          trigger={null}
          collapsed={collapsed}
          collapsible
          onCollapse={toggle}
          breakpoint={'lg'}
          className="min-h-screen h-full bg-white border-r transition duration-700"
        >
          <div className="overflow-hidden w-44 mx-3 my-2">
            {collapsed ? (
              <img src={MiniLogo} width={55} alt="logo" />
            ) : (
              <img src={Logo} width={150} alt="logo" />
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            className={collapsed ? 'border-r' : 'border-none'}
          >
            {collapsed ? (
              <Divider className="my-4 border-none" />
            ) : (
              <div className="my-4">
                <Text type="secondary" className="ml-6">
                  MANAGEMENT
                </Text>
              </div>
            )}
            <Menu.Item key="/" icon={<ProfileOutlined />}>
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="/projects" icon={<ProjectOutlined />}>
              <NavLink to="/projects">Projects</NavLink>
            </Menu.Item>
            <Menu.Item key="/news" icon={<ReadOutlined />}>
              <NavLink to="/news">News</NavLink>
            </Menu.Item>
            <Menu.Item key="/employees" icon={<TeamOutlined />}>
              <NavLink to="/employees">Employees</NavLink>
            </Menu.Item>
            <Menu.Item key={`/profile/${user?.id}`} icon={<UserOutlined />}>
              <NavLink to={{ pathname: `/profile/${user?.id}` }}>Profile</NavLink>
            </Menu.Item>

            {user?.role === 'ADMIN' && (
              <>
                {collapsed ? (
                  <Divider className="my-4" />
                ) : (
                  <div className="my-4">
                    <Text type="secondary" className="ml-6">
                      ADMINISTRATION
                    </Text>
                  </div>
                )}
                <Menu.Item key="/zones" icon={<EnvironmentOutlined />}>
                  <NavLink to="/zones">GPS zone</NavLink>
                </Menu.Item>
                <Menu.Item key="/forms" icon={<SnippetsOutlined />}>
                  <NavLink to="/forms">Forms</NavLink>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Sider>
      </div>
      <div className="min-h-screen w-full">{children}</div>
    </Layout>
  )
}

export default SideNav
