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
      <div v-html='content'></div>
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
      content: '<p class="MsoNormal">一、<b>如何成为好多车会员</b> </p><p class="MsoNormal"><b></b> </p><p class="MsoNormal">1.&nbsp;好多车会员分为个体司机会员和车队会员</p><p class="MsoNormal">2.&nbsp;个体司机会员：必须在好多车平台认证（认证材料：驾驶证、行驶证、身份证、道路运输证，从业资格证，保险卡）+会员费（499）</p><table class="MsoNormalTable ke-zeroborder" border="1" cellspacing="0" style="border:none;"><tbody><tr><td width="145" valign="center"><p class="MsoNormal" align="center" style="text-align:center;"><span style="font-family:宋体;font-size:10.5pt;">类别</span><span style="font-family:宋体;font-size:10.5pt;"></span> </p></td><td width="162" valign="center"><p class="MsoNormal" align="center" style="text-align:center;"><span style="font-family:宋体;font-size:10.5pt;">个体司机</span><span style="font-family:宋体;font-size:10.5pt;"></span> </p></td><td width="243" valign="center"><p class="MsoNormal" align="center" style="text-align:center;"><span style="font-family:宋体;font-size:10.5pt;">车队</span><span style="font-family:宋体;font-size:10.5pt;"></span> </p></td></tr><tr><td width="145" valign="center"><p class="MsoNormal" align="center" style="text-align:center;"><span style="font-family:宋体;font-size:10.5pt;">会员费用</span><span style="font-family:宋体;font-size:10.5pt;"></span> </p></td><td width="162" valign="center"><p class="MsoNormal" align="center" style="text-align:center;"><span style="font-family:宋体;font-size:10.5pt;">499元</span><span style="font-family:宋体;font-size:10.5pt;"></span> </p></td><td width="243" valign="center"><p class="MsoNormal" align="center" style="text-align:center;"><span style="font-family:宋体;font-size:10.5pt;">999元</span><span style="font-family:宋体;font-size:10.5pt;"></span> </p></td></tr></tbody></table><p class="MsoNormal" align="right" style="text-align:right;">好多车联（深圳）科技有限公司</p><p class="MsoNormal">&nbsp;</p>',
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
