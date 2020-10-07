import ReactTagInput from '@pathofdev/react-tag-input'
import { Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { UPDATE_USER_SKILLS } from '../services/api/user'
import { useMutation } from '@apollo/client'

function ProfileSkillTags({ data }: any) {
  const { Text } = Typography
  const [skills, setSkills] = useState(data.skills ? data.skills : '')
  const [updateSkills] = useMutation(UPDATE_USER_SKILLS)

  useEffect(() => {
    updateSkills({
      variables: { id: data.id, skills: skills },
    })
  }, [updateSkills, skills, data])

  return (
    <Card>
      <Text className="text-lg font-bold">Skill(s)</Text>
      <ReactTagInput
        tags={skills}
        editable={true}
        readOnly={false}
        removeOnBackspace={true}
        onChange={(newTags: any) => setSkills(newTags)}
      />
    </Card>
  )
}

export default ProfileSkillTags
