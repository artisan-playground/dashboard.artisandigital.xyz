import { BellOutlined, DownOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Layout, Menu, Typography } from 'antd'
import React from 'react'
import { useStoreActions } from '../store'
import '../styles/main.css'

const { Header } = Layout
const { Text, Link } = Typography

function NavBar() {
  const logout = useStoreActions((a) => a.userState.logOut)

  async function onLogoutClick() {
    await logout()
  }
  const notifications = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          1st notification item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          2nd notification item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          3rd notification item
        </a>
      </Menu.Item>
    </Menu>
  )

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/profile">
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/edit-profile">
          Edit Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={onLogoutClick}>Log out</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="header bg-white h-18 min-w-full shadow-lg">
      <div className="flex flex-row justify-between items-center ">
        <img
          className="w-44 h-12 mt-1 -ml-8"
          src={require('../assets/images/logo3.png')}
          alt="logo"
        />
        <Menu theme="light" mode="horizontal" selectable={false}>
          <Menu.Item key="1" className="mx-8 w-16">
            <Dropdown
              className="px-0 py-0 h-full w-full"
              overlay={notifications}
              placement="bottomCenter"
              arrow
            >
              <div>
                <BellOutlined className="ml-4" style={{ fontSize: 24 }} />
                <Badge count={5} className="mx-4 -ml-4 -mt-4"></Badge>
              </div>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="2">
            <Text strong>John Doe</Text>
          </Menu.Item>
          <Menu.Item key="3">
            <Avatar
              src="https://source.unsplash.com/600x600/?people"
              className="border-2"
              alt="user"
              size="large"
            />
          </Menu.Item>
          <Menu.Item key="4">
            <Dropdown
              className="px-4 py-4 h-full"
              overlay={userDropDown}
              placement="bottomCenter"
              arrow
            >
              <DownOutlined style={{ fontSize: 20 }} />
            </Dropdown>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  )
}

export default NavBar
