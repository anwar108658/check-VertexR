import React, { useEffect, useState } from 'react';
import Menu from './Menu/Menu';
import style from './BodySection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import TabSection from './TabSection/TabSection';
import Header from './Header/Header';
import PivotGrid from './PivotGrid/PivotGrid';
import GridForm from './GridForm/GridForm';
import { motion } from 'framer-motion';
import SubMenuContainer from './subMenuContainer/SubMenuContainer';
import { setShowMenu } from './Redux/ShowMenu';


const baseurl = import.meta.env.VITE_BASE_URL;

export default function BodySection() {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const isAuthenticated = userData && userData.userId && userData.authToken;
  const showmenu = useSelector((state) => state.showmenu.value);
  const navigate = useNavigate();
  const tabsData = useSelector((state) => state.tabs);
  const dispatch = useDispatch();
  const location = useLocation().pathname.split('/')[1];
  const [reportData, setReportData] = useState({});
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);
  
  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 1310) {
        dispatch(setShowMenu(false));
      } else {
        dispatch(setShowMenu(true));
      }
    };
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);


  useEffect(() => {
    setReportData(tabsData.tabs)
  }, [])
  

  return (
    <div className='position-relative'>
      <div className={style.bgdiv}>
        <div className={style.header}>
          <Header />
        </div>
        <div className='d-flex justify-content-between pt-5'>
          <div className={`${showmenu ? 'col-2' : 'col-0'} bg-white`}>
            <Menu />
          </div>

          <div className={`${style.imgdiv} ${showmenu ? 'col-10' : 'col-12'} px-2`}>
            <div className="">
              {location !== 'menus' && tabsData.tabs.length !== 0 && (
                <div className={`${style.tabdiv} col-9 z-1`}>
                  <TabSection />
                </div>
              )}

                <div className='mb-5'>
                  <SubMenuContainer className={location === "menus" ? "d-block":"d-none"} />  
                 <div>
                 {tabsData?.tabs?.length !== 0 &&
                   tabsData?.tabs.map((item, i) => (
                    <div
                    className="animated-tab"
                    style={{
                      transform: item.id === tabsData.activeTab.id ? "translateX(0)" : "translateX(100%)",
                      transition: "transform 0.7s linear",
                      position: item.id === tabsData.activeTab.id ? "relative" : "absolute",
                      width: "100%",
                      display:location === "menus" ? "none":"block",
                    }}
                  >
                    {<GridForm key={i} dataObject={item} />}
                  </div>
                  
                   ))}
               </div>
                  
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



