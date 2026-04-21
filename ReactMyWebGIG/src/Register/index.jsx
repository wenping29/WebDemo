import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';
import { apiArticleEdit } from "../Request/api";
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
// import imggg from "../logo.svg";
// import  "./user.css";
import loginimg from "../p_big3.jpg";



class Register extends React.Component {
    render() {
        return (
            <div class="page login-page"  style={{background: "../p_big3.jpg"}}>
                <div class="container d-flex align-items-center">
                    <div class="form-holder has-shadow">
                    <div class="row">
                        <div class="col-lg-6">
                        <div class="info d-flex align-items-center">
                            <div class="content">
                            <div class="logo">
                                <h1>欢迎注册</h1>
                            </div>
                            <p>XXXX管理系统</p>
                            </div>
                        </div>
                        </div>
                        <div class="col-lg-6 bg-white">
                        <div class="form d-flex align-items-center">
                            <div class="content">
                                <div class="form-group">
                                    <input id="register-username" class="input-material" type="text" name="registerUsername" placeholder="请输入用户名/姓名"></input>
                                    <div class="invalid-feedback">用户名必须在2~10位之间</div>
                                </div>
                                <div class="form-group">
                                    <input id="register-password" class="input-material" type="password" name="registerPassword" placeholder="请输入密码"></input>
                                    <div class="invalid-feedback">密码必须在6~10位之间</div>
                                </div>
                                <div class="form-group">
                                    <input id="register-passwords" class="input-material" type="password" name="registerPasswords" placeholder="确认密码"></input>
                                    <div class="invalid-feedback">两次密码必须相同 且在6~10位之间</div>
                                </div>
                                <div class="form-group">
                                    <button id="regbtn" type="button" name="registerSubmit" class="btn btn-primary">注册</button>
                                </div>
                                <small>已有账号?</small><a href="login.html" class="signup">&nbsp;登录</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>);
    }
}

export default Register;