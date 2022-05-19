//该模块对api进行统一管理
import request from './ajax.js'
import mockAjax from './mockAjax.js'
const reqCategoryList = () => {
    return request({
        url: '/product/getBaseCategoryList',
        method: 'get'
    });

}
const reqBannerList = () => {
    return mockAjax({
        url: '/banner',
        method: 'get'
    });

}

const reqFloorList = () => {
    return mockAjax({
        url: '/floor',
        method: 'get'
    });

}
const reqSearchInfo = (searchParams) => {
    return request({
        url: '/list',
        method: 'post',
        data: searchParams//searchParams是用户搜索的参数，这个参数是用户在发请求的时候给传递的
    })
    //return request.post('/list', searchParams);
}

const reqDetailInfo = (skuId) => {
    return request.get(`item/${skuId}`);
}
export { reqCategoryList, reqBannerList, reqFloorList, reqSearchInfo, reqDetailInfo }
