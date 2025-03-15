import { ArrowDropDownCircle, ArrowUpwardRounded } from '@mui/icons-material'
import React, { useMemo, useState } from 'react'
import { Fullscreen, Square, GridView} from '@mui/icons-material';
import { RxExitFullScreen } from 'react-icons/rx';
import style from './GroupOpen.module.css'
import { useDispatch } from 'react-redux';
import { filterToggle } from '../Redux/ShowMenu';

const GroupOpen = ({name,children,type}) => {
  const dispatch = useDispatch()
  const[isShow,setIsShow] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  return (
    <>
    <div className={style.group} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <p><button onClick={() => setIsShow(prev => !prev)}>{name}</button></p>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          {isShow && type=="grid" ? <div className={style.nestedFilter}>
              <div><Fullscreen fontSize='small'/></div>

              <div  onClick={() => [setIsFilterOpen(prev => !prev),dispatch(filterToggle(isFilterOpen))]} style={{display:"flex",flexDirection:isFilterOpen?"row-reverse":"row"}}><Square fontSize='small' sx={{fontSize:"1rem",color:isFilterOpen?"#3A5E80":"#ccc"}}/><p>{isFilterOpen?"Filter Off":"Filter On"}</p></div>

              <div><Square fontSize='small' sx={{fontSize:"1rem"}}/><p>Group on</p></div>

              <div><Fullscreen fontSize='small'/><p>Group on</p></div>

              <div><RxExitFullScreen fontSize='small'/><p>Collapse All</p></div>

              <div><GridView sx={{fontSize:"1rem"}} fontSize='small'/><p>Collapse All</p></div>

          </div>:""}
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