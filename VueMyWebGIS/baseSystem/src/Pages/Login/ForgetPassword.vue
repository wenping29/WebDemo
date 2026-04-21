<template>
    <div class="forgetpwd">
        <div class="forgetpwd-wrap">
            <div class="forgetpwd-warp-title">在线系统</div>
            <a-form
                ref="formRef"
                name="custom-validation"
                :model="formState"
                :rules="rules"
                v-bind="layout"
                @finish="handleFinish"
                @validate="handleValidate"
                @finishFailed="handleFinishFailed"
            >
                <a-form-item has-feedback label="Password" name="pass">
                <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="Confirm" name="checkPass">
                <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="Age" name="age">
                <a-input-number v-model:value="formState.age" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
                <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
                </a-form-item>
            </a-form>
        </div>

    </div>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import type { FormInstance } from 'ant-design-vue';

  interface FormState {
    pass: string;
    checkPass: string;
    age: number | undefined;
  }
  const formRef = ref<FormInstance>();
  const formState = reactive<FormState>({
    pass: '1234',
    checkPass: '1234',
    age: 123,
  });
  const checkAge = async (_rule: Rule, value: number) => {
    if (!value) {
      return Promise.reject('Please input the age');
    }
    if (!Number.isInteger(value)) {
      return Promise.reject('Please input digits');
    } else {
      if (value < 18) {
        return Promise.reject('Age must be greater than 18');
      } else {
        return Promise.resolve();
      }
    }
  };
  const validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('Please input the password');
    } else {
      if (formState.checkPass !== '') {
        // formRef.value
        // formRef.value.validateFields('checkPass');
      }
      return Promise.resolve();
    }
  };
  const validatePass2 = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('Please input the password again');
    } else if (value !== formState.pass) {
      return Promise.reject("Two inputs don't match!");
    } else {
      return Promise.resolve();
    }
  };

  const rules: Record<string, Rule[]> = {
    pass: [{ required: true, validator: validatePass, trigger: 'change' }],
    checkPass: [{ validator: validatePass2, trigger: 'change' }],
    age: [{ validator: checkAge, trigger: 'change' }],
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  let router = useRouter();
  const handleFinish = (values: FormState) => {
    console.log(values, formState);
     router.push({
            path: '/login',
            // name: 'home',
            query: {
                msg: 'hello'
            }
        });
  };
  
  const handleFinishFailed = () => {
    // console.log(errors);
  };
  const resetForm = () => {
    // formRef.value.resetFields();
  };
  const handleValidate = () => {
    // console.log(args);
  };
</script>
<style scoped>
.forgetpwd{
    display:inline-flex;
    width: 100%;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 1000px; /* 容器高度 */
    background-color: aquamarine;
}
.forgetpwd-wrap{
   background-color:aqua; 
   width: 400px;
   height: 500px;
   display: flex;
   align-items: center; /* 垂直居中 */
   justify-content: center; /* 水平居中 */
   flex-direction: column;
}
.forgetpwd-warp-title{
    display: block;
    color: black;
}
.forgetpwd .ant-form{
    background-color: bisque;
}
#components-form-demo-normal-forgetpwd .forgetpwd-form {
  max-width: 300px;
  background-color:blue;
}
#components-form-demo-normal-forgetpwd .forgetpwd-form-forgot {
  float: right;
}
#components-form-demo-normal-forgetpwd .forgetpwd-form-button {
  width: 100%;
}
</style>
