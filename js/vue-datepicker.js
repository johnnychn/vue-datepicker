/**
 * Created by johnny on 16/6/29.
 */


/*!
 * vue-popup v0.0.1 (https://github.com/johnnyGoo/vue-popup)
 * Author: Johnny chen
 *
 * Copyright 2013-2015 Johnny chen
 */

if (typeof _ === 'undefined') {
    throw new Error('vue-popup requires underscore');
}
if (typeof Vue === 'undefined') {
    throw new Error('vue-popup requires vue 1.x');
}
(function () {
    //正则匹配
    function match(str, matchs) {
        var regStr = '';
        if (_.isArray(matchs)) {
            _.each(matchs, function (v) {
                regStr = regStr + v + '|';
            });
            regStr = regStr.substr(0, regStr.length - 1);
        } else {
            regStr = matchs;
        }
        var reg = new RegExp(regStr);
        return reg.test(str);
    }

//左边补0
    function pad(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }

    function stringToDate(dateString) {
        var str = dateString.toString();
        str = str.replace(/-/g, "/");
        var obj = {};
        var date = new Date(str);
        obj.year = date.getFullYear();
        obj.month = date.getMonth() + 1;
        obj.day = date.getDate();
        obj.hours = date.getHours();
        obj.minutes = date.getMinutes();
        obj.seconds = date.getSeconds();
        return obj;
    }

    /*
     * 替代js本身的 eval,避免编译错误
     * */

    function getDaysInMonth(year, month) {
        var daycount = 30;
        if (_.contains([1, 3, 5, 7, 8, 10, 12], month)) {
            daycount = 31;
        } else if (month == 2) {
            daycount = year % 4 == 0 ? 29 : 28;
        }
        return daycount;
    }

    function buildDays(year, month) {
        year=parseInt(year)
        var daycount = getDaysInMonth(year, month)
        var days = [];
        var days_numbers = _.range(1, daycount + 1);
        var date = new Date();
        date.setFullYear(year);
        date.setMonth(month - 1);
        _.each(days_numbers, function (v, k) {
            date.setDate(v);
            days[k] = ({year:year,day: date.getDay(), date: date.getDate(), month: date.getMonth() + 1});
        });
        var l_date;

        var nowYear=year;
        var nowMonth=month;

        if(month==1){
            nowYear=year-1;
            nowMonth=12;
        }else{
            nowYear=year;
            nowMonth=month-1;
        }


        while (days[0].day > 0) {
            if (days[0].date == 1) {
                l_date = getDaysInMonth(year, nowMonth)
            } else {
                l_date = days[0].date - 1;
            }
            date.setFullYear(nowYear,nowMonth-1, l_date);

            days.unshift({year:nowYear,day: date.getDay(), date: date.getDate(), month: date.getMonth() + 1})
        }
        if(month==12){
            nowYear=year+1;
            nowMonth=1;
        }else{
            nowYear=year;
            nowMonth=month+1;
        }

        while (days.length < 42) {

            if (days[days.length - 1].date == daycount) {
                l_date = 1
            } else {
                l_date = days[days.length - 1].date + 1;
            }
            date.setFullYear(nowYear,nowMonth-1, l_date);
            days.push({year:nowYear,day: date.getDay(), date: date.getDate(), month: date.getMonth() + 1})
        }

        return days;

    }

    function buildYears(year) {
        var startYear = parseInt(year) - 5;
        return _.range(startYear, startYear + 12)
    }

    function stringToObj(v) {
        var estr = ('(' + v + ')');
        var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + estr)();
    }

    var lang = {
        daysMin: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        weekStart: 1,
        yearFirst: true,
        yearSuffix: '年'
    };
    Vue.component('vue-datepicker', {
        // 声明 props
        props: {
            lang: {
                type: Object,
                default: lang
            },
            zIndex: {
                default: 100
            },
            date: {
                default: ''
            },
            size: {
                type: Object,
                default: {width: 280}
            },
            autoClose: {
                default: true
            },
            format: {
                default: 'yyyy-mm-dd'
            },
            type:{
                type: String,
                default: 'input'
            }
        },
        data: function () {
            return {
                show: false,
                selector: 'days',
                years: [],
                catch_year: 0,
                catch_month: 0,
                months: _.range(1, 13),
                days: [],
                real_date: null,
                min_time: 'day'
            };
        },
        // prop 可以用在模板内
        // 可以用 `this.msg` 设置
        template: '#vue-datepicker',
        methods: {
            onFocus: function () {
                this.show = true;
            },
            onBlur: function () {


            },
            showSeletor: function (type) {
                this.selector = type;
            },
            updateDate: function (date) {
                this.real_date = date;
                this.date = this.dateString;
                this.catch_year = this.real_date.year;
                this.catch_month = this.real_date.month;
                this.catch_day = this.real_date.day;
                this.days = buildDays(this.catch_year, this.catch_month);
            },
            prevYears: function () {
                this.catch_year -= 12;
                this.years = buildYears(this.catch_year);
            },
            nextYears: function () {
                this.catch_year += 12;
                this.years = buildYears(this.catch_year);
            },
            selectYear: function (year) {
                this.real_date.year = (year);
                this.updateDate(this.real_date);
                this.catch_year = this.real_date.year;
                this.selector = 'months'


            },
            prevYear: function () {
                this.catch_year -= 1;
                this.years = buildYears(this.catch_year);
            },
            nextYear: function () {
                this.catch_year += 1;
                this.years = buildYears(this.catch_year);
            },
            selectMonth: function (month) {
                this.catch_month = month;
                this.real_date.year = this.catch_year;
                this.real_date.month = (month);
                this.updateDate(this.real_date);
                this.selector = 'days';


            },

            prevMonth: function () {
                this.catch_month -= 1;
                if (this.catch_month < 1) {
                    this.catch_month = 12;
                    this.catch_year--;
                }
                this.days = buildDays(this.catch_year, this.catch_month);
            },
            nextMonth: function () {
                this.catch_month += 1;
                if (this.catch_month > 12) {
                    this.catch_month = 1;
                    this.catch_year++;
                }
                this.days = buildDays(this.catch_year, this.catch_month);
            },
            selectDay: function (day) {
                this.catch_day = day.date;
                this.real_date.day = day.date;
                this.real_date.month = day.month;
                this.real_date.year = day.year;
                this.updateDate(this.real_date);
                if (this.min_time=='day'&&this.autoClose) {
                    this.show = false;
                }
            }

        },
        computed: {
            dateString: function () {
                // return this.real_date.year + '/' + (this.real_date.month) + '/' + this.real_date.day
                return this.format.replace('yyyy', this.real_date.year).replace('mm', pad(this.real_date.month, 2)).replace('dd', pad(this.real_date.day, 2)).replace('hh', pad(this.real_date.hours, 2)).replace('ii', pad(this.real_date.minutes, 2)).replace('ss', pad(this.real_date.seconds, 2));

            },
            years_title: function () {
                return this.years[0] + '-' + this.years[this.years.length - 1];
            },
            year_title: function () {
                return this.catch_year + this.lang.yearSuffix + '';
            }, days_title: function () {
                return this.catch_year + this.lang.yearSuffix + ' ' + this.lang.months[this.catch_month - 1];
            }
        },
        compiled: function () {
            var me = this;
            this.updateDate(stringToDate(this.date));
            this.years = buildYears(this.real_date.year);
            CssBuilder.cssSmartObject(this.$el.querySelector('.vue-date-picker>.picker'), this.size);
            if (match(this.format, 'dd')) {
                this.min_time = 'day'
            }
            if (match(this.format, 'hh')) {
                this.min_time = 'hours'
            }
            if (match(this.format, 'ii')) {
                this.min_time = 'minutes'
            }
            if (match(this.format, 'ss')) {
                this.min_time = 'seconds'
            }
        }
    })

})();

