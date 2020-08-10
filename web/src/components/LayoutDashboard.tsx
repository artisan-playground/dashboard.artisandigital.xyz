import React from 'react'

function LayoutDashboard({ className, children }: any) {
  return <div className={`p-72 m-24 text-3xl ${className}`}>{children}</div>
}

export default LayoutDashboard
