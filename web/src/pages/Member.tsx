import React from 'react'
import { LayoutDashboard } from '../components/DashboardComponent'
import MemberTable from '../components/MemberTable'

function Member() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Job Position',
      dataIndex: 'position',
    },
    {
      title: 'Project(s)',
      dataIndex: 'project',
    },
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      position: 'Developer',
      project: '2',
    },
    {
      key: '2',
      name: 'Jim Green',
      position: 'Developer',
      project: '1',
    },
    {
      key: '3',
      name: 'Joe Black',
      position: 'Developer',
      project: '3',
    },
    {
      key: '4',
      name: 'Jim Red',
      position: 'Developer',
      project: '2',
    },
    {
      key: '5',
      name: 'John Doe',
      position: 'Developer',
      project: '4',
    },
  ]

  return (
    <LayoutDashboard>
      <MemberTable columns={columns} dataSource={data} />
    </LayoutDashboard>
  )
}

export default Member
