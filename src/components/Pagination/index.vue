
<template>
  <div class="pagination">
    <button
      :disabled="currentPageNo == 1"
      @click="changePageNo(currentPageNo - 1)"
    >
      上一页
    </button>
    <button v-if="startEnd.start > 1" @click="changePageNo(1)">1</button>

    <button v-if="startEnd.start > 2">•••</button>

    <!-- <button
      @click="changePageNo(page)"
      :class="{ active: page == currentPageNo }"
      v-for="page in middleNumble"
      :key="page"
    >
      {{ page }}
    </button> -->

    <button
      @click="changePageNo(page)"
      :disabled="page == currentPageNo"
      :class="{ active: page == currentPageNo }"
      v-for="page in startEnd.end"
      v-if="page >= startEnd.start"
      :key="page"
    >
      {{ page }}
    </button>

    <button v-if="startEnd.end < totalPageNo - 1">•••</button>
    <button
      v-if="startEnd.end < totalPageNo"
      @click="changePageNo(totalPageNo)"
    >
      {{ totalPageNo }}
    </button>
    <button
      :disabled="currentPageNo == totalPageNo"
      @click="changePageNo(currentPageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  methods: {
    //分页组件给父组件传值
    changePageNo(num) {
      this.$emit("changePageNo", num);
    },
  },
  props: {
    currentPageNo: Number, //这里只是简单写了一下currentPageNo,下面的几个配置是完整写法
    total: {
      //总共多少条
      type: Number,
      default: 0,
      //必须给一个默认值，否则会报一个错误，说total是undefined
      //searchInfo是根据请求回来的数据，请求回来的数据是需要时间的
      //当searchInfo没回来的时候就是空对象，因此传递过来就是undefiend
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    continueNo: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPageNo() {
      //let { total, pageSize } = this;
      let total = this.total;
      let pageSize = this.pageSize;
      let pages = Math.ceil(total / pageSize);
      return pages;
    },
    startEnd() {
      let start = 0;
      let end = 0;
      start = this.currentPageNo - (this.continueNo - 1) / 2;
      end = this.currentPageNo + (this.continueNo - 1) / 2;
      if (start <= 0) {
        start = 1;
        end =
          this.totalPageNo >= this.continueNo
            ? this.continueNo
            : this.totalPageNo;
      }
      if (end > this.totalPageNo) {
        end = this.totalPageNo;
        start =
          this.totalPageNo - this.continueNo + 1 <= 0
            ? 1
            : this.totalPageNo - this.continueNo + 1;
      }
      return {
        start,
        end,
      };
    },
    // middleNumble() {
    //   let arr = [];
    //   for (let i = this.startEnd.start; i < this.startEnd.end + 1; i++) {
    //     arr.push(i);
    //   }
    //   return arr;
    // },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      // cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
