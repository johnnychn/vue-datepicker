import Vue from 'vue'
import VueDatePicker from './VueDatePicker.vue'
import FastClick from 'fastclick'

FastClick.attach(document.body)
new Vue({
  el: 'body',
  components: { VueDatePicker },
  data:{date:'2010'}
})
