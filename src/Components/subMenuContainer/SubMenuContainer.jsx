import React from 'react'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import style from './SubMenu.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setDataIsFetched, setTabs } from '../Redux/Tabs';
import { useNavigate } from 'react-router';
const baseurl = import.meta.env.VITE_BASE_URL;


const SubMenuContainer = ({ className ,head}) => {
  const usefullinks = useSelector((state) => state.usefulLinks.links);
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  function generateUniqueId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let uniqueId = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      uniqueId += chars[randomIndex];
    }

    return uniqueId;
  }


  const setTabData = async (tabname, reportid) => {
    const userdata = JSON.parse(sessionStorage.getItem('userData'));

    if (reportid != '') {
      try {
        await fetch(`${baseurl}report/ReportConfig/${reportid}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userdata.authToken}`,
            'Content-Type': 'application/json',
          }
        }).then(async (res) => {
          const fnal = await res.json();
          const obj = {
            type: 'menu',
            data: fnal,
            name: tabname,
            id: generateUniqueId()
          }
         console.log(obj,"obj");
          dispatch(setTabs(obj));
          dispatch(setDataIsFetched(false))
          navigate(`/form/${tabname}`)

        })
      } catch (er) {
        console.log(er);
      }
    }

  };


  return (
    <div className={`pb-5 ${className}`}>
      {usefullinks != null &&

        <div  className=''>
          <p className={`${style.heading} text-white`}>{usefullinks.groupname}</p>
          <div className='d-flex gap-2' >
            {usefullinks.menus.map((menu, i) => (
              <div key={i} onClick={() => setTabData(menu.menuName, menu.reportId)} className={`${style.main}  shadow-lg  mt-2`}>
                <p>{menu.menuName}</p>
                <div className=''>
                  <FileCopyOutlinedIcon sx={{ color: "#46647E" }} />
                  <p>{head}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      }

    </div>
  )
}

export default SubMenuContainer