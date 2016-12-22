<template>
  <div class="datetime-picker" :style="{ width: width }">
    <input :placeholder="placeholder" type="text" :name="name" :readonly="readonly" :value="showDate" @click="show = !show">
    <div v-show="show" :class="['picker-wrap', isRange ? 'picker-wrap-range' : '']">
      <table class="date-picker" v-for="(date, no) in dateList">
        <thead>
          <tr class="date-head">
            <th colspan="4">
              <span class="btn-prev" @click="yearClick(-1, no)">&lt;&lt;</span>
              <span class="btn-prev" @click="monthClick(-1, no)">&lt;</span>
              <span class="show-year">{{now[no].getFullYear()}}年</span>
            </th>
            <th colspan="3">
              <span class="show-month">{{months[now[no].getMonth()]}}</span>
              <span class="btn-next" @click="monthClick(1, no)">&gt;</span>
              <span class="btn-next" @click="yearClick(1, no)">&gt;&gt;</span>
            </tno>
          </tr>
          <tr class="date-days">
            <th v-for="day in days">{{day}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, ii) in 6">
            <td v-for="(j, jj) in 7" :class="dateList[no][ii * 7 + jj] && dateList[no][ii * 7 + jj].status" :date="dateList[no][ii * 7 + jj] && dateList[no][ii * 7 + jj].date" @click="pickDate(ii * 7 + jj, no)">{{dateList[no][ii * 7 + jj] && dateList[no][ii * 7 + jj].text}}</td>
          </tr>
        </tbody>
        <tfoot v-if="!isRange">
          <tr>
            <td colspan="7" class='pick-today' @click='pickToday'>today</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dateDefault: { type: Array, default: [] },
      width: { type: String, default: '250px' },
      placeholder: {type: String, default: ''},
      readonly: { type: Boolean, default: true },
      format: { type: String, default: 'YYYY-MM-DD' },
      name: { type: String, default: '' },
      myclick: { type: Function },
      type: { type: String, default: 'date' },
      isRange: { type: Boolean, default: false }  // 判断日期选择的类型
    },
    data: () => ({
      show: false,
      days: ['日', '一', '二', '三', '四', '五', '六'],
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      dateArea: [new Date(), new Date(new Date().setDate(new Date().getDate() + 1))],
      dateList: [],
      now: [new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1))],
      value: []
    }),
    computed: {
      count () {
        return this.isRange ? 2 : 1
      },
      showDate () {
        return this.value.join('  ~  ')
      }
    },
    watch: {
      now () {
        this.updateAll()
      },
      dateDefault (val) {
        this.value = val
      },
      value (val) {
        this.updateAll()
        this.$emit('on-date-change', val)
      }
    },
    methods: {
      close () {
        this.show = false
      },
      updateAll () {
        this.update(0)
        this.isRange && this.update(1)
      },
      update (index) {
        let arr = []
        let time = new Date(this.now[index])
        time.setMonth(time.getMonth(), 0)
        let firstDayInWeek = time.getDay()
        // 获取上个月日期
        firstDayInWeek === 0 && (firstDayInWeek = 7) // 获得当月的星期数
        let lastMonthDayCount = time.getDate()
        for (let i = firstDayInWeek; i >= 0; i--) {
          arr.push({
            text: (lastMonthDayCount - i),
            time: new Date(time.getFullYear(), time.getMonth(), lastMonthDayCount - i, 8),
            status: 'date-pass'
          })
        }
        // 获取当月日期
        time.setMonth(time.getMonth() + 2, 0)
        let curMonthDayCount = time.getDate()
        for (let i = 1; i <= curMonthDayCount; i++) {
          let status = 'date-new'
          let tempDate = this.stringify(new Date(time.getFullYear(), time.getMonth(), i))
          if (this.isRange) {
            for (let a = 0; a < this.dateArea.length; a++) {
              this.stringify(this.dateArea[a]) === tempDate && (status = 'date-active')
            }
            if (this.dateArea.length === 2 && tempDate > this.stringify(this.dateArea[0]) && tempDate < this.stringify(this.dateArea[1])) {
              status = 'date-in-area'
            }
          } else {
            this.stringify(this.now[index]) === tempDate && (status = 'date-active')
          }
          arr.push({
            text: i,
            time: new Date(time.getFullYear(), time.getMonth(), i, 8),
            status: status
          })
        }
        // 获取下月日期
        time.setMonth(time.getMonth() + 1)
        let nextMonthDate = 1
        while (arr.length < 7 * 6) {
          arr.push({
            text: nextMonthDate,
            time: new Date(time.getFullYear(), time.getMonth(), nextMonthDate),
            status: 'date-future'
          })
          nextMonthDate++
        }
        this.$set(this.dateList, index, arr)
      },
      yearClick (flag, index) {
        let _time = this.now[index]
        _time.setFullYear(_time.getFullYear() + flag)
        this.$set(this.now, index, new Date(_time))
      },
      monthClick (flag, index) {
        let _time = this.now[index]
        _time.setMonth(_time.getMonth() + flag)
        this.$set(this.now, index, new Date(_time))
      },
      pickDate (i, index) {
        // 日期区间选择
        if (this.isRange) {
          if (this.value.length === 2) {
            // 清空日期
            this.value = []
            this.dateArea = []
          }
          if (this.value.length === 1) {
            this.dateArea = this.dateArea[0] < new Date(this.dateList[index][i].time)
             ? [...this.dateArea, new Date(this.dateList[index][i].time)]
             : [new Date(this.dateList[index][i].time), ...this.dateArea]
            // 显示的时候用
            this.value = [this.stringify(this.dateArea[0], 'YYYY-MM-DD'), this.stringify(this.dateArea[1], 'YYYY-MM-DD')]
            this.myclick && this.myclick()
            this.show = false
          }
          if (this.value.length === 0) {
            this.dateArea = [new Date(this.dateList[index][i].time)]
            this.value.push(this.stringify(this.dateList[index][i].time, 'YYYY-MM-DD'))
          }
        // 日期选择
        } else {
          this.value = [this.stringify(this.dateList[index][i].time, 'YYYY-MM-DD')]
          this.now = [new Date(this.dateList[index][i].time)]
          this.myclick && this.myclick()
          this.show = false
        }
      },
      pickToday () {
        this.now = [new Date()]
        this.value = [this.stringify(this.now[0], 'YYYY-MM-DD')]
        this.show = false
      },
      parse (str) {
        var time = new Date(str)
        return isNaN(time.getTime()) ? null : time
      },
      stringify (time = this.now, format = this.format) {
        var year = time.getFullYear()
        var month = time.getMonth() + 1
        var date = time.getDate()
        var monthName = this.months[time.getMonth()]
        var map = {
          YYYY: year,
          MMM: monthName,
          MM: ('0' + month).slice(-2),
          M: month,
          DD: ('0' + date).slice(-2),
          D: date
        }
        return format.replace(/Y+|M+|D+/g, function (str) {
          return map[str]
        })
      },
      leave (e) {
        if (this.$el && !this.$el.contains(e.target)) {
          this.close()
        }
      }
    },
    created () {
      this.dateArea = this.now = this.dateDefault.map(this.parse) || [new Date()]
      this.value = this.dateDefault
      document.addEventListener('click', this.leave, false)
    },
    beforeDestory () {
      document.removeEventListener('click', this.leave, false)
    }
  }
</script>
<style scoped>
  .datetime-picker {
    position: relative;
    display: inline-block;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #333;
  }
  
  .datetime-picker * {
    box-sizing: border-box;
  }
  
  .datetime-picker input {
    border-radius: 6px;
    width: 100%;
    padding: 5px 10px;
    height: 30px;
    outline: 0 none;
    border: 1px solid #ccc;
    font-size: 13px;
  }
  
  .datetime-picker input:focus {
    border: 1px solid #2db7f5;
  }
  
  .datetime-picker .picker-wrap {
    border-radius: 6px;
    /*overflow: hidden;*/
    position: absolute;
    z-index: 1000;
    width: 250px;
    min-height: 280px;
    margin-top: 2px;
    background-color: #fff;
    box-shadow: 0 0 6px #ccc;
  }
  
  .datetime-picker table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    font-size: 13px;
  }
  
  .datetime-picker .picker-wrap-range {
    width: 550px;
  }
  
  .picker-wrap-range table {
    width: 47%;
    float: left;
  }
  
  .picker-wrap-range table:first-child {
    margin-right: 6%;
  }
  
  .picker-wrap-range table:first-child::after {
    content: '';
    position: absolute;
    border-left: 1px solid #eee;
    height: 100%;
    top: 0;
    right: 50%;
  }
  
  .datetime-picker tr {
    height: 34px;
    border: 0 none;
  }
  
  .datetime-picker th,
  .datetime-picker td {
    user-select: none;
    /*width: 34px;*/
    height: 34px;
    padding: 0;
    border: 0 none;
    line-height: 34px;
    text-align: center;
  }
  
  .datetime-picker td {
    cursor: pointer;
    transition: all .2s;
  }
  
  .datetime-picker tbody td:hover {
    background-color: #f0f0f0;
  }
  
  .datetime-picker td {
    color: #666;
  }
  
  .datetime-picker td.date-pass,
  .datetime-picker td.date-future {
    color: #ccc;
  }
  
  .datetime-picker td.pick-today {
    border-top: 1px solid #e2e2e2;
    color: #2db7f5;
  }
  
  .datetime-picker td.pick-today:hover {
    color: #20a0ff;
  }
  
  .datetime-picker tbody td.date-active {
    background-color: #2db7f5;
    color: #fff;
  }
  
  .datetime-picker tbody td.date-in-area {
    background-color: #d3ecff;
  }
  
  .datetime-picker .date-head {
    padding: 10px 0;
    background-color: #fff;
    text-align: center;
    color: #475669;
    font-size: 14px;
  }
  
  .datetime-picker .date-days {
    color: #475669;
    font-size: 10px;
  }
  
  .datetime-picker .show-year {
    display: inline-block;
    min-width: 62px;
    vertical-align: middle;
  }
  
  .datetime-picker .show-month {
    display: inline-block;
    width: 34px;
    vertical-align: middle;
  }
  
  .datetime-picker .btn-prev,
  .datetime-picker .btn-next {
    cursor: pointer;
    display: inline-block;
    padding: 0 10px;
    vertical-align: middle;
    font-family: '宋体';
  }
  
  .datetime-picker .btn-prev:hover,
  .datetime-picker .btn-next:hover {
    background: #2db7f5;
    color: #fff;
  }
</style>
