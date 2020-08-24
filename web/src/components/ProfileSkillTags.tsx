import ReactTagInput from '@pathofdev/react-tag-input'
import { Card, Typography } from 'antd'
import React, { useState } from 'react'

function ProfileSkillTags({ data }: any) {
  const { Text } = Typography
  const [skills, setSkills] = useState(data.skills)

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
