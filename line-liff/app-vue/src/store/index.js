import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    profile: {
      userId: '',
      displayName: '',
      pictureUrl: '',
      statusMessage: '',
    },
    members: [
      {
        id: 1,
        image: 'https://ca.slack-edge.com/T03EKL88Y-U03EKL89A-61874a193769-512',
        name: 'Cholathit Khueankaew',
        displayName: 'Cholathit',
        department: 'HR/Admin',
        position: 'Managing Director/CEO',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 2,
        image: 'https://ca.slack-edge.com/T03EKL88Y-U9HRS33LH-aaf90ffd0fca-512',
        name: 'Apichaya Hongsapak',
        displayName: 'pim',
        department: 'HR/Admin',
        position: 'HR/Admin',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 3,
        image: 'https://ca.slack-edge.com/T03EKL88Y-UJHQAR5GB-13cee788d1c2-512',
        name: 'Wisan Nakagawa',
        displayName: 'arm wisan',
        department: 'HR/Admin',
        position: 'Community Manager',
        skill: '',
        projects: null,
        type: 'Full-time',
      },

      {
        id: 4,
        image: 'https://ca.slack-edge.com/T03EKL88Y-UPX5YQEDU-3f1c55434773-512',
        name: 'Thanwimol Manopen',
        displayName: 'Mint Thanwimol',
        department: 'Development',
        position: 'Senior Project Manager',
        skill: '',
        projects: null,
        type: 'Full-time',
      },

      {
        id: 5,
        image: 'https://ca.slack-edge.com/T03EKL88Y-U016R3WAQ4U-0e8e2de8e11e-512',
        name: 'Surakarn Samkaew',
        displayName: 'Tonkla',
        department: 'Development',
        position: 'Developer',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 6,
        image: 'https://ca.slack-edge.com/T03EKL88Y-UNGSE8TPH-g4cf4f9cc0af-512',
        name: 'Nat W',
        displayName: 'Nat W',
        department: 'Development',
        position: 'Developer',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 7,
        image: 'https://ca.slack-edge.com/T03EKL88Y-UN1SYFAAW-9d0ac330ef89-512',
        name: 'ampere',
        displayName: 'ampere',
        department: 'Development',
        position: 'Developer',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 8,
        image: 'https://ca.slack-edge.com/T03EKL88Y-U0115EHAW73-5b10f51251f9-512',
        name: 'duke',
        displayName: 'duke',
        department: 'Development',
        position: 'Developer',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 9,
        image: 'https://ca.slack-edge.com/T03EKL88Y-UR7G91LAH-5f30317a29ec-512',
        name: 'Kittayanee Khuankaew',
        displayName: 'Angie',
        department: 'Development',
        position: 'Business Analysis',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 10,
        image: 'https://ca.slack-edge.com/T03EKL88Y-U5VNS1XE1-d67dc521b341-512',
        name: 'J A N G',
        displayName: 'J A N G',
        department: 'Design',
        position: 'UX/UI Designer',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 11,
        image: 'https://ca.slack-edge.com/T03EKL88Y-UB1TJHGFR-c242e7741d3d-512',
        name: 'Phitshayapa Wiangwat',
        displayName: 'Patti is Happy',
        department: 'Design',
        position: 'UX/UI Designer',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 12,
        image: 'https://ca.slack-edge.com/T03EKL88Y-UDRN3RWAJ-b8a538630c17-512',
        name: 'Pawiness Boonyothayan',
        displayName: 'Gin',
        department: 'Marketing',
        position: 'Marketing Strategic Planner',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
      {
        id: 13,
        image: 'https://ca.slack-edge.com/T03EKL88Y-US202147N-17595e2b2c00-512',
        name: 'Khomsun Chaiwong',
        displayName: 'Mooyai',
        department: 'Design',
        position: 'Designer',
        skill: '',
        projects: null,
        type: 'Full-time',
      },
    ],
    projects: [
      {
        id: 1,
        name: 'Project #1',
        position: 'Web Design',
        description: 'Commodo adipiscing ornare sit lorem sit tempus urna, vestibulum, neque.',
        status: 'WIP',
        urlProject: 'https://i.pinimg.com/564x/d3/7c/33/d37c33b2921a5df2fc85040e32b28f6c.jpg',
        date: [
          {
            id: 1,
            day: 1,
            month: 'May',
            year: 2020,
          },
        ],
        tasks: [
          {
            tasksId: 1,
            taskName: 'Design ui',
            taskTime: '10.00 AM',
            descriptonTask:
              'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
            status: 'WIP',
          },
          {
            tasksId: 2,
            taskName: 'Implement code',
            taskTime: '10.00 AM',
            descriptonTask:
              'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
            status: 'Done',
          },
        ],
      },
      {
        id: 2,
        name: 'Artisan’ Dashboard Project',
        position: 'Mobile App',
        description: 'The Dashboard that show the flow of work in the project.',
        status: 'WIP',
        urlProject: 'https://prongbang.github.io/assets/images/react/2.png',
        date: [
          {
            id: 1,
            day: 2,
            month: 'Sep',
            year: 2020,
          },
        ],
        tasks: [
          {
            tasksId: 1,
            taskName: 'Design',
            taskTime: '11.00 AM',
            descriptonTask:
              'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
            status: 'WIP',
          },
          {
            tasksId: 2,
            taskName: 'Coding',
            taskTime: '13.00 AM',
            descriptonTask:
              'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
            status: 'Done',
          },
        ],
      },
      {
        id: 3,
        name: 'Project #2',
        position: 'Marketing',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
        status: 'Done',
        urlProject: 'https://prongbang.github.io/assets/images/react/2.png',
        date: [
          {
            id: 1,
            day: 3,
            month: 'Nov',
            year: 2020,
          },
        ],
        tasks: [
          {
            tasksId: 1,
            taskName: 'Get Requirement form customer',
            taskTime: '10.00 AM',
            descriptonTask:
              'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
            status: 'WIP',
          },
          {
            tasksId: 2,
            taskName: 'Meeting',
            taskTime: '10.00 AM',
            descriptonTask:
              'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
            status: 'Done',
          },
        ],
      },
      {
        id: 4,
        name: 'Project #3',
        position: 'Mobile App',
        description: 'Consequat tempus nisi, orci, ligula duis.',
        status: 'Done',
        urlProject: 'https://prongbang.github.io/assets/images/react/2.png',
        date: [
          {
            id: 1,
            day: 4,
            month: 'Aug',
            year: 2020,
          },
        ],
        tasks: [
          {
            tasksId: 1,
            taskName: 'Test Project',
            taskTime: '10.00 AM',
            descriptonTask:
              'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
            status: 'WIP',
          },
          {
            tasksId: 2,
            taskName: 'Implement code',
            taskTime: '10.00 AM',
            descriptonTask:
              'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
            status: 'Done',
          },
        ],
      },
    ],
    news: [
      {
        id: 1,
        date: '1',
        month: 'May',
        day: 'Fri',
        name: 'Intern | progress',
        description: 'In 2nd floor meeting room',
        status: 'Important',
      },
      {
        id: 2,
        date: '10',
        month: 'May',
        day: 'Sun',
        name: 'Intern | progress',
        description: 'In 2nd floor meeting room',
        status: 'Important',
      },
      {
        id: 3,
        date: '29',
        month: 'May',
        day: 'Fri',
        name: 'Intern | progress',
        description: 'In 2nd floor meeting room',
        status: 'Important',
      },
      {
        id: 4,
        date: '30',
        month: 'May',
        day: 'Fri',
        name: 'Intern | progress',
        description: 'In 2nd floor meeting room',
        status: 'Important',
      },
    ],
    tasks: [
      {
        tasksId: 1,
        projectId: 1,
        taskName: 'Design ui',
        taskTime: '10.00 AM',
        descriptonTask:
          'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
        status: false,
      },
      {
        tasksId: 2,
        projectId: 1,
        taskName: 'Implement code',
        taskTime: '10.00 AM',
        descriptonTask:
          'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
        status: true,
      },
      {
        tasksId: 3,
        projectId: 2,
        taskName: 'Design',
        taskTime: '11.00 AM',
        descriptonTask:
          'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
        status: false,
      },
      {
        tasksId: 4,
        projectId: 2,
        taskName: 'Coding',
        taskTime: '13.00 AM',
        descriptonTask:
          'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
        status: true,
      },
    ],
  },
  mutations: {
    setPicProfile(state, value) {
      state.profile.pictureUrl = value
    },
    setUserId(state, value) {
      state.profile.userId = value
    },
    setDisplayName(state, value) {
      state.profile.displayName = value
    },
    setStatusMessage(state, value) {
      state.profile.statusMessage = value
    },
  },
  getters: {
    projects: state => {
      return state.projects
    },
    project: state => id => {
      return state.projects.find(project => project.id === id)
    },

    tasks: state => {
      return state.tasks
    },
    task: state => id => {
      return state.tasks.find(task => task.tasksId === id)
    },
  },
  actions: {
    showPicProfile(context) {
      context.commit('setPicProfile', this.getters.getPicProfile)
    },
  },
  modules: {},
})
