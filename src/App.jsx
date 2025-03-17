import React from 'react';
import BodySection from './Components/BodySection'
import 'devextreme/dist/css/dx.light.css';
import { useSelector } from 'react-redux';
import Spinner from "./Components/spinner/Spinner";

export default function App() {
  const {dataIsFetched  } = useSelector((state)=>state.tabs)
  
  return (
    <>
    {/* { !dataIsFetched && <Spinner/>} */}
    <BodySection/>
    </>
  );
}
