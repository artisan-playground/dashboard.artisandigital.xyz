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
          className="min-h-screen h-full bg-white border-r"
        >
          <div className="w-44 ml-4 my-2">
            {collapsed ? (
              <img
                src={require('../assets/images/Artisan Digital_logo_mini.png')}
                width={55}
                alt="logo"
              />
            ) : (
              <img
                src={require('../assets/images/Artisan_Digital_logo.png')}
                width={150}
                alt="logo"
              />
            )}
          </div>
          <Menu mode="inline" selectedKeys={getSelectedKeys()} className="border-none">
            {collapsed ? (
              <Divider className="my-4" />
            ) : (
              <div className="my-4">
                <Text type="secondary" className="ml-6">
                  MANAGEMENT
                </Text>
              </div>
            )}
            <Menu.Item key="/" icon={<ProfileOutlined />} className="flex items-center">
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="/projects" icon={<ProjectOutlined />} className="flex items-center">
              <NavLink to="/projects">Projects</NavLink>
            </Menu.Item>
            <Menu.Item key="/news" icon={<ReadOutlined />} className="flex items-center">
              <NavLink to="/news">News</NavLink>
            </Menu.Item>
            <Menu.Item key="/employees" icon={<TeamOutlined />} className="flex items-center">
              <NavLink to="/employees">Employees</NavLink>
            </Menu.Item>
            <Menu.Item
              key={`/profile/${user?.id}`}
              icon={<UserOutlined />}
              className="flex items-center"
            >
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
                <Menu.Item
                  key={`/zones`}
                  icon={<EnvironmentOutlined />}
                  className="flex items-center"
                >
                  <NavLink to={{ pathname: `/zones` }}>GPS zone</NavLink>
                </Menu.Item>
                <Menu.Item key={`/forms`} icon={<SnippetsOutlined />} className="flex items-center">
                  <NavLink to={{ pathname: `/forms` }}>Forms</NavLink>
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
