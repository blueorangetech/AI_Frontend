import { Image, ListGroup } from "react-bootstrap";
import { useState } from "react";

import Reports from "./Reports";
import DashBoard from "./DashBoard";
import TableView from "./TableView";

import 'rsuite/dist/rsuite.min.css';
import '../css/Analysis.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TotalReport from "../images/menu_totalReport.png"; 
import MediaReport from "../images/menu_media.png"; 

import WebLogo from "../images/web_logo.png";

const Analysis = ({keywordMenuList}) => {

    const [menu, setMenu] = useState(null);
    
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

            <div className="logoArea" style={{display: "flex", alignItems:"center", backgroundColor: "#5986ED", height: "7%"}}>
                <Image src={WebLogo} style={{marginLeft: "30px"}}/> 
            </div>

            <div className="bodyArea" style={{display: "flex", flexDirection: "row", height: "93%", flexGrow: 1}}>
                <div style={{display: "flex", flexDirection: "column", width:"13%", textAlign:"center", padding: "5px"}}>
                    
                    <div className="totalReportMenu">
                        <div style={menuTitle} > 
                            리포트
                        </div>

                        <ListGroup>
                            { ["통합 리포트", "매체별 리포트"].map((item, index) => {
                                return (
                                    <ListGroup.Item key={index} onClick={() => selectMenu(item)} 
                                        style={menu === item ? selecetedStyle : notSelecetedStyle}>
                                        <Image src= {item === "통합 리포트" ? TotalReport : MediaReport} style={{marginRight: "20px", objectFit: "contain"}}/>
                                        
                                        {item}
                                    </ListGroup.Item>
                                    );
                                })
                            }
                        </ListGroup>
                    </div>
                    
                    <div className="keywordReportMenu">
                        <div style={menuTitle}> 
                            키워드 리포트
                        </div>

                        <ListGroup>
                            { Object.entries(keywordMenuList).map(([item, value], index) => {
                                return (
                                    <ListGroup.Item key={index} onClick={() => selectMenu(item)}
                                        style={menu === item ? selecetedStyle : notSelecetedStyle}> 
                                        
                                        <Image src={value} style={{marginRight: "20px", objectFit: "contain"}}/>
                                        {item}
                                        
                                    </ListGroup.Item>
                                    );
                                })
                            }
                        </ListGroup>

                    </div>

                    <div className="coalitionMenu">
                        <div style={menuTitle}>
                            제휴

                        </div>
                         <ListGroup>
                            { ["컨텍 현황", "성과 대시보드"].map((item, index) => {
                                return (
                                    <ListGroup.Item key={index} onClick={() => selectMenu(item)} 
                                        style={menu === item ? selecetedStyle : notSelecetedStyle}>
                                        <Image src= {item === "통합 리포트" ? TotalReport : MediaReport} style={{marginRight: "20px", objectFit: "contain"}}/>
                                        
                                        {item}
                                    </ListGroup.Item>
                                    );
                                })
                            }
                        </ListGroup>
                    </div>

                </div>
                {
                  menu === '컨텍 현황' ? <TableView/> : menu === '성과 대시보드' ? <DashBoard/> : <Reports menu={menu} setMenu={setMenu}/>
                }
                
            </div>

        </div>

    )
}

export default Analysis