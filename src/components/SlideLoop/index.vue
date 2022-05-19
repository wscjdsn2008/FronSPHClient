<template>
  <div class="swiper-container" ref="bannerSwiper" id="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in bannerList"
        :key="item.id"
      >
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  data() {
    return {};
  },
  mounted() {},
  props: ["bannerList"],
  watch: {
    bannerList: {
      immediate: true,
      handler(newold, oldval) {
        this.$nextTick(() => {
          new Swiper(this.$refs.bannerSwiper, {
            //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          });
        });
      },
    },
  },

  methods: {},
};
</script>
<style scoped>
</style>