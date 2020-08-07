import React from 'react'

function LayoutDashboard({ ...props }) {
  return <div className="p-72 m-24 text-3xl">{props.children}</div>
}

export default LayoutDashboard
