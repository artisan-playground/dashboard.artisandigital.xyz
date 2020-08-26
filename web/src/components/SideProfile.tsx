import {
  FacebookOutlined,
  GithubOutlined,
  GitlabOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import { Col, Layout, Row, Tag, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { USER_DATA } from '../DATA'

function SideProfile() {
  const { Text, Link } = Typography
  const { Sider } = Layout

  return (
    <div>
      {USER_DATA.filter((filtered) => filtered.id === '1').map((user, index) => (
        <Sider className="p-2 min-h-full shadow-lg bg-white">
          <Col className="text-center mb-8">
            <Row className="justify-center">
              <Avatar src="https://source.unsplash.com/600x600/?people" alt="user" size={125} />
            </Row>
            <Row className="justify-center">
              <Text className="text-xl font-bold">{user.name}</Text>
            </Row>
            <Text className="text-base font-bold" type="secondary">
              {user.position}
            </Text>
          </Col>

          <Col className="mb-8">
            <Text className="text-lg font-bold">Skill(s)</Text>
            <Row className="justify-center mt-2">
              {user.skills
                ? user.skills.map((value: any, index: any) => (
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
              <Text className="text-lg font-bold text-blue-500">{user.projects.length}</Text>
            </Row>
          </Col>

          <Col className="flex">
            <Col key={index}>
              <Text className="text-lg font-bold">{user.contacts ? 'Contact(s)' : ''}</Text>
              <Row className="mb-1 mt-2">
                {user.contacts.facebook ? <FacebookOutlined className="text-2xl mr-2" /> : ''}
                <Link href={user.contacts.facebook} target="_blank">
                  {user.contacts.facebook ? 'Facebook' : ''}
                </Link>
              </Row>
              <Row className="mb-1">
                {user.contacts.twitter ? <TwitterOutlined className="text-2xl mr-2" /> : ''}
                <Link href={user.contacts.twitter} target="_blank">
                  {user.contacts.twitter ? 'Twitter' : ''}
                </Link>
              </Row>
              <Row className="mb-1">
                {user.contacts.instagram ? <InstagramOutlined className="text-2xl mr-2" /> : ''}
                <Link href={user.contacts.instagram} target="_blank">
                  {user.contacts.instagram ? 'Instagram' : ''}
                </Link>
              </Row>
              <Row className="mb-1">
                {user.contacts.gitlab ? <GitlabOutlined className="text-2xl mr-2" /> : ''}
                <Link href={user.contacts.gitlab} target="_blank">
                  {user.contacts.gitlab ? 'Gitlab' : ''}
                </Link>
              </Row>
              <Row className="mb-1">
                {user.contacts.github ? <GithubOutlined className="text-2xl mr-2" /> : ''}
                <Link href={user.contacts.github} target="_blank">
                  {user.contacts.github ? 'Github' : ''}
                </Link>
              </Row>
            </Col>
          </Col>
        </Sider>
      ))}
    </div>
  )
}

export default SideProfile
