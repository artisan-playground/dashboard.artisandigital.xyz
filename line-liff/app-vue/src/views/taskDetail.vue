<template>
  <div v-if="dataTask">
    <ToolbarBack />
    <br />
    <div style="margin :60px 15px 15px 15px">
      <!-- Done button -->
      <a-button
        size="large"
        v-if="dataTask.isDone == false"
        block
        v-model="isDone"
        style="background-color:#FF4D4F; color:white; border: none; border-radius:2px;"
        v-on:click="toggleDone()"
        :loading="loading"
        @click="handleOk"
      >
        Mark as Done
      </a-button>

      <!-- WIP button -->
      <a-button
        size="large"
        v-if="dataTask.isDone == true"
        block
        v-model="isDone"
        style="background-color:#73D13D; color:white; border: none; border-radius:2px;"
        v-on:click="toggleUndone()"
        :loading="loading"
        @click="handleOk"
      >
        Mark as Done
      </a-button>
    </div>

    <!-- Dashboard -->
    <div>
      <div>
        <a-row :gutter="15" style="margin-left:7.5px; margin-right:7.5px; margin-bottom:15px;">
          <a-col :span="12" :xs="12">
            <a-card
              :bodyStyle="{
                padding: '5px',
              }"
            >
              <div style="padding-top:10px">
                <a-icon type="fund" style="color:#0036c7; font-size: 22px;" />
              </div>
              <div>
                <b>{{ dataProject.projectName }}</b>
              </div>
              <div id="position" style="padding-bottom:10px">Project name</div>
            </a-card>
          </a-col>

          <a-col :span="12" :xs="12">
            <a-card
              :bodyStyle="{
                padding: '5px',
              }"
            >
              <div style="padding-top:10px">
                <a-icon type="clock-circle" style="color:#0036c7; font-size: 22px;" />
              </div>
              <div>
                <b>{{ $dayjs(dataProject.dueDate).format('DD MMM YYYY') }}</b>
              </div>
              <div id="position" style="padding-bottom:10px">Due date</div>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <a-row style="margin-left:15px; margin-right:15px; margin-bottom:15px;">
        <a-col>
          <a-card
            :bodyStyle="{
              padding: '5px',
            }"
          >
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
                  <img v-bind:src="member.image.fullPath" />
                </vs-avatar>
              </vs-avatar-group>
            </div>
            <div id="position" style="padding-bottom:10px">Team</div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- Detail of Task -->
    <a-row style="margin-left:15px; margin-right:15px;">
      <a-col
        ><span style="float:left; font-size:20px; font-weight:550">{{
          dataTask.taskName
        }}</span></a-col
      >
    </a-row>
    <div class="detailTask">
      {{ dataTask.taskDetail }}
    </div>

    <!-- Clipboard -->
    <a-row style="margin-left:6px; margin-right:6px; margin-top:12px">
      <a-col style="padding-bottom: 0px;">
        <span
          class="iconify"
          data-inline="false"
          data-icon="ic:outline-attach-file"
          style="float: left; color: #105efb; font-size: 22px;"
        ></span>
        <b style="float: left; font-size:16px">Clipboard</b>
      </a-col>
    </a-row>

    <!-- upload file -->
    <div class="clearfix">
      <a-row style="margin-left:18px; margin-right:18px; margin-top:12px;">
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
      </a-row>
    </div>

    <!-- Comment -->
    <div style="margin-left:18px; margin-right:18px; margin-top:12px;">
      <a-row style="display:flex;">
        <a-icon type="message" style="color:rgb(16, 94, 251); font-size: 22px; margin-right:5px;" />
        <span>Comment</span>
      </a-row>
      <a-row>
        <a-comment v-for="comment in dataComment" :key="comment.id">
          <template slot="actions">
            <span @click="editComment"> <a-icon type="edit" />Edit </span>
            <span @click="deleteComment">
              <a-icon type="delete" v-model="commentId" :value="comment.id" /> Delete
            </span>
          </template>

          <a slot="author">{{ comment.user.name }}</a>
          <a-avatar slot="avatar" v-bind:src="comment.user.image.fullPath" alt="Han Solo" />
          <p slot="content" align="left">
            {{ comment.message }}
          </p>
          <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ moment(comment.timestamp).fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-row>
    </div>

    <!-- input comment -->
    <a-row
      type="flex"
      align="middle"
      style="background-color:#E9F0FF; padding-top:10px; padding-bottom:5px;"
    >
      <a-col :span="4">
        <span
          class="iconify"
          data-inline="false"
          data-icon="carbon:user-avatar-filled-alt"
          style="color: #8f8f8f; font-size: 30px;"
        ></span>
      </a-col>
      <a-col :span="16">
        <a-input
          style="width:100%; border: 1px solid #D7D7D7; background-color:white; border-radius:2px; height:32px"
          placeholder="Say something"
          v-model="newComment"
        />
      </a-col>
      <a-col :span="4">
        <a-row type="flex" justify="center">
          <div
            style="width: 22px;
                  height: 22px;
                  margin: 8px;
                  cursor: pointer;"
            v-on:click="addComment()"
            :loading="commentLoadding"
          >
            <v-icon
              style="transform: rotate(-45deg); color: #0036c7;"
              v-if="commentLoadding == false"
            >
              mdi-send
            </v-icon>
            <a-spin v-if="commentLoadding" />
          </div>
        </a-row>
      </a-col>
    </a-row>
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
import moment from 'moment'
import * as gqlQuery from '../constants/task'
import * as gqlQueryComment from '../constants/comment'

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
      update(data) {
        this.dataTask = data.getTaskById
        this.dataProject = data.getTaskById.project
        this.dataComment = data.getTaskById.comments
      },
    },
  },

  data() {
    return {
      commentId: '',
      dataTask: null,
      dataProject: null,
      dataComment: null,
      loading: false,
      commentLoadding: false,
      isDone: false,
      likes: 0,
      dislikes: 0,
      action: null,
      moment,

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
    }
  },
  computed: {
    taskFunc() {
      return this.$store.getters.task(parseInt(this.$route.params.id))
    },
  },
  mounnted() {
    // this.getTask()
  },
  methods: {
    getTaskByClick() {
      console.log('Logger in call back')
      this.$apollo
        .mutate({
          mutation: gqlQuery.TASK_QUERY,
          variables: {
            taskId: parseInt(this.$route.params.id),
          },
          update: data => {
            this.dataTask = data.getTaskById
          },
        })
        .then(() => {
          this.commentLoadding = false
          this.$message.success('sent comment success')
        })
    },

    handleOk() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    toggleDone() {
      this.$apollo.mutate({
        mutation: gqlQuery.TOGGLE_STATUS,
        variables: {
          id: parseInt(this.$route.params.id),
          data: {
            isDone: { set: true },
          },
        },
        update: (store, { data: { updateOneTask } }) => {
          if (updateOneTask.isDone) {
            console.log(updateOneTask)
          }
        },
      })
    },
    toggleUndone() {
      this.$apollo.mutate({
        mutation: gqlQuery.TOGGLE_STATUS,
        variables: {
          id: parseInt(this.$route.params.id),
          data: {
            isDone: { set: false },
          },
        },
        update: (store, { data: { updateOneTask } }) => {
          if (updateOneTask.isDone) {
            console.log(updateOneTask)
          }
        },
      })
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

    addComment() {
      if (this.newComment.trim().length == 0) {
        this.$error({
          title: 'ยังไม่ได้คอมเม้นอะไรเลยนะ',
        })
        return
      } else {
        this.commentLoadding = true
        this.$apollo
          .mutate({
            mutation: gqlQueryComment.ADD_COMMENT,
            variables: {
              timestamp: moment(),
              message: this.newComment,
              taskId: parseInt(this.$route.params.id),
              userId: 1,
            },
          })
          .then(response => {
            console.log(response)
            this.getTaskByClick()
          })
          .catch(error => {
            console.log(error)
          })
      }
      this.newComment = ''
    },

    // delete comment
    deleteComment() {
      console.log('delete comment')
      console.log(this.commentId)
      // this.$apollo.mutate({
      //   mutation: gqlQueryComment.DELETE_COMMENT,
      //   variables: {
      //     id: 3,
      //   },
      // })
    },

    editComment() {
      console.log('edit comment')
    },
    reply() {
      console.log('reply comment')
    },
  },
}
</script>

<style>
.detailTask {
  margin: 0px 18px 0px 18px;
  background-color: #e9f0ff;
  padding: 15px 15px 15px 15px;
  text-align: left;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-comment-actions {
  float: left;
}
</style>
