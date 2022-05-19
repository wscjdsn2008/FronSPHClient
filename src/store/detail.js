import { reqDetailInfo } from '@/api/index'
const state = {
    DetailInfo: {},
};
const mutations = {
    GETDETAILINFO(state, data) {
        state.DetailInfo = data;
    }
};
const actions = {
    async getDetailInfo({ commit }, skuId) {
        const result = await reqDetailInfo(skuId);
        if (result.code == 200) {
            commit('GETDETAILINFO', result.data);
        }

    }
};
const getters = {
    //加上||是为了防止假报错
    categoryView(state) {
        return state.DetailInfo.categoryView || {}
    },
    skuInfo() {
        return state.DetailInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.DetailInfo.spuSaleAttrList || []
    },



};
export default {
    state,
    mutations,
    actions,
    getters,
};