import React from 'react'
import '../styles/main.css'
import { Layout } from 'antd'

const { Content } = Layout

function Dashboard() {
  return (
    <Layout className="py-8 px-8 w-full">
      <Content className="bg-white p-8 m-0">
        <div>
          <div>Dashboard</div>
          <button>
            <a href="/project-list">to project</a>
          </button>
        </div>
      </Content>
    </Layout>
  )
}

export default Dashboard
