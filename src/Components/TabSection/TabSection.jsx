import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import style from './TabSection.module.css';
import { removetab, setTabs } from '../Redux/Tabs';
import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function TabSection() {
    const tabData = useSelector((state) => state.tabs);
    const tabContainerRef = useRef(null);
    const dispatch = useDispatch();

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [tabData.tabs]);

    const checkScroll = () => {
        if (tabContainerRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = tabContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const clickonTab = (id) => {
        const whichTabClicked = tabData.tabs.find(tab => tab.id === id);
        if (whichTabClicked) {
            dispatch(setTabs({ ...whichTabClicked, type: 'tab' }));
        }
    };

    const removeTabs = (tabId, e) => {
        e.stopPropagation();
        dispatch(removetab(tabId));
    };

    const scrollLeft = () => {
        if (tabContainerRef.current) {
            tabContainerRef.current.scrollBy({ left: -170, behavior: "smooth" });
            setTimeout(checkScroll, 200);
        }
    };

    const scrollRight = () => {
        if (tabContainerRef.current) {
            tabContainerRef.current.scrollBy({ left: 170, behavior: "smooth" });
            setTimeout(checkScroll, 200);
        }
    };

    return (
        <div className='d-flex position-relative'>
            {/* Left Scroll Button (Shows Only If Can Scroll Left) */}
            {canScrollLeft && (
                <button className={`${style.scrollButton} rounded-start-1 `} onClick={scrollLeft}>
                    <FaChevronLeft />
                </button>
            )}
            <div 
                ref={tabContainerRef} 
                className='d-flex align-items-center py-1' 
                style={{ backgroundColor: '#fafafa', flex: "1", overflow: "hidden", whiteSpace: "nowrap" }} 
                onScroll={checkScroll}
            >
                {tabData.tabs.length !== 0 && tabData.tabs.map((item, i) => {
                    const isActiveTab = tabData.activeTab && tabData.activeTab.id === item.id;
                    return (
                        <div
                            onClick={() => clickonTab(item.id)}
                            className={`${isActiveTab ? style.active : ''} ${style.tab} position-relative d-flex align-items-center py-1 ms-3`}
                            key={i}
                        >
                            <div className={`${style.list_icon}`}></div>
                            <span className='ms-1' style={{ fontSize: '11px', whiteSpace: "nowrap" }}>{item.name}</span>
                            <RxCross2 
                                onClick={(e) => removeTabs(item.id, e)} 
                                className='text-danger' 
                            />
                        </div>
                    );
                })}
            </div>
         
            {canScrollRight && (
                <button className={`${style.scrollButton} rounded-end-1 `} onClick={scrollRight}>
                    <FaChevronRight />
                </button>
            )}
        </div>
    );
}
