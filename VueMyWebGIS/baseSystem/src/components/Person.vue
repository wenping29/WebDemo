<template>
<div class="Person">
    <h2><label>姓名：{{name}}</label></h2>
    <h2><label>年龄：{{ age }}</label></h2>
    <h2><label>联系方式：{{ tell }}</label></h2>
      <h2><label>汽车品牌：{{ car.brand }}</label></h2>
    <h2><label>汽车价格：{{ car.price }}万$</label></h2>
    <h2><label>全名：{{ fullName }}</label></h2>
    <h2>

        <button @click="changeName">改名</button>
        <button @click="changeAge">改年龄</button>
        <button @click="changeTell">联系方式</button>
        <button @click="changeRe">恢复</button>
        <button @click="AddCarPrice">加价</button>
        <button @click="changeCarBrand">品牌</button>
    </h2>
 
</div>
</template>
<style scoped>
.Person{
    /* background-color: aquamarine; */
    width: 100%;
    border-radius: 1ch;
    border-color: aquamarine;
    button {
        margin: 0 10px;
    }
}
</style>
<script lang="ts" name="dddddddddasdad">
import { computed, reactive, ref, toRefs ,defineProps} from 'vue';

import { type Persion } from "@/types"
export  default {
    name: "Person",
     setup() {
        let car = reactive({brand:"法拉利",price:500})
        let name = ref("张三");
        let age = ref(121);
        let tell = ref("17777777777");// toRefs 批量结构可响应式数据
        // toref 单独结构响应式数据
        let  fullName = computed(()=> {
            return name.value + ":9123233"
        });
        let games = [
            {id: "1",name:"CF"},
            {id: "2",name:"DNF"},
            {id: "3",name:"DOTA"},
            {id: "4",name:"LOL"}
        ];
        let { brand, price } = toRefs(car);

        let p1:Persion =  { id:"3424", name:"zhangsanlisi", age:19,tell:"123123123123", car: {
            brand:"2q3132", price:123
        }};
        let plist:Array<Persion> = [p1];

        function changeName() {
            console.log("changeName")
            name.value = name.value + "1"
        }
         function changeAge() {
            age.value = age.value + 1
        }
         function changeTell() {
            alert(tell.value)
        }
         function changeRe() {
            name.value = "张三"
            age.value =121
            tell.value = "17777777777"
        }
        function AddCarPrice() {
            car.price = car.price +12
            Object.assign(car, {brand:"迈凯伦",price:1});
            // assign 是浅拷贝
        }

         function changeCarBrand() {
            brand.value = "本田"
        }

        return {
            games,
            car,
            name,
            age,
            tell,
            changeName,
            changeAge,
            changeTell,
            changeRe,
            AddCarPrice,
            changeCarBrand,
            fullName
        };
    }
}


</script>