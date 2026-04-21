<template>
    <div class="main">
        <div class="main-top">
            <div class="main-top-left">
                <div class="main-left-item">
                    <img class="main-left-dynamic" :src="getTopLog[0]" />
                    <div class="main-left-dynamic-title">
                    </div>
                </div>
                <div  class="main-left-item">
                    <img class="main-left-hot" :src="getTopLog[1]" />
                    <div  class="main-left-hot-title">
                    </div>
                </div>
            </div>
            <div class="main-top-right">
                <div class="main-top-right-item" v-for="t in titleList">
                     <a-tag :onclick="()=> {}" class="main-top-right-item-title">{{t.room_name}}</a-tag>
                </div>

                 
            </div>
        </div>
        <div class="main-second">
             <div class="main-second-left">
                 <a-carousel :after-change="onChange" autoplay arrows >
                     <!--  -->
                    <a-image :width="600" v-for="t in carouselList" :src="t.src" />
                    <!-- <a-image :width="600" src="http://localhost:8089/img/1.jpg" />
                    <a-image :width="600" src="http://localhost:8089/img/2.jpg" />
                    <a-image :width="600" src="http://localhost:8089/img/3.jpg" />
                    <a-image :width="600" src="http://localhost:8089/img/4.jpg" /> -->
                </a-carousel>
            </div>
            <div class="main-second-right">
                <div class="main-second-right-item" v-for="(item1, index) in hotelRoomListTop6">
                    <a-image :onclick="imgClick(item1)"  class="main-second-right-item-img" :width="200" :src="item1.src"/>
                    <div class="main-item">
                        <a-tag class="main-second-right-item-title">{{ item1.room_name }}</a-tag>
                        <a-tag class="main-second-right-item-title">{{ item1.date }}</a-tag>
                    </div>
                </div> 
            </div>
        </div>
        <div class="main-three">
            <div class="main-three-item" v-for="(item, index) in hotelRoomList">
                <a-image :onclick="imgClick(item)" class="main-three-right-item-img" :width="250" :src="item.src" />
                <div class="main-item">
                    <a-tag class="main-second-right-item-title">{{ item.room_name }}</a-tag>
                    <a-tag class="main-second-right-item-title">{{ item.date }}</a-tag>
                </div>
            </div>
            <a-pagination   :total="50" show-less-items />
        </div>
    </div>
</template>
<style scoped>
    .main{ 
        width: 100%;
        /* min-height: 10000px; */
        /* background-color: aquamarine; */
        line-height: 1.5;
    }
    .main-top{
        height: 100px;
        display: flex;
        /* background-color:aqua; */
    }

    .main-top-left{
        width: 200px;
        /* background-color: blueviolet; */
    }
    .main-top-right{
        width: calc(100% - 200px); ;
        /* background-color:chocolate; */
        display: flex;
        flex-wrap: wrap;
    }
    .main-left-item{
        display: inline-block;
        width: 80px;
        margin: 10px;
        /* background-color: cadetblue; */
    }
    .main-top-right-item{
        display: block;
        width: 90px;
        height: 60px;
        vertical-align: bottom;
    }
    .main-top-right-item-title{
        display: block;
        height: 40px;
        width: 70px;
        vertical-align: middle;
        line-height: 40px;
    }
    .main-second{
        height: 630px;
        display: flex;
        /* background-color: aqua; */
    }

    .main-second-left{
        width: 610px;
        height: 660px;
        display: block;
    }
    .main-second-right{
        display: flex;
        flex-wrap: wrap;
    }
    .main-second-right-item{
        display: flex;
        flex:1;
    
        height: 260px;
        flex-direction: column; 
        margin: 5px 40px;
        /* background-color:blue; */
    }
    .main-three{
        display: flex;
        flex-wrap: wrap;
    }
    .main-three-item{
        margin: 5px 20px;
        flex:1;
        display: flex;
        width: 290px;
        height: 330px;
        flex-direction: column; 
        /* background-color:cornflowerblue; */
    }
    .main-second-right-item-img{
        height: 70px;
        width: 80px;
    }
    .main-three-item-img{
        height: 80px;
        width: 100px;
    }
    .main-item {
        display: flex;
        height: 45px;
        justify-content: space-between;
    }
</style>
<script lang="ts" setup name="main">
import { computed, reactive, ref, toRefs } from 'vue';
import { getHotelRoomApi, getHotelRoomList, getHotelRoomListTop6,getCarouselList,getTitleList, getTopLogList } from '@/api/index';
import type { HotelRoomItem, HotelRoomRequest } from '@/api/model.index';
import { useRouter } from 'vue-router';
const onChange = (current: number) => {
    //console.log(current);
};
let router = useRouter();
const imgClick = (item: any) => {
    // router.push({
    //     path: '/ImgDetail',
    //     // name: 'home',
    //     query: {
    //         detailid: 'hello'
    //     }
    // });
};
const getHotelRoom = async () => {
    try {
        let param:HotelRoomRequest=  { hotel_id:"", sort: "",page:1, pageSize:90 };
        const res = await getHotelRoomApi(param);
        return Promise.resolve(res);
    // total.value = res?.total
    } catch (error) {
        console.log(error)
        //ElMessage.error('数据加载失败!')
    }
} 

let hotelRoomList = ref<HotelRoomItem[]>([]);
let hotelRoomListTop6 = ref<HotelRoomItem[]>([]);
let carouselList = ref<HotelRoomItem[]>([]);
let titleList = ref<HotelRoomItem[]>([]);
let getTopLog = ref(["",""]);
const getHotelRoomListFunction = async () => { 
   await getHotelRoomList({ hotel_id:"", sort: "",page:1, pageSize:90 }).then(data => {
        hotelRoomList.value = data.data as HotelRoomItem[];
    });
    await getHotelRoomListTop6({ hotel_id:"", sort: "",page:1, pageSize:90 }).then(data => {
        hotelRoomListTop6.value = data.data as HotelRoomItem[];
    });
    await getCarouselList({ hotel_id:"", sort: "",page:1, pageSize:90 }).then(data => {
        carouselList.value = data.data as HotelRoomItem[];
    });
    await getTitleList({ hotel_id:"", sort: "",page:1, pageSize:90 }).then(data => {
        //console.log(data,"getHotelRoomListTop6");
        titleList.value = data.data as HotelRoomItem[];
    });
    await getHotelRoom().then(data => {
       // console.log(data,"getHotelRoom")
    });
    await getTopLogList({ hotel_id:"", sort: "",page:1, pageSize:90 }).then(data => {
        getTopLog.value = data.data;
    });
}
 getHotelRoomListFunction();

</script>