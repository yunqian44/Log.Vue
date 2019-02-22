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
           
           <label for="" class="formLabelCss">标题:</label>
            <el-input
              placeholder="请输入标题名"
              prefix-icon="el-icon-search"
              style="width:150px"
              v-model="queryTitle">
            </el-input>

            <label for="" class="formLabelCss">类型:</label>
            <el-select v-model="logType" class="formInputCss">
            <el-option
              v-for="item in logTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
           </el-select>
        
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
      <el-table-column prop="title" align="center" label="标题" width="180"></el-table-column>
      <el-table-column prop="type" align="center" label="类型" width="180">
          <template slot-scope="scope">{{jungleType(scope.row.type)}}</template>
      </el-table-column>
      <el-table-column prop="date" align="center" label="更新时间" width="300"></el-table-column>
      <el-table-column  align="center" label="操作" >
        <template slot-scope="scope">
  <el-button
    type="success"
    icon="el-icon-delete"
    size="small"
    @click="
      $router.push({ path: '/admin/addOrEditLog', query: { 'id': scope.row.id } })
    "
    >编辑</el-button
  >
  <el-button
    type="danger"
    icon="el-icon-delete"
    size="small"
    @click="del(scope.$index, scope.row.id)"
    >删除</el-button
  >
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
      logType: "",
      currentPage: 1, //当前页数
      pageIndex: 1, //第几页
      pageSize: 5, //每页多少条
      length: 0, //共有多少条
      tableData: [],
      logTypes: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "公告",
          value: 1
        },
        {
          label: "系统升级",
          value: 2
        }
      ],
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
      tableData: [
        {
          id: 20160502,
          date: "2016-05-02",
          title: "E6更新说明-业务协同",
          type: 2
        },
        {
          id: 20160504,
          date: "2016-05-04",
          title: "E6更新说明-软硬一体",
          type: 2
        },
        {
          id: 20160503,
          date: "2016-05-03",
          title: "E6更新说明-结算模块",
          type: 1
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
      //alert("你好");
      var searchParmas = {
        Name: this.queryName,
        Date: this.queryDate,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize
      };

      this.loadingTable = false;
      //this.tableData = resp.data.userList;
      this.length = this.tableData.length;
      //   this.$get("/api/User", searchParmas)
      //     .then(resp => {
      //       this.loadingTable = false;
      //       var msg = "";
      //       if (resp.status == 1) {
      //         this.tableData = resp.data.userList;
      //         this.length = resp.data.total;
      //       } else {
      //         this.tableData = [];
      //         this.$message({
      //           message: "查询出错，请重试!",
      //           type: "error"
      //         });
      //       }
      //     })
      //     .catch(err => {
      //       this.$nextTick(function() {
      //         this.paginationShow = true;
      //       });
      //       console.log(err);
      //       this.$message({
      //         title: "提示",
      //         message: "网络异常请稍后再试",
      //         type: "error"
      //       });
      //     });
    },
    resetting() {
      this.queryName = "";
      this.queryDate = "";
    },
    // 转换性别
    jungleType(type) {
      if (type == 1) {
        return "公告";
      } else if (type == 2) {
        return "系统升级";
      } else {
        return "";
      }
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
    del(id) {
      this.$message({
        title: "提示",
        message: "删除成功",
        type: "success",
        onClose: function() {
          that.search();
        }
      });
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