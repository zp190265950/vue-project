<!-- 模块 -->
<template>
  <div class="love">
    <!-- <div class="center"> -->
    <ul class="images">
      <li
        v-for="item in 6"
        :key="item"
        class="image-item">
        <img alt="Vue logo" src="../assets/img/tupian.jpg" class="img" />
      </li>
    </ul>
    <ul class="images-max">
      <li
        v-for="item in 6"
        :key="item"
        class="image-item-max">
        <img alt="Vue logo" src="../assets/img/tupian.jpg" class="img-max" />
      </li>
    </ul>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'love',
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang='less'>
* {
  padding: 0;
  margin: 0;
}
ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.donghua (@name) {
  @keyframes @name{
    0% {
      -webkit-transform: rotateX(-30deg) rotateY(0deg);
    }
    25%{
      -webkit-transform: rotateX(-30deg) rotateY(90deg);
    }
    50%{
      -webkit-transform: rotateX(-30deg) rotateY(180deg);
    }
    75%{
      -webkit-transform: rotateX(-30deg) rotateY(270deg);
    }
    100%{
      -webkit-transform: rotateX(-30deg) rotateY(360deg);
    }
  }
}
.love {
  transform-style:preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  position: relative;
  margin: 200px auto 0;
  .images {
    .donghua(images);
    animation: images 3s linear infinite;
    transform-style: preserve-3d;
	  transform: rotateX(-15deg) rotateY(15deg);
    transform-origin: center center;
    transition: 2s;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    left: 0;
    .image-item {
      width: 50px;
      height: 50px;
      background: transparent;
      position: absolute;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    &-max {
      width: 100px;
      height: 100px;
      .donghua(images);
      animation: images 3s linear infinite;
      transform-style: preserve-3d;
      transform: rotateX(-15deg) rotateY(15deg) translateX(-100px) translateY(-100px);
      transform-origin: center center;
      transition: 2s;
      position: absolute;
      top: 0;
      left: 0;
      .image-item-max {
        background: transparent;
        position: absolute;
        width: 100px;
        height: 100px;
        .img-max {
          width: 100%;
          height: 100%;
        }
      }
      .image-item-max:nth-child(1){
        transform: translateY(-100px) rotateX(90deg);
      }
      .image-item-max:nth-child(2){
        transform: translateX(100px) rotateY(90deg);
      }
      .image-item-max:nth-child(3){
        transform: translateY(100px) rotateX(90deg);
      }
      .image-item-max:nth-child(4){
        transform: translateX(-100px) rotateY(90deg);
      }
      .image-item-max:nth-child(5){
        transform: translateZ(-100px);
      }
      .image-item-max:nth-child(6){
        transform: translateZ(100px);
      }
    }
    .image-item:nth-child(1){
      transform: translateY(-25px) rotateX(90deg);
    }
    .image-item:nth-child(2){
      transform: translateX(25px) rotateY(90deg);
    }
    .image-item:nth-child(3){
      transform: translateY(25px) rotateX(90deg);
    }
    .image-item:nth-child(4){
      transform: translateX(-25px) rotateY(90deg);
    }
    .image-item:nth-child(5){
      transform: translateZ(-25px);
    }
    .image-item:nth-child(6){
      transform: translateZ(25px);
    }
  }
}
</style>
