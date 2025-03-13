import React, { useEffect, useState } from 'react'
import style from "./Login.module.css";
const baseurl = import.meta.env.VITE_BASE_URL;
import { IoIosPerson, IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router';




const Login = () => {
    const navigate = useNavigate();
    const [passwordToggle, setPasswordToggle] = useState("password")
    const [val, setVal] = useState({ userId: "", password: "", isCheckRemember: true });
    const [message, setMessage] = useState('')


    const passwordHandler = () => {
        if (passwordToggle === "password") {
            setPasswordToggle("text")
        } else {
            setPasswordToggle("password")
        }
    }
    const valueChangeHandler = (e) => {
        setVal((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const getUserInfo = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseurl}user/login?userId=${val.userId}&password=${val.password}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const fnal = await response.json();

            if (fnal.StatusCode === 400) {
                setMessage(fnal.response.message);
            } else {
                const userData = {
                    userId: fnal.data.userId || "",
                    userName: fnal.data.userName || "",
                    authToken: fnal.token || "",
                };
                if (val.isCheckRemember) {
                    sessionStorage.setItem("userData", JSON.stringify(userData));
                    console.log("User data is stored in sessionStorage.");
                   
                } else {
                    sessionStorage.setItem("userData", JSON.stringify({ authToken: fnal.token }));
                    console.log("Only token is stored in sessionStorage.");
                }
                navigate("/home")
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };





    return (
        <div className={style.main}>
            <div className={`${style.rightDiv}`}>
                <h2 className='text-center'>Vertex-R</h2>
                <form onSubmit={getUserInfo}>
                    <div className={`${style.input}`}>
                        <input type="text" id='user' placeholder='User Name' onChange={(e) => valueChangeHandler(e)} value={val.userId} name='userId' />
                        <IoIosPerson fontSize='small' />
                    </div>
                    <div className={`${style.input}`}>
                        <input type={passwordToggle} id='pass' placeholder='Password' onChange={(e) => valueChangeHandler(e)} value={val.password} name='password' />
                        <div onClick={() => passwordHandler()}>
                            {passwordToggle === "password" ? <FaEye fontSize='small' /> : <IoIosEyeOff fontSize='small' />}
                        </div>
                    </div>
                    <div className={`${style.isCheck} d-flex justify-content-start`}>
                        <div>
                            <input type="checkbox" onChange={(e) => setVal(prev => ({ ...prev, isCheckRemember: e.target.checked }))} checked={val.isCheckRemember} name="" id="rem" />
                        </div>
                        <label className='ms-1' htmlFor="rem">Remember</label>
                    </div>
                    {message != '' && <span className='text-danger'>{message}</span>}
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login