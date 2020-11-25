<template>
  <div>
    <div ref="container"
         class="base-editor-container"
         :class="{'is-fullscreen':isFullscreen,'is-preview':clonePreview,'is-editor':isEditor, overflow:overflow&&!showMore}">
      <quill-editor ref="editor"
                    class="base-editor"
                    :options="options"
                    :value="value"
                    :disabled="clonePreview || readOnly"
                    v-bind="$attrs"
                    v-on="$listeners"
                    @click.native="onClick" />

      <!-- 切换全屏 -->
      <el-button class="base fullscreen-btn"
                 :icon='fullsceenIcon'
                 @click="toggleScreen" />

      <!-- 蒙版 -->
      <span v-if="overflow && !showMore"
            class="mask"
            @click="onClick" />
    </div>

    <!-- 显示更多 -->
    <el-button v-if="overflow"
               class="primary"
               type="text"
               @click="toggleFold">{{foldBtn.text}}
      <i :class="`el-icon-arrow-${foldBtn.icon}`" />
    </el-button>

    <!-- 保存取消按钮 -->
    <div v-if="preview && !readOnly"
         v-show="showBtns"
         class="btns-wrapper">
      <el-button type="primary"
                 @click="onSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { default as $editorMixin } from './mixin'
import ResizeObserver from 'resize-observer-polyfill'
const EDITOR_MIN_HEIGHT = 350 // 编辑状态 最小高度

export default {
  name: 'BaseEditorDetail',
  mixins: [$editorMixin],
  props: {
    // 是否是预览状态
    preview: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const clonePreview = this.preview
    return {
      clonePreview, // 预览状态
      isEditor: false, // 编辑状态
      overflow: false, // 内容是否溢出(需要等内容异步加载完成之后重新赋值)
      showMore: false, // 显示更多
      showBtns: false, // 显示按钮
      foldBtn: {
        text: '更多',
        icon: 'down'
      },
      resizeObserver: null
    }
  },
  computed: {
    quillEditor() {
      const instance = this.$refs.editor || {}
      return instance.quill || null
    }
  },
  watch: {
    showMore(val) {
      this.foldBtn = {
        text: val ? '收起' : '更多',
        icon: val ? 'up' : 'down'
      }
    },
    clonePreview(val) {
      this.$refs.editor.$el
        .querySelector('.ql-container')
        .setAttribute('style', `overflow-y:${val ? 'hidden' : 'auto'}`)
    }
  },
  mounted() {
    this._overflowObserver() //监测文本溢出
  },
  beforeDestroy() {
    this._unobserve() // 取消监测
  },
  methods: {
    //文本溢出监测
    _overflowObserver() {
      // 观察的对象
      const observerDom = this.$refs.editor.$el.querySelector('.ql-editor')
      // 观察变化回调
      const resizeCallback = () => {
        this._defineOverflow()
      }
      this.resizeObserver = new ResizeObserver(resizeCallback)
      this.resizeObserver.observe(observerDom)
    },
    //取消文本溢出监测
    _unobserve() {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    },
    // 定义是否溢出
    _defineOverflow() {
      if (this.value && this.preview && !this.isEditor) {
        const contentHeight = this.$refs.editor.$el.querySelector('.ql-editor').clientHeight
        this.overflow = contentHeight > EDITOR_MIN_HEIGHT
      } else {
        this.overflow = false
      }
    },
    // 点击切换收起-更多
    toggleFold() {
      this.showMore = !this.showMore
    },
    onClick() {
      if (this.isEditor || this.readOnly) {
        return
      }
      this.onFocus()
    },
    // 文本域聚焦
    onFocus() {
      this.clonePreview = false
      this.overflow = false
      this.showBtns = true
      if (this.preview) {
        this.isEditor = true
        this.focusOnEnd()
      }
    },
    // 聚焦到文本末尾_
    focusOnEnd() {
      if (this.quillEditor) {
        this.$nextTick(() => {
          const length = this.quillEditor.getLength()
          this.quillEditor.focus()
          this.quillEditor.setSelection(length)
        })
      }
    },
    // 提交
    onSubmit() {
      this.$emit('submit', this._exitEdit)
    },
    // 取消
    onCancel() {
      this.$emit('cancel', this._exitEdit)
    },
    // 退出编辑状态
    _exitEdit() {
      this.clonePreview = true
      this.showBtns = false
      this.isEditor = false
      // this._defineOverflow()
    },
    // 重置编辑器
    reset() {
      this._exitEdit()
      this.showMore = false
    }
  }
}
</script>
