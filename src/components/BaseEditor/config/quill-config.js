import { Quill } from 'vue-quill-editor'
import { ImageExtend, QuillWatch } from './index'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Quill.register('modules/ImageExtend', ImageExtend)

const toolOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: '' }, { align: 'center' }, { align: 'right' }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['image', 'code-block', { color: [] }]
]

const handlers = {
  image: function() {
    QuillWatch.emit(this.quill.id)
  }
}

export default {
  placeholder: '请输入描述',
  theme: 'snow',
  modules: {
    ImageExtend: {
      loading: true,
      name: 'img', // 图片参数名
      action: 'needs/uploadImg', // 服务器地址, 如果action为空，则采用base64插入图片
      size: 10, // 可选参数 图片大小，单位为M，1M = 1024kb
      response: res => res.data.fileUrl
    },
    toolbar: {
      handlers,
      container: toolOptions
    }
  }
}
