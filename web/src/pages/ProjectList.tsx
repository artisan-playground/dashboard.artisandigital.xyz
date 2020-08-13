import React from 'react'
import { useLocation } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProjectList() {
  const location = useLocation()
  const query = useQuery()

  function useQuery() {
    return new URLSearchParams(location.search)
  }

  return (
    <LayoutDashboard>
      <div>Project list {query.get('types')}</div>
    </LayoutDashboard>
  )
}

export default ProjectList
