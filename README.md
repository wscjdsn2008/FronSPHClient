1 先装node  
2 装vuecli   npm install -g @vue/cli

<!-- 卸载webpack  npm uninstall webpack -g
卸载vuecli npm uninstall vue-cli -g
查看node 支持的vue版本  npm view vue-cli versions


1）vue-cli已安装版本查看：vue -V
2）3.0以下卸载：npm uninstall vue-cli -g
3）3.0以上卸载：npm uninstall @vue/cli -g
4）vue-cli可安装版本查看（3.0以上版本为@vue/cli）
5）3.0以下查看：npm view vue-cli versions --json
6）3.0以上查看：npm view @vue/cli versions --json
7）vue -h -->


最后成功安装方法顺序：  1.装node-v12.8.1-x64   2.装cnpm   npm install -g cnpm --registry=https://registry.npm.taobao.org
3.cnpm install -g @vue/cli  全都在cmd控制台完成

vue create 项目名称

npm install vue-quill-editor --save 装富文本编辑器插件
npm i axios -S 安装axios

1.views文件夹、HelloWorld.vue删除
less和less-loader都是开发依赖

template中只能有一个根节点

<Mypontent init='9'></Mypontens>  9是字符串 
<Mypontent :init='9'></Mypontens> 9是数字 (因为v-bind里面是js代码)


<sonCompon ref='mySon'></sonCompon>  父组件可以通过this.$refs.mySon.方法名（属性名）调用子组件的方法、属性。

访问store中state中的属性的2种方法
1.this.$store.state.全局属性名称
2.import { mapState } from "vuex";  
computed: {
    ...mapState(["count"]),

    //下面是普通的计算属性
    //showmsg() {
     // return `${this.msg}----`;
    //}, 
  },

props属性可以像data属性中的数据一样，在模板结构中被使用，但props是只读的，不能修改，否则报错


/deep/ h5{color:red}   父组件改子组件的样式会用到deep  （使用第三方库，需要修改默认样式的时候常用到）


import login from '../components/login' 可以写成import login from '@/components/login' ，无论是在哪个层级，@都能自动找到src的目录

height：100%是一层层往下传的，中间不能隔断

登录前做预验证
导航守卫和axios拦截器的区别：
导航守卫只是前端这边做判断，检查请求头中是否带有token， 并不能判断 token 是否失效,写在路由中。而 axios拦截器是发送请求到后端那边，后端来判断token的有效性，再决定用户的登陆状态,写在main.js中。两者可以一起配合使用 来保证登陆状态


改造路由菜单：el-menu 加router，el-menu-item加:index="'/' + sonitem.path"
一级菜单（el-submenu）的index属性写成 :index="item.id+''"  防止点开一个菜单，其他菜单跟着被点开，:index的值必须是一个字符串


表单预校验和表单重置都需要取得ref的引用对象


#app{
    min-width: 1366px;
} 设置最小宽度，宽度不足的时候，页面内容不会被挤下拉，而是会出现横向滚动条。

删除角色对应的权限后，不要刷新，而是重新赋值。
:value='-1' 此处-1是数字，如果不加冒号，-1就是字符串


push数组添加元素(unshift从头部添加)(改变原数组)  splice数组删除元素(改变原数组)
split字符串转数组(不改变原数组)  join数组转字符串(不改变原数组)


安装运行依赖 vue-quill-editor 

、先创建公共组件
（1）在第一级菜单循环过程中，如判断出当前菜单存在着子级菜单，渲染出当前菜单，并将当前菜单的子级属性（例如：child：[数组]），利用子组件传参的方式，传给我们现在正在封装的组件（如果菜单有子菜单，则把子菜单再循环一遍，直到没有子菜单为止。）。




106.108. 三级分类移入移出一级显示和隐藏二级(Av546952704
107.109. 鼠标移入过快导致浏览器卡顿的演示(Av546952704,P107)
108.110. 函数的防抖和节流及节流处理移入操作（lodash的使用）(Av546952704,P108)
117.119. 前一天回顾(Av546952704,P117)
142.144. 解决在搜索页多次跳转后不能直接返回home的问题(Av546952704,P142)



点击三级分类，跳转到search页面，性能优化迭代步骤 a连接->router-link->push->事件委托
 search页三级菜单的隐藏和显示，以及过渡效果
 typeNav请求三级分类过多的问题，转移到App当中去发
 合并query和params参数
 npm -i swiper@5 -S  引入轮播图的css和js
 watch +nextTick 

 搜索页面中三级分类和关键字搜索，改变关键字时，通过watch监视路由重新发请求
 删除三级分类和关键字的面包屑（全局事件总线清空关键字），路径重新跳转，重新发送请求
 点击和删除品牌的相关操作
点击数搜索以及多次点击出现多个面包屑的bug解决 
排序   分页器 


 




先装node（包含了npm   老师版本10.13.0），再装webpackwebpack(npm install webpack -g)  最后装脚手架3（vue cli3的版本）  npm install -g @vue/cli

卸载webpack  npm uninstall webpack -g
卸载vuecli npm uninstall vue-cli -g
查看node 支持的vue版本  npm view vue-cli versions


1）vue-cli已安装版本查看：vue -V
2）3.0以下卸载：npm uninstall vue-cli -g
3）3.0以上卸载：npm uninstall @vue/cli -g
4）vue-cli可安装版本查看（3.0以上版本为@vue/cli）
5）3.0以下查看：npm view vue-cli versions --json
6）3.0以上查看：npm view @vue/cli versions --json
7）vue -h


最后成功安装方法顺序：  1.装node-v12.8.1-x64   2.装cnpm   npm install -g cnpm --registry=https://registry.npm.taobao.org
3.cnpm install -g @vue/cli  全都在cmd控制台完成

vue create 项目名称

npm install vue-quill-editor --save 装富文本编辑器插件
npm i axios -S 安装axios

1.views文件夹、HelloWorld.vue删除
less和less-loader都是开发依赖

template中只能有一个根节点

<Mypontent init='9'></Mypontens>  9是字符串 
<Mypontent :init='9'></Mypontens> 9是数字 (因为v-bind里面是js代码)


<sonCompon ref='mySon'></sonCompon>  父组件可以通过this.$refs.mySon.方法名（属性名）调用子组件的方法、属性。

访问store中state中的属性的2种方法
1.this.$store.state.全局属性名称
2.import { mapState } from "vuex";  
computed: {
    ...mapState(["count"]),

    //下面是普通的计算属性
    //showmsg() {
     // return `${this.msg}----`;
    //}, 
  },

props属性可以像data属性中的数据一样，在模板结构中被使用，但props是只读的，不能修改，否则报错


/deep/ h5{color:red}   父组件改子组件的样式会用到deep  （使用第三方库，需要修改默认样式的时候常用到）


import login from '../components/login' 可以写成import login from '@/components/login' ，无论是在哪个层级，@都能自动找到src的目录

height：100%是一层层往下传的，中间不能隔断

登录前做预验证
导航守卫和axios拦截器的区别：
导航守卫只是前端这边做判断，检查请求头中是否带有token， 并不能判断 token 是否失效,写在路由中。而 axios拦截器是发送请求到后端那边，后端来判断token的有效性，再决定用户的登陆状态,写在main.js中。两者可以一起配合使用 来保证登陆状态


改造路由菜单：el-menu 加router，el-menu-item加:index="'/' + sonitem.path"
一级菜单（el-submenu）的index属性写成 :index="item.id+''"  防止点开一个菜单，其他菜单跟着被点开，:index的值必须是一个字符串


表单预校验和表单重置都需要取得ref的引用对象


#app{
    min-width: 1366px;
} 设置最小宽度，宽度不足的时候，页面内容不会被挤下拉，而是会出现横向滚动条。

删除角色对应的权限后，不要刷新，而是重新赋值。
:value='-1' 此处-1是数字，如果不加冒号，-1就是字符串


push数组添加元素(unshift从头部添加)(改变原数组)  splice数组删除元素(改变原数组)
split字符串转数组(不改变原数组)  join数组转字符串(不改变原数组)


安装运行依赖 vue-quill-editor 

、先创建公共组件
（1）在第一级菜单循环过程中，如判断出当前菜单存在着子级菜单，渲染出当前菜单，并将当前菜单的子级属性（例如：child：[数组]），利用子组件传参的方式，传给我们现在正在封装的组件（如果菜单有子菜单，则把子菜单再循环一遍，直到没有子菜单为止。）。




