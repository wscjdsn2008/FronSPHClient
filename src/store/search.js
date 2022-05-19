import { reqSearchInfo } from "@/api/index.js";
const state = {
    SearchInfo: {},

};
const actions = {
    async getSearchInfo({ commit }, params) {
        const result = await reqSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHINFO', result.data);
        }
    }
};

const mutations = {
    GETSEARCHINFO(state, data) {
        state.SearchInfo = data
    }
};

const getters = {
    attrsList(state) {
        return state.SearchInfo.attrsList || [];
    },
    goodsList(state) {
        return state.SearchInfo.goodsList || [];
    },
    trademarkList(state) {
        return state.SearchInfo.trademarkList || [];
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};