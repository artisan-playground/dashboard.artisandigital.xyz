import { Table } from 'antd'
import React from 'react'

const MemberTable = (props: any) => {
  const { columns, ...otherTableProps } = props

  const sortableColumns = columns.map((column: any) => {
    const { dataIndex, ...otherColumnProps } = column

      return {
        ...otherColumnProps,
        dataIndex,
      }
  })

  return <Table columns={sortableColumns} {...otherTableProps} />
}

export default MemberTable
