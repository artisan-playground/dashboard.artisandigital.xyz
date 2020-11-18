import { BellOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Avatar, Badge, Col, Dropdown, Layout, Menu, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { TASKS } from '../services/api/task'
import { GET_USER_BY_ID } from '../services/api/user'
import { useStoreActions, useStoreState } from '../store'
import '../styles/main.css'

function NavBar() {
  const { Header } = Layout
  const { Text, Link } = Typography
  const user = useStoreState((s) => s.userState.user)
  const logout = useStoreActions((a) => a.userState.logOut)
  const { loading, error, data } = useQuery(TASKS)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(user?.id) },
  })
  const [currentUserData, setCurrentUserData] = useState<any>([])

  useEffect(() => {
    if (!error && !loading && !userLoading && !userError) {
      setFilteredData(data.tasks)
      setCurrentUserData(userData?.user)
    }
  }, [data, error, loading, userLoading, userError, userData])

  async function onLogoutClick() {
    await logout()
  }
  const notifications = (
    <Menu className="p-2">
      {filteredData
        .filter((task: any) => task.members.filter((member: any) => member.id === user?.id).length)
        .map((mapItem: any) => (
          <Menu.Item key={mapItem.id}>
            <RouterLink
              to={{
                pathname: `/projects/${mapItem.project.id}`,
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
        <RouterLink to={{ pathname: `/profile/${user?.id}` }}>Profile</RouterLink>
      </Menu.Item>
      <Menu.Item>
        <RouterLink to={{ pathname: `/profile-edit/${user?.id}` }}>Edit Profile</RouterLink>
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
              className="hidden md:block"
              src={require('../assets/images/logo3.png')}
              width={150}
            />
            <img
              className="md:hidden block"
              src={require('../assets/images/logo5.png')}
              width={40}
            />
          </RouterLink>
        </div>
        <Row>
          <Col>
            <Dropdown overlay={userDropDown} placement="bottomCenter" arrow>
              <Row className="justify-center items-center cursor-pointer">
                {currentUserData.image ? (
                  <div className="block hover:hidden">
                    <Avatar
                      src={currentUserData.image.fullPath}
                      className="border-2 mr-2 "
                      alt="user"
                      size="large"
                    />
                    <Text className="font-bold">{currentUserData.name}</Text>
                  </div>
                ) : (
                  <div className="block hover:hidden flex items-center justify-center">
                    <Avatar
                      icon={<UserOutlined />}
                      className="border-2 mr-2 bg-primary flex items-center justify-center"
                      alt="user"
                      size="large"
                    />
                    <Text className="font-bold invisible"></Text>
                  </div>
                )}
                <div className="hover:block hidden">
                  <DownOutlined style={{ fontSize: 20 }} />
                </div>
              </Row>
            </Dropdown>
          </Col>

          <Col className="ml-4 mr-8">
            <Dropdown
              className="px-2 py-0 w-full"
              overlay={notifications}
              placement="bottomLeft"
              arrow
            >
              <div className="cursor-pointer">
                <BellOutlined style={{ fontSize: 24 }} />
                <Badge
                  count={
                    filteredData.filter(
                      (task: any) =>
                        task.members.filter((member: any) => member.id === user?.id).length
                    ).length
                  }
                  className="-ml-4 -mt-4"
                ></Badge>
              </div>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </Header>
  )
}

export default NavBar
