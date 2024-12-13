import { Image, ListGroup } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

import Reports from "./Reports";
import DashBoard from "./DashBoard";
import TableView from "./TableView";
import Header from "./Header";

import 'rsuite/dist/rsuite.min.css';
import '../css/Analysis.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const endPoint = process.env.REACT_APP_API_ENDPOINT;

const Analysis = ({customer}) => {
    const navi = useNavigate();
    const cookie = new Cookies();
    const token = cookie.get("token", {"path": "/"});
    const tokenCheck = useRef(false);
    const locationInfo = useLocation();
    
    useEffect(() => {
      const CheckAuth = async() => {
        try{
          const headers = {"Authorization" : token}
          await axios.get(`${endPoint}/auth${locationInfo.pathname}`, { headers });
  
        } catch(error){
          alert(error.response.data.detail);
          navi('/');
        }
      }

      if (token === undefined && !tokenCheck.current) {
        alert("로그인이 필요한 접근입니다");
        tokenCheck.current = true;
        navi("/");  
      } 

      CheckAuth();
    }, [navi, token, locationInfo.pathname]);

    const [menu, setMenu] = useState('');
    
    const selectMenu = (e) => {
      setMenu(e);
    };

    const menuTitle = {
      display: "flex", alignItems:"center", justifyContent:"left", height: "50px",
      padding: "10px", color: "#5986ED",
      fontSize: "18px", fontWeight: "500", borderBottom: "3px solid #ECEEF4"
    };

    const notSelecetedStyle = {
      display: "flex", padding: "10px",
      paddingLeft: "40px", color: "#A8A8A8", fontSize : "16px", fontWeight: "500",
      backgroundColor: 'white', border: 'none'
    };

    const selecetedStyle = {
      ...notSelecetedStyle,
      backgroundColor: '#ECEEF4'
    };

    return (
      <div className="mainArea" style={{display : "flex", flexDirection: "column", height: "100vh"}}>

        <Header />

        <div className="bodyArea" style={{display: "flex", flexDirection: "row", height: "93%", flexGrow: 1}}>
          <div style={{display: "flex", flexDirection: "column", width:"13%", textAlign:"center", padding: "5px"}}>
              
            { Object.keys(customer.menu).map((fieldName, index) => {
              return (
                <div key={index}>
                  <div style={menuTitle} > 
                      {fieldName}
                  </div>

                  <ListGroup>
                    { Object.entries(customer.menu[fieldName]).map(([item, value], index) => {
                      return (
                        <ListGroup.Item key={index} onClick={() => selectMenu(item)} 
                          style={menu === item ? selecetedStyle : notSelecetedStyle}>
                          <Image src= {value} style={{marginRight: "20px", objectFit: "contain"}}/>
                          {item}
                        </ListGroup.Item>
                        );
                      })
                    }
                  </ListGroup>
                </div>)
              })
            }
          </div>
          {
            menu === '컨택 현황' ? <TableView/> : menu === '성과 대시보드' ? <DashBoard/> : <Reports menu={menu} setMenu={setMenu} customer={customer}/>
          }
          
        </div>
      </div>
    )
}

export default Analysis