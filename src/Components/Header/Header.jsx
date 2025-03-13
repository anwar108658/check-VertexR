import React, { useEffect, useState } from 'react'
import style from './Header.module.css'
import { FiMenu, FiFlag } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setCombovalue } from '../Redux/ComboValue';
import { setShowMenu } from '../Redux/ShowMenu';
const baseurl = import.meta.env.VITE_BASE_URL;


export default function Header() {
    const dispatch = useDispatch()
    const [comanyList, setComapnyList] = useState([]);
    const showmenu = useSelector((state) => state.showmenu.value);



    const getComboValue = (e) => {
        dispatch(setCombovalue(e.target.value))
    }


    useEffect(() => {
        const userdata = JSON.parse(sessionStorage.getItem('userData'))
        const fetchData = async () => {
            await fetch(`${baseurl}user/user_company`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userdata.authToken}`,
                    'Content-Type': 'application/json'
                }

            }).then(async (res) => {
                const fnalResponse = await res.json();
                setComapnyList(fnalResponse.data)
            })
        }
        fetchData();

    }, [])

    const hideMenu = () => {
        dispatch(setShowMenu(!showmenu))

    }


    return (
        <div className={`  container-fluid d-flex justify-content-between  shadow-sm `}>

            <div className='d-flex align-items-center col-lg-2 col-md-3 col-sm-4 justify-content-around '>
                {/* ------------------------------ Menu Icon ---------------------- */}

                <div onClick={hideMenu} className={`${style.mnuicon} d-flex justify-content-center align-items-center fs-5 py-1 px-1  rounded-circle`}>

                    <FiMenu fontSize="1.1rem" />

                </div>
                {/* -------------------------- Profile Icon -------------------- */}
                <div className={`${style.profile} py-1 px-1 d-flex justify-content-center align-items-center rounded-circle `}>

                    <IoPersonSharp />

                </div>
                {/* ------------------------- Logo -------------------------- */}
                <div className={`${style.logo} text-white d-flex  align-items-center justify-content-center `} >
                    <img src={logo} style={{ width: "50px" }} alt="" />
                    <h2 style={{fontSize:'1.3rem'}} >Vertex
                        <span className=''>-</span>
                        R
                    </h2>

                </div>

            </div>
            {/* -------------------- select country ---------------- */}
            <div className='col-lg-3 col-4 d-flex justify-content-end gap-3 align-items-center'>

                <select onChange={getComboValue} className={`${style.combo} rounded-1`} >
                    {comanyList.length != 0 && comanyList.map((item, i) => {
                        return (
                            <option key={i} value={item.companyName}>{item.company}</option>
                        )
                    })}
                </select>


                {/* ====================== Logout button ---------------------------------------- */}

                <div className={`${style.logout_btn} fs-4 text-white`} >
                    <RiLogoutCircleRLine />
                    {/* <FontAwesomeIcon icon="fa-sharp-duotone fa-solid fa-map" /> */}
                </div>
            </div>





        </div>
    )
}
