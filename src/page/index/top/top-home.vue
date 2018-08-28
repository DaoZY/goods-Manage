<template>
  <div class="top">
    <div class="top-button is-left">
      <!-- breadcrumb按钮和面包屑 -->
      <div class="tags-breadcrumb">
        <i class="icon-navicon tag-collapse"
           :class="[{ 'tag-collapse_right': isCollapse }]"
           @click="showCollapse"></i>
        <!-- <top-breadcrumb class="tags-breadcrumb-list"></top-breadcrumb> -->
      </div>
    </div>
    <h1 class="top-title">
      <topMenu></topMenu>
    </h1>
    <div class="top-button is-right">
      <el-tooltip class="item"
                  effect="dark"
                  content="首页"
                  placement="bottom">
                <span class="top-item">
                  <top-home></top-home>
                </span>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  content="主题色"
                  placement="bottom">
                <span class="top-item">
                  <top-color></top-color>
                </span>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  content="锁屏"
                  placement="bottom">
                <span class="top-item">
                  <top-lock></top-lock>
                </span>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  content="特色主题"
                  placement="bottom">
                <span class="top-item">
                  <top-theme></top-theme>
                </span>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  :content="isFullScren?'退出全屏':'全屏'"
                  placement="bottom">
                <span class="top-item">
                  <i :class="isFullScren?'icon-tuichuquanping':'icon-quanping'"
                     @click="handleScreen"></i>
                </span>
      </el-tooltip>
      <el-tooltip class="item"
                  effect="dark"
                  content="用户头像"
                  placement="bottom">
        <img class="top-userImg"
             :src="userInfo.avatar">
      </el-tooltip>
      <el-dropdown>
                <span class="el-dropdown-link">
                  {{userInfo.username}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <a href="https://gitee.com/smallweigit/avue"
               target="_blank">码云地址</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a href="https://github.com/nmxiaowei/avue"
               target="_blank">github</a>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout"
                            divided>退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
    import {mapGetters} from "vuex";
    import store from '@/store'
    import {fullscreenToggel, listenfullscreen} from "@/util/util";
    import topHome from "./top-home";
    import topLock from "./top-lock";
    import topMenu from "./top-menu";
    import topBreadcrumb from "./top-breadcrumb";
    import topColor from "./top-color";
    import topTheme from "./top-theme";
    import LoginApi from "@/api/LoginApi";

    export default {
        components: {topHome, topLock, topMenu, topBreadcrumb, topColor, topTheme},
        name: "top",
        data() {
            return {};
        },
        filters: {},
        created() {//每次初始化该页面时吗，重新加载个人可以访问的菜单及路由
            let loginApi = new LoginApi();

            //获取该用户信息
            let userParam = {};
            loginApi.getUserInfo(userParam).then(res => {
                //存储该用户在该应用下的菜单
                this.$store.dispatch("setUserInfo", res.data);
            });


        },
        mounted() {
            listenfullscreen(this.setScreen);
        },
        computed: {
            ...mapGetters([
                "userInfo",
                "isFullScren",
                "tagWel",
                "tagList",
                "isCollapse",
                "tag"
            ])
        },
        methods: {
            handleScreen() {
                fullscreenToggel();
            },
            showCollapse() {
                this.$store.commit("SET_COLLAPSE");
            },
            setScreen() {
                this.$store.commit("SET_FULLSCREN");
            },
            logout() {
                this.$confirm("是否退出系统, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {

                    let loginApi = new LoginApi();
                    let params = {token: store.getters.token};
                    loginApi.logout(params).then(res => {
                        this.$store.dispatch("clearToken");
                        this.$store.dispatch("clearLock");
                        this.$store.dispatch("clearTag");
                        //存储该用户在该应用下的菜单
                        this.$router.push({path: "/login"});
                    });

                });
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>

