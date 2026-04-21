<template>
<div class="Children" v-for="item in abc">
    <!-- <h2>{{ item }}</h2> -->
    <h2><label>姓名：{{item.name}}</label></h2>
    <h2><label>年龄：{{ item.age }}</label></h2>
    <h2><label>联系方式：{{ item.tell }}</label></h2>
    <h2><label>汽车品牌：{{ item.car.brand }}</label></h2>
    <h2><label>汽车价格：{{ item.car.price }}</label>{{ fullName }}</h2>
    <!-- <h2>{{ abc }}</h2> -->
    <h2>
        <button @click="changeName(item)">改儿童名</button>
        <button @click="changeAge(item)">改年龄</button>
        <button @click="changeTell(item)">联系方式</button>
        <button @click="changeRe(item)">恢复</button> 
        <button @click="AddCarPrice(item)">加价</button>
    </h2>
</div>
</template>
<style scoped>
.Children{
    /* background-color: aquamarine; */
    margin: 5px 10px;
    width: 100%;
    border-radius: 1ch;
    border-color: aqua;
    button {
        margin: 5px 10px;
    }
}
</style>
<script lang="ts" setup name="children1234">
    import type { Persion } from '@/types';
import { computed, reactive, ref, watch,defineProps, withDefaults } from 'vue';
    let car = reactive({brand:"奔驰",price:123})
    let name = ref("李四");
    let age = ref(4);
    //接受
    // let abcdata = defineProps(["abc"]);

    // 限制类型，只接受array
    // let abcdata = defineProps<{abc?:Array<Persion>}>();

    // 接受，限制类型，设置默认值,限制必要性
    let abcdata = withDefaults( defineProps<{abc?:Array<Persion>}>(), {
        abc : () => [ {age:18,id:"132123",name:"王二麻-李四", tell:"adsadasda",car:{brand:"奔驰",price:123}}]
    }) 
    console.log(abcdata)
    let tell = ref("13077777777");
    let games = [
        {id: "1",name:"CF"},
        {id: "2",name:"DNF"},
        {id: "3",name:"DOTA"},
        {id: "4",name:"LOL"}
    ];
    function changeName(item:Persion) {
        console.log("changeName")
        item.name = name.value + "1"
    }
    function changeAge(item:Persion) {
        item.age = age.value + 1
    }
    function changeTell(item:Persion) {
        alert(item.tell)
    }
    function changeRe(item:Persion) {
        item.name = "李四"
        item.age =4
        item.tell = "13077777777"
    }
    function AddCarPrice(item:Persion) {
        item.car.price ++
    }

    let fullName = computed(()=> {
        return name.value + ":9123233"
    });

      let fullName2 = computed({
        get() {return "123"},
        set() {
            console.log(fullName2.value)
        }
    });

    //结束监视
    const  stiopwatch = watch(name,()=>{
        console.log("watch:" + name.value)
        if(name.value = "kobe") {
            stiopwatch()
        , { deep:true, immediate:true}}
    })
    //监视基础类型，ref类型，reactive类型，数组包含上面的类型
        
</script>