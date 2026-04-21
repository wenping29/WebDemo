import Mock from "mockjs";
import {Api} from '../api/path';
import { message } from "ant-design-vue";
import { data } from "autoprefixer";
import type { TrackPoint, Vehicle } from "@/api/model.index";

const base_URL = "http://localhost:3033/";
  
Mock.mock(base_URL + Api.GET_LOGIN, 'post', (params) =>{
    let data;
    if(true){
        data = Mock.mock({
            "token": "@guid",  // 随机生成一个18位身份证，模拟生成token值
            "content":"@web",
            "id":"@id",
            "name":"@cname",
            "email":"@email",
            "birthDate":"@date",
            "tell": /[1][3-8][0-9]\d{5,11}/,
            "address":"@city", 
            "lastLogin":"@date",
            "lastLoginIP":"@id",
            "head_img":"face-4.jpg"
        })
        return {
            status:200,
            message:"请求登录成功！",
            success: true,
            data:data
        }
    }
    
});
//GET_REGISTER
Mock.mock(base_URL + Api.GET_REGISTER, 'post', (params) =>{
    let data;
    if(true){
        data = Mock.mock({
            "token": "@guid",  // 随机生成一个18位身份证，模拟生成token值
            "content":"@web",
            "id":"@id",
            "name":"@cname",
            "email":"@email",
            "birthDate":"@date",
            "tell": /[1][3-8][0-9]\d{5,11}/,
            "address":"@city", 
            "lastLogin":"@date",
            "lastLoginIP":"@id",
            "head_img":"face-4.jpg"
        })
        return {
            status:200,
            message:"请求登录成功！",
            success: true,
            data:data
        }
    }
    
});
//GetForgetPasswordApi
Mock.mock(base_URL + Api.GetForgetPasswordApi, 'post', (params) =>{
    let data;
    if(true){
        data = Mock.mock({
            "token": "@guid",  // 随机生成一个18位身份证，模拟生成token值
            "content":"@web",
            "id":"@id",
            "name":"@cname",
            "email":"@email",
            "birthDate":"@date",
            "tell": /[1][3-8][0-9]\d{5,11}/,
            "address":"@city", 
            "lastLogin":"@date",
            "lastLoginIP":"@id",
            "head_img":"face-4.jpg"
        })
        return {
            status:200,
            message:"请求登录成功！",
            success: true,
            data:data
        }
    }
    
});

Mock.mock(base_URL + Api.getCarouselList, 'get', (params) =>{
    return {
        status:200,
        message:"请求登录成功！",
        data:createHotelldata(4),
        success: true
    }
})
Mock.mock(base_URL + Api.getTitleList, 'get', (params) =>{
    return {
        status:200,
        message:"请求登录成功！",
        data:createHotelldata(34),
        success: true
    }
})
const createHotelldata = (count: number) => {
    let data = [];
    for(let i=0;i<count;i++)
    {
        data.push(
            Mock.mock({
                "value": "@integer(1, 100)",
                "id":"@id",
                "src": "./img/4.jpg",
                "room_name":"@cname",
                "date":"@date",
            })
        );
    }
    // console.log(data, "dataaaaa")
    return data;
}
Mock.mock(base_URL + Api.getHotelRoomListTop6, 'get', (params) =>{
    return {
        status:200,
        message:"请求登录成功！",
        data:createHotelldata(6),
        success: true
    }
});
// getTopLogList
Mock.mock(base_URL + Api.getTopLogList, 'get', (params) =>{
    return {
        status:200,
        message:"请求登录成功！",
        data:["./img/4.jpg","./img/1.jpg"],
        success: true
    }
});
Mock.mock(base_URL + Api.getHotelRoomList, 'get', (params) =>{
    return {
        status:200,
        message:"请求登录成功！",
        data:createHotelldata(250),
        success: true
    }
});
// 登录接口
Mock.mock(base_URL + Api.GET_HOTEL_ROOM, 'get', (params) =>{
    let data=[];
    // // 用户名和密码正确才会返回token
     //if(loginData.hotel_id=='admin' && loginData.sort=='123456'){
     if(true){
        data = Mock.mock({
            "token": "@id",  // 随机生成一个18位身份证，模拟生成token值
        })
     }
    return {
        status:200,
        message:"请求登录成功！",
        data:data,
        success: true
    }
});
Mock.mock(base_URL + Api.GET_USER_COUNT, 'get', () =>{
    return {
        status:200,
        message:"请求成功！",
        data:Mock.mock({
            "value": "@integer(1, 1003333)",
        }),
        success: true
    }
});
Mock.mock(base_URL + Api.GET_USER_ActiveCOUNT, 'get', () =>{
    return {
        status:200,
        message:"请求成功！",
        data:Mock.mock({
            "value": "@integer(1, 100)",
        }),
        success: true
    }
});
Mock.mock(base_URL + Api.GET_SaleCount, 'get', () =>{
    return {
        status:200,
        message:"请求成功！",
        data:Mock.mock({
            "value": "@integer(1, 100)",
        }),
        success: true
    }
});
Mock.mock(base_URL + Api.GET_AllIncome, 'get', () =>{
    return {
        status:200,
        message:"请求成功！",
        data:Mock.mock({
            "value": "@integer(1, 100)",
        }),
        success: true
    }
});
Mock.mock(base_URL + Api.GET_ReportData, 'get', () =>{
    let data =  [
  {key: '1',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '2',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '3',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '4',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '5',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '6',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '7',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '8',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '9',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '10',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '11',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '12',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '13',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '14',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '15',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '16',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '17',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '23',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '31',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '32',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '33',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '41',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '42',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '43',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '51',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '52',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '53',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '61',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '62',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '63',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '71',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '72',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '73',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '81',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '82',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '83',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
  {key: '91',firstName: 'John',lastName: 'Brown',age: 32,address: 'New York No. 1 Lake Park',tags: ['nice', 'developer'],},
  {key: '92',firstName: 'Jim',lastName: 'Green',age: 42,address: 'London No. 1 Lake Park',tags: ['loser'],},
  {key: '93',firstName: 'Joe',lastName: 'Black',age: 32,address: 'Sidney No. 1 Lake Park',tags: ['cool', 'teacher'],},
    ];
    return {
        status:200,
        message:"请求成功！",
        data:data,
        success: true
    }
});
Mock.mock(base_URL + Api.GET_ReportList, 'get', () =>{
    const repoartDataList = [
        {
            name:"报表1",
            id:"report1",
            subRport:[
            {
                name:"报表11",
                id:"report11",
            },
            {
                name:"报表12",
                id:"report12",
            },
            {
                name:"报表13",
                id:"report13",
            },
            ]
        },{
            name:"报表2",
            id:"report2",
            subRport:[
            {
                name:"报表11",
                id:"report21",
            },
            {
                name:"报表12",
                id:"report22",
            },
            {
                name:"报表13",
                id:"report23",
            },
            ]
        },
        {
            name:"报表3",
            id:"report3",
            subRport:[
            {
                name:"报表11",
                id:"report31",
            },
            {
                name:"报表12",
                id:"report32",
            },
            {
                name:"报表13",
                id:"report33",
            },
            ]
        },
        {
            name:"报表4",
            id:"report4",
            subRport:[
            {
                name:"报表11",
                id:"report41",
            },
            {
                name:"报表12",
                id:"report42",
            },
            {
                name:"报表13",
                id:"report43",
            },
            ]
        },{
            name:"报表5",
            id:"report5",
            subRport:[
            {
                name:"报表11",
                id:"report51",
            },
            {
                name:"报表12",
                id:"report52",
            },
            {
                name:"报表13",
                id:"report53",
            },
            ]
        },{
            name:"报表6",
            id:"report6",
            subRport:[
            {
                name:"报表11",
                id:"report61",
            },
            {
                name:"报表12",
                id:"report62",
            },
            {
                name:"报表13",
                id:"report63",
            },
            ]
        },
    ];
    return {
        status:200,
        message:"请求成功！",
        data:repoartDataList,
        success: true
    }
});
Mock.mock(base_URL + Api.GET_ReportViewData, 'get',()=>{
    const data = [];
    const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];
    let count =190;
    for (let i = 1; i <= count; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        const departments = ['dept1', 'dept2','dept3','dept4','dept5'];
        const deptIndex = Math.floor(Math.random() * departments.length);
        const amount = Math.floor(Math.random() * 10000) + 1000;
        const orders = Math.floor(Math.random() * 100) + 10;
        const users = Math.floor(Math.random() * 500) + 50;
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        data.push({
            id: `RPT${i.toString().padStart(6, '0')}`,
            date: date.toISOString().split('T')[0],
            departmentId: departments[deptIndex],
            amount,
            orders,
            users,
            status
        });
    }
    return {
        status:200,
        message:"请求成功！",
        data:data,
        success: true
    }
})
Mock.mock(base_URL + Api.getReportGMV, 'get',()=>{
    return {
        status:200,
        message:"请求成功！",
        data:12312313123123,
        success: true
    }
})
Mock.mock(base_URL + Api.getReportGMV, 'get',()=>{
    return {
        status:200,
        message:"请求成功！",
        data:12312313123123,
        success: true
    }
})
Mock.mock(base_URL + Api.getReportOrderCount, 'get',()=>{
    return {
        status:200,
        message:"请求成功！",
        data:3433323,
        success: true
    }
})
Mock.mock(base_URL + Api.getReportActiviesUserCount, 'get',()=>{
    return {
        status:200,
        message:"请求成功！",
        data:67788,
        success: true
    }
})
Mock.mock(base_URL + Api.getReportChangeRace, 'get',()=>{
    return {
        status:200,
        message:"请求成功！",
        data:0.12,
        success: true
    }
})
// 生成模拟数据
const generateMockData = (params: {
            page: number;
            pageSize: number;
            queryForm: any;
            sortField?: string;
            sortOrder?: 'asc' | 'desc';
            }): {
                    list: any;
                    total: number;
                    stats: {
                        totalPaidAmount: number;
                        paidCount: number;
                        totalUnpaidAmount: number;
                        unpaidCount: number;
                        paymentTypeStats: any;
                    };
                } =>
    {
        // 生成总数据
        const totalCount = 247; // 总记录数
        const allData: any = [];
        
        const paymentTypes: ('water' | 'electricity' | 'gas' | 'property' | 'parking' | 'other')[] = [
            'water', 'electricity', 'gas', 'property', 'parking', 'other'
        ];
        
        const paymentMethods: ('alipay' | 'wechat' | 'unionpay' | 'cash' | 'transfer')[] = [
            'alipay', 'wechat', 'unionpay', 'cash', 'transfer'
        ];
        
        const statuses: ('unpaid' | 'paid' | 'refunded' | 'failed')[] = [
            'unpaid', 'paid', 'refunded', 'failed'
        ];
        
        // 创建模拟数据
        for (let i = 0; i < totalCount; i++) {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // 90天内的随机日期
            
            // 随机状态（已缴费概率较高）
            let status: 'unpaid' | 'paid' | 'refunded' | 'failed';
            const statusRand = Math.random();
            if (statusRand < 0.6) {
            status = 'paid';
            } else if (statusRand < 0.8) {
            status = 'unpaid';
            } else if (statusRand < 0.95) {
            status = 'refunded';
            } else {
            status = 'failed';
            }
            
            // 随机金额（根据类型有不同范围）
            let amount = 0;
            const type = paymentTypes[Math.floor(Math.random() * paymentTypes.length)];
            switch (type) {
            case 'water':
                amount = Math.random() * 200 + 50; // 50-250元
                break;
            case 'electricity':
                amount = Math.random() * 500 + 100; // 100-600元
                break;
            case 'gas':
                amount = Math.random() * 300 + 80; // 80-380元
                break;
            case 'property':
                amount = Math.random() * 1500 + 500; // 500-2000元
                break;
            case 'parking':
                amount = Math.random() * 300 + 50; // 50-350元
                break;
            case 'other':
                amount = Math.random() * 1000 + 100; // 100-1100元
                break;
            }
            
            const item: any = {
            recordNo: `P${2023}${(10000 + i).toString().padStart(5, '0')}`,
            payerName: `用户${Math.floor(Math.random() * 1000)}`,
            payerPhone: `13${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            paymentType: type,
            amount: parseFloat(amount.toFixed(2)),
            paymentMethod: status === 'paid' || status === 'refunded' || status === 'failed' 
                ? paymentMethods[Math.floor(Math.random() * paymentMethods.length)] 
                : '',
            paymentStatus: status,
            paymentTime: date.toISOString()
            };
            
            allData.push(item);
        }
        
        // 应用查询条件过滤
        let filteredData = [...allData];
        
        // 缴费单号过滤
        if (params.queryForm.recordNo) {
            filteredData = filteredData.filter(item => item.recordNo.includes(params.queryForm.recordNo));
        }
        
        // 缴费人过滤
        if (params.queryForm.payerName) {
            filteredData = filteredData.filter(item => 
            item.payerName.toLowerCase().includes(params.queryForm.payerName.toLowerCase())
            );
        }
        
        // 缴费状态过滤
        if (params.queryForm.paymentStatus) {
            filteredData = filteredData.filter(item => item.paymentStatus === params.queryForm.paymentStatus);
        }
        
        // 缴费类型过滤
        if (params.queryForm.paymentType) {
            filteredData = filteredData.filter(item => item.paymentType === params.queryForm.paymentType);
        }
        
        // 缴费时间过滤
        if (params.queryForm.paymentTimeStart) {
            const start = new Date(params.queryForm.paymentTimeStart).getTime();
            filteredData = filteredData.filter(item => 
            item.paymentStatus !== 'unpaid' && new Date(item.paymentTime).getTime() >= start
            );
        }
        
        if (params.queryForm.paymentTimeEnd) {
            const end = new Date(params.queryForm.paymentTimeEnd).getTime() + 86400000; // 包含当天结束
            filteredData = filteredData.filter(item => 
            item.paymentStatus !== 'unpaid' && new Date(item.paymentTime).getTime() < end
            );
        }
        
        // 金额范围过滤
        if (params.queryForm.minAmount !== '') {
            filteredData = filteredData.filter(item => item.amount >= Number(params.queryForm.minAmount)!);
        }
        
        if (params.queryForm.maxAmount !== '') {
            filteredData = filteredData.filter(item => item.amount <= Number(params.queryForm.maxAmount)!);
        }
        
        // 支付方式过滤
        if (params.queryForm.paymentMethod) {
            filteredData = filteredData.filter(item => item.paymentMethod === params.queryForm.paymentMethod);
        }
        
        // 排序
        if (params.sortField) {
            filteredData.sort((a, b) => {
            let compareResult = 0;
            
            switch (params.sortField) {
                case 'recordNo':
                compareResult = a.recordNo.localeCompare(b.recordNo);
                break;
                case 'amount':
                compareResult = a.amount - b.amount;
                break;
                case 'paymentTime':
                compareResult = new Date(a.paymentTime).getTime() - new Date(b.paymentTime).getTime();
                break;
                default:
                compareResult = 0;
            }
            
            return params.sortOrder === 'desc' ? -compareResult : compareResult;
            });
        }
        
        // 分页
        const startIndex = (params.page - 1) * params.pageSize;
        const paginatedData = filteredData.slice(startIndex, startIndex + params.pageSize);
        
        // 计算统计数据
        const totalPaidAmount = filteredData
            .filter(item => item.paymentStatus === 'paid')
            .reduce((sum, item) => sum + item.amount, 0);
            
        const paidCount = filteredData.filter(item => item.paymentStatus === 'paid').length;
        
        const totalUnpaidAmount = filteredData
            .filter(item => item.paymentStatus === 'unpaid')
            .reduce((sum, item) => sum + item.amount, 0);
            
        const unpaidCount = filteredData.filter(item => item.paymentStatus === 'unpaid').length;
        
        // 计算缴费类型统计
        const paymentTypeStats: any = [];
        paymentTypes.forEach(type => {
            const typeItems = filteredData.filter(item => item.paymentType === type);
            if (typeItems.length > 0) {
            paymentTypeStats.push({
                type,
                count: typeItems.length,
                amount: typeItems.reduce((sum, item) => sum + item.amount, 0)
            });
            }
        });
        
        // 按金额排序
        paymentTypeStats.sort((a:any, b:any) => b.amount - a.amount);
    
        return {
            list: paginatedData,
            total: filteredData.length,
            stats: {
                totalPaidAmount,
                paidCount,
                totalUnpaidAmount,
                unpaidCount,
                paymentTypeStats
            }
        };
};
Mock.mock(base_URL + Api.getPayrecordData, 'get',(options)=>{
    let testdata = generateMockData({
        page: 1,
        pageSize: 20,
        sortField: "",
        sortOrder:  "asc",
        queryForm:{
            recordNo: '',
            payerName: '',
            paymentStatus: '',
            paymentType: '',
            paymentTimeStart: '',
            paymentTimeEnd: '',
            minAmount: '',
            maxAmount: '',
            paymentMethod: ''
        }
    });
    return {
        status:200,
        message:"请求成功！",
        data:testdata,
        success: true
    }
})
// 生成模拟数据
const generateMockDataDataQuery = (params: {
  page: number;
  pageSize: number;
  queryForm: any;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}): {
  list: any[];
  total: number;
} => {
  // 生成总数据
  const totalCount = 156; // 总记录数
  const allData: any[] = [];
  
  const categories: ('category1' | 'category2' | 'category3' | 'category4')[] = [
    'category1', 'category2', 'category3', 'category4'
  ];
  
  const statuses: ('active' | 'inactive' | 'pending' | 'deleted')[] = [
    'active', 'inactive', 'pending', 'deleted'
  ];
  
  // 创建模拟数据
  for (let i = 0; i < totalCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // 90天内的随机日期
    
    const item: any = {
      id: `D${10000 + i}`,
      name: `数据记录${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.random() * 10000,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createTime: date.toISOString(),
      creator: `用户${Math.floor(Math.random() * 100)}`,
      remark: Math.random() > 0.7 ? `这是第${i + 1}条数据的备注信息` : undefined
    };
    
    allData.push(item);
  }
  
  // 应用查询条件过滤
  let filteredData = [...allData];
  
  // ID过滤
  if (params.queryForm.id) {
    filteredData = filteredData.filter(item => item.id.includes(params.queryForm.id));
  }
  
  // 名称过滤
  if (params.queryForm.name) {
    filteredData = filteredData.filter(item => 
      item.name.toLowerCase().includes(params.queryForm.name.toLowerCase())
    );
  }
  
  // 状态过滤
  if (params.queryForm.status) {
    filteredData = filteredData.filter(item => item.status === params.queryForm.status);
  }
  
  // 分类过滤
  if (params.queryForm.category) {
    filteredData = filteredData.filter(item => item.category === params.queryForm.category);
  }
  
  // 创建时间过滤
  if (params.queryForm.createTimeStart) {
    const start = new Date(params.queryForm.createTimeStart).getTime();
    filteredData = filteredData.filter(item => new Date(item.createTime).getTime() >= start);
  }
  
  if (params.queryForm.createTimeEnd) {
    const end = new Date(params.queryForm.createTimeEnd).getTime() + 86400000; // 包含当天结束
    filteredData = filteredData.filter(item => new Date(item.createTime).getTime() < end);
  }
  
  // 创建人过滤
  if (params.queryForm.creator) {
    filteredData = filteredData.filter(item => 
      item.creator.toLowerCase().includes(params.queryForm.creator.toLowerCase())
    );
  }
  
  // 数值范围过滤
  if (params.queryForm.minValue !== '') {
    filteredData = filteredData.filter(item => item.value > Number(params.queryForm.minValue));
  }
  
  if (params.queryForm.maxValue !== '') {
    filteredData = filteredData.filter(item => item.value < Number(params.queryForm.maxValue));
  }
  
  // 关键词过滤
  if (params.queryForm.keyword) {
    const keyword = params.queryForm.keyword.toLowerCase();
    filteredData = filteredData.filter(item => 
      item.name.toLowerCase().includes(keyword) ||
      item.id.toLowerCase().includes(keyword) ||
      item.creator.toLowerCase().includes(keyword) ||
      (item.remark && item.remark.toLowerCase().includes(keyword))
    );
  }
  
  // 排序
  if (params.sortField) {
    filteredData.sort((a, b) => {
      let compareResult = 0;
      
      switch (params.sortField) {
        case 'id':
          compareResult = a.id.localeCompare(b.id);
          break;
        case 'name':
          compareResult = a.name.localeCompare(b.name);
          break;
        case 'value':
          compareResult = a.value - b.value;
          break;
        case 'createTime':
          compareResult = new Date(a.createTime).getTime() - new Date(b.createTime).getTime();
          break;
        default:
          compareResult = 0;
      }
      
      return params.sortOrder === 'desc' ? -compareResult : compareResult;
    });
  }
  
  // 分页
  const startIndex = (params.page - 1) * params.pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + params.pageSize);
  
  return {
    list: paginatedData,
    total: filteredData.length
  };
};
Mock.mock(base_URL + Api.getDataBaseQuery, 'get',(options)=>{
    console.log(options);
    let testdata = generateMockDataDataQuery({
        page: 1,
        pageSize: 20,
        sortField: "",
        sortOrder: "asc",
        queryForm: {
            id: '',
            name: '',
            status: '',
            category: '',
            createTimeStart: '',
            createTimeEnd: '',
            creator: '',
            minValue: '',
            maxValue: '',
            keyword: ''
        }
    });
    return {
        status:200,
        message:"请求成功！",
        data:testdata,
        success: true
    }
})
//getDynamicValue ,getMSGValue ,getCollectionList
Mock.mock(base_URL + Api.getDynamicValue, 'get',(options)=>{
    let count = Math.random()*1000;
    let data:any = [];
    for(var i=0; i<count;i++){
         data.push(
            Mock.mock({
                "value": "@integer(1, 100)",
                "id":"@id",
                "content": "",
                "msg":"@cname",
                "date":"@date",
            })
        );
    }

    return {
        status:200,
        message:"请求成功！",
        data:data,
        success: true
    }
})
Mock.mock(base_URL + Api.getMSGValue, 'get',(options)=>{
   let count = Math.random()*1000;
   let data:any = [];
    for(var i=0; i<count;i++){
         data.push(
            Mock.mock({
                "id":"@id",
                "content": "",
                "msg":"@cname",
                "date":"@date",
            })
        );
    }

    return {
        status:200,
        message:"请求成功！",
        data:data,
        success: true
    }
})
Mock.mock(base_URL + Api.getCollectionList, 'get',(options)=>{
    let count = Math.random()*5;
    let data:any = [];
    for(var i=0; i<count;i++){
         data.push(
            Mock.mock({
                "id":"@id",
                "value": "@ctitle(5)",
                "name":"@cname",
                "date":"@date",
                "src": "@image('100x80')",
                "url": "@url",
            })
        );
    }
    return {
        status:200,
        message:"请求成功！",
        data:data,
        success: true
    }
})
Mock.mock(base_URL + Api.GetHistoryList, 'get',(options)=>{
    let count = Math.random()*5;
    let data:any = [];
    for(var i=0; i<count;i++){
        //cparagraph,csentence
         data.push(
            Mock.mock({
               "id":"@id",
                "value": "@ctitle(5)",
                "name":"@cname",
                "date":"@date",
                "src": "@image('100x80')",
                "url": "@url",
            })
        );
    }
    return {
        status:200,
        message:"请求成功！",
        data:data,
        success: true
    }
})
Mock.mock(base_URL + Api.GetMessageList, 'get',(options)=>{
    let count = Math.random()*5;
    let data:any = [];
    for(var i=0; i<count;i++){
         data.push(
            Mock.mock({
                "id":"@id",
                "value":"@ctitle(5)",
                "name":"@cname",
                "date":"@date",
                "src": "@image('100x80')",
                "url": "@url",
            })
        );
    }
    return {
        status:200,
        message:"请求成功！",
        data:data,
        success: true
    }
})
Mock.mock(base_URL + Api.GetDynamicList, 'get',(options)=>{
    let count = Math.random()*5;
    let data:any = [];
    for(var i=0; i<count;i++){
         data.push(
            Mock.mock({
                "id":"@id",
                "value": "@ctitle(5)",
                "name":"@cname",
                "date":"@date",
                "src": "@image('100x80')",
                "url": "@url",
                "cparagraph":"@cparagraph",
                "csentence":"@csentence",

            })
        );
    }
    return {
        status:200,
        message:"请求成功！",
        data:data,
        success: true
    }
})
Mock.mock(base_URL + Api.getHeaderMenuList, "get",()=> {

    let menus = [
        {
            path: '/Home',name:"主页", key:"Home",
        },{
            path:"/Image",
            key:"Image",
            name:"图片",
            children:[
                {path:"/Image/VideoManager",name:"视频", key:"VideoManager",},
                {path:"/Image/ImageManager",name:"图片", key:"ImageManager",},
                {path: '/Image/ImgDetail',name:"图片详情", key:"ImgDetail",}
            ]
        },{
            path:"/Vehicle",
            name:"车辆", key:"Vehicle",
            children:[
                {path:"/Vehicle/VehicleManagement",name:"车辆管理", key:"VehicleManagement",},
                {path: "/Vehicle/VehicleTracking",name:"车辆轨迹", key:"VehicleTracking",},
                {path: '/Vehicle/VehicleDashboard',name:"车辆面板", key:"VehicleDashboard",},
                {path:"/Vehicle/TrajectoryQuery",name:"轨迹查询", key:"TrajectoryQuery",},
                {path:"/Vehicle/VehicleMonitoring",name:"车辆监控", key:"VehicleMonitoring",}
            ]
        },{
            path:"/PaymentRecords",name:"支付记录", key:"PaymentRecords",
        },{
            path:"/DatabaseQuery",name:"数据表", key:"DatabaseQuery",
        },{
            path: '/Dashbord',
            key:"Dashbord",
            name:"大屏",
            children:[
                {   path:"/Dashboard",name:"大屏2", key:"Dashboard"   },
                {   path: '/Dashboard',name:"大屏" , key:"Dashboard"    }
            ]
        },{
            path: '/Map',name:"地图", key:"Map",
        },{
            path: '/Report',
            name:"报表",
            key:"Report",
            children:[
                {   path:"/Report/ReportP",name:"大屏2", key:"ReportP"   },
                {   path: '/Report/ReportView',name:"大屏" , key:"ReportView"    }
            ]
             
        },{
            path: "/System",name:"系统", key:"System",
            display:true,
            children:[
                {path:"/System/SettingView",name:"设置", key:"SettingView",},
                {path:"/System/SystemLogPage",name:"系统日志", key:"SystemLogPage",},
                {path:"/System/RouteMenuConfig",name:"路由", key:"RouteMenuConfig",},
                {path:"/System/LoginLogQuery",name:"登陆日志", key:"LoginLogQuery",}
            ]
        },{
            path: '/About',name:"关于", key:"About",
        },{
            path: '/user',
            name:"user",
            key:"user",
            display:true,
            children: [
                {path: '/login/register',name:"注册", key:"register",},
                {path: '/login/ForgetPassword',name:"找回密码", key:"ForgetPassword",}
            ],
        },{
            path: '/login' ,name:"登陆", key:"login", display:true,
        },{
            path: '/login2' ,name:"登陆2", key:"login2",display:true
        },
    ]
    return {
        status: 200,
        message: "请求成功！",
        data:menus,
        success: true
    }
})
Mock.mock(base_URL + Api.getHeaderInfo, "get", ()=> {

    return {
        status:200,
        message:"请求成功！",
        data:Mock.mock({
                "id":"@id",
                "value": "@ctitle(5)",
                "name":"@cname",
                "date":"@date",
                "src": "@image('100x100')",
                "url": "@url",
                "email":"@email",
                "birthDate":"@date",
                "tell": "17812345678",
                "adress":"@adress",
                "head_img":"@image('100x100')",
            }),
        success: true
    }
})
//getVehicles
Mock.mock(base_URL + Api.getVehicles, "get", ()=> {

    return {
        status:200,
        message:"请求成功！",
        data:[
                {
                id: 'v1',
                licensePlate: '粤A12345',
                model: '东风天龙',
                driverName: '张三',
                status: 'running',
                totalMileage: 125680
                },
                {
                id: 'v2',
                licensePlate: '粤B67890',
                model: '解放J7',
                driverName: '李四',
                status: 'running',
                totalMileage: 98750
                },
                {
                id: 'v3',
                licensePlate: '粤C54321',
                model: '福田欧曼',
                driverName: '王五',
                status: 'stopped',
                totalMileage: 75230
                },
                {
                id: 'v4',
                licensePlate: '粤D98765',
                model: '陕汽德龙',
                driverName: '赵六',
                status: 'running',
                totalMileage: 112350
                }
            ],
        success: true
    }
})

//getVehiclesTable
Mock.mock(base_URL + Api.getVehiclesTable, "get", ()=> {

     // 生成模拟数据
    const mockVehicles: Vehicle[] = [];
    const types: Vehicle['type'][] = ['truck', 'van', 'bus', 'special'];
    const departments: Vehicle['department'][] = ['logistics', 'distribution', 'transport', 'maintenance'];
    const statuses: Vehicle['status'][] = ['running', 'stopped', 'maintenance', 'idle'];
    
    for (let i = 1; i <= 35; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // 随机生成购买日期（1-5年前）
      const purchaseDate = new Date();
      purchaseDate.setFullYear(purchaseDate.getFullYear() - Math.floor(Math.random() * 5) - 1);
      
      // 随机生成下次保养日期
      const maintenanceDueDate = new Date();
      maintenanceDueDate.setDate(maintenanceDueDate.getDate() + Math.floor(Math.random() * 30) - 5);
      const maintenanceDueDays = Math.ceil((maintenanceDueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      
      // 随机生成最后更新时间
      const lastUpdateTime = new Date();
      lastUpdateTime.setMinutes(lastUpdateTime.getMinutes() - Math.floor(Math.random() * 120));
      
      // 生成维修结束日期（仅维修中车辆）
      let maintenanceEndDate = '';
      if (status === 'maintenance') {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);
        maintenanceEndDate = endDate.toLocaleDateString();
      }
      
      mockVehicles.push({
        id: `v${i}`,
        licensePlate: `粤${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(10000 + Math.random() * 90000)}`,
        vIN: `LVBV3JBB${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        model: `${['东风', '解放', '福田', '陕汽', '重汽'][Math.floor(Math.random() * 5)]}${['天龙', 'J7', '欧曼', '德龙', '豪沃'][Math.floor(Math.random() * 5)]}`,
        type,
        department,
        purchaseDate: purchaseDate.toISOString().split('T')[0],
        driverName: `${['张', '李', '王', '赵', '刘'][Math.floor(Math.random() * 5)]}${['三', '四', '五', '六', '七'][Math.floor(Math.random() * 5)]}`,
        driverPhone: `13${Math.floor(100000000 + Math.random() * 900000000)}`,
        status,
        currentSpeed: status === 'running' ? Math.floor(60 + Math.random() * 60) : undefined,
        maintenanceEndDate: maintenanceEndDate || undefined,
        lastUpdateTime: lastUpdateTime.toLocaleString(),
        totalMileage: Math.floor(50000 + Math.random() * 200000),
        monthlyMileage: Math.floor(500 + Math.random() * 5000),
        maintenanceDueDate: maintenanceDueDate.toISOString().split('T')[0],
        maintenanceDueDays
      });
    }

    return {
        status:200,
        message:"请求成功！",
        data:mockVehicles
    }

})

//getVehiclesCardStatus
Mock.mock(base_URL + Api.getVehiclesCardStatus, "get", ()=> {

});
//getVehiclesTrackings
Mock.mock(base_URL + Api.getVehiclesTrackings, "post", (param)=> {
    console.log(param, "param");
    const {trackAccuracy, timeRange,start, end, timeDiff} = JSON.parse(param.body);
       // 生成模拟轨迹数据
    const pointsCount = trackAccuracy === 'high' ? 200 : trackAccuracy === 'medium' ? 50 : 10;
    const newTrackPoints: TrackPoint[] = [];
    const startDate = new Date(start);
    
    let lastX = Math.random() * 30 + 20; // 20-50%
    let lastY = Math.random() * 30 + 20; // 20-50%
    let totalDistance = 0;
    let maxSpeed = 0;
    let totalSpeed = 0;
    
    for (let i = 0; i < pointsCount; i++) {
      // 生成随机位置（基于上一个点）
      const x = Math.min(90, Math.max(10, lastX + (Math.random() - 0.5) * 5));
      const y = Math.min(90, Math.max(10, lastY + (Math.random() - 0.5) * 5));
      
      // 计算与上一点的距离
      const distance = i > 0 ? Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)) * 0.5 : 0;
      totalDistance += distance;
      
      // 生成速度（30-120 km/h）
      const speed = Math.random() * 90 + 30;
      totalSpeed += speed;
      if (speed > maxSpeed) maxSpeed = speed;
      
      // 生成时间戳
      const pointTime = new Date(startDate.getTime() + (timeDiff / pointsCount) * i);
      
      // 生成位置描述
      const locations = ['XX大道', 'XX工业区', 'XX物流园', 'XX高速', 'XX服务区', 'XX港口', 'XX仓库'];
      const location = locations[Math.floor(Math.random() * locations.length)];
      
      newTrackPoints.push({
        id: `p${i}`,
        timestamp: pointTime.toISOString(),
        x,
        y,
        speed,
        location,
        direction: Math.random() * 360
      });
      
      lastX = x;
      lastY = y;
    }
    
    // 计算统计数据
    const duration = timeDiff / 1000; // 转换为秒
    const avgSpeed = totalSpeed / pointsCount;
    

    return {
        status: 200,
        message:"请求成功！",
        data:{
            newTrackPoints,
            duration,
            avgSpeed,
            totalDistance,
            maxSpeed,
        },
        success: true,
    };
});


//VehiclePointInfo
Mock.mock(base_URL + Api.getVehiclePointInfo, "post", (param)=> {
    const arr = [
            {
                id: '1',
                licensePlate: '京A12345',
                type: '货运卡车',
                driverName: '张三',
                driverPhone: '13800138000',
                status: 'online',
                location: '北京市朝阳区建国路',
                latitude: 39.9087,
                longitude: 116.4074,
                speed: 45,
                direction: '向东',
                updateTime: '10:23:45'
            },
            {
                id: '2',
                licensePlate: '沪B67890',
                type: '客运巴士',
                driverName: '李四',
                driverPhone: '13900139000',
                status: 'warning',
                location: '上海市浦东新区张江高科技园区',
                latitude: 31.2304,
                longitude: 121.5080,
                speed: 60,
                direction: '向南',
                updateTime: '10:21:32'
            },
            {
                id: '3',
                licensePlate: '粤C54321',
                type: '物流货车',
                driverName: '王五',
                driverPhone: '13700137000',
                status: 'offline',
                location: '广东省珠海市香洲区',
                latitude: 22.2769,
                longitude: 113.5674,
                speed: 0,
                direction: '静止',
                updateTime: '09:45:12'
            },
            {
                id: '4',
                licensePlate: '苏D98765',
                type: '冷藏车',
                driverName: '赵六',
                driverPhone: '13600136000',
                status: 'online',
                location: '江苏省常州市新北区',
                latitude: 31.8113,
                longitude: 119.9742,
                speed: 52,
                direction: '向西',
                updateTime: '10:25:08'
            },
            {
                id: '5',
                licensePlate: '浙E24680',
                type: '危险品车',
                driverName: '钱七',
                driverPhone: '13500135000',
                status: 'warning',
                location: '浙江省湖州市吴兴区',
                latitude: 30.8667,
                longitude: 120.0840,
                speed: 38,
                direction: '向北',
                updateTime: '10:18:55'
            },
            {
                id: '6',
                licensePlate: '川F13579',
                type: '货运卡车',
                driverName: '孙八',
                driverPhone: '13400134000',
                status: 'online',
                location: '四川省德阳市旌阳区',
                latitude: 31.1317,
                longitude: 104.3870,
                speed: 49,
                direction: '向东',
                updateTime: '10:24:30'
            }
        ];
    return {
        status: 200,
        message:"请求成功！",
        data:arr,
        success: true,
    }
});