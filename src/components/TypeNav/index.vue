<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div  @mouseenter="isshow=true" @mouseleave="moveOutDIv">
      <h2 class="all">全部商品分类</h2>
     
     <transition  name="sort">
      <div class="sort" v-show="isshow">
        <div class="all-sort-list2" @click="toSearch">
          <div class="item" v-for="(c1, index) in categoryList" :key="c1.id">
            <h3>
              <a href="javascript:;" :data-categoryName="c1.categoryName" :data-category1Id='c1.categoryId' >{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix" >
              <div class="subitem">
                <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <a href="javascript:;" :data-categoryName="c2.categoryName" :data-category2Id='c2.categoryId' >{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                      <a href="javascript:;" :data-categoryName="c3.categoryName" :data-category3Id='c3.categoryId' >{{c3.categoryName}}</a>
                    </em>
                   
                  </dd>
                </dl>
              </div>
            </div>
          </div>
         
            <h3>
              <a href="">箱包</a>
            </h3>
          </div>
        </div>
     </transition>
     

        </div>
         <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  //name: "typenav",
  data() {
    return {
      isshow: true,
    };
  },
  mounted() {
    if (this.$route.path != "/home") {
      //如果不是home页，则隐藏
      this.isshow = false;
    }
  },
  methods: {
    moveOutDIv() {
      if (this.$route.path != "/home") {
        this.isshow = false;
      }
    },
    //利用了事件委托
    toSearch(event) {
      // this.$router.push({
      //   name: "search",
      //   query: {
      //     categoryName: c1.categoryname,
      //     category1Id: c1.categoryId,
      //   },
      // });

      // 解构赋值  event.target取得真正点击的元素,event.target.dataset取得 :data-xxx的属性，即xxx
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      //console.log(event.target);

      console.log(event.target.dataset);

      if (categoryname) {
        //说明点击的是a链接
        let location = {
          name: "search",
          query: {
            categoryName: categoryname,
          },
        };

        if (category1id) {
          location.query.category1Id = category1id;
        } else if (category2id) {
          location.query.category2Id = category2id;
        } else {
          location.query.category3Id = category3id;
        }
        if (this.$route.params) {
          //如果在搜索框内搜索关键字，则合并query和params
          location.params = this.$route.params;
        }

        this.$router.push(location);
      }
    },
  },

  computed: {
    //state从模块中拿数据，不能用数组，只能用对象。getters是从总的state中拿数据，可以用数组。
    ...mapState({
      categoryList: function (state) {
        return state.home.categoryList;
      },
    }),
  },
};
</script>
<style scoped lang='less'>
.sort-enter {
  height: 0;
  opacity: 0;
}
.sort-enter-to {
  height: 461px;
  opacity: 1;
}
.sort-enter-active {
  transition: all 1s;
}

a:hover {
  color: pink !important;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            background-color: hotpink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>