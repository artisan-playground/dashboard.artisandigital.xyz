import {
  ClusterOutlined,
  FacebookOutlined,
  GithubOutlined,
  GitlabOutlined,
  IdcardOutlined,
  InstagramOutlined,
  TwitterOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Card, Col, Divider, Empty, Radio, Row, Tabs, Tag, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  LayoutDashboard,
  ProfileProjectCard,
  ProfileTaskCard,
} from '../components/DashboardComponent'
import { GET_USER_BY_ID } from '../services/api/user'

function Profile() {
  const { Text, Link } = Typography
  const { TabPane } = Tabs
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [filteredTaskData, setFilteredTaskData] = useState<any[]>([])
  const [userData, setUserData] = useState<any>()
  const [userContactData, setUserContactData] = useState<any>()
  const [projectData, setProjectData] = useState<any[]>([])
  const [types, setTypes] = useState('all')
  const { id }: any = useParams()
  const { loading, error, data } = useQuery(GET_USER_BY_ID, { variables: { id: Number(id) } })

  useEffect(() => {
    switch (types) {
      case 'undone':
        let wip: any[] = data.user.projects.filter((item: any) => item.status === 'undone')
        setFilteredData(wip)
        break
      case 'done':
        let closed: any[] = data.user.projects.filter((item: any) => item.status === 'done')
        setFilteredData(closed)
        break
      case 'all':
        if (!error && !loading) {
          setFilteredData(data.user.projects)
        }
        break
      default:
        if (!error && !loading) {
          setFilteredData(data.user.projects)
        }
        break
    }
  }, [types, data, error, loading])

  useEffect(() => {
    if (!error && !loading) {
      setFilteredTaskData(data.user.tasks)
      setUserData(data.user)
      setUserContactData(data.user.contacts)
      setProjectData(data.user.projects)
    }
  }, [data, error, loading])

  function handleTypeChange(e: any) {
    setTypes(e.target.value)
  }

  return (
    <LayoutDashboard noCard>
      <Row justify="space-between">
        <Col xs={24} xl={6} lg={6} md={6}>
          <Card>
            <Col className="text-center mb-8">
              <Row className="justify-center">
                {userData ? (
                  <Avatar src={userData.image.fullPath} alt="user" size={125} />
                ) : (
                  <Avatar
                    icon={<UserOutlined />}
                    className="bg-primary flex items-center justify-center"
                    alt="user"
                    size={125}
                  />
                )}
              </Row>
              <Row className="justify-center">
                <Text className="text-xl font-bold">{userData ? userData.name : null}</Text>
              </Row>
              <Text className="text-base font-bold" type="secondary">
                {userData ? userData.position : null}
              </Text>
            </Col>

            <Text className="flex items-center">
              {userData ? (
                userData.department ? (
                  <>
                    <ClusterOutlined className="mr-2" />
                    {userData.department !== null ? userData.department : null}
                  </>
                ) : null
              ) : null}
            </Text>
            <Text className="flex items-center">
              <IdcardOutlined className="mr-2" />
              {userData ? (
                userData.type ? (
                  <>
                    <ClusterOutlined className="mr-2" />
                    {userData.type !== null ? userData.type : null}
                  </>
                ) : null
              ) : null}
            </Text>

            <Divider />

            <Col className="mb-8">
              <Text>Skills</Text>
              <Row className="mt-2">
                {userData
                  ? userData.skills
                    ? userData.skills.map((value: any, index: any) => (
                        <Tag key={index} color="blue" className="mb-1">
                          {value}
                        </Tag>
                      ))
                    : null
                  : null}
              </Row>
            </Col>

            {userContactData ? <Divider /> : null}

            <Col className="flex">
              <Col>
                <Text>{userContactData ? 'Contacts' : null}</Text>
                <Row className="mb-1 mt-2">
                  {userContactData ? (
                    userContactData.facebook ? (
                      <FacebookOutlined className="text-2xl mr-2" />
                    ) : null
                  ) : null}
                  <Link href={userContactData ? userContactData.facebook : null} target="_blank">
                    {userContactData ? (userContactData.facebook ? 'Facebook' : null) : null}
                  </Link>
                </Row>
                <Row className="mb-1">
                  {userContactData ? (
                    userContactData.twitter ? (
                      <TwitterOutlined className="text-2xl mr-2" />
                    ) : null
                  ) : null}
                  <Link href={userContactData ? userContactData.twitter : null} target="_blank">
                    {userContactData ? (userContactData.twitter ? 'Twitter' : null) : null}
                  </Link>
                </Row>
                <Row className="mb-1">
                  {userContactData ? (
                    userContactData.instagram ? (
                      <InstagramOutlined className="text-2xl mr-2" />
                    ) : null
                  ) : null}
                  <Link href={userContactData ? userContactData.instagram : null} target="_blank">
                    {userContactData ? (userContactData.instagram ? 'Instagram' : null) : null}
                  </Link>
                </Row>
                <Row className="mb-1">
                  {userContactData ? (
                    userContactData.gitlab ? (
                      <GitlabOutlined className="text-2xl mr-2" />
                    ) : null
                  ) : null}
                  <Link href={userContactData ? userContactData.gitlab : null} target="_blank">
                    {userContactData ? (userContactData.gitlab ? 'Gitlab' : null) : null}
                  </Link>
                </Row>
                <Row className="mb-1">
                  {userContactData ? (
                    userContactData.github ? (
                      <GithubOutlined className="text-2xl mr-2" />
                    ) : null
                  ) : null}
                  <Link href={userContactData ? userContactData.github : null} target="_blank">
                    {userContactData ? (userContactData.github ? 'Github' : null) : null}
                  </Link>
                </Row>
              </Col>
            </Col>
          </Card>
        </Col>

        <Col xs={24} xl={17} lg={17} md={17}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={`Today's Task (${
                  filteredTaskData.filter((tasks: any) => tasks.isDone === false).length
                })`}
                key="1"
              >
                <Row>
                  {filteredTaskData ? (
                    filteredTaskData.length !== 0 ? (
                      filteredTaskData
                        .filter((tasks: any) => tasks.isDone === false)
                        .map((items: any) => (
                          <Col xs={24} xl={{ span: 8 }} key={items.id} className="w-full px-2 py-2">
                            <ProfileTaskCard data={items} />
                          </Col>
                        ))
                    ) : (
                      <Col xs={24} className="flex items-center justify-center text-center">
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<Text disabled>No Tasks Found</Text>}
                        />
                      </Col>
                    )
                  ) : (
                    <div className="flex w-full justify-center my-8">
                      <Text disabled>Error</Text>
                    </div>
                  )}
                </Row>
              </TabPane>
              <TabPane tab={`Projects (${projectData.length})`} key="2">
                <Row className="flex justify-end mb-2">
                  <Col>
                    <Radio.Group defaultValue="all" size="large" onChange={handleTypeChange}>
                      <Radio.Button value="all">All</Radio.Button>
                      <Radio.Button value="undone">WIP</Radio.Button>
                      <Radio.Button value="done">Closed</Radio.Button>
                    </Radio.Group>
                  </Col>
                </Row>

                <Row>
                  {filteredData ? (
                    filteredData.length !== 0 ? (
                      filteredData.map((items) => (
                        <Col xs={24} xl={{ span: 8 }} key={items.id} className="w-full px-2 py-2">
                          <ProfileProjectCard data={items} />
                        </Col>
                      ))
                    ) : (
                      <Col xs={24} className="flex items-center justify-center text-center">
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<Text disabled>No Projects Found</Text>}
                        />
                      </Col>
                    )
                  ) : (
                    <div className="flex w-full justify-center my-8">
                      <Text disabled>Error</Text>
                    </div>
                  )}
                </Row>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </LayoutDashboard>
  )
}

export default Profile
