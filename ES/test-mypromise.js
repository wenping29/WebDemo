const MyPromise = require('./MyPromise');

console.log('=== 1. 测试基本功能 ===');
const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  }, 100);
});

p1.then(value => {
  console.log('p1 结果:', value);
  return value + '继续';
}).then(value => {
  console.log('p1 链式结果:', value);
});

console.log('=== 2. 测试失败情况 ===');
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('失败'));
  }, 150);
});

p2.then(value => {
  console.log('p2 结果:', value);
}).catch(error => {
  console.log('p2 错误:', error.message);
}).finally(() => {
  console.log('p2 finally 执行');
});

console.log('=== 3. 测试 Promise.all ===');
const p3 = MyPromise.resolve(1);
const p4 = new MyPromise(resolve => setTimeout(() => resolve(2), 80));
const p5 = new MyPromise(resolve => setTimeout(() => resolve(3), 50));

MyPromise.all([p3, p4, p5]).then(values => {
  console.log('all 结果:', values);
});

console.log('=== 4. 测试 Promise.race ===');
const p6 = new MyPromise(resolve => setTimeout(() => resolve('慢'), 200));
const p7 = new MyPromise(resolve => setTimeout(() => resolve('快'), 60));

MyPromise.race([p6, p7]).then(value => {
  console.log('race 结果:', value);
});

console.log('=== 5. 测试 Promise.allSettled ===');
const p8 = MyPromise.resolve('成功1');
const p9 = MyPromise.reject(new Error('失败1'));
const p10 = MyPromise.resolve('成功2');

MyPromise.allSettled([p8, p9, p10]).then(results => {
  console.log('allSettled 结果:', JSON.stringify(results, null, 2));
});

console.log('=== 6. 测试 Promise.any ===');
const p11 = MyPromise.reject(new Error('失败A'));
const p12 = new MyPromise(resolve => setTimeout(() => resolve('成功B'), 100));
const p13 = MyPromise.reject(new Error('失败C'));

MyPromise.any([p11, p12, p13]).then(value => {
  console.log('any 成功结果:', value);
}).catch(error => {
  console.log('any 错误:', error.message);
});

console.log('=== 7. 测试静态方法 resolve/reject ===');
MyPromise.resolve('直接值').then(v => console.log('resolve 结果:', v));
MyPromise.reject(new Error('直接拒绝')).catch(e => console.log('reject 错误:', e.message));

console.log('=== 8. 测试 thenable 对象 ===');
const thenable = {
  then: function(resolve) {
    setTimeout(() => resolve('thenable resolved'), 70);
  }
};
MyPromise.resolve(thenable).then(v => console.log('thenable 结果:', v));

console.log('=== 9. 测试 toStringTag ===');
console.log('Symbol.toStringTag:', Object.prototype.toString.call(new MyPromise(() => {})));

console.log('\n=== 所有测试已启动，等待异步结果 ===');