<template>
  <div>
    <div class="listTasks"></div>
    <div style="padding-bottom:60px">
      <!-- ระยะห่าง manu ข้างล่างกับ content -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data() {
    return {
      tasks: [
        {
          tasksId: 1,
          taskName: 'Design ui',
          taskTime: '10.00 AM',
          descriptonTask:
            'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
        },
        {
          tasksId: 2,
          taskName: 'Implement code',
          taskTime: '10.00 AM',
          descriptonTask:
            'If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill..',
        },
      ],
    }
  },
}
</script>

<style>
.listTasks {
  /* margin: 0px 18px 0px 18px; */
  background-color: #e9f0ff;
  padding-top: 15px;
  padding-bottom: 2px;
}
#status {
  font-size: 10.5px;
  /* padding-right: 16px; */
}
#iconStatus {
  font-size: 10px;
  vertical-align: -4.57%;
}
#card {
  /* margin: 3px 15px 24px 15px;  */
  border-radius: 2px;
}
.md-title {
  font-size: 16px;
  margin-bottom: -1px; /* ระยะห่างระหว่างชื่อโปรเจคกับตำแหน่งงาน */
  line-height: 20px; /* ระยะห่างระหว่างบรรทัดของชื่อโปรเจค เวลาขึ้นบรรทัดใหม่ */
}
</style>
