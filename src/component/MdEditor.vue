<template>
  <div class="main">
    <v-md-editor
      class="md-editor"
      v-model="editorValue"
      :disabled-menus="[]"
      @upload-image="handleUploadImage">
    </v-md-editor>
  </div>
</template>

<script>
export default {
  name: 'mdEditor',
  data () {
    return {
      editorValue: this.content != null ? this.content : ''
    }
  },
  props: {
    // 接收值父组件传递值
    content: String
  },
  methods: {
    // v-md-editor 文件上传
    handleUploadImage (event, insertImage, files) {
      // console.log(files);
      // 上传
      for (let i = 0; i < files.length; i++) {
        this.crud.upload(files[i], 'image/vMdEditor/').then(res => {
          // 获取返回数据
          let data = res.data.data
          // 添加图片到内容
          insertImage({
            url: data.url,
            desc: data.name
          })
        })
      }
    }
  },
  watch: {
    editorValue: function (newNum) {
      // 修改调用者传入的值
      this.$emit('update:content', newNum)
    }
  }
}
</script>


<style>
.main{
  border: #cccccc 0.5px solid;
  overflow: hidden !important;
}
.md-editor{
  height:calc(100vh - 500px);
  overflow: auto !important;
}
</style>
