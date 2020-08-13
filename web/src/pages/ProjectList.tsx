import React from 'react'
import { useLocation } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProjectList(props: any) {
  const query = useQuery()

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  return (
    <LayoutDashboard>
      <div>Project list {query.get('types')}</div>
    </LayoutDashboard>
  )
}

export default ProjectList
