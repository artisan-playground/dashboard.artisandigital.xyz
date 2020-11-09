import { useEffect, useRef, useState } from 'react'

function ComponentVisible(initialIsVisible: any) {
  const [editProjectName, setEditProjectName] = useState(initialIsVisible)
  const [editProjectDetail, setEditProjectDetail] = useState(initialIsVisible)
  const [editProjectType, setEditProjectType] = useState(initialIsVisible)

  const [editTaskName, setEditTaskName] = useState(initialIsVisible)
  const [editTaskDetail, setEditTaskDetail] = useState(initialIsVisible)

  const projectNameRef = useRef(document.createElement('div'))
  const projectDetailRef = useRef(document.createElement('div'))
  const projectTypeRef = useRef(document.createElement('div'))

  const taskNameRef = useRef(document.createElement('div'))
  const taskDetailRef = useRef(document.createElement('div'))

  const handleClickOutside = (event: any) => {
    if (projectNameRef.current && !projectNameRef.current.contains(event.target)) {
      setEditProjectName(false)
    }
    if (projectDetailRef.current && !projectDetailRef.current.contains(event.target)) {
      setEditProjectDetail(false)
    }
    if (projectTypeRef.current && !projectTypeRef.current.contains(event.target)) {
      setEditProjectType(false)
    }
    if (taskNameRef.current && !taskNameRef.current.contains(event.target)) {
      setEditTaskName(false)
    }
    if (taskDetailRef.current && !taskDetailRef.current.contains(event.target)) {
      setEditTaskDetail(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return {
    projectNameRef,
    projectDetailRef,
    projectTypeRef,
    taskNameRef,
    taskDetailRef,
    editProjectName,
    setEditProjectName,
    editProjectDetail,
    setEditProjectDetail,
    editProjectType,
    setEditProjectType,
    editTaskName,
    setEditTaskName,
    editTaskDetail,
    setEditTaskDetail,
  }
}

export default ComponentVisible
