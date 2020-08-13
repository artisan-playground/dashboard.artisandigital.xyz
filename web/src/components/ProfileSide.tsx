import {
  FacebookOutlined,
  GithubOutlined,
  GitlabOutlined,
  InstagramOutlined,
  LeftOutlined,
  NotificationOutlined,
  ProfileOutlined,
  ProjectOutlined,
  RightOutlined,
  TeamOutlined,
  TwitterOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Col, Layout, Menu, Row, Tag, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const { Text, Link } = Typography
const { SubMenu } = Menu
const { Sider } = Layout

function ProfileSide({ children }: any) {
  const [collapse, setcollapse] = useState(false)
  const user = {
    id: '0',
    email: 'test@mail.com',
    firstname: 'John',
    lastname: 'Doe',
    position: 'Developer',
    skills: ['HTML', 'JavaScript', 'React', 'Redux', 'UI', 'UX'],
    projects: [
      {
        id: '1',
        projectName: 'Project #1',
        projectType: 'Web design',
        ProjectDetail: 'Commodo adipiscing ornare sit lorem sit tempus urna, vestibulum, neque.',
        status: 'undone',
        team: [
          {
            id: '1',
            name: 'test 1',
            image: 'https://source.unsplash.com/600x600/?people',
          },
          {
            id: '2',
            name: 'test 2',
            image: 'https://source.unsplash.com/600x600/?people',
          },
          {
            id: '3',
            name: 'test 3',
            image: 'https://source.unsplash.com/600x600/?people',
          },
        ],
      },
      {
        id: '2',
        projectName: 'Project #2',
        projectType: 'Marketing',
        ProjectDetail: 'Consequat tempus nisi, orci, ligula duis.',
        status: 'done',
        team: [
          {
            id: '3',
            name: 'test 11',
            image: 'https://source.unsplash.com/600x600/?people',
          },
          {
            id: '4',
            name: 'test 12',
            image: 'https://source.unsplash.com/600x600/?people',
          },
        ],
      },
    ],
    contacts: [
      {
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
  }

  function onCollapseClick() {
    setcollapse(!collapse)
  }

  return (
    <Layout className="flex flex-row justify-center">
      <div>
        <Sider collapsed={collapse} className="min-h-full shadow-lg bg-white">
          <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <SubMenu key="sub2" icon={<ProjectOutlined />} title="Project">
              <Menu.Item key="5">
                <NavLink to="/project-list">All</NavLink>
              </Menu.Item>
              <Menu.Item key="6">
                <NavLink to="/project-list">New</NavLink>
              </Menu.Item>
              <Menu.Item key="7">In Progress</Menu.Item>
              <Menu.Item key="8">Closed</Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<NotificationOutlined />}>
              <NavLink to="/news">News</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <NavLink to="/member">Members</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item
              key="9"
              icon={collapse ? <RightOutlined /> : <LeftOutlined />}
              onClick={onCollapseClick}
            >
              <Text>Hide</Text>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
      <div className="min-h-screen w-full">{children}</div>
      <div>
        <Sider className="p-2 min-h-full shadow-lg bg-white">
          <Col className="text-center mb-8">
            <Row className="justify-center">
              <Avatar src="https://source.unsplash.com/600x600/?people" alt="user" size={125} />
            </Row>
            <Row className="justify-center">
              <Text className="text-xl font-bold">{user.firstname + ' ' + user.lastname}</Text>
            </Row>
            <Text className="text-base font-bold" type="secondary">
              {user.position}
            </Text>
          </Col>

          <Col className="mb-8">
            <Text className="text-lg font-bold">Skill(s)</Text>
            <Row className="justify-center mt-2">
              {user
                ? user.skills.map((value, index) => (
                    <Tag key={index} color="blue" className="mb-1">
                      {value}
                    </Tag>
                  ))
                : ''}
            </Row>
          </Col>

          <Col className="mb-8">
            <Row className="flex items-center justify-between">
              <Text className="text-lg font-bold">All Project(s)</Text>
              <Text className="text-lg font-bold text-blue-500">
                {user.projects.length}
              </Text>
            </Row>
          </Col>

          <Col className="flex">
            {user
              ? user.contacts.map((value, index) => (
                  <Col key={index}>
                    <Text className="text-lg font-bold">{value ? 'Contact(s)' : ''}</Text>
                    <Row className="mb-1 mt-2">
                      {value.facebook ? <FacebookOutlined className="text-2xl mr-2" /> : ''}
                      <Link href={value.facebook} target="_blank">
                        {value.facebook ? 'Facebook' : ''}
                      </Link>
                    </Row>
                    <Row className="mb-1">
                      {value.twitter ? <TwitterOutlined className="text-2xl mr-2" /> : ''}
                      <Link href={value.twitter} target="_blank">
                        {value.twitter ? 'Twitter' : ''}
                      </Link>
                    </Row>
                    <Row className="mb-1">
                      {value.instagram ? <InstagramOutlined className="text-2xl mr-2" /> : ''}
                      <Link href={value.instagram} target="_blank">
                        {value.instagram ? 'Instagram' : ''}
                      </Link>
                    </Row>
                    <Row className="mb-1">
                      {value.gitlab ? <GitlabOutlined className="text-2xl mr-2" /> : ''}
                      <Link href={value.gitlab} target="_blank">
                        {value.gitlab ? 'Gitlab' : ''}
                      </Link>
                    </Row>
                    <Row className="mb-1">
                      {value.github ? <GithubOutlined className="text-2xl mr-2" /> : ''}
                      <Link href={value.github} target="_blank">
                        {value.github ? 'Github' : ''}
                      </Link>
                    </Row>
                  </Col>
                ))
              : ''}
          </Col>
        </Sider>
      </div>
    </Layout>
  )
}

export default ProfileSide
