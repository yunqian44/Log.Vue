<template lang="html">
    <!-- BEGIN CONTENT -->
    <div class="home-container">
  <el-row class="container">
    <el-col :span="24" class="head">
                <div class="title">
                     {{this.$route.query.title}}
                </div>
    </el-col>
    <el-col :span="24" class="main">

   </el-col>
 </el-row>
</div>
    <!-- END CONTENT -->
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      content: null,
      editorOption: {},
      message: "张三"
    };
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    }
  },
  components: {
   quillEditor
  }
};
</script>

<style scoped lang="scss">
.title {
  font-size: 32px;
  text-align: center;
}
</style>
