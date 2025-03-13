import React from 'react'
import style from "./ViewBar.module.css";
import { Add, Close, Download, Replay, RotateLeft, Save, CachedSharp, Visibility} from '@mui/icons-material';
const ViewBar = () => {
    const button = [
        <RotateLeft  sx={{fontSize:"1rem"}}/>,
        <Save  sx={{fontSize:"1rem"}}/>,
        <Download  sx={{fontSize:"1rem"}}/>,
        <Replay  sx={{fontSize:"1rem"}}/>,
        <Add  sx={{fontSize:"1rem"}}/>,
        <Close  sx={{fontSize:"1rem"}}/>,
        <CachedSharp  sx={{fontSize:"1rem"}}/>,
        <Visibility  sx={{fontSize:"1rem"}}/>,
    ]
  return (
    <div>
        <div className={style.iconBar}>
            {
                button.map((item,i) => (
                    <button key={i}>{item}</button>
                ))
            }
            <p className={style.dateColor}>3123/12321</p>
        </div>
    </div>
  )
}

export default ViewBar