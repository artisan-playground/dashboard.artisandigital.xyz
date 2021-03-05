<template>
  <div v-if="dataTask" style="padding-bottom:60px">
    <a-spin :spinning="spinning">
      <ToolbarBack :msg="dataTask.taskName" />
      <br />
      <a-row style="margin :60px 15px 15px 15px">
        <div class="modal-delete" id="modal">
          <vue-confirm-dialog></vue-confirm-dialog>
        </div>
        <!-- Done button -->
        <a-button
          size="large"
          v-if="dataTask.isDone == false"
          block
          v-model="isDone"
          id="doneBtn"
          v-on:click="toggleStatus(true)"
          :loading="loading"
          @click="handleOk"
        >
          <a-icon type="check" />
          Mark as Done
        </a-button>

        <!-- WIP button -->
        <a-button
          size="large"
          v-if="dataTask.isDone == true"
          block
          v-model="isDone"
          id="wipBtn"
          v-on:click="toggleStatus(false)"
          :loading="loading"
          @click="handleOk"
        >
          <a-icon type="close" />
          Mark as Undone
        </a-button>
      </a-row>

      <!-- Dashboard -->
      <a-row :gutter="15" style="margin-left:7.5px; margin-right:7.5px; margin-bottom:15px;">
        <a-col :span="11" :xs="11">
          <a-card
            style="border:none;"
            :bodyStyle="{
              padding: '5px',
            }"
          >
            <div class="iconCus-task">
              <a-icon type="fund" />
            </div>
            <div>
              <b>{{ dataProject.projectName }}</b>
            </div>
            <div id="position" style="padding-bottom:10px">Project name</div>
          </a-card>
        </a-col>
        <a-col :span="2" :xs="2">
          <a-divider type="vertical" style="height:100px" />
        </a-col>
        <a-col :span="11" :xs="11">
          <a-card
            style="border:none;"
            :bodyStyle="{
              padding: '5px',
            }"
          >
            <div class="iconCus-task">
              <a-icon type="clock-circle" />
            </div>
            <div>
              <b>{{ $dayjs(dataTask.endTime).format('DD MMM YYYY') }}</b>
            </div>
            <div id="position" style="padding-bottom:10px">Due date</div>
          </a-card>
        </a-col>
      </a-row>

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
                <div
                  v-for="member in dataTask.members.slice(0, 5)"
                  :key="member.id"
                  style="display:inline; margin: 0 2px;"
                >
                  <a-avatar
                    v-bind:src="
                      member.image ? member.image.fullPath : require('../assets/user.svg')
                    "
                  />
                </div>

                <div v-if="dataTask.members.length >= 5" style="display:inline;">
                  <div
                    v-for="member in dataTask.members.slice(4, 5)"
                    :key="member.id"
                    style="display:inline; margin: 0 2px;"
                  >
                    <a-avatar class="avatar-plus">
                      <a-icon slot="icon" type="plus" />
                    </a-avatar>
                    <a-avatar
                      v-bind:src="
                        member.image ? member.image.fullPath : require('../assets/user.svg')
                      "
                    />
                  </div>
                </div>
              </div>
              <div id="position" style="padding-bottom:10px">Team</div>
            </a-card>
          </router-link>
        </a-col>
      </a-row>

      <!-- Detail of Task -->
      <a-row class="titleSpace">
        <a-col align="left" :span="20"
          ><b class="titleName">{{ dataTask.taskName }}</b>
        </a-col>
        <a-col align="right" :span="4" style="padding-right:3px;">
          <router-link :to="{ name: 'EditTask', params: { id: dataTask.id } }">
            <a-icon type="edit" class="iconEdit" />
          </router-link>
        </a-col>
      </a-row>
      <div class="detailTask">
        {{ dataTask.taskDetail }}
      </div>

      <!-- Clipboard -->
      <a-row class="titleSpace">
        <a-col style="padding-bottom: 0px;">
          <a-icon type="paper-clip" class="iconClipboard" />
          <b class="titleName">Attachments</b>
        </a-col>
      </a-row>

      <!-- upload file -->
      <a-row style="margin: 0px 15px;" :gutter="[8, 8]">
        <div v-for="file in dataTask.files" :key="file.id">
          <a-col
            :xs="{ span: 8 }"
            :sm="{ span: 4 }"
            :md="{ span: 4 }"
            :lg="{ span: 3 }"
            :xl="{ span: 2 }"
            :xxl="{ span: 1 }"
          >
            <div
              style="border: 1px solid #d9d9d9; border-radius: 2px; width: 105px;"
              class="taskFile"
            >
              <div class="flexBox-file">
                <div
                  v-if="
                    file.extension == 'image/png' ||
                      file.extension == 'image/jpg' ||
                      file.extension == 'image/jpeg' ||
                      file.extension == 'image/svg+xml'
                  "
                >
                  <img :src="file.fullPath" alt="" class="img-task" />
                </div>
                <div v-else>
                  <a-icon
                    :type="
                      file.extension == 'text/plain'
                        ? 'file-text'
                        : file.extension == 'application/pdf'
                        ? 'file-pdf'
                        : file.extension == 'text/javascript'
                        ? 'file'
                        : file.extension ==
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        ? 'file-word'
                        : file.extension == 'application/x-zip-compressed' ||
                          'application/octet-stream'
                        ? 'file-zip'
                        : 'file'
                    "
                    style="font-size:30px; color:#0036C7"
                  />
                  <span class="taskFileName" style="width: 70px;"> {{ file.fileName }} </span>
                  <span v-if="file.extension == 'text/plain'">.txt</span>
                  <span v-if="file.extension == 'text/javascript'">.js</span>
                  <span
                    v-if="
                      file.extension ==
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    "
                    >.docx</span
                  >
                  <span v-if="file.extension == 'application/x-zip-compressed'">.zip</span>
                  <span v-if="file.extension == 'application/octet-stream'">.rar</span>
                </div>

                <div class="overlay">
                  <div class="flexbox-delFileTask">
                    <a-icon
                      v-if="
                        file.extension == 'image/png' ||
                          file.extension == 'image/jpg' ||
                          file.extension == 'image/jpeg' ||
                          file.extension == 'image/svg+xml'
                      "
                      type="eye"
                      class="icon-delete-view"
                      @click="openModal(file)"
                    />
                    <a v-else :href="file.fullPath" download>
                      <a-icon type="download" class="icon-delete-view" />
                    </a>

                    <a-icon
                      type="delete"
                      class="icon-delete-view"
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
          :lg="{ span: 3 }"
          :xl="{ span: 2 }"
          :xxl="{ span: 1 }"
        >
          <a-button class="btn-upload">
            <a-icon type="plus" style="color:#585858; font-size:20px; margin-bottom:10px;" />
            <div>
              Upload
            </div>
          </a-button>
          <input @change="uploadFile" type="file" name="myfile" />
        </a-col>
      </a-row>

      <a-modal
        :visible="visible"
        :footer="null"
        :centered="true"
        @cancel="hideModal"
        :bodyStyle="{
          padding: 0,
        }"
      >
        <img :src="item.fullPath" style="width:100%;" alt="" />
      </a-modal>

      <!-- Comment -->
      <div class="titleSpace">
        <a-row style="display:flex;" v-if="dataComment.length >= 1">
          <a-icon type="message" class="iconMessage" />
          <b class="titleName">Comment</b>
        </a-row>
        <a-row class="cus-comment">
          <a-comment v-for="comment in dataComment" :key="comment.id" v-bind:value="comment.id">
            <template slot="actions" v-if="comment.user.id == user.id">
              <span @click="selectComment(comment.id)" v-on:click="commentEdit = !commentEdit">
                <a-icon type="edit" />Edit
              </span>
              <span @click="deleteComment(comment.id)"> <a-icon type="delete" /> Delete </span>
            </template>

            <template slot="actions" v-if="comment.user.id !== user.id && user.role == 'ADMIN'">
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
        style="background-color:#E9F0FF; padding-top:10px; padding-bottom:10px;
      position: fixed; left: 0; bottom: 0; width: 100%;"
      >
        <a-col :span="4">
          <img
            class="userProfileComment"
            :src="userProfile ? userProfile.fullPath : require('../assets/user.svg')"
          />
        </a-col>
        <a-col :span="16" id="antInput">
          <a-input class="inputComment" placeholder="Say something" v-model="newComment" />
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
                style="transform: rotate(-45deg); color: #0036c7; margin-top: -8px;"
                v-if="commentLoadding == false"
              >
                mdi-send
              </v-icon>
              <a-spin v-if="commentLoadding" />
            </div>
          </a-row>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import moment from 'moment'
import * as gqlQuery from '../constants/task'
import * as gqlQueryComment from '../constants/comment'
import * as gqlUpload from '../constants/upload'
import * as gqlUser from '../constants/user'
import * as gqlQueryRecent from '../constants/recentActivity'
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
    getUser: {
      query: gqlUser.MEMBER_QUERY,
      variables() {
        return {
          userId: this.userId,
        }
      },
      update(data) {
        this.userProfile = data.user.image
        this.user = data.user
      },
    },
  },

  data() {
    return {
      visible: false,
      spinning: false,
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
      user: [],
      selectCommentId: 0,
      userProfile: null,
      item: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    openModal(value) {
      this.visible = true
      this.item = value
    },
    hideModal() {
      this.visible = false
    },
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
    createRecent(val) {
      this.$apollo.mutate({
        mutation: gqlQueryRecent.CREATE_RECENT,
        variables: {
          message: `${val}`,
          userId: this.userId,
          projectId: this.dataProject.id,
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
              const val = `Removed file`
              this.$apollo
                .mutate({
                  mutation: gqlUpload.DELETE_TASK_FILE,
                  variables: {
                    id: fileId,
                  },
                })
                .then(
                  this.$apollo.mutate({
                    mutation: gqlQuery.TASK_QUERY,
                    variables: {
                      taskId: parseInt(this.$route.params.id),
                    },
                    update: data => {
                      this.dataTask = data.getTaskById
                    },
                  })
                )
                .then(this.$message.success('delete file success'))
                .then(this.createRecent(val))
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
        this.spinning = !this.spinning
        const val = `Uploaded file`
        await this.$apollo.mutate({
          mutation: gqlUpload.UPLOAD_TASK_FILE,
          variables: {
            file: event.target.files[0],
            taskId: parseInt(this.$route.params.id),
          },
        })
        this.spinning = !this.spinning
        this.createRecent(val)
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
    toggleStatus(status) {
      let val
      if (status == true) {
        val = ` ${this.dataTask.taskName} marked as done`
      } else {
        val = `${this.dataTask.taskName} marked as undone `
      }
      this.$apollo
        .mutate({
          mutation: gqlQuery.TOGGLE_STATUS,
          variables: {
            id: parseInt(this.$route.params.id),
            data: {
              isDone: { set: status },
            },
          },
        })
        .then(this.createRecent(val))
    },
    async addComment() {
      if (this.newComment.trim().length == 0) {
        this.$error({
          title: 'ยังไม่ได้คอมเม้นอะไรเลยนะ',
        })
        return
      } else {
        try {
          this.commentLoadding = true
          const val = `Commented ${this.dataTask.taskName}`
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
          this.createRecent(val)
          this.commentLoadding = false
          this.$message.success('sent comment success')
        } catch (error) {
          this.$message.success(error)
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
  margin: 0px 15px 15px 15px;
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
.iconCus-task .anticon svg {
  display: inline-block;
  color: #0036c7;
  font-size: 20px;
  margin-top: 10px;
}
.iconClipboard {
  float: left;
  color: #0036c7;
  font-size: 20px;
}
.iconMessage {
  color: rgb(16, 94, 251);
  font-size: 22px;
  margin-right: 5px;
}

.userProfileComment {
  border-radius: 100%;
  width: 32px;
  height: 32px;
  object-fit: cover;
}
.inputComment {
  width: 100%;
  border: 1px solid #d7d7d7;
  background-color: white;
  border-radius: 2px;
  height: 32px;
}
.icon-delete-view {
  font-size: 20px;
  color: white;
  margin: 0 4px;
}
.btn-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  width: 105px;
  height: 102px;
  background-color: #fafafa;
  float: left;
}
</style>
