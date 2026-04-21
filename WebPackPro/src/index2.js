import { createApp, reactive, h } from 'vue';
import Vuex from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
// // import VueRouter from 'VueRouter';
// // import VueRouter from 'vue-router';
// import imgsrc from './asset/3d-map-gray.png';
// import imgsrc2 from './asset/3d-map.png';

// // import api from './api/request';
// import './index.css';
// import './index.less';

// Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    // increment(state) {
    //   // state.count += 1;
    // },
  },
});

// const a = 10;
// console.log('000000', a);
// console.log('111111111111');

// const img = document.createElement('img');
// img.src = imgsrc;

// document.body.appendChild(img);

// const img2 = document.createElement('img');
// img2.src = imgsrc2;

// document.body.appendChild(img2);

// const div = document.createElement('div');
// div.append('2222222222222222222');
// // img2.src= imgsrc2;
// div.classList.add('divclass');

// document.body.appendChild(div);

// const div2 = document.createElement('div');
// div2.append('divclass2divclass2divclass2');
// // img2.src= imgsrc2;
// div2.classList.add('divclass2');

// document.body.appendChild(div2);

// const span = document.createElement('span');
// span.append('spanspanspanspan');
// // img2.src= imgsrc2;
// span.classList.add('icon');
// // span.classList.add('divclass2');
// document.body.appendChild(span);

// function getString() {
//   return new Promise(res => {
//     setTimeout(() => {
//       res('qwer');
//     }, 2000);
//   });
// }
// getString().then(data => {
//   console.log(data, 'data');
// });

// // fetch('/api/hello').then(data => data.text()).then(result => {
// //   console.log(result, 'result');
// // });

// // api.get('/api/hello').then(resp => {
// //   console.log(resp, 'respresprespresp');
// // });

// // 1. 定义路由组件.
// // 也可以从其他文件导入
const Home = { template: '<div>Home</div>' };
const About = { template: '<div>About</div>' };

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     //...
//   ],
// })

// const { reactive } = Vue;
const sourceOfTruth = reactive({
  message: 'Hello',
});

console.log(sourceOfTruth, 'sourceOfTruth');

const TodoItem = {
  template: '<li>This is a todo</li>',
};

// 5. 创建并挂载根实例
const app = createApp({
  data() {
    return {
      sharedState: store.state,
    };
  },
  components: {
    TodoItem, // 注册一个新组件
  },
  setup() {
    return h('div', { class: 'container' }, [
      h('h3', '计数器示例'),
    ]);
  },
});
// 确保 _use_ 路由实例使
// 整个应用支持路由。
// app.use(router);
console.log(router);

app.mount('#app');

// 现在，应用已经启动了！
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('sw注册成功', registration);
//       })
//       .catch(registrationError => {
//         console.log('注册失败', registrationError);
//       });
//   });
// }
