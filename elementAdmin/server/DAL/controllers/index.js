const fs = require('fs')
const path = require('path')
const {getFiles} = require('../DAL/getFiles')
var fn_index = async(ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async(ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

var uploadfile = async(ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream('E:/SY_Site/uploadfile/' + `/${file.name}`);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
}
var uploadfiles = async(ctx, next) => {
    // 上传多个文件
    const files = ctx.request.files.file; // 获取上传文件
    for (let file of files) {
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream('E:/SY_Site/uploadfile/' + `/${file.name}`);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }
    return ctx.body = "上传成功！";
}
const getImages = async(ctx, next) => {
    let imgs = getFiles.getFileList('E:/SY_Site/uploadfile/')
    // console.log(imgs)
    // imgs = imgs.map(v=> v.filename)
    ctx.response.body = imgs
}


module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin,
    'POST /uploadfile': uploadfile,
    'POST /uploadfiles': uploadfiles,
    'GET /getImages': getImages
};