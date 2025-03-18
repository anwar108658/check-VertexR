import { ArrowDropDownCircle, ArrowUpwardRounded } from '@mui/icons-material'
import React, { useMemo, useState } from 'react'
import { Fullscreen, Square, GridView} from '@mui/icons-material';
import { RxExitFullScreen } from 'react-icons/rx';
import style from './GroupOpen.module.css'
import { useDispatch } from 'react-redux';
import { filterToggle } from '../Redux/ShowMenu';

const GroupOpen = ({name,children,type,secondChildren}) => {
  console.log(secondChildren,"secondChildren");
  const dispatch = useDispatch()
  const[isShow,setIsShow] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  return (
    <>
    <div className={style.group} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <p><button onClick={() => setIsShow(prev => !prev)}>{name}</button></p>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          {isShow && secondChildren}
          <div onClick={() => setIsShow(prev => !prev)}>
            {isShow?<ArrowDropDownCircle sx={{fontSize:"1rem",rotate:"180deg"}}/>:<ArrowDropDownCircle sx={{fontSize:"1rem"}}/>}
          </div>
        </div>
    </div>
      <div style={{ display: isShow ? "block" : "none" }}>
        {children}
      </div>
    </>
  )
}

export default GroupOpen