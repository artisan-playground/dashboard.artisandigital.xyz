import { User } from 'src/schema/user'

export const users: User[] = [
  {
    id: '1',
    email: 'test1@mail.com',
    name: 'John Dee',
    image: 'https://source.unsplash.com/700x700/?people',
    position: 'Designers/Programmers',
    skills: ['HTML', 'JavaScript', 'React', 'Redux', 'UI', 'UX'],
    contacts: [
      {
        id: '1',
        facebook: 'http://localhost:3000/profile',
        twitter: '',
        instagram: '',
        gitlab: 'http://localhost:3000/profile',
        github: '',
      },
    ],
    projects: [
      {
        id: '1',
        projectName: 'Project #1',
        projectType: 'Web design',
        projectDetail: 'Commodo adipiscing ornare sit lorem sit tempus urna, vestibulum, neque.',
        projectImage: 'https://source.unsplash.com/500x500/?work',
        status: 'undone',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '1',
        projectId: '1',
        taskName: 'Design Webpage',
        time: new Date(),
        taskDetail:
          'Sit amet mattis vulputate enim nulla aliquet porttitor lacus. Aliquam sem fringilla ut morbi. Arcu non odio euismod lacinia at quis risus sed. Varius duis at consectetur lorem donec massa. A arcu cursus vitae congue mauris rhoncus.',
        isDone: false,
      },
    ],
  },
  {
    id: '2',
    email: 'test2@mail.com',
    name: 'Jane Doe',
    image: 'https://source.unsplash.com/800x600/?people',
    position: 'Designers/Programmers',
    skills: ['React', 'Redux', 'UI', 'UX'],
    contacts: [
      {
        id: '2',
        facebook: 'http://localhost:3000/profile',
        twitter: '',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '1',
        projectName: 'Project #1',
        projectType: 'Web design',
        projectDetail: 'Commodo adipiscing ornare sit lorem sit tempus urna, vestibulum, neque.',
        projectImage: 'https://source.unsplash.com/500x500/?work',
        status: 'undone',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '1',
        projectId: '1',
        taskName: 'Design Webpage',
        time: new Date(),
        taskDetail:
          'Sit amet mattis vulputate enim nulla aliquet porttitor lacus. Aliquam sem fringilla ut morbi. Arcu non odio euismod lacinia at quis risus sed. Varius duis at consectetur lorem donec massa. A arcu cursus vitae congue mauris rhoncus.',
        isDone: false,
      },
    ],
  },
  {
    id: '3',
    email: 'test3@mail.com',
    name: 'Joe Dee',
    image: 'https://source.unsplash.com/600x900/?people',
    position: 'Analysis',
    skills: ['HTML'],
    contacts: [
      {
        id: '3',
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: '',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '1',
        projectName: 'Project #1',
        projectType: 'Web design',
        projectDetail: 'Commodo adipiscing ornare sit lorem sit tempus urna, vestibulum, neque.',
        projectImage: 'https://source.unsplash.com/500x500/?work',
        status: 'undone',
        dueDate: new Date(),
      },
      {
        id: '2',
        projectName: 'Project #2',
        projectType: 'Marketing',
        projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
        projectImage: 'https://source.unsplash.com/500x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '1',
        projectId: '1',
        taskName: 'Design Webpage',
        time: new Date(),
        taskDetail:
          'Sit amet mattis vulputate enim nulla aliquet porttitor lacus. Aliquam sem fringilla ut morbi. Arcu non odio euismod lacinia at quis risus sed. Varius duis at consectetur lorem donec massa. A arcu cursus vitae congue mauris rhoncus.',
        isDone: false,
      },
      {
        id: '2',
        projectId: '1',
        taskName: 'Implement code',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: true,
      },
      {
        id: '3',
        projectId: '2',
        taskName: '#1',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: true,
      },
      {
        id: '4',
        projectId: '2',
        taskName: '#2',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: true,
      },
      {
        id: '5',
        projectId: '2',
        taskName: '#3',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: false,
      },
      {
        id: '6',
        projectId: '2',
        taskName: '#4',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: false,
      },
      {
        id: '7',
        projectId: '2',
        taskName: '#5',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: true,
      },
    ],
  },
  {
    id: '4',
    email: 'test4@mail.com',
    name: 'Josh Dai',
    image: 'https://source.unsplash.com/900x900/?people',
    position: 'Testers',
    skills: ['UI', 'UX'],
    contacts: [
      {
        id: '4',
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: '',
        gitlab: '',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '2',
        projectName: 'Project #2',
        projectType: 'Marketing',
        projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
        projectImage: 'https://source.unsplash.com/500x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '3',
        projectId: '2',
        taskName: '#1',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: true,
      },
      {
        id: '4',
        projectId: '2',
        taskName: '#2',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: true,
      },
      {
        id: '5',
        projectId: '2',
        taskName: '#3',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: false,
      },
      {
        id: '6',
        projectId: '2',
        taskName: '#4',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: false,
      },
      {
        id: '7',
        projectId: '2',
        taskName: '#5',
        time: new Date(),
        taskDetail: 'Odio ut sem nulla pharetra. Pharetra et ultrices neque ornare aenean.',
        isDone: true,
      },
    ],
  },
  {
    id: '5',
    email: 'test5@mail.com',
    name: 'Joshure Wong',
    image: 'https://source.unsplash.com/600x800/?people',
    position: 'Testers',
    skills: ['JavaScript', 'React', 'UI', 'UX'],
    contacts: [
      {
        id: '5',
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '2',
        projectName: 'Project #2',
        projectType: 'Marketing',
        projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
        projectImage: 'https://source.unsplash.com/500x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '3',
        projectName: 'Project #3',
        projectType: 'Mobile App',
        projectDetail:
          'Nisi lacus sed viverra tellus in hac. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida.',
        projectImage: 'https://source.unsplash.com/600x500/?work',
        status: 'done',
        dueDate: new Date(),
      },
    ],
    tasks: [{}],
  },
  {
    id: '6',
    email: 'test6@mail.com',
    name: 'Jake Wang',
    image: 'https://source.unsplash.com/600x600/?people',
    position: 'Designers/Programmers',
    skills: ['Redux', 'UI', 'UX'],
    contacts: [
      {
        id: '6',
        facebook: 'http://localhost:3000/profile',
        twitter: '',
        instagram: '',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '2',
        projectName: 'Project #2',
        projectType: 'Marketing',
        projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
        projectImage: 'https://source.unsplash.com/500x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '3',
        projectName: 'Project #3',
        projectType: 'Mobile App',
        projectDetail:
          'Nisi lacus sed viverra tellus in hac. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida.',
        projectImage: 'https://source.unsplash.com/600x500/?work',
        status: 'done',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '8',
        projectId: '3',
        taskName: 'Sunflower',
        time: new Date(),
        taskDetail:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        isDone: true,
      },
    ],
  },
  {
    id: '7',
    email: 'test7@mail.com',
    name: 'Jaka Amei',
    image: 'https://source.unsplash.com/400x600/?people',
    position: 'Product/Project Manager',
    skills: ['JavaScript'],
    contacts: [
      {
        id: '7',
        facebook: 'http://localhost:3000/profile',
        twitter: '',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: '',
      },
    ],
    projects: [
      {
        id: '2',
        projectName: 'Project #2',
        projectType: 'Marketing',
        projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
        projectImage: 'https://source.unsplash.com/500x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '4',
        projectName: 'Project #4',
        projectType: 'Mobile App',
        projectDetail:
          'Urna nunc id cursus metus aliquam eleifend. Ultrices neque ornare aenean euismod elementum. Eget arcu dictum varius duis at consectetur',
        projectImage: 'https://source.unsplash.com/600x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '5',
        projectName: 'Project #5',
        projectType: 'Mobile App',
        projectDetail: 'Blandit volutpat maecenas volutpat blandit aliquam etiam erat.',
        projectImage: 'https://source.unsplash.com/600x700/?work',
        status: 'done',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '9',
        projectId: '4',
        taskName: 'Proin nibh nisl condimentum id venenatis a condimentum vitae.',
        time: new Date(),
        taskDetail:
          'Lobortis feugiat vivamus at augue eget. Sed faucibus turpis in eu mi bibendum. A arcu cursus vitae congue. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin.',
        isDone: false,
      },
    ],
  },
  {
    id: '8',
    email: 'test8@mail.com',
    name: 'Jaki Jiji',
    image: 'https://source.unsplash.com/600x400/?people',
    position: 'Designers/Programmers',
    skills: ['React'],
    contacts: [
      {
        id: '8',
        facebook: '',
        twitter: 'http://localhost:3000/profile',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '2',
        projectName: 'Project #2',
        projectType: 'Marketing',
        projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
        projectImage: 'https://source.unsplash.com/500x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '4',
        projectName: 'Project #4',
        projectType: 'Mobile App',
        projectDetail:
          'Urna nunc id cursus metus aliquam eleifend. Ultrices neque ornare aenean euismod elementum. Eget arcu dictum varius duis at consectetur',
        projectImage: 'https://source.unsplash.com/600x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '5',
        projectName: 'Project #5',
        projectType: 'Mobile App',
        projectDetail: 'Blandit volutpat maecenas volutpat blandit aliquam etiam erat.',
        projectImage: 'https://source.unsplash.com/600x700/?work',
        status: 'done',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '9',
        projectId: '4',
        taskName: 'Proin nibh nisl condimentum id venenatis a condimentum vitae.',
        time: new Date(),
        taskDetail:
          'Lobortis feugiat vivamus at augue eget. Sed faucibus turpis in eu mi bibendum. A arcu cursus vitae congue. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin.',
        isDone: false,
      },
    ],
  },
  {
    id: '9',
    email: 'test10@mail.com',
    name: 'Jeki Jang',
    image: 'https://source.unsplash.com/600x601/?people',
    position: 'Designers/Programmers',
    skills: ['UI'],
    contacts: [
      {
        id: '9',
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: '',
      },
    ],
    projects: [
      {
        id: '2',
        projectName: 'Project #2',
        projectType: 'Marketing',
        projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
        projectImage: 'https://source.unsplash.com/500x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '4',
        projectName: 'Project #4',
        projectType: 'Mobile App',
        projectDetail:
          'Urna nunc id cursus metus aliquam eleifend. Ultrices neque ornare aenean euismod elementum. Eget arcu dictum varius duis at consectetur',
        projectImage: 'https://source.unsplash.com/600x600/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '5',
        projectName: 'Project #5',
        projectType: 'Mobile App',
        projectDetail: 'Blandit volutpat maecenas volutpat blandit aliquam etiam erat.',
        projectImage: 'https://source.unsplash.com/600x700/?work',
        status: 'done',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '9',
        projectId: '4',
        taskName: 'Proin nibh nisl condimentum id venenatis a condimentum vitae.',
        time: new Date(),
        taskDetail:
          'Lobortis feugiat vivamus at augue eget. Sed faucibus turpis in eu mi bibendum. A arcu cursus vitae congue. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin.',
        isDone: false,
      },
    ],
  },
  {
    id: '10',
    email: 'now@mail.com',
    name: 'Nhow Tonnow',
    image:
      'https://scontent.fcnx2-1.fna.fbcdn.net/v/t1.0-9/57016885_2263206347070723_8333399360800817152_o.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_eui2=AeHfShYgHhqUPYEZVBfEhyIu5MEsBOBeAF_kwSwE4F4AX1EDum5bOctfeRzMkBg1Q5SFzDfu9HQp4q2DjSzr4aje&_nc_ohc=zWRaFqnb4lMAX_6cuUl&_nc_oc=AQm-g9LWL-ljVZ8LuchMt42oWalemshyZw7KKxTGIRCwVvZJig8v0MM7iZ_kXUA50LI&_nc_ht=scontent.fcnx2-1.fna&oh=3bd95cbfa2717cef49981dfd5d45d986&oe=5F64DF99',
    position: 'Designers/Programmers',
    skills: ['JavaScript', 'React'],
    contacts: [
      {
        id: '10',
        facebook: '',
        twitter: 'http://localhost:3000/profile',
        instagram: '',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '5',
        projectName: 'Project #5',
        projectType: 'Mobile App',
        projectDetail: 'Blandit volutpat maecenas volutpat blandit aliquam etiam erat.',
        projectImage: 'https://source.unsplash.com/600x700/?work',
        status: 'done',
        dueDate: new Date(),
      },
      {
        id: '6',
        projectName: `Artisan' Dashboard Project`,
        projectType: 'Web Application',
        projectDetail:
          'The Dashboard that show the flow of work in the project. Dashboards allow managers to monitor the contribution of the various departments in their organization. To gauge exactly how well an organization is performing overall, digital dashboards allow you to capture and report specific data points from each department within the organization, thus providing a "snapshot" of performance.',
        projectImage: 'https://source.unsplash.com/700x600/?work',
        status: 'undone',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '10',
        projectId: '6',
        taskName: 'Implement Database',
        time: new Date('2020-08-24T09:30:00'),
        taskDetail: 'Add Database to the project',
        isDone: false,
      },
      {
        id: '11',
        projectId: '6',
        taskName: 'Progress check',
        time: new Date('2020-08-24T15:30:00'),
        taskDetail: 'normally progress check',
        isDone: false,
      },
    ],
  },
  {
    id: '11',
    email: 'nan@mail.com',
    name: 'Nan Kullanan',
    image: 'https://ca.slack-edge.com/T03EKL88Y-U01858A1810-7eaef9c3165e-512',
    position: 'Designers/Programmers',
    skills: ['C#', 'UI', 'UX'],
    contacts: [
      {
        id: '11',
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '6',
        projectName: `Artisan' Dashboard Project`,
        projectType: 'Web Application',
        projectDetail:
          'The Dashboard that show the flow of work in the project. Dashboards allow managers to monitor the contribution of the various departments in their organization. To gauge exactly how well an organization is performing overall, digital dashboards allow you to capture and report specific data points from each department within the organization, thus providing a "snapshot" of performance.',
        projectImage: 'https://source.unsplash.com/700x600/?work',
        status: 'undone',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '10',
        projectId: '6',
        taskName: 'Implement Database',
        time: new Date('2020-08-24T09:30:00'),
        taskDetail: 'Add Database to the project',
        isDone: false,
      },
      {
        id: '11',
        projectId: '6',
        taskName: 'Progress check',
        time: new Date('2020-08-24T15:30:00'),
        taskDetail: 'normally progress check',
        isDone: false,
      },
    ],
  },
  {
    id: '12',
    email: 'moew@mail.com',
    name: 'Moew',
    image: 'https://source.unsplash.com/604x601/?cat',
    position: 'Designers/Programmers',
    skills: ['C++'],
    contacts: [
      {
        id: '12',
        facebook: 'http://localhost:3000/profile',
        twitter: '',
        instagram: '',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [{}],
    tasks: [{}],
  },
  {
    id: '13',
    email: 'tonkla@mail.com',
    name: 'Tonkla Surakarn',
    image: 'https://ca.slack-edge.com/T03EKL88Y-U016R3WAQ4U-0e8e2de8e11e-512',
    position: 'Designers/Programmers',
    skills: ['Ruby'],
    contacts: [
      {
        id: '13',
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '6',
        projectName: `Artisan' Dashboard Project`,
        projectType: 'Web Application',
        projectDetail:
          'The Dashboard that show the flow of work in the project. Dashboards allow managers to monitor the contribution of the various departments in their organization. To gauge exactly how well an organization is performing overall, digital dashboards allow you to capture and report specific data points from each department within the organization, thus providing a "snapshot" of performance.',
        projectImage: 'https://source.unsplash.com/700x600/?work',
        status: 'undone',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '11',
        projectId: '6',
        taskName: 'Progress check',
        time: new Date('2020-08-24T15:30:00'),
        taskDetail: 'normally progress check',
        isDone: false,
      },
    ],
  },
  {
    id: '14',
    email: 'nat@mail.com',
    name: 'Nat W',
    image: 'https://ca.slack-edge.com/T03EKL88Y-UNGSE8TPH-g4cf4f9cc0af-512',
    position: 'Designers/Programmers',
    skills: ['Python'],
    contacts: [
      {
        id: '14',
        facebook: 'http://localhost:3000/profile',
        twitter: '',
        instagram: '',
        gitlab: 'http://localhost:3000/profile',
        github: '',
      },
    ],
    projects: [
      {
        id: '6',
        projectName: `Artisan' Dashboard Project`,
        projectType: 'Web Application',
        projectDetail:
          'The Dashboard that show the flow of work in the project. Dashboards allow managers to monitor the contribution of the various departments in their organization. To gauge exactly how well an organization is performing overall, digital dashboards allow you to capture and report specific data points from each department within the organization, thus providing a "snapshot" of performance.',
        projectImage: 'https://source.unsplash.com/700x600/?work',
        status: 'undone',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '11',
        projectId: '6',
        taskName: 'Progress check',
        time: new Date('2020-08-24T15:30:00'),
        taskDetail: 'normally progress check',
        isDone: false,
      },
    ],
  },
  {
    id: '15',
    email: 'mint@mail.com',
    name: 'Mint Thanwimol',
    image: 'https://ca.slack-edge.com/T03EKL88Y-UPX5YQEDU-3f1c55434773-512',
    position: 'Designers/Programmers',
    skills: ['JavaScript'],
    contacts: [
      {
        id: '15',
        facebook: 'http://localhost:3000/profile',
        twitter: '',
        instagram: 'http://localhost:3000/profile',
        gitlab: '',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '6',
        projectName: `Artisan' Dashboard Project`,
        projectType: 'Web Application',
        projectDetail:
          'The Dashboard that show the flow of work in the project. Dashboards allow managers to monitor the contribution of the various departments in their organization. To gauge exactly how well an organization is performing overall, digital dashboards allow you to capture and report specific data points from each department within the organization, thus providing a "snapshot" of performance.',
        projectImage: 'https://source.unsplash.com/700x600/?work',
        status: 'undone',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '11',
        projectId: '6',
        taskName: 'Progress check',
        time: new Date('2020-08-24T15:30:00'),
        taskDetail: 'normally progress check',
        isDone: false,
      },
    ],
  },
  {
    id: '16',
    email: 'jayjay@mail.com',
    name: 'Jayjay Chalobon',
    image: 'https://ca.slack-edge.com/T03EKL88Y-UTMUCNH1P-557445587bf1-512',
    position: 'Designers/Programmers',
    skills: ['React', 'Angular'],
    contacts: [
      {
        id: '16',
        facebook: 'http://localhost:3000/profile',
        twitter: 'http://localhost:3000/profile',
        instagram: 'http://localhost:3000/profile',
        gitlab: 'http://localhost:3000/profile',
        github: 'http://localhost:3000/profile',
      },
    ],
    projects: [
      {
        id: '6',
        projectName: `Artisan' Dashboard Project`,
        projectType: 'Web Application',
        projectDetail:
          'The Dashboard that show the flow of work in the project. Dashboards allow managers to monitor the contribution of the various departments in their organization. To gauge exactly how well an organization is performing overall, digital dashboards allow you to capture and report specific data points from each department within the organization, thus providing a "snapshot" of performance.',
        projectImage: 'https://source.unsplash.com/700x600/?work',
        status: 'undone',
        dueDate: new Date(),
      },
    ],
    tasks: [
      {
        id: '11',
        projectId: '6',
        taskName: 'Progress check',
        time: new Date('2020-08-24T15:30:00'),
        taskDetail: 'normally progress check',
        isDone: false,
      },
    ],
  },
]