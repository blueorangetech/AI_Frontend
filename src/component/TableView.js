import { Button, Table, DropdownButton, Dropdown } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import '../fakeData.js';
import '../css/TableView.css';
import fakeData from "../fakeData.js";

const TableView = () => {
  const [data, setData] = useState(fakeData);
  const status = ['전체', '계약완료', '컨펌대기', '협의중', '미팅진행', '미팅확보', '컨택중'];
  const [selectStatus, setSelectStatus] = useState('전체');
  const [searchText, setSearchText] = useState('');
  const [formData, setFormData] = useState({})

  const statusColors = {
    "계약완료": "#006400", // 어두운 녹색
    "컨펌대기": "#008B8B", // 진한 청록색
    "협의중": "#DAA520", // 황금색
    "미팅진행": "#FF8C00", // 진한 주황색
    "미팅확보": "#8B0000", // 진한 빨간색
    "컨택중": "#A52A2A"  // 브라운
  };

  const FormEdit = (event, item) => {
    setFormData((prevData) => ({
      ...prevData,
      [item] : event.target.value
    }));
  };

  const ChangeSearchText = (event) => {
    setSearchText(event.target.value);
  }

  const initData = useCallback(() => {
    return data.header.reduce((acc, curr) => {
      acc[curr] = '';
  
      return acc
    }, {});
    }, [data]);

  useEffect(() => {

    setFormData(initData());

  }, [selectStatus]);

  const SubmitData = (event) => {
    event.preventDefault();

    let empty = true;
    Object.values(formData).forEach((item) => {
      
      if (item.replaceAll(' ', '') !== '') {
        empty = false;
      }
    })

    if (empty) {
      return alert('양식을 완성해 주세요.');
    }

    setData((prevData) => ({
      ...prevData,
      'data' : [
        formData,
        ...prevData.data,
      ]
    }));

    setFormData(initData());
  };

  const StatusFilter = (eventKey) => {
    const filter = eventKey.replaceAll(' ', '');
    setSelectStatus(filter);
  };

  const StatusChecker = (item) => {
    return selectStatus === '전체' || selectStatus === item['현황']
  }

  const CompanyChecker = (item) => {
    const regex = new RegExp(searchText);
    return searchText === '' || regex.test(item['업체명']);
  }

  const DeleteContent = (indexNum) => {
    const filteredData = data.data.filter((_, index) => index !== indexNum);
    const newData = {header : [...data.header], data: filteredData};
    setData(newData);
  }

  return (
    <div style={{display: "flex", flexDirection: "column", flexGrow: 1, width: "80%", padding: 20}}>

      <div style={{display: 'flex', marginBottom: 10}}>

        <DropdownButton onSelect={StatusFilter} title={selectStatus}>
          {status.map((item) => (
            <Dropdown.Item eventKey={item}> {item} </Dropdown.Item>
            )
          )}
        </DropdownButton>

        <input type="text" placeholder="업체명 검색" 
          value={searchText} onChange={ChangeSearchText}
          style={{textAlign: 'center', marginLeft : 50, marginRight: 20,
            border: 'none', borderBottom: '1px solid gray', fontSize: 14}}/>

      </div>

      <div style={{ overflow: 'auto'}}>

        <Table bordered style={{ textAlign: 'center', verticalAlign: 'middle', tableLayout: "fixed"}}>
          <thead style={{verticalAlign: 'middle', backgroundColor: "#5986ED", color: 'white', height: 40}}>
            {data.header.map((item, index) => (
              <th key={index}> {item} </th>
            ))}
            <th> </th>
          </thead>

          <tbody style={{fontSize: 12}}>
            <tr>
              {
                data.header.map((item, index) => (
                  <td key={index}>
                    <input type="text" value={formData[item]} 
                      onChange={(event) => FormEdit(event, item)}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "none",
                        textAlign: "center",
                        padding: "5px"
                      }}
                    />
                  </td>
                ))
              }
              <td> <Button onClick={SubmitData} variant="outline-primary" size="sm"> 등록 </Button> </td>
            </tr>

            {
              data.data.map((item, index) => (
                (StatusChecker(item) && CompanyChecker(item)) ? (
                  <tr key={index}>
                    { Object.values(item).map((value, index) => (
                      <td key={index} 
                        style={{
                          color : value in statusColors ? statusColors[value] : null,
                          fontWeight: value in statusColors ? 'bold': null}} > {value}</td>
                    )) }
                    <td>
                      <Button variant="outline-danger" size="sm" 
                        onClick={() => DeleteContent(index)}> 삭제 </Button>
                    </td>
                  </tr>
                )
                : ''
                )
              )
            }
          </tbody>
        </Table>

      </div>
    </div>
  )
};

export default TableView;