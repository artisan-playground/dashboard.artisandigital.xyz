import { BellOutlined, DownOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useStoreActions, useStoreState } from '../store'
import '../styles/main.css'
import { useQuery } from '@apollo/client'
import { TASKS } from '../services/api/task'

function NavBar() {
  const { Header } = Layout
  const { Text, Link } = Typography
  const user = useStoreState((s) => s.userState.user)
  const logout = useStoreActions((a) => a.userState.logOut)
  const { loading, error, data } = useQuery(TASKS)
  const [filteredData, setFilteredData] = useState<any[]>([])

  useEffect(() => {
    if (!error && !loading) {
      setFilteredData(data.tasks)
    }
  }, [data, error, loading])

  async function onLogoutClick() {
    await logout()
  }
  const notifications = (
    <Menu className="p-2">
      {filteredData
        .filter((task: any) => task.members.filter((member: any) => member.id === user?.id))
        .map((mapItem: any) => (
          <Menu.Item key={mapItem.projectId}>
            <RouterLink
              to={{
                pathname: `/projects/${mapItem.projectId}`,
                state: {
                  data: data[mapItem.projectId],
                },
              }}
            >
              <Text>{mapItem.taskName}</Text>
            </RouterLink>
          </Menu.Item>
        ))}
      <Menu.Divider />
      <Link>Mark As Read</Link>
    </Menu>
  )

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <RouterLink to={{ pathname: `/profile/${user?.name}`, state: { data: user } }}>
          Profile
        </RouterLink>
      </Menu.Item>
      <Menu.Item>
        <RouterLink to={{ pathname: `/profile-edit`, state: { data: user } }}>
          Edit Profile
        </RouterLink>
      </Menu.Item>
      <Menu.Divider />
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

        <Menu theme="light" mode="horizontal" selectable={false} className="w-auto h-16">
          <Menu.Item key="1" className="font-bold">
            <Dropdown overlay={userDropDown} placement="bottomCenter" arrow>
              <Row className="justify-center items-center">
                <div className="block hover:hidden">
                  <Avatar src={user?.image} className="border-2 mr-2 " alt="user" size="large" />
                  {user?.name}
                </div>
                <div className="hover:block hidden">
                  <DownOutlined style={{ fontSize: 20 }} />
                </div>
              </Row>
            </Dropdown>
          </Menu.Item>

          <Menu.Item key="2">
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
                    filteredData.filter((task: any) =>
                      task.members.filter((member: any) => member.id === user?.id)
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
