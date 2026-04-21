import axios,{Axios, AxiosError, type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse
}  from "axios";
import { type ResultData } from '../api/model.index'
import { message } from 'ant-design-vue';;

const [messageApi, contextHolder] = message.useMessage();

const baseURL = "http://localhost:3033"; 
// const baseURL:string = import.meta.env.VITE_API_BASE_URL;
console.log("mport.meta.env:"+ import.meta.env)
//console.log("baseURL:"+ baseURL)

enum RequestEnums {
    TIMEOUT=20000,
    OVERDUE=401,
    FAIL=400,
    SUCCESS=200
};

const config = {
    baseURL,
    timeout: RequestEnums.TIMEOUT as number,
    withCredentials:true,

}

class RequestHttp {
    service:AxiosInstance
    public constructor(config:AxiosRequestConfig) {
        this.service = axios.create(config);

        this.service.interceptors.request.use(
            (config:any) => {
                const token = localStorage.getItem("token") ||""
                if(token&& config.headers) {
                    typeof config.headers.set =="function" && config.headers.set("authorization", token)
                }
                return {
                    ...config,
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                }

            },
            (error: AxiosError) => {
                Promise.reject(error)
            }
        )

        this.service.interceptors.response.use(
            (response:AxiosResponse)=> {
                const { data } = response;
                if(data.code == RequestEnums.OVERDUE) {

                    // // 登录信息失效，应跳转到登录页面，并清空本地的token
                    // localStorage.setItem("token", "")
                    // router.replace({
                    //     path: "/login"
                    // })
                    return Promise.reject(data);
                }
                if(data.code&& data.code!=RequestEnums.SUCCESS) {
                    messageApi.error(data.msg);
                    return Promise.reject(data)
                }
                return data;
            },
            (error:AxiosError) => {
                const { response} = error;
                if(response) {
                    this.handleCode(response.status)
                }
                if(!window.navigator.onLine) {
                    messageApi.error("网络连接失败")
                    // //可以转跳到错误页面，也可以不做操作
                    // return router.replace({
                    //     path:'/404'
                    // });
                }
            }
        )
    }
    handleCode(code:number):void {
        switch(code) {
            case 401:
                messageApi.error("登录失败，请重新登录")
                break;
            default:
                messageApi.error("请求失败")
                break;
        }
    }
    get<T>(url:string, param?:object):Promise<ResultData<T>>{
        return this.service.get(url, param);

    }
     Post<T>(url:string, param?:object):Promise<ResultData<T>>{
        return this.service.post(url, param);

    }
     put<T>(url:string, param?:object):Promise<ResultData<T>>{
        return this.service.put(url, param);

    }
     delete<T>(url:string, param?:object):Promise<ResultData<T>>{
        return this.service.delete(url, param);

    }

}
// 导出一个实例对象
export default new RequestHttp(config)