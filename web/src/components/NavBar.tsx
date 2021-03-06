import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Avatar, Col, Dropdown, Layout, Menu, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import UnknownUserImage from '../assets/images/unknown_user.png'
import { Notify } from '../components/DashboardComponent'
import { TASKS } from '../services/api/task'
import { GET_USER_BY_ID } from '../services/api/user'
import { useStoreActions, useStoreState } from '../store'

function NavBar({ toggle, collapsed }: any) {
  const { Header } = Layout
  const { Text, Link } = Typography
  const user = useStoreState((s) => s.userState.user)
  const logout = useStoreActions((a) => a.userState.logOut)
  const { loading, error, data } = useQuery(TASKS)
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: Number(user?.id) },
  })
  const [currentUserData, setCurrentUserData] = useState<any>([])
  const [notification, setNotification] = useState<any>([])

  useEffect(() => {
    if (!error && !loading && !userLoading && !userError) {
      setCurrentUserData(userData?.user)
      setNotification(userData?.user.notifications)
    }
  }, [data, error, loading, userLoading, userError, userData])

  async function onLogoutClick() {
    await logout()
  }

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <RouterLink to={{ pathname: `/profile/${user?.id}` }}>Profile</RouterLink>
      </Menu.Item>
      <Menu.Item>
        <RouterLink to={{ pathname: `/profile/${user?.id}` }}>Edit Profile</RouterLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link onClick={onLogoutClick}>Log out</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="bg-white h-16 px-0 py-0 min-w-full shadow-lg border-b">
      <div className="flex flex-row justify-between">
        {collapsed ? (
          <MenuUnfoldOutlined
            onClick={toggle}
            className="mx-8 flex items-center justify-center z-50"
          />
        ) : (
          <MenuFoldOutlined
            onClick={toggle}
            className="mx-8 flex items-center justify-center z-50"
          />
        )}
        <Row>
          <Col className="ml-4 mr-8">
            <Notify
              data={notification}
              storageKey="notific_key"
              notific_key="timestamp"
              notific_value="message"
              heading="Notification"
              sortedByKey={true}
              showDate={true}
              size={24}
            />
          </Col>

          <Col className="mr-8">
            <Dropdown overlay={userDropDown} trigger={['click']} placement="bottomCenter" arrow>
              <Row className="flex justify-center items-center cursor-pointer">
                {currentUserData.image ? (
                  <div className="block hover:hidden">
                    <Avatar
                      src={
                        currentUserData.image ? currentUserData.image.fullPath : UnknownUserImage
                      }
                      className="mr-2"
                      alt="user"
                      size="large"
                    />
                    <Text className="font-bold">{currentUserData.name}</Text>
                  </div>
                ) : (
                  <div className="block hover:hidden">
                    <Avatar src={UnknownUserImage} className="mr-2" alt="user" size="large" />
                    <Text className="font-bold">{currentUserData.name}</Text>
                  </div>
                )}
              </Row>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </Header>
  )
}

export default NavBar
