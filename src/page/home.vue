<template lang="html">
<div class="home-container">
  <el-row class="container">
    <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?'':sysName}}</el-col>
            <el-col :span="10">
        <div class="tools" @click.prevent="collapseFun">
          <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col 
            :span="4" class="userinfo">
                    <span class="el-dropdown-link userinfo-inner"  @click="$router.push({path:'/login'})" v-if="loginBtnVisible">登 录</span>
                <el-dropdown trigger="hover" v-if="userBtnVisible">
                    <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
       <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed">
         <template v-for="(item,index) in logListData" v-if="!item.hidden">
           <el-submenu :index="index+''">
             <template slot="title">
               <div
                @click="$router.push({ path: '/detail',query :{'title':item.title} })"
                >
                 {{item.title}}({{item.date}})
              </div>
             </template>
           </el-submenu>
        </template>
       </el-menu>
       <!--导航菜单-折叠后-->
       <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
         <li v-for="(item,index) in logListData" v-if="!item.hidden" class="el-submenu item">
          <template>
            <div class="el-submenu__title"
                style="padding-left: 20px;"
                @mouseover="showMenu(index, true)"
                @mouseout="showMenu(index, false)">
                <i :class="item.iconCls"></i>
            </div>
            </template>
         </li>
       </ul>
     </aside>
     <section class="content-container">
       <div class="grid-content bg-purple-light">
         <el-col :span="24" class="breadcrumb-container">
         </el-col>
         <el-col :span="24" class="content-wrapper">
           <transition name="fade" mode="out-in">
             <router-view></router-view>
           </transition>
         </el-col>
       </div>
     </section>
   </el-col>
 </el-row>
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sysName: "Log.Vue",
      sysUserName: "",
      loginBtnVisible:true,
      userBtnVisible:false,
      collapsed: false,
      logListData: [
        {
          date: "20160502",
          title: "E6更新说明-业务协同",
          iconCls:"el-icon-document"
        },
        {
           date: "20160502",
          title: "E6更新说明-软硬一体",
          iconCls:"el-icon-document"
        },
        {
          date: "20160502",
          title: "E6更新说明-结算模块",
          iconCls:"el-icon-document"
        }
      ],
    };
  },
  methods: {
    //折叠导航栏
    collapseFun: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    login: function() {
      var _this = this;
      _this.$router.push({ path: "/login" });
    },
    top(date){
      alert(date);
    },
    //退出登录
    logoutFun: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.username || "";
      this.loginBtnVisible=false;
      this.userBtnVisible=true;
      
    } else {
      this.loginBtnVisible=true;
      this.userBtnVisible=false;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #5e67e0;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
    }
    .logo-width {
      width: 250px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside {
      flex: 0 0 250px;
      width: 250px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 70px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 250px;
      width: 250px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
          //margin-top: 50px;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>