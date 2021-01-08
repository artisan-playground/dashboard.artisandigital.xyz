<template>
  <div v-if="dataTask">
    <ToolbarBack />
    <br />
    <div style="margin :60px 15px 15px 15px">
      <div class="modal-delete" id="modal">
        <vue-confirm-dialog></vue-confirm-dialog>
      </div>
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
        Mark as Undone
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
                <b>{{ $dayjs(dataTask.endTime).format('DD MMM YYYY') }}</b>
              </div>
              <div id="position" style="padding-bottom:10px">Due date</div>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <a-row style="margin-left:15px; margin-right:15px; margin-bottom:15px;">
        <a-col>
          <router-link :to="{ name: 'MemberInTask', params: { id: dataTask.id } }">
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
                    <img
                      v-bind:src="
                        member.image ? member.image.fullPath : require('../assets/user.svg')
                      "
                    />
                  </vs-avatar>
                </vs-avatar-group>
              </div>
              <div id="position" style="padding-bottom:10px">Team</div>
            </a-card>
          </router-link>
        </a-col>
      </a-row>
    </div>

    <!-- Detail of Task -->
    <a-row style="margin-left:15px; margin-right:15px;">
      <a-col align="left" :span="20"
        ><span style="float:left; font-size:20px; font-weight:550">{{ dataTask.taskName }}</span>
      </a-col>
      <a-col align="right" :span="4" style="padding-right:3px;">
        <router-link :to="{ name: 'EditTask', params: { id: dataTask.id } }">
          <a-icon type="edit" style="color:#0036C7;" />
        </router-link>
      </a-col>
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
        <b style="float: left; font-size:16px">Attachments</b>
      </a-col>
    </a-row>

    <!-- upload file -->
    <div class="clearfix">
      <a-row style="margin: 0px 15px 15px;" :gutter="[8, 8]">
        <div v-for="file in dataTask.files" :key="file.id">
          <a-col :xs="{ span: 8 }" :sm="{ span: 4 }" :md="{ span: 4 }" :lg="{ span: 2 }">
            <div
              style="border: 1px solid #d9d9d9; border-radius: 2px; width: 105px;"
              class="taskFile"
            >
              <div v-if="file.extension == 'text/plain'" class="flexBox-file">
                <a-icon type="file-text" style="font-size:30px; color:#0036C7" />
                <span class="taskFileName"> {{ file.fileName }} </span>
                <span>.txt</span>
                <div class="overlay">
                  <div class="flexbox-delFileTask">
                    <a-icon
                      type="delete"
                      style="font-size:20px; color:white;"
                      @click="deleteTaskFile(file.id)"
                    />
                  </div>
                </div>
              </div>

              <div v-if="file.extension == 'application/pdf'" class="flexBox-file">
                <a-icon type="file-pdf" style="font-size:30px; color:#0036C7" />
                <span class="taskFileName"> {{ file.fileName }} </span>
                <span>.pdf</span>
                <div class="overlay">
                  <div class="flexbox-delFileTask">
                    <a-icon
                      type="delete"
                      style="font-size:20px; color:white;"
                      @click="deleteTaskFile(file.id)"
                    />
                  </div>
                </div>
              </div>

              <div v-if="file.extension == 'text/javascript'" class="flexBox-file">
                <a-icon type="file" style="font-size:30px; color:#0036C7" />
                <span class="taskFileName"> {{ file.fileName }} </span>
                <span>.js</span>
                <div class="overlay">
                  <div class="flexbox-delFileTask">
                    <a-icon
                      type="delete"
                      style="font-size:20px; color:white;"
                      @click="deleteTaskFile(file.id)"
                    />
                  </div>
                </div>
              </div>
              <div v-if="file.extension == 'application/x-zip-compressed'" class="flexBox-file">
                <a-icon type="file-zip" style="font-size:30px; color:#0036C7" />
                <span class="taskFileName"> {{ file.fileName }} </span>
                <span>.zip</span>
                <div class="overlay">
                  <div class="flexbox-delFileTask">
                    <a-icon
                      type="delete"
                      style="font-size:20px; color:white;"
                      @click="deleteTaskFile(file.id)"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="
                  file.extension ==
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                "
                class="flexBox-file"
              >
                <a-icon type="file-word" style="font-size:30px; color:#0036C7" />
                <span class="taskFileName"> {{ file.fileName }} </span>
                <span>.docx</span>
                <div class="overlay">
                  <div class="flexbox-delFileTask">
                    <a-icon
                      type="delete"
                      style="font-size:20px; color:white;"
                      @click="deleteTaskFile(file.id)"
                    />
                  </div>
                </div>
              </div>
              <div
                id="taskFile"
                v-if="
                  file.extension == 'image/png' ||
                    file.extension == 'image/jpg' ||
                    file.extension == 'image/svg+xml'
                "
              >
                <img :src="file.fullPath" alt="" class="img-task" />
                <div class="overlay">
                  <div class="flexbox-delFileTask">
                    <a-icon
                      type="delete"
                      style="font-size:20px; color:white;"
                      @click="deleteTaskFile(file.id)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </a-col>
        </div>
        <a-col
          class="upload-btn-wrapper"
          :xs="{ span: 8 }"
          :sm="{ span: 4 }"
          :md="{ span: 4 }"
          :lg="{ span: 2 }"
        >
          <a-button
            style="border: 1px dashed #d9d9d9; border-radius: 2px; width: 105px; height: 102px; background-color:#FAFAFA"
          >
            <a-icon type="plus" style="color:#585858; font-size:20px; margin-bottom:10px;" />
            <div>
              Upload
            </div>
          </a-button>
          <input @change="uploadFile" type="file" name="myfile" />
        </a-col>
      </a-row>
    </div>

    <!-- Comment -->
    <div style="margin-left:18px; margin-right:18px; margin-top:12px;">
      <a-row style="display:flex;">
        <a-icon type="message" style="color:rgb(16, 94, 251); font-size: 22px; margin-right:5px;" />
        <span>Comment</span>
      </a-row>
      <a-row>
        <a-comment v-for="comment in dataComment" :key="comment.id" v-bind:value="comment.id">
          <template slot="actions" v-if="comment.user.id == user.id">
            <span @click="selectComment(comment.id)" v-on:click="commentEdit = !commentEdit">
              <a-icon type="edit" />Edit
            </span>
            <span @click="deleteComment(comment.id)"> <a-icon type="delete" /> Delete </span>
          </template>

          <a slot="author">{{ comment.user.name }}</a>
          <a-avatar
            slot="avatar"
            v-bind:src="
              comment.user.image ? comment.user.image.fullPath : require('../assets/user.svg')
            "
            alt="Han Solo"
          />

          <p v-if="comment.user.id == user.id" slot="content" align="left">
            <span v-if="comment.id == selectCommentId">
              <div v-if="commentEdit == false">
                {{ comment.message }}
              </div>
              <div v-else>
                <a-col :span="19">
                  <a-input v-model="comment.message" />
                </a-col>
                <a-col :span="5">
                  <a-button
                    @click="editComment(comment.id, comment.message)"
                    v-on:click="commentEdit = !commentEdit"
                    >Done</a-button
                  >
                </a-col>
              </div>
            </span>
            <span v-else>
              {{ comment.message }}
            </span>
          </p>

          <p slot="content" align="left" v-else>
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
      style="background-color:#E9F0FF; padding-top:10px; padding-bottom:5px;
      position: fixed; left: 0; bottom: 0; width: 100%;"
    >
      <a-col :span="4">
        <img
          style="border-radius:100%; width:32px;"
          :src="user.image ? user.image.fullPath : require('../assets/user.svg')"
        />
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
    <div style="padding-bottom:60px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import moment from 'moment'
import * as gqlQuery from '../constants/task'
import * as gqlQueryComment from '../constants/comment'
import * as gqlUpload from '../constants/upload'

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
      selectedFile: null,
      commentId: '',
      dataTask: null,
      dataProject: null,
      dataComment: null,
      loading: false,
      commentLoadding: false,
      isDone: false,
      action: null,
      moment,
      commentEdit: false,
      newComment: '',
      userId: 0,
      user: '',
      selectCommentId: 0,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const get = JSON.parse(localStorage.getItem('vuex'))
      this.user = get.Auth.user
      this.userId = get.Auth.user.id
    },
    getTaskbyFunc() {
      this.$apollo.mutate({
        mutation: gqlQuery.TASK_QUERY,
        variables: {
          taskId: parseInt(this.$route.params.id),
        },
        update: data => {
          this.dataTask = data.getTaskById
        },
      })
    },
    async deleteTaskFile(fileId) {
      try {
        await this.$confirm({
          title: 'Are you sure you want to delete this comment ?',
          button: {
            no: 'Cancel',
            yes: 'Delete',
          },
          callback: confirm => {
            if (confirm) {
              this.$apollo.mutate({
                mutation: gqlUpload.DELETE_TASK_FILE,
                variables: {
                  id: fileId,
                },
              })
              this.$apollo.mutate({
                mutation: gqlQuery.TASK_QUERY,
                variables: {
                  taskId: parseInt(this.$route.params.id),
                },
                update: data => {
                  this.dataTask = data.getTaskById
                },
              })
              this.$message.success('delete file success')
            }
          },
          onCancel() {},
        })
      } catch (error) {
        this.$message.error(error)
      }
    },
    async uploadFile(event) {
      try {
        await this.$apollo.mutate({
          mutation: gqlUpload.UPLOAD_TASK_FILE,
          variables: {
            file: event.target.files[0],
            taskId: parseInt(this.$route.params.id),
          },
        })
        this.getTaskbyFunc()
      } catch (error) {
        this.$message.error(error)
      }
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
      })
    },

    async addComment() {
      console.log(this.userId)
      if (this.newComment.trim().length == 0) {
        this.$error({
          title: 'ยังไม่ได้คอมเม้นอะไรเลยนะ',
        })
        return
      } else {
        try {
          this.commentLoadding = true
          await this.$apollo.mutate({
            mutation: gqlQueryComment.ADD_COMMENT,
            variables: {
              timestamp: moment(),
              message: this.newComment,
              taskId: parseInt(this.$route.params.id),
              userId: this.userId,
            },
          })
          this.getTaskbyFunc()
          this.commentLoadding = false
          this.$message.success('sent comment success')
        } catch (error) {
          console.error(error)
        }
      }
      this.newComment = ''
    },

    async deleteComment(commentId) {
      try {
        await this.$confirm({
          title: 'Are you sure you want to delete this comment ?',
          button: {
            no: 'Cancel',
            yes: 'Delete',
          },
          callback: confirm => {
            if (confirm) {
              this.$apollo.mutate({
                mutation: gqlQueryComment.DELETE_COMMENT,
                variables: {
                  id: commentId,
                },
              })
              this.$apollo.mutate({
                mutation: gqlQuery.TASK_QUERY,
                variables: {
                  taskId: parseInt(this.$route.params.id),
                },
                update: data => {
                  this.dataTask = data.getTaskById
                },
              })
              this.$message.success('delete comment success')
            }
          },
          onCancel() {},
        })
      } catch (error) {
        this.$message.error(error)
      }
    },

    editComment(id, message) {
      this.$apollo.mutate({
        mutation: gqlQueryComment.EDIT_COMMENT,
        variables: {
          id: id,
          message: message,
        },
      })
    },

    selectComment(id) {
      return (this.selectCommentId = id)
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
