# vue-dateSelector

> vue-dateSelector for vue2.0

# demo

  The demo page is [HERE](https://ws456999.github.io/vue-dateSelector/).
  
![Screenshot](screenshot.png)

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

```html
<!--datePicker-->
<date-selector :date-default="time" :is-range=false></date-selector>

<!--datePicker-->
<date-selector :date-default="time" :is-range=true></date-selector>

```
### props

>**defaultValue**

- dateDefault: { type: Array, default: [] },

- need a array like: ['2011-11-11'],

>**isDateRange**

- isRange: { type: Boolean, default: false }

>**inputWidth**

- width: { type: String, default: '250px' },

>**placeholder**

- placeholder: {type: String, default: ''},

>**readonly**

- readonly: { type: Boolean, default: true },

>**dateFormat**

- format: { type: String, default: 'YYYY-MM-DD' },

>**inputName**

- name: { type: String, default: '' },

>**clickCallback**

- myclick: { type: Function },
