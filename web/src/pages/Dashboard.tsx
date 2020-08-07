import { Layout } from 'antd'
import React from 'react'
import '../styles/main.css'

const { Content } = Layout

const { Content } = Layout

function Dashboard() {
  return (
    <Layout className="pt-8 pb-24 px-8 w-full ">
      <Content className="bg-white p-8 w-full">
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
