import React from 'react'
import { useParams } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProjectDetail() {
  const { projectId } = useParams()

  return (
    <LayoutDashboard>
      <div>detail of project {projectId}</div>
    </LayoutDashboard>
  )
}

export default ProjectDetail
