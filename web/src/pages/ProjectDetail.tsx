import React from 'react'
import { useParams } from 'react-router-dom'
import { LayoutDashboard } from '../components/DashboardComponent'

function ProjectDetail(props: any) {
  const { projectId } = useParams()
  const data = props.location.state.data

  return (
    <LayoutDashboard>
      <div>detail of project {projectId}</div>
      <div>{data.projectName}</div>
    </LayoutDashboard>
  )
}

export default ProjectDetail
