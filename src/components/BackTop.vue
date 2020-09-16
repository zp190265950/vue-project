<!--  -->
<template>
  <div class="back-top"
       @click="handScrollTop">
    <i class="el-icon-caret-top"></i>
  </div>
</template>

<script>
const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2;

export default {
  name: 'BackTop',
  data () {
    return {}
  },
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    handScrollTop () {
      this.scrollTop()
    },
    scrollTop () {
      const el = document.querySelector('html')
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        console.log(progress)
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    }
  }
}
</script>

<style lang='less' scoped>
.back-top {
  width: 20px;
  height: 20px;
  background: rgba(#cccccc, 0.5);
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
