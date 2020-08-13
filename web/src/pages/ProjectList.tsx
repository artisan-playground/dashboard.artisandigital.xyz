import React from 'react'
import { useLocation } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProjectList() {
  const location = useLocation()

  function getTypes() {
    const params = new URLSearchParams(location.search)
    return params.get('types') ? params.get('types') : ''
  }

  return (
    <LayoutDashboard>
      <div>Project list {getTypes()}</div>
    </LayoutDashboard>
  )
}

export default ProjectList
