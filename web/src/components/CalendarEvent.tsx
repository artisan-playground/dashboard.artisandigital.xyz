import { Calendar, Badge, Modal } from 'antd'
import React, { useState } from 'react'

function CalendarEvent() {
  const [modalVisible, setModalVisible] = useState(false)

  function openModal() {
    setModalVisible(true)
  }

  function getListData(value: any) {
    let listData
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ]
        break
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ]
        break
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ]
        break
      default:
    }
    return listData || []
  }

  function dateCellRender(value: any) {
    const listData = getListData(value)
    return (
      <div>
        {listData.map((item) => (
          <div key={item.content} onClick={openModal}>
            <Badge status="warning" text={item.content} />
          </div>
        ))}
      </div>
    )
  }

  function getMonthData(value: any) {
    if (value.month() === 8) {
      return 1394
    }
  }

  function monthCellRender(value: any) {
    const num = getMonthData(value)
    return num ? (
      <div>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }
  return (
    <>
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} className="p-4" />
      <Modal title="Event" visible={modalVisible}>
        {dateCellRender}
      </Modal>
    </>
  )
}

export default CalendarEvent
