import Vue from 'vue'
// @ts-ignore
import { longClickDirective } from 'vue-long-click'

Vue.directive('longclick', longClickDirective({ delay: 400, interval: 60000 }))
