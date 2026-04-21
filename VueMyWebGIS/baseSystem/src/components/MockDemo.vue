<template>
  <div>字符串5个小写字符：{{ str }}</div>
  <div>随机姓名：{{ name }}</div>
  <div>随机中文姓名：{{ cname }}</div>
  <div>随机数字 1-100 之间：{{ num }}</div>
  <div>随机浮点数 1-100 之间，保留2位小数：{{ num2 }}</div>
  <div>随机布尔值：{{ bool }}--- {{ bool2 }} --随机性别： {{ sex }}</div>
  <div>随机日期字符串：{{ date }} ---- {{ time }}---- {{ datetime }}</div>
  <div>随机地址：{{ address }}</div>
  <div>随机邮箱：{{ email }}</div>
  <div>随机手机号：{{ phone }}</div>
  <div>随机网址：{{ url }}</div>
  <div>随机IP地址：{{ ip }}</div>
  <div>随机身份证号：{{ idCard }} ==== {{ idNum }}</div>
  <div>随机文章标题:{{ title }}</div>
  <div>随机段落：{{ paragraph }}</div>
  <div>随机句子：{{ sentence }}</div>

  <div>随机数组长度 1-5：{{ arr }}</div>
  <div>随机字符数组：{{ strArr }}</div>

  <div>随机对象：{{ obj }}</div>
  <img :src="img" alt="图片" />
  <img :src="imgUrl" alt="图片" />
</template>
<script setup>
import Mock from "mockjs";

// 字符串5个小写字符
const str = Mock.mock('@string("lower", 5)');
// 随机姓名
const name = Mock.mock("@name");
// 随机中文姓名
const cname = Mock.mock("@cname");
// 随机数字 1-100 之间
const num = Mock.mock("@integer(1, 100)");
// 随机浮点数 1-100 之间，保留2位小数
const num2 = Mock.mock("@float(1, 100, 2, 2)");
// 随机布尔值
const bool = Mock.mock("@boolean");
// 随机布尔值 二选一
const bool2 = Mock.mock({ "flag|1": [true, false] });
// 随机性别
const sex = Mock.mock({ "sex|1": ["男", "女"] });
// 随机日期字符串
const date = Mock.mock('@date("yyyy-MM-dd")');
const datetime = Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")');
const time = Mock.mock('@time("HH:mm:ss")');

// 随机地址
const address = Mock.mock("@county(true)");
// 随机邮箱
const email = Mock.mock("@email");
// 随机手机号
const phone = Mock.mock(/^1[3-9]\d{7}$/);
// 随机网址
const url = Mock.mock("@url");
// 随机IP地址
const ip = Mock.mock("@ip");

// 随机身份证号
const idCard = Mock.mock("@id");
// 随机身份证号 正则表达式
const idNum = Mock.mock(
  /^[1-9]\d{5}(18|19|20)?\d{2}((0[1-9])|(10|11|12))((0[1-9])|([1-2][0-9])|30|31)\d{3}(\d|X)$/
);
//随机文章标题
const title = Mock.mock("@ctitle(5)");
// 随机段落
const paragraph = Mock.mock("@cparagraph");
// 随机句子
const sentence = Mock.mock("@csentence");

// 随机图片 制定大小 颜色 文本
const img = Mock.Random.image("200x100", "#4A7BF7", "#FFF", "Mock.js");
//  随机图片
const imgUrl = Mock.mock("@image");

// 随机数组长度 1-5
const arr = Mock.mock("@range(1, 5)");
const strArr = Mock.mock({ "strArr|1-5": ["@ctitle"] });
// 随机对象
const obj = Mock.mock({
  name: "@cname",
  age: "@integer(18, 30)",
  address: "@county(true)",
  email: "@email",
  phone: "@phone",
  date: '@datetime("yyyy-MM-dd HH:mm:ss")',
  url: "@url",
  ip: "@ip",
  color: "@color",
});

</script>
<style scoped lang="scss"></style>