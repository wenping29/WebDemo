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
import imggg from "../logo.svg";
import  "./user.css";

class User extends React.Component {

    
    render() {

        function Profile({img, person}) {

            const [isPlaying,setIsPlaying] =useState(false);

            useEffect(() => {
                // 每次渲染后都会执行此处的代码
                console.log("effect");
                if(isPlaying) {
                    console.log("isPlaying:"+ isPlaying);
                }
              },[isPlaying]);

            const [index, setIndex] = useState(0);

            const [str, setStr] = useState("str");
            const [per, setPer] = useState({name:"tom",age:12,address:"tiananmen"});

            const handleClick = () => {
                // alert('你点击了我！');
                setIndex(index + 1);
                setStr(str => str + ":------asd");
                setIsPlaying(!setIsPlaying);
              }

            return (
                <div>
                    <p>{index}</p>
                    <p>{str}</p>
                     <img
              onClick={handleClick}
                src={person.img}
                className="user-img"
                alt={person.name}
              />
                </div>
             
            );
          }

        let data1 = "asxcvbnm,.";
        const NotFound = () => {
            return <h2>404 Page Not Found</h2>;
        };
        
        // const myRef = useRef(null);

        const CreateAbout = () => {
            // const myRef = useRef(null);
            return (
                <div>
                    <div>{data1}</div>
                </div>);
        };
        const createProfile =() => {
            let arr = [
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg},
                {name:"Katherine Johnson", img:imggg}
            ];
            return arr.map(v => {
                return (<Profile img={v.img} person ={v}/>);
            });
        };
      return (
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          user------divdivdivdivdivdivdivdiv
          {CreateAbout()}
          <section>
            <h1>了不起的科学家</h1>
            {/* <Profile />
            <Profile/>
            <Profile/>
            <Profile/> */}
            {createProfile()}
            </section>
        </div>
      );
    }
  }
  export default User;