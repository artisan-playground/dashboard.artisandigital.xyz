<template>
  <div class="home">
    <div v-for="member in dataProject" :key="member.id">
        <h1>{{ member.id }}</h1>
        <h1>{{ member.projectName }}</h1>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import gql from 'graphql-tag'
export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      dataProject: null,
      dataTask: null,
      // dataMember: null
  }
  },
  computed: {
    // showMembers() {
    //   const listmember = this.dataProject.members
    // }
  },
  apollo: {
    getProject: {
      query: gql`
        query {
          projects {
            id
            projectName
            projectType
            projectImage
            projectDetail
            status
            dueDate
            tasks {
              id
              taskName
              startTime
              endTime
              taskDetail
              isDone
            }
            members {
              id
              name
            }
          }
        }
      `,
      variables() {
        return {
          // projectId: parseInt(this.$route.params.id),
        }
      },
      result({ data }) {
        this.dataProject = data.projects
        this.dataTask = data.projects.tasks
        this.dataMember = data.projects.members
      },
    },
  },
}
</script>
