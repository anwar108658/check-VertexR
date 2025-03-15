import React, { useEffect, useMemo } from "react";
import "./GridForm.css";
import FieldInput from "../FieldsInput/FieldInput";
import GroupOpen from "../SubGroupOpen/IsSubGroupOpen";
import ViewBar from "../ViewBar/ViewBar";
import { useCallback, useRef, useState } from "react";
import DataGrid, {
  Column,
  Scrolling,
  GroupPanel,
  Paging,
  HeaderFilter,
  Search,
  FilterRow,
  FilterPanel,
  ColumnChooser,
  Position,
  ColumnChooserSearch,
  ColumnChooserSelection,
} from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { setDataIsFetched } from "../Redux/Tabs";
import * as AspNetData from "devextreme-aspnet-data-nojquery";

const userData = JSON.parse(sessionStorage.getItem("userData"));

const dataSource = AspNetData.createStore({
    loadUrl: "http://ahmed.itserver.biz:5016/api/report/LoadReport/daily_stock_position",
    loadMethod: "POST",
    onBeforeSend: (operation, ajaxSettings) => {
      ajaxSettings.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.authToken}`,
      };
    },
  });

const GridForm = ({ dataObject, reportData }) => {
  const menu = useSelector((state) => state.showmenu)
  const [data, setData] = useState({});
  const [reportdata, setreportData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reportData) {
      if (reportData.data.length != 0) {
        setreportData(reportData.data);
        dispatch(setDataIsFetched(true));
      } else {
        setreportData([]);
        dispatch(setDataIsFetched(true));
      }
    }
  }, [reportData]);
  useEffect(() => {
    setData(dataObject.data);
  }, [dataObject]);

  const dataGridRef = useRef(null);
  console.log(reportdata);
  
  return (
    <>
      <div className="pt-5">
        <ViewBar />
      </div>
      {Object.keys(data).length != 0 && (
        <div id={dataObject.id}>
          {/* ----------------------------- Parameter fields ---------------- */}

          {data.data.reportParams.length != 0 && (
            <GroupOpen name="Criteria">
              <div className="mb-3">
                {data.data.reportParams.length != 0 &&
                  data.data.reportParams.map((item, i) => {
                    return (
                      <FieldInput
                        key={i}
                        width={item.width}
                        label={item.caption}
                        type={item.fieldType}
                        name={item.caption}
                      />
                    );
                  })}
              </div>
            </GroupOpen>
          )}

          <GroupOpen type="grid" name={data.data.reportName}>
            <DataGrid
              dataSource={reportdata}
              showBorders={true}
              columnAutoWidth={true}
              height="100vh"
              showRowLines={true}
              showColumnLines={false}
              style={{fontSize: ".7rem"}}
              remoteOperations={{ filtering: false, paging: true }}
            >
              <Scrolling mode="virtual" rowRenderingMode="virtual" />
              <Paging defaultPageSize={10} />
              <ColumnChooser
                enabled={true}
                height="300px"
                mode="select"
                position={{ my: "right top", at: "right bottom", of: ".dx-datagrid-column-chooser-button"}}
              >
                <ColumnChooserSearch enabled={true} placeholder="Search column" />
                <ColumnChooserSelection  allowSelectAll={true} selectByClick={true} recursive={true} />
              </ColumnChooser>
              <FilterRow visible={menu.filterToggle} />
               <FilterPanel visible={true} />
              <HeaderFilter visible={true}>
                <Search enabled={true} />
              </HeaderFilter>
            </DataGrid>
          </GroupOpen>
        </div>
      )}
    </>
  );
};

export default GridForm;
