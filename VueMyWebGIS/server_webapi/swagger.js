const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const options = {
   definition: {
       openapi: '3.0.0',
       info: {
           title: 'API 文档',
           version: '1.0.0',
           description: '自动生成的 API 文档',
       },
       servers: [
           {
               url: 'http://localhost:3000',
               description: '本地服务器',
           },
       ],
   },
   apis: ['./routes/*.js'], // 指定路由文件路径
};
const swaggerSpec = swaggerJSDoc(options);
 
const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = { swaggerUi, swaggerSpec , router};