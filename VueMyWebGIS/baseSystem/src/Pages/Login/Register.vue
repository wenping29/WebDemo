<template>
    <div class="register">
        <div class="register-wrap">
            <div class="register-warp-title">在线系统</div>
             <a-form
                :model="formState"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="onFinish"
            >
                <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
                <a-input v-model:value="formState.user.name" />
                </a-form-item>
                <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
                <a-input v-model:value="formState.user.email" />
                </a-form-item>
                <a-form-item :name="['user', 'age']" label="Age" :rules="[{ type: 'number', min: 0, max: 99 }]">
                <a-input-number v-model:value="formState.user.age" />
                </a-form-item>
                <a-form-item :name="['user', 'website']" label="Website">
                <a-input v-model:value="formState.user.website" />
                </a-form-item>
                <a-form-item :name="['user', 'introduction']" label="Introduction">
                <a-textarea v-model:value="formState.user.introduction" />
                </a-form-item>
                <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>
        </div>

    </div>
</template>
<script lang="ts" setup>

import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const formState = reactive({
  user: {
    name: '哈哈哈',
    age: 26,
    email: 'hhhha@163.com',
    website: 'http://localhost:3000/',
    introduction: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
  },
});
 let router = useRouter();

const onFinish = (values: any) => {
  console.log('Success:', values);

  router.push({
        path: '/login',
        // name: 'home',
        query: {
            msg: 'hello'
        }
    });

};
</script>
<style scoped>
.register{
    display:inline-flex;
    width: 100%;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 1000px; /* 容器高度 */
    background-color: aquamarine;
}
.register-wrap{
   background-color:aqua; 
   width: 700px;
   height: 500px;
   display: flex;
   align-items: center; /* 垂直居中 */
   justify-content: center; /* 水平居中 */
   flex-direction: column;
}
.register-warp-title{
    display: block;
    color: black;
}
.register .ant-form{
    background-color: bisque;
}
#components-form-demo-normal-register .register-form {
  max-width: 600px;
  width: 600px;
  background-color:blue;
}
#components-form-demo-normal-register .register-form-forgot {
  float: right;
}
#components-form-demo-normal-register .register-form-button {
  width: 100%;
}
</style>
