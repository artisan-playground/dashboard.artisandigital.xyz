<template>
  <div class="project">
    <!-- <h1>This is an about page</h1> -->
    <Toolbar />

    <md-content>
      <br />
      <br />
      <br />
      <br />
      <div>
        <table style="width:100%; margin-bottom:10px">
          <div style="margin-left:18px ">
            <td align="left" style="font-size:20px; font-weight:550">
              <input type="search" name id v-model="search" />
            </td>
          </div>

          <!-- <div align="right" style="margin-right:18px;"> -->
          <td align="right">
            &nbsp;
            <div style="margin-right:18px; border:none;">
              <a-button>
                <div>
                  <span
                    class="iconify"
                    id="back"
                    data-inline="false"
                    data-icon="eva:arrow-ios-back-fill"
                    style="font-size: 15px;"
                  ></span>
                </div>
              </a-button>
              <span style="margin-left:8px;"></span>
              <!-- ระยะห่างระหว่าง back กับ next -->

              <a-button>
                <div style="-webkit-transform: scaleX(-1); transform: scaleX(-1);">
                  <!-- กลับด้าน icons -->
                  <span
                    class="iconify"
                    id="next"
                    data-inline="false"
                    data-icon="eva:arrow-ios-back-fill"
                    style="font-size: 15px; "
                  ></span>
                </div>
              </a-button>
            </div>
          </td>
        </table>
      </div>

      <div class="listmembers">
        <md-card id="card" align="center" v-for="member in memberFilter" :key="member.id">
          <md-card-media>
            <img id="imgProfile" v-bind:src="member.image" />
          </md-card-media>
          <div>{{ member.position }}</div>
          <div style="color:#0036C7; font-size:18px">
            <b>{{ member.name }}</b>
          </div>
          <br />
          <div>Skill(s): {{ member.skill }}</div>
          <div>Project(s): {{ member.projects }}</div>
        </md-card>
        <br />
        <br />
      </div>
    </md-content>
    <BarRouter />
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@/components/Toolbar.vue'
import BarRouter from '@/components/BarRouter.vue'

export default {
  name: 'about',
  components: {
    Toolbar,
    BarRouter,
  },
  data() {
    return {
      members: [
        {
          id: 1,
          image: 'https://i.pinimg.com/564x/c4/23/85/c423853659015145795100c6006b554d.jpg',
          name: 'Linda Lee',
          position: 'Designers/Programmers',
          skill: 'React, Redux, UI/UX',
          projects: 1,
        },
        {
          id: 2,
          image: 'https://i.pinimg.com/564x/11/b5/77/11b5772556b0e717289456a352c3c706.jpg',
          name: 'Mina Kung',
          position: 'Analysis',
          skill: 'HTML',
          projects: 2,
        },
        {
          id: 3,
          image: 'https://i.pinimg.com/564x/9f/dd/dc/9fdddc39f0ac2925063ac8e32d461c36.jpg',
          name: 'Fery Kimson',
          position: 'Testers',
          skill: 'JavaScript, React, UX/UI ',
          projects: 2,
        },
      ],
      search: '',
      name: '',
    }
  },
  computed: {
    memberFilter() {
      let text = this.search.trim()
      return this.members.filter(item => {
        return item.name.indexOf(text) > -1
      })
    },
  },
}
</script>

<style scoped>
div {
  font-family: 'Roboto';
}

/* search button */
input {
  outline: none;
}
input[type='search'] {
  -webkit-appearance: textfield;
  -webkit-box-sizing: content-box;
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
  display: none;
}

input[type='search'] {
  background: url(../assets/carbon_search.svg) no-repeat 9px center;
  border: none;
  padding: 2px 10px 2px; /* ขนาดกรอบของปุ่ม search */

  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;

  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
input[type='search']:focus {
  /* width: 130px; */
  background-color: #fff;
  border-color: #66cc75;

  -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  -moz-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
}

input:-moz-placeholder {
  color: #999;
}
input::-webkit-input-placeholder {
  color: #999;
}

input[type='search'] {
  width: 15px;
  padding-left: 10px;
  color: transparent;
  cursor: pointer;
}
input[type='search']:hover {
  background-color: #fff;
}
input[type='search']:focus {
  width: 50%; /* ความกว้างเวลาปุ่ม search ขยาย */
  padding-left: 32px;
  color: #000;
  background-color: #fff;
  cursor: auto;
}
input:-moz-placeholder {
  color: transparent;
}
input::-webkit-input-placeholder {
  color: transparent;
}

#back,
#next {
  vertical-align: -10%;
}
button {
  background-color: white;
  border-radius: 3px;
  border: none;
  border: 1px solid #8f8f8f;
}
.listmembers {
  margin: 0px 18px 0px 18px;
  background-color: #e9f0ff;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 0px;
}
#card {
  padding: 15px 15px 15px 15px;
  border-radius: 5px;
  /* เงากรอบขาว ระยะเงาด้านขวากับกรอบ ระยะเงาด้านล่างกับกรอบ ความฟุ่งของเงา สีของเงา*/
  box-shadow: 1.5px 1.5px 10px #b1b1b1;
  margin-bottom: 24px; /* ระยะห่างระหว่าง card */
  margin-top: 3px;
}
#imgProfile {
  /* margin-top: 17px; */
  border-radius: 100%;
  box-shadow: 1.5px 1.5px 10px #b1b1b1;
  height: 120px;
  width: 120px;
  margin-bottom: 20px;
  object-fit: cover;
}
</style>
