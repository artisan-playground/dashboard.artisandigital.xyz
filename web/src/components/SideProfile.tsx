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

function SideProfile({ data, project, contact }: any) {
  const { Text, Link } = Typography
  const { Sider } = Layout

  return (
    <div>
      <Sider className="p-2 min-h-screen shadow-lg bg-white">
        <Col className="text-center mb-8">
          <Row className="justify-center">
            <Avatar src={data.image} alt="user" size={125} />
          </Row>
          <Row className="justify-center">
            <Text className="text-xl font-bold">{data.name}</Text>
          </Row>
          <Text className="text-base font-bold" type="secondary">
            {data.position}
          </Text>
        </Col>

        <Col className="mb-8">
          <Text className="text-lg font-bold">Skills</Text>
          <Row className="justify-center mt-2">
            {data.skills
              ? data.skills.map((value: any, index: any) => (
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
            <Text className="text-lg font-bold text-blue-500">{project.length}</Text>
          </Row>
          <Row className="flex items-center justify-between">
            <Text className="text-lg font-bold">Closed Project(s)</Text>
            <Text className="text-lg font-bold text-blue-500">
              {project.filter((item: any) => item.status === 'done').length}
            </Text>
          </Row>
        </Col>

        <Col className="flex">
          <Col>
            <Text className="text-lg font-bold">{contact ? 'Contact(s)' : ''}</Text>
            <Row className="mb-1 mt-2">
              {contact.facebook ? <FacebookOutlined className="text-2xl mr-2" /> : ''}
              <Link href={contact.facebook} target="_blank">
                {contact.facebook ? 'Facebook' : ''}
              </Link>
            </Row>
            <Row className="mb-1">
              {contact.twitter ? <TwitterOutlined className="text-2xl mr-2" /> : ''}
              <Link href={contact.twitter} target="_blank">
                {contact.twitter ? 'Twitter' : ''}
              </Link>
            </Row>
            <Row className="mb-1">
              {contact.instagram ? <InstagramOutlined className="text-2xl mr-2" /> : ''}
              <Link href={contact.instagram} target="_blank">
                {contact.instagram ? 'Instagram' : ''}
              </Link>
            </Row>
            <Row className="mb-1">
              {contact.gitlab ? <GitlabOutlined className="text-2xl mr-2" /> : ''}
              <Link href={contact.gitlab} target="_blank">
                {contact.gitlab ? 'Gitlab' : ''}
              </Link>
            </Row>
            <Row className="mb-1">
              {contact.github ? <GithubOutlined className="text-2xl mr-2" /> : ''}
              <Link href={contact.github} target="_blank">
                {contact.github ? 'Github' : ''}
              </Link>
            </Row>
          </Col>
        </Col>
      </Sider>
    </div>
  )
}

export default SideProfile
