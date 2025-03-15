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
  const [element, setElement] = useState(null);
  const tabsData = useSelector((state) => state.tabs);
  const dispatch = useDispatch();
  const location = useLocation().pathname.split('/')[1];
  const [reportData, setReportData] = useState({});


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
    if (tabsData.activeTab != null) {
      const obj = {
        'G': <GridForm dataObject={tabsData.activeTab} reportData={reportData[tabsData.activeTab.id]} />,
        'P': <PivotGrid dataObject={tabsData.activeTab} reportData={reportData[tabsData.activeTab.id]} />,
      };

      const reportType = tabsData.activeTab?.data?.data?.reportType;

      if (obj[reportType]) {
        setElement(obj[reportType]);
      } else {
        setElement(null);
      }
    }
  }, [tabsData.activeTab, reportData]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (tabsData.activeTab != null) {
      const activeTabId = tabsData.activeTab.id;
      // Check if we already have data for this tab
      if (!reportData[activeTabId]) {
        // If no data for this tab, fetch it
        const reportId = tabsData.activeTab.data.data.reportId;
        console.log(reportId);

        const getReportData = async () => {
          try {
            const response = await fetch(`${baseurl}report/LoadReport/${reportId}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${userData.authToken}`,
                'Content-Type': 'application/json',
              },
            });
            const final = await response.json();

            // Store data specific to the active tab
            setReportData((prevData) => ({
              ...prevData,
              [activeTabId]: final, // Save data by tab ID
            }));
          
          } catch (error) {
            console.log(error);
          }
        };

        getReportData();
      }
    }
  }, [tabsData.activeTab, reportData]); // Re-fetch if active tab changes

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
                <div className={`${style.tabdiv} col-9`}>
                  <TabSection />
                </div>
              )}

              <motion.div
                className="table-container"
                initial={{ x: '100%' }}
                key={tabsData.activeTab != null && tabsData.activeTab.id ? tabsData.activeTab.id : 'default'}
                animate={{ x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className='mb-5'>
                  {location === 'menus' ? <SubMenuContainer /> : element}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



