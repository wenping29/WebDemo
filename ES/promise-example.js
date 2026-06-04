const fetchData = (success = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({ data: '成功获取数据', code: 200 });
      } else {
        reject(new Error('网络请求失败'));
      }
    }, 1000);
  });
};

fetchData(true)
  .then(response => {
    console.log('成功:', response);
    return response.data;
  })
  .then(data => {
    console.log('处理后的数据:', data);
  })
  .catch(error => {
    console.error('错误:', error.message);
  })
  .finally(() => {
    console.log('操作完成');
  });

fetchData(false)
  .then(response => {
    console.log('成功:', response);
  })
  .catch(error => {
    console.error('捕获错误:', error.message);
  });