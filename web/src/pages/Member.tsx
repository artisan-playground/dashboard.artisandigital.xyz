import { Table } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'

function Member() {
  const columns = [
    {
      dataIndex: 'image',
      render: (image: any) => (
        <div className="-mr-64">
          <Avatar src={image} />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: 'Job Position',
      dataIndex: 'position',
      sorter: (a: any, b: any) => a.position.length - b.position.length,
    },
    {
      title: 'Project(s)',
      dataIndex: 'project',
      sorter: (a: any, b: any) => a.project - b.project,
    },
  ]

  const USER_DATA = [
    {
      key: '1',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'John Brown',
      position: 'Frontend Developer',
      project: 2,
    },
    {
      key: '2',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'Jim Green',
      position: 'Designer',
      project: 1,
    },
    {
      key: '3',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'Joe Black',
      position: 'Backend Developer',
      project: 3,
    },
    {
      key: '4',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'Jim Red',
      position: 'Business Analysis',
      project: 5,
    },
    {
      key: '5',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'John Doe',
      position: 'Full Stack Developer',
      project: 4,
    },
  ]

  return (
    <LayoutDashboard>
      <Table columns={columns} dataSource={USER_DATA} pagination={{ pageSize: 10 }} />
    </LayoutDashboard>
  )
}

export default Member
