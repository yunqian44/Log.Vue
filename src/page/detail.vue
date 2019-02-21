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
     <quill-editor v-model="infoForm.a_content"
              ref="myQuillEditor"
              class="editer"
              >
       </quill-editor>
   </el-col>
 </el-row>
</div>
    <!-- END CONTENT -->
</template>

<script>
import UE from "./../components/ue.vue"; //调用编辑器

export default {
  data() {
    return {
      infoForm: {
        a_title: "",
        a_source: "",
        a_content: "",
        editorOption: {}
      },
      message: "张三"
    };
  },
  methods: {
    closeDialog() {
      this.show = false;
    }
  },
  omponents: {
    "quill-editor": UE
  }
};
</script>

<style scoped lang="scss">
.title {
  font-size: 32px;
  text-align: center;
}
</style>
