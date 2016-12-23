# vue-dateSelector

> vue-dateSelector for vue2.0

# demo

  The demo page is [HERE](https://ws456999.github.io/vue-datePicker/).

![Screenshot](https://github.com/ws456999/vue-dateSelector/blob/master/screenshot.png)

# Installation

## npm

```shell
$ npm install --save vue-date-selector
```


## Usage

```javaScript
import DateSelector from 'vue-date-selector'

components: {
  DateSelector
}
```

```
<!--datePicker-->
<date-selector :date-default="time" :is-range=false></date-selector>

<!--dateRangePicker-->
<date-selector :date-default="time" :is-range=true></date-selector>

<!--if you need sync time-->
<date-selector :date-default="time" :is-range=true @on-date-change="onDateChange"></date-selector>
  methods: {
    onDateChange (val) {
      this.time = val // 外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    }
  }

```
## props

````
dateDefault: { type: Array, default: [] }, // need a Array like: ['2016-11-11'] or ['2016-11-11', '2016-11-22'],

isRange: { type: Boolean, default: false }, // isrange option

width: { type: String, default: '250px' },  // inputWidth

placeholder: {type: String, default: ''},

readonly: { type: Boolean, default: true },

format: { type: String, default: 'YYYY-MM-DD' },   // dateFormat

name: { type: String, default: '' },

myclick: { type: Function }, // Callback

````