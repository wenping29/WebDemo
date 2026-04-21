import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// 使用 ES6 的转译器，如 babel
// import { Router, Route, Link } from 'react-router'

import { createRoot } from "react-dom/client";
// 不使用 ES6 的转译器
// var ReactRouter = require('react-router')
// var Router = ReactRouter.Router
// var Route = ReactRouter.Route
// var Link = ReactRouter.Link

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 为提供的创建一个 React 根container并返回根。
const root = createRoot(document.getElementById("root"));
// 根可用于将 React 元素渲染到 DOM 中
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
