<template>
  <div class="sidebar-container"
       :class="{'is-active':isCollapse}">
    <logo :isCollapse="isCollapse"></logo>
    <el-menu unique-opened
             :default-active="nowTagValue"
             mode="vertical"
             :show-timeout="200"
             background-color="#00142a"
             text-color="hsla(0,0%,100%,.65)"
             active-text-color="#409eff"
             :collapse="isCollapse">
      <sidebar-item :menu="menu"
                    :isCollapse="isCollapse">
      </sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import LoginApi from "@/api/LoginApi"
import { setUrlPath } from '@/util/util'
import { mapGetters } from 'vuex'
import SidebarItem from './sidebarItem'
import logo from './logo'
import {convertToRoute, convertToMenu} from "@/util/util";
import { menu} from '@/mock/menu'
export default {
  name: 'sidebar',
  components: { SidebarItem, logo },
  data() {
    return {}
  },
  created () {

      //每次初始化该页面时吗，重新加载个人可以访问的菜单及路由
      let loginApi = new LoginApi();

      //获取该用户信息
      let userParam = {};
      loginApi.getUserInfo(userParam).then(res => {
          //存储该用户在该应用下的菜单
          this.$store.dispatch("setUserInfo", res.data).then(res => {

          });
      });


      //选择应用system应用
      let appParam = {appId: '1'};
      loginApi.getMenu(appParam).then(res => {

          //存储该用户在该应用下动态路由
          let routes = convertToRoute(res.data);
          this.$store.dispatch("setRoute", routes).then(res => {
          });

          //存储该用户在该应用下的菜单
          let menus = convertToMenu(res.data);
          this.$store.dispatch("setMenu", menus.concat(menu)).then(res => {
          });

      });
  },
  computed: {
    ...mapGetters(['menu', 'tag', 'isCollapse']),
    nowTagValue: function () {
      return setUrlPath(this.$route)
    }
  },
  mounted () { },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>

