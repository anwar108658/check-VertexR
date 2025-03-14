import { ArrowDropDownCircle, ArrowUpwardRounded } from '@mui/icons-material'
import React, { useMemo, useState } from 'react'
import { Fullscreen, Square, GridView} from '@mui/icons-material';
import { RxExitFullScreen } from 'react-icons/rx';
import style from './GroupOpen.module.css'

const GroupOpen = ({name,children,type}) => {
  const[isShow,setIsShow] = useState(true)
  return (
    <>
    <div className={style.group} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <p><button onClick={() => setIsShow(prev => !prev)}>{name}</button></p>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          {isShow && type=="grid" ? <div className={style.nestedFilter}>
              <div><Fullscreen fontSize='small'/></div>
              <div><Square fontSize='small' sx={{fontSize:"1rem"}}/><p>Filter on</p></div>
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
    {isShow && <div>{children}</div>}
    </>
  )
}

export default GroupOpen