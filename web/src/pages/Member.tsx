import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'
import MemberTable from '../components/MemberTable'
import { Sorter } from '../utils/Sorter'

function Member() {
  const columns = [
    {
      dataIndex: 'image',
      render: (image: any) => <Avatar src={image} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3,
      },
    },
    {
      title: 'Job Position',
      dataIndex: 'position',
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2,
      },
    },
    {
      title: 'Project(s)',
      dataIndex: 'project',
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1,
      },
    },
  ]

  const data = [
    {
      key: '1',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'John Brown',
      position: 'Developer',
      project: 2,
    },
    {
      key: '2',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'Jim Green',
      position: 'Developer',
      project: 1,
    },
    {
      key: '3',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'Joe Black',
      position: 'Developer',
      project: 3,
    },
    {
      key: '4',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'Jim Red',
      position: 'Developer',
      project: 5,
    },
    {
      key: '5',
      image: 'https://source.unsplash.com/600x600/?people',
      name: 'John Doe',
      position: 'Developer',
      project: 4,
    },
  ]

  return (
    <LayoutDashboard>
      <MemberTable columns={columns} dataSource={data} />
    </LayoutDashboard>
  )
}

export default Member
