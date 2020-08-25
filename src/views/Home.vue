<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="windowOpen = !windowOpen">切换元素</button>
    <overdrive key="a" id="window" :duration="100" v-if="!windowOpen">
      <div class="home-start">我是开始元素</div>
    </overdrive>
    <overdrive key="b" id="window" :duration="100" v-if="windowOpen">
      <div class="home-end">我是结束元素</div>
    </overdrive>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import { VOverdrive } from 'vue-overdrive'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    overdrive: VOverdrive
  },
  data () {
    return {
      windowOpen: false
    }
  }
}
</script>
<style lang="less">
.home {
  color: #ffffff;
  .home-start {
    width: 300px;
    height: 300px;
    background: red;
  }
  .home-end {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    line-height: 100px;
    background: blue;
  }
}
</style>
