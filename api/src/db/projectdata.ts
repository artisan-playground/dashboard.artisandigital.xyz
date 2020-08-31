import { Project } from 'src/schema/project'

export const projects: Project[] = [
  {
    id: '1',
    projectName: 'Project #1',
    projectType: 'Web design',
    projectDetail: 'Commodo adipiscing ornare sit lorem sit tempus urna, vestibulum, neque.',
    projectImage: 'https://source.unsplash.com/700x700/?work',
    status: 'undone',
    dueDate: new Date(),
    memberIds: ['1', '2', '3'],
  },
  {
    id: '2',
    projectName: 'Project #2',
    projectType: 'Marketing',
    projectDetail: 'Consequat tempus nisi, orci, ligula duis.',
    projectImage: 'https://source.unsplash.com/700x700/?work',
    status: 'done',
    dueDate: new Date(),
    memberIds: ['3', '4', '5', '6', '7', '8', '9'],
  },
  {
    id: '3',
    projectName: 'Project #3',
    projectType: 'Mobile App',
    projectDetail:
      'Nisi lacus sed viverra tellus in hac. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida.',
    projectImage: 'https://source.unsplash.com/700x700/?work',
    status: 'done',
    dueDate: new Date(),
    memberIds: ['5', '6'],
  },
  {
    id: '4',
    projectName: 'Project #4',
    projectType: 'Mobile App',
    projectDetail:
      'Urna nunc id cursus metus aliquam eleifend. Ultrices neque ornare aenean euismod elementum. Eget arcu dictum varius duis at consectetur',
    projectImage: 'https://source.unsplash.com/700x700/?work',
    status: 'done',
    dueDate: new Date(),
    memberIds: ['7', '8', '9'],
  },
  {
    id: '5',
    projectName: 'Project #5',
    projectType: 'Mobile App',
    projectDetail: 'Blandit volutpat maecenas volutpat blandit aliquam etiam erat.',
    projectImage: 'https://source.unsplash.com/700x700/?work',
    status: 'done',
    dueDate: new Date(),
    memberIds: ['7', '8', '9', '10'],
  },
  {
    id: '6',
    projectName: `Artisan' Dashboard Project`,
    projectType: 'Web Application',
    projectDetail:
      'The Dashboard that show the flow of work in the project. Dashboards allow managers to monitor the contribution of the various departments in their organization. To gauge exactly how well an organization is performing overall, digital dashboards allow you to capture and report specific data points from each department within the organization, thus providing a "snapshot" of performance.',
    projectImage: 'https://source.unsplash.com/700x700/?work',
    status: 'undone',
    dueDate: new Date(),
    memberIds: ['10', '11', '13', '14', '15', '16'],
  },
]
