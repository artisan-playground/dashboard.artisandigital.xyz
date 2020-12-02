<template>
  <div>
    <div>
      <div style="width:100%; margin-bottom:10px">
        <div style="margin-left:18px">
          <v-row>
            <v-col cols="6" align="left" style="font-size:20px; font-weight:550">Content</v-col>
            <v-col cols="6" style="padding-right: 30px;">
              <a-button
                style="float:right; text-transform: capitalize; color:white; background-color: #134F83; "
                to="/news/createContent"
                ><a-icon type="plus" style="margin-right:2.5px" />Create</a-button
              >
            </v-col>
          </v-row>
        </div>
        <td align="right"></td>
      </div>
    </div>

    <div class="news">
      <div v-for="content in contents" :key="content.id">
        <router-link to="/">
          <a-card hoverable class="card">
            <img
              slot="cover"
              alt="example"
              v-bind:src="content.imageUrl"
              style="width:100%; height:200px; object-fit:cover;"
            />
            <a-card-meta :title="content.imageAlt">
              <template slot="description">
                {{ content.data }}
              </template>
            </a-card-meta>
          </a-card>
        </router-link>
      </div>
    </div>
    <div style="padding-bottom:80px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Centent',

  data() {
    return {
      contents: [
        {
          id: 1,
          imageUrl: 'https://i.pinimg.com/564x/84/23/98/842398fa38b695f1b52bae9b02012057.jpg',
          imageAlt: 'White bear',
          data:
            '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,',
        },
        {
          id: 2,
          imageUrl: 'https://i.pinimg.com/originals/ea/49/54/ea4954c07586167e1e1d87bc6344ad7e.jpg',
          imageAlt: 'Cat',
          data:
            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
        },
        {
          id: 3,
          imageUrl: 'https://kawaiicase.files.wordpress.com/2012/03/cute-baby-polar-bear.jpg?w=880',
          imageAlt: 'White bear',
          data:
            '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ',
        },
        {
          id: 4,
          imageUrl: 'https://kawaiicase.files.wordpress.com/2012/03/cute-baby-polar-bear.jpg?w=880',
          imageAlt: 'White bear',
          data:
            '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque',
        },
      ],
    }
  },
}
</script>

<style scoped>
.news {
  padding-bottom: 0.5px;
}
</style>
