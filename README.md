# datepicker

vue-datepicker

#demo

[demo](http://htmlpreview.github.io/?https://github.com/johnnyGoo/vue-datepicker/blob/master/index.html)



# setting
| 名称                    |类型               |默认       | 说明                                     |
| ----------------------- | ----------------- | -------- | ---------------------------------------- |
|date                     |String             |当前事件   | '2016-7-7 20:10:10'                                        |
|z-index                  |Number/String      |100       | z-index                                  |
|lang                     |Object             |语言对象   | 可以更换语言包                               |
|show                     |Boolean            |false     | 是否显示 选择面板                            |
|selector                 |String             |'days'    | 面板选择的内容 'years'/'months'/'days'                                        |
|width                    |Object             |280       | 面板宽度                                        |
|auto-close               |Boolean            |true      | 选择最小时间后是否关闭面板                           |
|format                   |String             |'yyyy-mm-dd' | 日期格式 yyyy-mm-dd hh:ii:ss                             |
|type                     |String             |'input'    | 显示日期的dom类型 'input'/'div'                             |


```html
语言对象
lang={ daysMin: ['日', '一', '二', '三', '四', '五', '六'],
       months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
       monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
       weekStart: 1,
       yearFirst: true,
       yearSuffix: '年'
       }
```



#Event
| 名称                    |说明                |
| ----------------------- | -----------------  |
| datepicker-update       |日期更新             |







#Build
```html
npm install
# watch:
npm run dev
# build:
npm run build
```