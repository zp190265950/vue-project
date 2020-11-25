<template>
  <div ref="container"
       class="base-editor-container"
       :class="{'is-fullscreen':isFullscreen}">
    <quill-editor ref="editor"
                  class="base-editor"
                  :options="options"
                  :value="value"
                  v-bind="$attrs"
                  v-on="$listeners"
                  @blur="onBlur" />

    <!-- 切换全屏 -->
    <button class="base fullscreen-btn"
               :icon='fullsceenIcon'
               @click="toggleScreen" />
  </div>
</template>

<script>
import { default as $editorMixin } from './mixin'

export default {
  name: 'BaseEditor',
  mixins: [$editorMixin],
  watch: {
    isFullscreen: {
      handler: '_initHeight'
    }
  },
  mounted() {
    this._initHeight()
  },
  methods: {
    _initHeight() {
      this.$refs.editor.$el.querySelector('.ql-editor').style.height = this.isFullscreen
        ? 'auto'
        : this.height + 'px'
    },
    // 文本域失焦
    onBlur() {
      this.$refs.editor.$el.querySelector('.ql-editor').scrollTop = 0
    }
  }
}
</script>
