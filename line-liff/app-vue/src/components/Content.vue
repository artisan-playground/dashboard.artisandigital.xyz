<template>
  <div>
    <div>
      <div style="width:100%; margin-bottom:10px">
        <div style="margin-left:18px">
          <div align="left" style="font-size:20px; font-weight:550">Contents</div>
        </div>
        <td align="right"></td>
      </div>
    </div>

    <div style="margin: 10px 15px 15px 15px;" id="antInput">
      <a-input-search v-model="search" type="search" placeholder=" input search text" />
    </div>

    <div class="news" v-if="contents.length > 0">
      <div v-for="content in contentsFilter" :key="content.id">
        <a-card class="card" :bodyStyle="{ padding: '0px 0px 0px 0px' }">
          <div style="margin: 10px 15px 0 15px;">
            <a-col :xs="{ span: 4 }" :sm="{ span: 2 }" :xl="{ span: 1 }">
              <img
                v-bind:src="
                  content.user.image ? content.user.image.fullPath : require('../assets/user.svg')
                "
                class="imageUserContent"
              />
            </a-col>
            <a-col :xs="{ span: 12 }" :sm="{ span: 14 }" :xl="{ span: 14 }">
              <span style="margin-top: 10px; float:left; color:#0036C7; font-weight:600;">{{
                content.user.name
              }}</span>
            </a-col>
            <a-col :xs="{ span: 8 }" :sm="{ span: 8 }" :xl="{ span: 9 }">
              <span style="margin-top: 10px; float:right;">{{
                $dayjs(content.timestamp).format('DD/MM/YYYY')
              }}</span>
            </a-col>
          </div>
          <div v-for="img in content.contentImage.slice(0, 1)" :key="img.id">
            <img alt="example" v-bind:src="img.fullPath" class="contentImg" />
          </div>

          <div style="margin: 10px 15px 10px 15px;">
            <a-card-meta :title="content.subject">
              <template slot="description">
                <div class="content">
                  <span style="color:#333333;" v-html="content.content"></span>
                </div>
                <router-link :to="{ name: 'ContentDetail', params: { id: content.id } }">
                  <div style="color:#134F83; margin-top:10px; float:right;">
                    Read more
                  </div>
                </router-link>
              </template>
            </a-card-meta>
          </div>
        </a-card>
      </div>
    </div>
    <div v-else class="noData">
      <a-empty />
    </div>
    <div style="padding-bottom:80px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
  </div>
</template>

<script>
import * as gqlQueryContent from '../constants/content'
export default {
  name: 'Centent',
  apollo: {
    contents: {
      query: gqlQueryContent.CONTENT,
    },
  },
  data() {
    return {
      contents: [],
      search: '',
    }
  },
  computed: {
    contentsFilter() {
      let text = this.search.trim()
      return this.contents.filter(item => {
        return (
          item.subject.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.content.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.user.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      })
    },
  },
}
</script>

<style scoped>
.news {
  padding-bottom: 0.5px;
}
.imageUserContent {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
