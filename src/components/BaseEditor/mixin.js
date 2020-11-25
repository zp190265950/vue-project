import quillConfig from './config/quill-config'
import { quillEditor } from 'vue-quill-editor'

const bodyInlineStyle = document.body.getAttribute('style')

export default {
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 文本域高度
    height: {
      type: Number,
      default: 240
    },
    // 插入图片操作
    // todo! 该命名为"ImageExtend"构造函数的默认选项参数如非必要，请勿更改
    action: {
      type: Function,
      default: () => null,
      required: true,
      validator: val => typeof val === 'function'
    }
  },
  computed: {
    fullsceenIcon() {
      return this.isFullscreen ? 'icon-tominimizethe' : 'icon-maximize'
    },
    options() {
      quillConfig.modules.ImageExtend.action = this.action
      quillConfig.modules.clipboard = {
        matchers: [['img', this.customMatcherImg]]
      }
      return quillConfig
    }
  },
  data() {
    return {
      isFullscreen: false // 全屏状态
    }
  },
  methods: {
    toggleScreen() {
      this.isFullscreen = !this.isFullscreen
      document.body.style = this.isFullscreen
        ? bodyInlineStyle + ';overflow:hidden'
        : bodyInlineStyle
    },
    customMatcherImg(img, delta) {
      const src = img.src
      delta.ops[0].insert.image = src + `?${new Date().getTime()}`
      return delta
    }
  }
}
