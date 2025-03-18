import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import "./GridForm.css";
import FieldInput from "../FieldsInput/FieldInput";
import GroupOpen from "../SubGroupOpen/IsSubGroupOpen";
import { useDispatch, useSelector } from "react-redux";
import { setDataIsFetched } from "../Redux/Tabs";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { Add, Close, Download, Replay, RotateLeft, Save, CachedSharp, Visibility } from '@mui/icons-material';
import { Fullscreen, Square, GridView} from '@mui/icons-material';
import { RxExitFullScreen } from 'react-icons/rx';
import style from "./ViewBar.module.css";
import DataGrid, {
  Scrolling,
  Paging,
  HeaderFilter,
  Search,
  FilterRow,
  FilterPanel,
  ColumnChooser,
  ColumnChooserSearch,
  ColumnChooserSelection,
} from "devextreme-react/data-grid";

const button = [
  <RotateLeft sx={{ fontSize: "1rem" }} />, // Assuming this is the "Load" button
  <Save sx={{ fontSize: "1rem" }} />,
  <Download sx={{ fontSize: "1rem" }} />,
  <Replay sx={{ fontSize: "1rem" }} />,
  <Add sx={{ fontSize: "1rem" }} />,
  <Close sx={{ fontSize: "1rem" }} />,
  <CachedSharp sx={{ fontSize: "1rem" }} />,
  <Visibility sx={{ fontSize: "1rem" }} />,
];

const GridForm = ({ dataObject, reportData, className }) => {
  const[isShow,setIsShow] = useState(true)
  const menu = useSelector((state) => state.showmenu);
  const [data, setData] = useState({});
  const [reportdata, setreportData] = useState([]);
  const [renderKey, setRenderKey] = useState(0); // Key to force rerender
  const dispatch = useDispatch();

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  // Recreate dataSource when renderKey changes
  const dataSource = useMemo(() => {
    return AspNetData.createStore({
      loadUrl: `http://ahmed.itserver.biz:5016/api/report/LoadReport/${dataObject?.data?.data?.reportId}`,
      loadMethod: "POST",
      onBeforeSend: (operation, ajaxSettings) => {
        ajaxSettings.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.authToken}`,
        };
      },
    });
  }, [renderKey, dataObject?.data?.data?.reportId]); // Dependencies
// const dataSource = dataSourceFunc()
  useEffect(() => {
    if (reportData) {
      if (reportData.data.length !== 0) {
        setreportData(reportData.data);
        dispatch(setDataIsFetched(true));
      } else {
        setreportData([]);
        dispatch(setDataIsFetched(true));
      }
    }
  }, [reportData, dispatch]);

  useEffect(() => {
    setData(dataObject.data);
  }, [dataObject]);

  const handleLoadClick = () => {
    setRenderKey(prevKey => prevKey + 1);
  };

  return (
    <div key={renderKey} className={className}>
      <div className="pt-5">
        <div>
          <div className={style.iconBar}>
            {button.map((item, i) => (
              <button key={i} onClick={i === 0 ? handleLoadClick : undefined}>{item}</button>
            ))}
            <p className={style.dateColor}>3123/12321</p>
          </div>
        </div>
      </div>

      {Object.keys(data).length !== 0 && (
        <div id={dataObject.id}>
          {data.data.reportParams.length !== 0 && (
            <GroupOpen name="Criteria">
              <div className="mb-3">
                {data.data.reportParams.map((item, i) => (
                  <FieldInput
                    key={i}
                    width={item.width}
                    label={item.caption}
                    type={item.fieldType}
                    name={item.caption}
                  />
                ))}
              </div>
            </GroupOpen>
          )}

          <GroupOpen name={data.data.reportName} secondChildren={
            <div className={style.nestedFilter}>
                <div><Fullscreen fontSize='small'/></div>
                <div onClick={() => setIsShow(prev => !prev)} style={{display:"flex",flexDirection:isShow?"row-reverse":"row"}}><Square fontSize='small' sx={{fontSize:"1rem",color:isShow?"#3A5E80":"#ccc"}}/><p>{isShow?"Filter Off":"Filter On"}</p></div>
            </div>
            }
            >
            <DataGrid
              dataSource={dataSource} // Use the updated dataSource
              showBorders={true}
              columnAutoWidth={true}
              height="100vh"
              showRowLines={true}
              showColumnLines={false}
              style={{ fontSize: ".7rem" }}
              remoteOperations={{ filtering: false, paging: true }}
            >
              <Scrolling mode="virtual" rowRenderingMode="virtual" />
              <Paging defaultPageSize={10} />
              <ColumnChooser
                enabled={true}
                height="300px"
                mode="select"
                position={{ my: "right top", at: "right bottom", of: ".dx-datagrid-column-chooser-button" }}
              >
                <ColumnChooserSearch enabled={true} placeholder="Search column" />
                <ColumnChooserSelection allowSelectAll={true} selectByClick={true} recursive={true} />
              </ColumnChooser>
              <FilterRow visible={isShow} />
              <FilterPanel visible={true} />
              <HeaderFilter visible={true}>
                <Search enabled={true} />
              </HeaderFilter>
            </DataGrid>
          </GroupOpen>
        </div>
      )}
    </div>
  );
};

export default GridForm;