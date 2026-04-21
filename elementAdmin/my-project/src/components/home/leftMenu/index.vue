<template>
  <div width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="defaultopeneds">
      <template v-for="(menu,index) in menuList">
        <el-menu-item @click="clickMenu(menu)" v-if="menu.children.length == 0" :index="menu.id" :key="index">{{ menu.title }}</el-menu-item>

        <el-submenu :index="menu.id" v-if="menu.children.length > 0" :key="index">
          <template slot="title"><i :class="menu.class"></i>{{ menu.title }}</template>
          <el-menu-item
            @click="clickMenu(group)"
            v-for="(group,groupindex) in menu.children"
            :class="group.class"
            :key="groupindex"
            :index="group.id"
          >{{ group.title }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
  },
  computed: {
    selectMenu: {
      get() {
        return this.$store.state.setSelectMenu || 'Dashboard'
      },
      set(val) {
        console.log(val)
      }
    }
  },
  data() {
    return {
      defaultopeneds: ['1','3'],
      menuList: [
        { id: '1', href: '',datatoggle:"collapse",class: 'el-icon-message',title: 'Dashboard',router: '/home/dashboard', children: []},
        { id: '2', href: '',datatoggle:"collapse",class: 'el-icon-menu',title: 'UIElements',router: '/home/uielements',children: [
          {  id: '2-1', href: '',class: 'el-icon-menu',title: 'typography',router: '/home/uielements/typography'},
          {  id: '2-2', href: '',class: 'el-icon-menu',title: 'uiElements',router: '/home/uielements/button'},
        ]},
        { id: '3', href: '',datatoggle:"collapse",class: 'el-icon-menu',title: 'Formelements',router: '/home/formelements', children: []},
        { id: '4', href: '',datatoggle:"collapse",class: 'el-icon-menu',title: 'Charts',router: '/home/charts', children: []},
        { id: '5', href: '',datatoggle:"collapse",class: 'el-icon-menu',title: 'Tables',router: '/home/tables', children: []},
        { id: '6', href: '',datatoggle:"collapse",class: 'el-icon-menu',title: 'Icons',router: '/home/icons', children: []},
        { id: '7', href: '',datatoggle:"collapse",class: 'el-icon-menu',title: 'Documentation',router: '/home/documentation', children: []}
      ]

    }
  },
  methods: {
    clickMenu(data) {
      // console.log(data)
      console.log(this.$route.path)
      if(this.$route.path != data.router) {
        this.$router.push(data.router)
        this.$store.commit('setSelectMenu', { value: data.title})
      }
    }
  }
}
</script>
<style scoped>
  .el-aside {
    color: #333;
  }
  .el-submenu, .el-menu-item{
    border-bottom: 1px solid #f3f3f3;
    margin-top: 0;
  }
  .el-menu-item, .el-submenu__title {
    height: 43px;
    line-height: 43px;
  }
</style>
