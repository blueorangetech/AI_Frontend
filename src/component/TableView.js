import { Button, Table, DropdownButton, Dropdown } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import '../fakeData.js';
import '../css/TableView.css';
import fakeData from "../fakeData.js";

const TableView = () => {
  const [data, setdata] = useState(fakeData);
  const status = ['전체', '계약완료', '컨펌대기', '협의중', '미팅진행', '미팅확보', '컨택중'];
  const [selectData, setSelectData] = useState('전체');

  const [formData, setFormData] = useState({})

  const FormEdit = (event, item) => {
    setFormData((prevData) => ({
      ...prevData,
      [item] : event.target.value
    }));
  };

  const initData = useCallback(() => {
    return data.header.reduce((acc, curr) => {
      acc[curr] = '';
  
      return acc
    }, {});
    }, [data]);

  useEffect(() => {

    setFormData(initData());

  }, [selectData]);

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

    setdata((prevData) => ({
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
    setSelectData(filter);
  };

  return (
    <div style={{display: "flex", flexDirection: "column", flexGrow: 1, width: "80%", padding: 20}}>

      <div style={{display: 'flex', marginBottom: 10, justifyContent: 'space-between'}}>

        <DropdownButton onSelect={StatusFilter} title={selectData}>
          {status.map((item) => (
            <Dropdown.Item eventKey={item}> {item} </Dropdown.Item>
            )
          )}
        </DropdownButton>

      </div>

      <div style={{ overflow: 'auto'}}>

        <Table bordered style={{ textAlign: 'center', verticalAlign: 'middle', tableLayout: "fixed"}}>
          <thead style={{position: "sticky", verticalAlign: 'middle', backgroundColor: "#5986ED", color: 'white', height: 40}}>
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
                (selectData === '전체' || selectData === item['현황']) ? (
                  <tr key={index}>
                    { Object.values(item).map((value, index) => (
                      <td key={index}> {value}</td>
                    )) }
                    <td>
                      <Button variant="outline-danger" size="sm"> 삭제 </Button>
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