import { BellOutlined, DownOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Layout, Menu, Row, Typography } from 'antd'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { DATA, TASK_DATA } from '../DATA'
import { useStoreActions } from '../store'
import '../styles/main.css'
function NavBar() {
  const { Header } = Layout
  const { Text, Link } = Typography

  const logout = useStoreActions((a) => a.userState.logOut)

  async function onLogoutClick() {
    await logout()
  }
  const notifications = (
    <Menu>
      {TASK_DATA.filter((task: any) => task.team.filter((team: any) => team.id === '1')).map(
        (mapItem) => (
          <Menu.Item>
            <RouterLink
              to={{
                pathname: `/projects/${mapItem.projectId}`,
                state: {
                  data: DATA[mapItem.projectId],
                },
              }}
            >
              <Text>{mapItem.taskName}</Text>
            </RouterLink>
          </Menu.Item>
        )
      )}
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
        <a target="_blank" rel="noopener noreferrer" href="/profile/edit">
          Edit Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={onLogoutClick}>Log out</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="bg-white h-16 px-0 py-0 min-w-full shadow-lg">
      <div className="flex flex-row justify-between">
        <div className="w-44 ml-4 my-2">
          <RouterLink to="/">
            <img
              className="w-44 h-12 hidden md:block"
              src={require('../assets/images/logo3.png')}
              alt="logo"
            />
            <img
              className="w-12 h-12 md:hidden block"
              src={require('../assets/images/logo5.png')}
              alt="logo"
            />
          </RouterLink>
        </div>

        <Menu theme="light" mode="horizontal" selectable={false} className="w-auto h-16 mr-4">
          <Menu.Item key="2">
            <Dropdown overlay={userDropDown} placement="bottomCenter" arrow>
              <Row className="justify-center items-center">
                <div className="block hover:hidden">
                  <Avatar
                    src="https://source.unsplash.com/600x600/?people"
                    className="border-2 mr-2 "
                    alt="user"
                    size="large"
                  />
                  <Text strong>John Doe</Text>
                </div>
                <div className="hover:block hidden">
                  <DownOutlined style={{ fontSize: 20 }} />
                </div>
              </Row>
            </Dropdown>
          </Menu.Item>

          <Menu.Item key="1">
            <Dropdown
              className="px-2 py-0 w-full"
              overlay={notifications}
              placement="bottomLeft"
              arrow
            >
              <div>
                <BellOutlined style={{ fontSize: 24 }} />
                <Badge
                  count={
                    TASK_DATA.filter((task: any) =>
                      task.team.filter((taskTeam: any) => taskTeam.id === '1')
                    ).length
                  }
                  className="-ml-4 -mt-4"
                ></Badge>
              </div>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  )
}

export default NavBar
