import { reqCategoryList, reqBannerList, reqFloorList } from "@/api/index.js";
const state = {

    categoryList: [],
    bannerList: [],
    floorList: []
};
const actions = {
    async getCategoryList({ commit }) {
        const result = await reqCategoryList();
        if (result.code === 200) {
            commit('RECEIVE_CATEGORYLIST', result.data);
        }
    },
    async getBannerList({ commit }) {
        const result = await reqBannerList()
        if (result.code == 200) {
            commit('RECEIVE_BANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        const result = await reqFloorList()
        if (result.code == 200) {
            commit('RECEIVE_FLOORLIST', result.data)
        }
    }
};
const mutations = {
    RECEIVE_CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    RECEIVE_BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    RECEIVE_FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};

const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters,
};