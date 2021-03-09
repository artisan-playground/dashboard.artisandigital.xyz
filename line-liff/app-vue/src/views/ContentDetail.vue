<template>
  <div v-if="content">
    <ToolbarBack :msg="content.subject" />
    <br />
    <div style="margin-top:60px;"></div>
    <div style="margin:0 18px 0 18px;">
      <a-carousel arrows>
        <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
          <a-icon type="left" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px;">
          <a-icon type="right" />
        </div>
        <div v-for="img in content.contentImage" :key="img.id">
          <img alt="example" v-bind:src="img.fullPath" class="contentImg" />
        </div>
      </a-carousel>
      <a-row style="float:left; margin:20px 0 5px 0; font-weight:600;">
        {{ content.subject }}
      </a-row>
      <a-row class="detail-event-content">
        <span v-html="content.content"></span>
      </a-row>
    </div>
  </div>
</template>

<script>
import ToolbarBack from '@/components/ToolbarBack.vue'
import * as gqlQueryContent from '../constants/content'
export default {
  name: 'ContentDetail',
  components: {
    ToolbarBack,
  },
  data() {
    return {
      content: null,
    }
  },
  apollo: {
    getEvent: {
      query: gqlQueryContent.GET_CONTENT_BY_ID,
      variables() {
        return {
          id: parseInt(this.$route.params.id),
        }
      },
      update(data) {
        this.content = data.getContentById
      },
    },
  },
}
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 220px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
@media only screen and (min-width: 768px) {
  .ant-carousel >>> .slick-slide {
    text-align: center;
    height: 350px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }
}
@media only screen and (min-width: 1024px) {
  .ant-carousel >>> .slick-slide {
    text-align: center;
    height: 400px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }
}
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
