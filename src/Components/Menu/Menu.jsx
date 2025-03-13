import React, { useEffect, useState } from 'react'
import style from './Menu.module.css'
import { useDispatch, useSelector } from 'react-redux'
const baseurl = import.meta.env.VITE_BASE_URL;
import { IoMdSearch } from "react-icons/io";
import { SiHiveBlockchain } from "react-icons/si";

import Inventory from '@mui/icons-material/Inventory';
import { setUsefulLInks } from '../Redux/UsefuLinks';
import { useNavigate } from 'react-router';




export default function Menu() {
  const selectedCompany = useSelector((state) => state.combovalue.value);
  const [menuData, setMenuData] = useState([]);
  const [showLi, setShowLi] = useState({ menuName: "", isView: true });
  const [showSublist, SetShowSubList] = useState({ subMenuName: "", isView: true })
  const showmenu = useSelector((state) => state.showmenu.value);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const setShowLiHandler = (moduleName) => {
    setShowLi((prev) => ({ ...prev, menuName: moduleName, isView: prev.menuName === moduleName ? !prev.isView : true }));
    SetShowSubList({ subMenuName: "", isView: true })

  }

  useEffect(() => {
    const userdata = JSON.parse(sessionStorage.getItem('userData'));

    const fetechMenuData = async () => {

      await fetch(`${baseurl}user/menu`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userdata.authToken}`,
          'Content-Type': 'application/json',
          'company': `${selectedCompany}`
        }
      }).then(async (res) => {
        const fnal = await res.json();
        setMenuData(fnal.data.modules)
      })
    }
    fetechMenuData()
  }, [selectedCompany])



  const SetShowSubListHandler = (subModuleName, menus, modulename) => {
    const menulinks = {
      modulename,
      groupname: subModuleName,
      menus
    }
    dispatch(setUsefulLInks(menulinks));
    SetShowSubList((prev) => ({ ...prev, subMenuName: subModuleName, isView: prev.subMenuName === subModuleName ? !prev.isView : true }));
    navigate('/menus')
  }


  return (
    <div className={`${style.main} ${showmenu ? style.open : style.close} rounded-2 py-2  px-3`}>

      {/* --------------------------- Menu Input ------------------------------ */}
      <div className={`${style.search_inpt} rounded-3 d-flex justify-content-around align-items-center `}>
        <IoMdSearch className='fs-6' color='#2a537a' />
        <input className='py-1' type="text" placeholder='Search .....' />
      </div>
      {/* ------------------------------- Menu List ------------------------ */}


      <div className=' mt-4'>
        {menuData.length != 0 &&
          menuData.map((val, i) => {
            return (
              <div key={i} className={`${style.allmenu}`} >
                <div onClick={() => setShowLiHandler(val.moduleName)} className={`${style.mainMenu} rounded-3`}>
                  <div className='d-flex align-items-center p-1 gap-1 ps-2 '>
                    <SiHiveBlockchain style={{ color: "#32587D" }} />
                    <span className='ms-2'>{val.moduleName} </span>
                  </div>

                </div>
                <div className='ms-3'>
                  {val.groups.length != 0 &&
                    val.groups.map((item, i) => {

                      return (
                        <div key={i}>
                          <div onClick={() => SetShowSubListHandler(item.groupName, item.menus, val.moduleName)} key={i} className={`${style.subgroup} rounded-3 p-1`} style={showLi.menuName == val.moduleName && showLi.isView ? { display: "block" } : { display: "none" }}>
                            <div className='d-flex gap-2'>
                              <span style={{ listStyle: "none" }} className=''><Inventory style={{ color: '#32587D' }} fontSize='.7rem' /></span>
                              <span> {item.groupName}</span>
                            </div>

                          </div>

                        </div>

                      )
                    })
                  }

                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
