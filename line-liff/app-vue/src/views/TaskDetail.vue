<template>
  <div v-if="dataTask" style="padding-bottom:60px">
    <a-spin :spinning="spinning">
      <ToolbarBack :msg="dataTask.taskName" />
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
          v-on:click="toggleStatus()"
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
          style="background-color:#73D13D; color:white; border: none; border-radius:2px;"
          v-on:click="toggleStatus()"
          :loading="loading"
          @click="handleOk"
        >
          <a-icon type="close" />
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
                <div class="iconCus-task">
                  <a-icon type="fund" />
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
      </div>

      <!-- Detail of Task -->
      <a-row style="margin-left:15px; margin-right:15px;">
        <a-col align="left" :span="20"
          ><span style="float:left; font-size:20px; font-weight:550">{{ dataTask.taskName }}</span>
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
      <a-row style="margin:12px 18px;">
        <a-col style="padding-bottom: 0px;">
          <a-icon type="paper-clip" class="iconClipboard" />
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
                      file.extension == 'image/jpeg' ||
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
      <div style="margin: 12px 15px;">
        <a-row style="display:flex;" v-if="dataComment.length >= 1">
          <a-icon type="message" class="iconMessage" />
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
        style="background-color:#E9F0FF; padding-top:10px; padding-bottom:10px;
      position: fixed; left: 0; bottom: 0; width: 100%;"
      >
        <a-col :span="4">
          <img
            class="userProfileComment"
            :src="userProfile ? userProfile.fullPath : require('../assets/user.svg')"
          />
        </a-col>
        <a-col :span="16">
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
      },
    },
  },

  data() {
    return {
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
      user: '',
      selectCommentId: 0,
      userProfile: null,
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
    toggleStatus() {
      let val
      if (this.isDone == false) {
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
              isDone: { set: (this.isDone = !this.isDone) },
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
</style>
