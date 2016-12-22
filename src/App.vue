<template>
  <div id="app">
    <h1>单选</h1>
    <my-date :date-default="time" :is-range=false @on-date-change="onDateChange1"></my-date>
    <h1>区间选择</h1>
    <my-date :date-default="timeR" :is-range=true @on-date-change="onDateChange2"></my-date>
  </div>
</template>

<script>
import MyDate from './components/MyDate'

export default {
  name: 'app',
  data: () => ({
    time: ['2011-11-11'],
    timeR: ['2011-11-11', '2011-12-22']
  }),
  methods: {
    onDateChange1 (val) {
      this.time = val // 外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    onDateChange2 (val) {
      this.timeR = val
    }
  },
  components: {
    MyDate
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item {
  text-align: left;
}
</style>
