import React from 'react';
 import "./login.css";
import loginimg from "../p_big3.jpg";

import { useNavigate  } from "react-router-dom";
export default function Login(){      
      const navigate = useNavigate();
      function clickeventhandler(){
        // Navigate("/Home");
       navigate("/Home");
        //  props.history.push('/Home');//props.history.push('/layout');
      }


      return ( <div class="page login-page" style={{background: loginimg}}>
      <div class="container d-flex align-items-center">
        <div class="form-holder has-shadow">
          <div class="row">
            <div class="col-lg-6">
              <div class="info d-flex align-items-center">
                <div class="content">
                  <div class="logo">
                    <h1>欢迎登录</h1>
                  </div>
                  <p>XXXX管理系统</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 bg-white">
              <div class="form d-flex align-items-center">
                <div class="content">
                  <form method="post" action="login.html" class="form-validate" id="loginFrom">
                    <div class="form-group">
                      <input id="login-username" type="text" name="userName" required data-msg="请输入用户名" placeholder="用户名" value="admin" class="input-material"></input>
                    </div>
                    <div class="form-group">
                      <input id="login-password" type="password" name="passWord" required data-msg="请输入密码" placeholder="密码" class="input-material"></input>
                    </div>
                    <button id="login" type="submit" class="btn btn-primary" onClick={clickeventhandler}>登录</button>
                    <div style={{marginTop: "-40px"}}> 
                    	<div class="custom-control custom-checkbox " style={{float: "right"}}>
											    <input type="checkbox" class="custom-control-input" id="check2" ></input>
											    <label class="custom-control-label" for="check2">自动登录</label>
											</div>
											<div class="custom-control custom-checkbox " style={{float: "right"}}>
											    <input type="checkbox" class="custom-control-input" id="check1" ></input>
											    <label class="custom-control-label" for="check1">记住密码&nbsp;&nbsp;</label>
											</div> 
                    </div>
                  </form>
                  <br />
                  <small>没有账号?</small><a href="register.html" class="signup">&nbsp;注册</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
  }
  