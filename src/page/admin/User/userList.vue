<template lang="html">
  <div class="table-content">
    <div class="content-head"  style="margin-top:10px;margin-bottom:10px;">
      <div class="select_type col-sm-2">
        <el-row>
          <label for="" class="formLabelCss">日期:</label>
           <el-date-picker  
           suffix-icon="el-icon-date" 
           style="width:150px" 
           type="date" 
           placeholder="请选择日期"
           v-model="queryDate"></el-date-picker>
           
           <label for="" class="formLabelCss">姓名:</label>
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              style="width:150px"
              v-model="queryName">
            </el-input>
            <el-button type="warning" @click="search()" icon="el-icon-search">查询</el-button>
            <el-button type="danger" @click="resetting()" icon="el-icon-refresh">重置</el-button>
            <el-button type="primary" @click="add()" icon="el-icon-plus" style="float:right;margin-right:20px;" >添加</el-button>
        </el-row>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData"
      border
      v-loading="loadingTable"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      style="width: 100%">
      <el-table-column prop="id" align="center" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="userCode" align="center" label="用户名" width="180"></el-table-column>
      <el-table-column prop="name" align="center" label="姓名" width="180"></el-table-column>
      <el-table-column prop="date" align="center" label="录入时间" width="180"></el-table-column>
      <el-table-column prop="address" align="center" label="权限" width="300">
          <template slot-scope="scope">{{jungleAuth(scope.row.roleType)}}</template>
      </el-table-column>
      <el-table-column  align="center" label="操作" >
        <template slot-scope="scope">
            <el-button type="success" icon="el-icon-edit" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="del(scope.$index, scope.row.name)">删除</el-button>
            <el-button type="warning" icon="el-icon-success"  size="small" v-if="scope.row.status===0">启用</el-button>
            <el-button type="warning" icon="el-icon-error"  size="small" v-else-if="scope.row.status===1">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
            v-if="paginationShow"
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="5"
            layout="total, prev, pager, next, jumper"
            :total="length">
            </el-pagination>
    </div>
    
    <!--新增用户信息-->
    <el-dialog title="新增用户信息" :visible="addformVisible"  v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)" class="addArea" modal custom-class="addFormArea" @close="closeForm('addForm')">
     <el-form :model="addDataForm" class="addForm" :rules="rules" status-icon ref="addForm">
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addDataForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址:" :label-width="formLabelWidth" prop="address">
          <el-input v-model.number="addDataForm.address" auto-complete="off" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="出生日期:" :label-width="formLabelWidth" prop="date">
          <el-date-picker v-model="addDataForm.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
        <el-button @click="addformVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
     </div>
    </el-dialog> 


    <!--编辑用户信息-->
    <!-- 修改数据 -->
  <el-dialog title="修改数据" :visible="modifyFormVisible" v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)" class="addArea" modal custom-class="addFormArea" @close="closeForm('modifyForm')">
  <el-form :model="editDataForm" class="addForm" :rules="rules" status-icon ref="modifyForm">

    <el-form-item label="姓名:" :label-width="formLabelWidth" prop="name">
      <el-input v-model="editDataForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
    </el-form-item>

    <el-form-item label="地址:" :label-width="formLabelWidth" prop="address">
      <el-input v-model.number="editDataForm.address" auto-complete="off" placeholder="请输入地址"></el-input>
    </el-form-item>

     <el-form-item label="出生日期:" :label-width="formLabelWidth" prop="date">
      <el-date-picker v-model="editDataForm.date" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modifyFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifySure('modifyForm')">确 定</el-button>
  </div>
  </el-dialog> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      addformVisible: false,
      formLabelWidth: "120px",
      modifyFormVisible: false,
      paginationShow: true,
      loadingTable: false,
      loading: false,
      queryName: "",
      queryDate: "",
      modifyId: "",
      dialogType: "",
      currentPage: 1, //当前页数
      pageIndex: 1, //第几页
      pageSize: 5, //每页多少条
      length: 0, //共有多少条
      tableData: [],
      // 校验规则
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        date: [
          { required: true, message: "请输入生日", trigger: "blur" },
          { type: "date", message: "生日必须为时间类型" }
        ],
        address: [
          { required: true, message: "请输入家庭地址", trigger: "blur" }
        ]
      },
      userData: [
        {
          id: 1,
          date: "2016-05-02",
          userCode: "lixiaoyao",
          name: "李逍遥",
          address: "上海市普陀区金沙江路 3000 弄",
          roleType: 1,
          status: 0
        },
        {
          id: 2,
          date: "2016-05-04",
          userCode: "zhaolinger",
          name: "赵灵儿",
          roleType: 1,
          address: "杭州市余杭镇仙灵岛路 3001 弄",
          status: 1
        },
        {
          id: 3,
          date: "2016-05-01",
          userCode: "liumengli",
          name: "柳梦璃",
          roleType: 2,
          address: "柳州市普陀区金沙江路 3002 弄",
          status: 0
        },
        {
          id: 4,
          date: "2016-05-03",
          userCode: "hanlingsha",
          name: "韩菱纱",
          roleType: 2,
          address: "西安市雁塔区高新四路 3003 弄",
          status: 1
        }
      ],
      addDataForm: {
        name: "",
        date: "",
        address: ""
      },
      editDataForm: {
        name: "",
        date: "",
        address: ""
      }
    };
  },
  methods: {
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return "background-color: pink";
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: lightblue;color: #fff;font-weight: 500;";
      }
    },
    search() {
      var that = this;
      //alert("你好");
      var searchParmas = {
        Name: this.queryName,
        Date: this.queryDate,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize
      };

      this.loadingTable = true;
      setTimeout(that.st(), 2000);
    },
    st() {
      this.loadingTable = false;
      this.tableData = this.userData;
      this.length = this.tableData.length;
    },
    // 转换性别
    jungleAuth(type) {
      if (type == 1) {
        return "管理员";
      } else if (type == 2) {
        return "用户";
      } else {
        return "";
      }
    },
    resetting() {
      this.queryName = "";
      this.queryDate = "";
    },
    closeDialog() {},
    edit(index, row) {
      this.modifyFormVisible = true;
      this.editDataForm = Object.assign({}, row);
      this.modifyId = row["_id"];
    },
    add() {
      this.addformVisible = true;
    },
    closeForm(formName) {
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields();
      }
      if (formName === "modifyForm") {
        this.modifyFormVisible = false;
      } else if (formName === "addForm") {
        this.addformVisible = false;
      }
    },
    addSure: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          var that = this;
          //alert("添加");rules
          //console.log(this.addDataForm.address+"--------"+this.addDataForm.name);
          this.$post("/api/User", this.addDataForm)
            .then(resp => {
              this.loading = false;
              var msg = "";
              if (resp.status == 1) {
                msg = "添加成功";
              } else {
                msg = resp.message;
              }
              console.log(resp.message);
              this.$message({
                title: "提示",
                message: msg,
                type: resp.status == 1 ? "success" : "warning",
                onClose: function() {
                  that.addformVisible = false;
                  that.closeDialog("addForm");
                  that.search();
                }
              });
            })
            .catch(err => {
              this.loading = false;
              this.$notify({
                title: "提示",
                message: "网络异常请稍后再试",
                type: "error",
                onClose: function() {
                  that.search();
                }
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //页数改变时出发的函数
    handleCurrentChange: function(val) {
      this.pageIndex = `${val}`;
      this.search();
    }
  },
  mounted: function() {
    this.search();
  }
};
</script>

<style lang="css">
.addArea .el-input {
  width: 200px;
}
.addForm {
  overflow: hidden;
}
.addForm .el-form-item {
  float: left;
  width: 50%;
}
.addFormArea {
  .el-dialog__body {
    height: 350px;
  }
  .el-dialog__header .el-dialog__title {
    text-align: left;
  }
}
.content {
  .pagination {
    float: right;
    padding: 30px 0;
  }
}
</style>