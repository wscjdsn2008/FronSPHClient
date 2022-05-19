import axios from "axios"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

let service = axios.create({
    baseURL: '/api',
    timeout: 2000
})
service.interceptors.request.use(
    (config) => {
        nprogress.start();
        return config;
    },
    (error) => { }
)
service.interceptors.response.use(
    (response) => {
        nprogress.done();
        return response.data;
    },
    (error) => {
        nprogress.done();
        alert('发送ajax请求失败' + error.message || '未知错误');
        // return Promise.reject(new Error('发送ajax请求失败')) //后面想继续处理这个错误，返回失败的promise
        //也可以不让后面继续处理这个错误，中断promise链
        return new Promise(() => { })  //返回的是pending状态的promise，代表中断promise链，后期也就没办法处理了
    }
)
export default service