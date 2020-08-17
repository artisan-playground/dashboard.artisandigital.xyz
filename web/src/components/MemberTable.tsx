import { Table } from 'antd'
import React from 'react'

const MemberTable = (props: any) => {
  const { columns, ...otherTableProps } = props

  const sortableColumns = columns.map((column: any) => {
    const { sorter, dataIndex, ...otherColumnProps } = column

    if (sorter) {
      const { compare, ...otherSorterProps } = sorter

      return {
        ...otherColumnProps,
        dataIndex,
        sorter: {
          compare: (rowA: any, rowB: any) => compare(rowA[dataIndex], rowB[dataIndex]),
          ...otherSorterProps,
        },
      }
    }
    return { ...otherColumnProps, dataIndex }
  })

  return <Table columns={sortableColumns} {...otherTableProps} pagination={{ pageSize: 10 }} />
}

export default MemberTable
