<template>
    <div class="login">
        <div class="login-wrap">
            <div class="login-warp-title">登录</div>
            <a-form
                :model="formState"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    label="Username"
                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
                    >
                        <a-input v-model:value="formState.username">
                            <template #prefix>
                                <UserOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                </a-form-item>

                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
                    >
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item>
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item  :wrapper-col="{ offset: 8, span: 16 }">
                    <a class="login-form-forgot" :onclick="goforgot" href="">忘记密码</a>
                </a-form-item>

                <a-form-item  :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                        登录
                    </a-button>
                    Or
                    <a href="" :onclick="goRegister">注册</a>
                </a-form-item>
            </a-form>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { UserLogin } from '@/api/model.index';
import { useRouter } from 'vue-router';
import { getLoginApi } from '@/api';
import { type FormState } from "@/types/index";

const formState = reactive<FormState>({
  username: 'testusertestuser',
  password: 'addaddaddadd',
  remember: true,
});
const goRegister = () => {
    router.push({
        path: '/register',
        // name: 'home',
        query: {
            msg: 'hello'
        }
    });
};
const getLogin = async () => {
    try {
        let param:UserLogin=  {
            name: formState.username,
            password:formState.password,
            email:"test@example.com"
        };
        const resultdata = await getLoginApi(param)
        return Promise.resolve(resultdata);
    } catch (error) {
        console.log(error)
        //ElMessage.error('数据加载失败!')
    }
};
 let router = useRouter();

const onFinish = (values: any) => {
    getLogin().then(data => {
        const UserInfo:any = data;
         console.log("data:", data)
        if(UserInfo.success) {
            // 登录信息失效，应跳转到登录页面，并清空本地的token
            localStorage.setItem("token", UserInfo.data.token)
            // router.push("home");
            router.push({
                path: '/home',
                // name: 'home',
                query: {
                    msg: 'hello'
                }
            });
        }
       
    }) 
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const goforgot = () => {
    router.push({
            path: '/ForgetPassword',
            // name: 'home',
            query: {
                msg: 'hello'
            }
        });
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
<style scoped>
.login{
    display:inline-flex;
    width: 100%;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 1000px; /* 容器高度 */
    background-color: deepskyblue;
}
.login-wrap{
   background-color:white; 
   width: 400px;
   /* height: 500px; */
   display: flex;
   align-items: center; /* 垂直居中 */
   justify-content: center; /* 水平居中 */
   flex-direction: column;
}
.login-warp-title{
    display: block;
    color: black;
    font-size: 60px;
    line-height: 100px;
}
.login .ant-form{
    /* background-color: bisque; */
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
  /* background-color:blue; */
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
