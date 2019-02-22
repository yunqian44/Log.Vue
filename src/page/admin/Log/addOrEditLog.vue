<template lang="html">
   
    <section class="form-section">
         <el-form :model="logDataForm" :rules="rules" ref="logForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="标题*" prop="title">
        
        <el-input v-model="logDataForm.title"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type" style="200px">
        <el-select v-model="logDataForm.type" placeholder="请选择日志类型">
          <el-option label="公共" value="1"></el-option>
          <el-option label="系统升级" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quillEditor
            v-model="logDataForm.content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quillEditor>
      </el-form-item>
        <el-form-item class="save-form">
          <el-button type="primary" @click="submitForm('logForm')">保存</el-button>
        </el-form-item>
    </el-form>
      </el-main> 
  </section>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      logDataForm: {
        title: "系统升级",
        type: "1",
        content: "<h1>你好<h1>"
      },
      editorOption: {},
      // 校验规则
      rules: {
        title: [{ required: true, message: "请输入日志标题", trigger: "blur" }],
        type: [
          { required: true, message: "请选择日志类型", trigger: "change" },
          { required: true, message: "请选择日志类型", trigger: "blur" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    closeDialog() {
      this.show = false;
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
    submitForm(){
      alert("暂时提交");
    }
  },
  components: {
    quillEditor
  }
};
</script>

<style scoped lang="scss">
.form-section {
  margin-top: 20px;
}
.quill-editor {
  height: 400px;
}
.save-form {
  margin-top: 80px;
}
</style>
