<template>
  <div v-if="dataTask">
    <ToolbarBack />
    <br />
    <div style="margin :60px 18px 0 18px">
      <!-- Done button -->
      <v-btn
        v-model="isDone"
        id="buttonStatus"
        v-if="taskFunc.status == false"
        style="width:100%; text-transform: capitalize; color: #000000;"
        elevation="6"
        color="#F77B72"
        v-on:click="changeStatus()"
      >
        <svg
          style="margin-right:3px"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-circle"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
        </svg>
        Make as Done
      </v-btn>

      <!-- WIP button -->
      <v-btn
        v-model="isDone"
        id="buttonStatus"
        v-if="taskFunc.status == true"
        style="width:100%; text-transform: capitalize; color: #000000;"
        elevation="6"
        color="#4DD987"
        v-on:click="changeStatus()"
      >
        <svg
          style="margin-right:3px"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-check-circle"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            fill-rule="evenodd"
            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
          />
        </svg>
        Make as Undone
      </v-btn>
    </div>

    <!-- Dashboard -->
    <div>
      <div>
        <v-row style="margin-left:6px; margin-right:6px;">
          <v-col>
            <v-card elevation="6" id="card">
              <div style="padding-top:10px">
                <span
                  class="iconify"
                  data-inline="false"
                  data-icon="ant-design:fund-projection-screen-outlined"
                  style="color: #0036c7; font-size: 22px;"
                ></span>
              </div>
              <div>
                <b>{{ dataProject.projectName }}</b>
              </div>
              <div id="position" style="padding-bottom:10px">Project name</div>
            </v-card>
          </v-col>
          <v-col>
            <v-card elevation="6" id="card">
              <div style="padding-top:10px">
                <a-icon type="clock-circle" style="color:#0036c7; font-size: 22px;" />
              </div>
              <div>
                <b>{{ $dayjs(dataProject.dueDate).format('DD MMM YYYY') }}</b>
              </div>
              <div id="position" style="padding-bottom:10px">Due date</div>
            </v-card>
          </v-col>
        </v-row>
        <v-row style="margin-left:6px; margin-right:6px;">
          <v-col>
            <v-card id="card">
              <div style="padding-top:10px">
                <span
                  class="iconify"
                  data-inline="false"
                  data-icon="clarity:users-line"
                  style="color: #0036c7; font-size: 22px;"
                ></span>
              </div>
              <div class="center con-avatars">
                <vs-avatar-group>
                  <vs-avatar circle v-for="member in dataTask.members" :key="member.id">
                    <img v-bind:src="member.image" />
                  </vs-avatar>
                </vs-avatar-group>
              </div>
              <div id="position" style="padding-bottom:10px">Team</div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Detail of Task -->
    <v-row style="margin-left:6px; margin-right:6px;">
      <v-col
        ><span style="float:left; font-size:20px; font-weight:550">{{
          dataTask.taskName
        }}</span></v-col
      >
    </v-row>
    <div class="detailTask">
      {{ dataTask.taskDetail }}
    </div>

    <!-- Clipboard -->
    <v-row style="margin-left:6px; margin-right:6px; margin-top:12px">
      <v-col style="padding-bottom: 0px;">
        <span
          class="iconify"
          data-inline="false"
          data-icon="ic:outline-attach-file"
          style="float: left; color: #105efb; font-size: 22px;"
        ></span>
        <b style="float: left; font-size:16px">Clipboard</b>
      </v-col>
    </v-row>

    <!-- upload file -->
    <div class="clearfix">
      <v-row style="margin-left:18px; margin-right:18px; margin-top:12px;">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </v-row>
    </div>

    <!-- Comment -->
    <v-row style="margin-left:18px; margin-right:18px; margin-top:12px">
      <v-row style="margin-left:6px">
        <a-icon type="message" style="color:rgb(16, 94, 251); font-size: 22px;" />
        <span>Comment</span>
      </v-row>
      <a-comment>
        <template slot="actions">
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <a-icon
                type="like"
                :theme="action === 'liked' ? 'filled' : 'outlined'"
                @click="like"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">
              {{ likes }}
            </span>
          </span>
          <span key="comment-basic-dislike">
            <a-tooltip title="Dislike">
              <a-icon
                type="dislike"
                :theme="action === 'disliked' ? 'filled' : 'outlined'"
                @click="dislike"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">
              {{ dislikes }}
            </span>
          </span>
          <span key="comment-basic-reply-to">Reply to</span>
        </template>
        <a slot="author">Han Solo</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
        <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ moment().fromNow() }}</span>
        </a-tooltip>
      </a-comment>
    </v-row>

    <!-- input comment -->
    <div style="background-color:#E9F0FF">
      <v-row>
        <v-col cols="2">
          <span
            class="iconify"
            data-inline="false"
            data-icon="carbon:user-avatar-filled-alt"
            style="color: #8f8f8f; font-size: 30px;"
          ></span>
        </v-col>
        <v-col cols="8">
          <a-input placeholder="Say something" v-model="newComment" />
        </v-col>
        <v-col cols="2" @click="addComment()">
          <span
            class="iconify"
            data-inline="false"
            data-icon="cil:send"
            style="color: #0036c7; font-size: 20px;"
          ></span>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// function upload file
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

import ToolbarBack from '@/components/ToolbarBack.vue'
import store from '../store/index.js'
import moment from 'moment'
import * as gqlQuery from '../constants/graphql'

export default {
  name: 'taskDetail',
  components: {
    ToolbarBack,
  },
  apollo: {
    getTask: {
      query: gqlQuery.TASK_QUERY,
      variables() {
        return {
          taskId: parseInt(this.$route.params.id),
        }
      },
      update( data ) {
        this.dataTask = data.task
        this.dataProject = data.task.project
        this.dataMember = data.task.member
      },
    },
  },

  data() {
    return {
      dataTask: null,
      dataProject: null,
      dataMember: null,
      isDone: false,
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      project: store.state.projects,
      task: store.state.tasks,

      // upload file
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://i.pinimg.com/564x/d3/7c/33/d37c33b2921a5df2fc85040e32b28f6c.jpg',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://i.pinimg.com/564x/c1/a5/31/c1a531fe6da91a99840858471f6e714f.jpg',
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://i.pinimg.com/564x/ff/79/6f/ff796f70a33c46b008e1b0ec24ec4b1b.jpg',
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://i.pinimg.com/564x/96/5c/95/965c95e230d9eefcb9e2a089a1544a1e.jpg',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],

      // add comment
      newComment: '',
      idForComment: 2,
      comments: [
        {
          id: 1,
          name: 'Pupaeng',
          comment: 'สวัสดีค่ะ',
          dateTime: '10.00 AM',
          profileUrl: 'https://ca.slack-edge.com/T03EKL88Y-U016J08FAUC-eab33b9cc74f-512',
        },
      ],
    }
  },
  computed: {
    taskFunc() {
      return this.$store.getters.task(parseInt(this.$route.params.id))
    },
  },
  methods: {
    toggleDone: function(data) {
      console.log(parseInt(this.$route.params.id))
      console.log(gqlQuery.TOGGLE_STATUS);
      this.$apollo.mutate({
        mutation: gqlQuery.TOGGLE_STATUS,
        variables: {
          id: parseInt(this.$route.params.id),
          data: !data.isDone,
        },
        update: (store, { data: { updateOneTask } }) => {
          if (updateOneTask.isDone) {
            // eslint-disable-next-line
            console.log(updateOneTask)
          }
        },
      })
    },
    toggleUndone: function(data) {
      console.log(parseInt(this.$route.params.id))
      this.$apollo.mutate({
        mutation: gqlQuery.TOGGLE_STATUS,
        variables: {
          id: parseInt(this.$route.params.id),
          data: data.isDone,
        },
        update: (store, { data: { updateOneTask } }) => {
          if (updateOneTask.isDone) {
            // eslint-disable-next-line
            console.log(updateOneTask)
          }
        },
      })
    },
    like() {
      this.likes = 1
      this.dislikes = 0
      this.action = 'liked'
    },
    dislike() {
      this.likes = 0
      this.dislikes = 1
      this.action = 'disliked'
    },

    changeStatus() {
      console.log('ค่าเริ่มต้น ' + this.taskFunc.status)
      if (this.taskFunc.status == false) {
        this.taskFunc.status = true
        console.log(this.taskFunc.status)
      } else {
        this.taskFunc.status = false
        console.log(this.taskFunc.status)
      }
    },

    // Upload file
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },

    // add comment
    addComment() {
      if (this.newComment.trim().length == 0) {
        console.log('please enter some comment')
        return
      }

      console.log('test add comment')
      this.comments.push({
        id: this.idForComment,
        name: 'Pupaeng',
        comment: this.newComment,
        dateTime: '10.10 AM',
        profileUrl: 'https://ca.slack-edge.com/T03EKL88Y-U016J08FAUC-eab33b9cc74f-512',
      })

      this.newComment = ''
      this.idForComment++
      console.log(this.comments)
    },

    // delete comment
    deleteComment() {
      console.log('delete comment')
    },

    edit() {
      console.log('edit comment')
    },
    reply() {
      console.log('reply comment')
    },
  },
}
</script>

<style>
div {
  font-family: 'Roboto';
}
#card {
  border-radius: 2px;
}
.detailTask {
  margin: 0px 18px 0px 18px;
  background-color: #e9f0ff;
  padding: 15px 15px 15px 15px;
  text-align: left;
}
#position {
  color: #8f8f8f;
  font-size: 12px;
  margin-top: 0px;
  padding-bottom: 0px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
