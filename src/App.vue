<template>
  <div id="app">
    <my-date :date-default="time" :is-range=true></my-date>
  </div>
</template>

<script>
import MyDate from './components/MyDate'

export default {
  name: 'app',
  data: () => ({
    time: ['2011-11-11', '2011-12-20']
  }),
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
</style>
