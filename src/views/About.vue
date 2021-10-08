<template>
  <div class="about">
    <p class="left">第二次提交</p>
    <p>自动构建提示</p>
    <div class="center" ref="dom" @click="getData">
      This is an about page
    </div>
    <div class="scroll" @scroll="changeScroll">
      <ul
        v-for="(child, index) in list"
        :key="index"
        class="list">
        <template v-if="child.length">
          <li
            v-for="(item, i) in child"
            :key="`${index}-${i}`"
            class="item">
            <span>{{(i + 1) + (index * 200)}}</span>
            <span>测试显示多个dom</span>
            <span>我是测试dom</span>
          </li>
        </template>
        <!-- <div v-else :style="{width: }">

        </div> -->
      </ul>
    </div>
    <p class="right">测试一次提交</p>
    <button @click="runWebWork" style="width: 100px">启动work</button>
    <button @click="goRouter" style="width: 100px">启动一个惊喜</button>
    <span>{{count}}</span>
    <BackTop />
    <!-- <BaseEditor
      v-model="value"
      action=""/> -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      class="quill-editor">
    </quill-editor>
  </div>
</template>
<script>
import BackTop from '@/components/BackTop'
import WebWork from '@/assets/js/webWork'
// import BaseEditor from '@/components/BaseEditor'
import { quillEditor, Quill } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { addQuillTitle } from './assets/js/quill-title.js'
import { ImageDrop } from 'quill-image-drop-module';
// import * as Quill from 'quill'; // 富文本基于quill
import { quillArr } from './assets/js/config.js'
// console.log({Quill, ImageDrop})
Quill.register('modules/imageDrop', ImageDrop)

let work = null

export default {
  components: {
    BackTop,
    // BaseEditor,
    quillEditor
  },
  data () {
    return {
      message: '',
      list:[],
      catchList: [],
      // list: new Array(100000),
      count: 0,
      value: '',
      content: ''
    }
  },
  computed: {
    editorOption () { //  富文本编辑器配置
      return {
        theme: 'snow',
        placeholder: '请输入正文',
        // modules: {
        //   },
        modules:{
          toolbar: quillArr,
          imageDrop:true, 
          // imageResize: {
          //   displayStyles: {
					// 		backgroundColor: 'black',
					// 		border: 'none',
					// 		color: 'white'
					// 	},
					// 	modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          // }
        }
      }
    }
  },
  // watch: {
  //   'list.length': {
  //     handler (val) {
  //       console.log(val)
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
    this.initData()
    addQuillTitle()
  },
  methods: {
    initData () {
      const arr = new Array(99999)
      this.list.push(arr.splice(0, 200))
      this.workList(arr)
    },
    workList (arr) {
      const fn = function () {
        this.onmessage = e => {
          const brr = []
          const arr = e.data
          while (arr.length >= 200) {
            if (arr.length >= 200) {
              brr.push(arr.splice(0, 200))
            } else {
              brr.push(arr.splice(0, arr.length - 1))
            }
          }
          // this.list = arr
          postMessage(brr)
        }
      }
      console.time()
      work = new WebWork(fn)
      work.postMessage(arr)
      work.onmessage = e => {
        this.catchList = e.data
        work.terminate()
        work = null
        console.timeEnd()
      }
    },
    getData () {
      const dom = this.$refs.dom
      const arr = new Array(10000)
      const len = arr.length
      console.log(arr)
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
      let num = 1
      let _this = this
      const func = function (count, onceCount) {
        return () => {
          const loopCount = Math.ceil(count / onceCount)
          // let p = ''
          let brr = []
          for(let i = 0; i < onceCount; i++) {
            const index = (i + 1) * num
            brr.push({ index })
          }
          // dom.append(p)
          _this.list = _this.list.concat(brr)
          // console.log(_this.list)
          num++
          // console.log(num, loopCount)
          if (num < loopCount) {
            rAF(func(len, 3))
          }
        }
      }
      rAF(func(len, 10))
    },
    runWebWork () {
      const fn = function () {
        this.onmessage = e => {
          const arr = []
          for(let i = 0; i < e.data; i++) {
            arr.push(i + 1)
          }
          postMessage(arr)
        }
      }
      console.time()
      work = new WebWork(fn)
      work.postMessage(1000000)
      work.onmessage = e => {
        this.count = e.data
        work.terminate()
        work = null
        console.timeEnd()
      }
    },
    action () {},
    goRouter () {
      this.$router.push({ name: 'love' })
    },
    changeScroll (e) {
      // console.log(e)
      if (this.timer) return
      this.timer = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        const height = scrollHeight - clientHeight - scrollTop
        // console.log(height, scrollTop, scrollHeight)
        if (height > 100) {
          this.timer = null
          return
        }
        // console.log(this.catchList.splice(0, 1))
        const arr = this.catchList.splice(0, 1)
        // console.log(arr, this.catchList)
        this.list.push(...arr)
        // console.log(this.list)
        this.timer = null
      }, 200)
    }
  }
}
</script>
<style lang="less" scoped>
ul,li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.about {
  display: flex;
  flex-direction: column;
  .center {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    // flex-grow: 1;
    // flex-shrink: 1;
    // flex-basis: 0%;
  }
  .right {
    width: 100px;
  }
  .quill-editor {
    width: 500px;
    height: 200px;
  }
}
.scroll {
  overflow-y: auto;
  height: 400px;
}
.list {
  min-height: 6000px;
  // overflow-y: auto;
  // height: 400px;
}
.item {
  line-height: 28px;
  height: 28px;
  border-bottom: 2px solid #cccccc;
}
</style>
