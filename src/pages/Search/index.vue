<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.substring(2)
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 可能有多个props，所以得用vfor -->
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="index"
            >
              {{ item.split(":")[1] }}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @searchForTrademark="searchForTrademark"
          @searchForProps="searchForProps"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- <li
                  :class="{ active: flag }"
                  :data-flag="!flag"
                  @click="changeSort(orderNum)"
                >
                  <a href="javascript:;"
                    >综合<i class="iconfont iconlong-arrow-up"></i
                    ><i class="iconfont iconlong-arrow-down"></i
                  ></a>
                </li>

                <li
                  :class="{ active: !flag }"
                  :data-flag="flag"
                  @click="changeSort(orderNum)"
                >
                  <a href="javascript:;"
                    >价格<i class="iconfont iconlong-arrow-up"></i
                    ><i class="iconfont iconlong-arrow-down"></i
                  ></a>
                </li> -->
                <li
                  :class="{ active: flag === index }"
                  v-for="(item, index) in ['综合', '价格']"
                  :key="index"
                  @click="changeSort(index)"
                >
                  <a href="javascript:;"
                    >{{ item
                    }}<i
                      v-if="flag === index && orderType == 'asc'"
                      class="active iconfont iconlong-arrow-up"
                    ></i
                    ><i
                      v-if="flag === index && orderType == 'desc'"
                      class="iconfont iconlong-arrow-down"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(item, index) in goodsList"
                :key="item.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"
                      ><img :src="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >

                     <router-link :to="`/detail/${item.id}`"
                      >{{item.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <Pagination
            @changePageNo="changePageNo"
            :currentPageNo="searchParams.pageNo"
            :total="searchInfo.total"
            :pageSize="searchParams.pageSize"
            :continueNo="5"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "@/components/Pagination";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",

        // 默认的搜索条件
        order: "2:desc", //排序规则，排序是后台排序的，我们搜索的时候得给后台一个默认的排序规则
        pageNo: 1, //第几页
        pageSize: 5, //每页多少个商品，告诉后台，每页回来多少个商品 默认10个.
      },
      flag: 0,
      tmp: 0,
    };
  },
  beforeMount() {
    this.handerSearchParams(); //发请求之前，整理一次参数
  },
  mounted() {
    this.getSearchInfo();
  },
  methods: {
    //绑定自定义事件
    changePageNo(num) {
      this.searchParams.pageNo = num;
      this.getSearchInfo();
    },
    changeSort(index) {
      this.flag = index;
      //临时变量tmp只要和索引相等，说明点击的还是原来的那个按钮
      if (this.tmp == index) {
        if (this.searchParams.order.split(":")[1] == "asc") {
          this.searchParams.order = `${index}:desc`;
        } else {
          this.searchParams.order = `${index}:asc`;
        }
        //console.log("点的是同一个");
      } else {
        this.searchParams.order = `${index}:desc`;
        //要把临时变量的值改成和索引一样
        this.tmp = index;
        //console.log("点击的是另外一个");
      }
      this.getSearchInfo();
    },
    removeProps(index) {
      this.searchParams.props.splice(index, 1); //根据索引删除props
      this.getSearchInfo();
    },
    removeTrademark() {
      //删除品牌不影响路径，直接发请求
      this.searchParams.trademark = undefined;
      this.getSearchInfo();
    },

    //点击属性触发事件，子组件传过来的自定义事件
    searchForProps(attrId, attrValue, attrName) {
      //将子组件传递过来的参数拼接成字符串,根据接口指定的样式拼接
      let prop = `${attrId}:${attrValue}:${attrName}`;

      if (this.searchParams.props == undefined) {
        //如果不做这步，下面的some一遍历就会出错
        this.searchParams.props = [];
      }
      //如果不为空，判断有没有重复的值
      let isRepeat = this.searchParams.props.some((item) => item === prop);
      if (isRepeat) {
        //为真说明有重复的,直接return
        return;
      }
      this.searchParams.props.push(prop); //将点击搜索的条件prop添加到searchParams.props里
      this.getSearchInfo();
    },
    //用户点击品牌后，重新发请求
    searchForTrademark(Trademark) {
      //Trademark的参数得参考接口文档
      this.searchParams.trademark = `${Trademark.tmId}:${Trademark.tmName}`; //修改搜索参数中的trademark的值
      this.getSearchInfo();
    },
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //上面操作不会改变路径，所以需要让路径发生变化,路径变化，就可以watch监视，重新发请求
      this.$router.push({ name: "search", params: this.$route.params });

      //this.getSearchInfo();//这里直接发请求是无法改变路径的
    },
    removeKeyword() {
      this.$bus.$emit("clearKeyword"); //全局时间总线，通知header删除关键字
      this.searchParams.keyword = undefined; //清空搜索条件里的关键字
      this.$router.push({ name: "search", query: this.$route.query }); //路由重新跳转
      //this.getSearchInfo();
    },
    getSearchInfo() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },

    //发送请求前整理参数
    handerSearchParams() {
      //路由对象解构赋值，整理参数。有值就取到值，没有大不了就undefined
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query;
      let { keyword } = this.$route.params;

      let searchParams = {
        //展开运算符， 将初始化参数一起摊到searchParams里
        ...this.searchParams,

        //将上面解构出来的值放进来
        category1Id, // 相当于category1Id: category1Id,键和值同名，省略写法（冒号后的categoryId才是上面解构出来的categoryId值）
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };

      //对上面的searchParams的键进行遍历，删除空值，这样就不会向后台发空字符串了
      Object.keys(searchParams).forEach((key) => {
        // 这里不能用 . 运算符，只能用[]
        if (searchParams[key] == "") {
          delete searchParams[key]; //或者 searchParams[key] = undefined;
        }
      });

      //重新为searchParams赋值
      this.searchParams = searchParams;
    },
  },
  components: {
    SearchSelector,
    Pagination,
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      searchInfo: (state) => state.search.SearchInfo,
    }),
    orderType() {
      //是升序还是降序
      return this.searchParams.order.split(":")[1];
    },
  },
  watch: {
    $route: {
      handler(newval, oldval) {
        this.handerSearchParams(); //路由发生变化，再整理一次参数
        this.getSearchInfo(); //再次发请求
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>