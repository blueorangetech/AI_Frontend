import { Container, Button, Image, ListGroup } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import FormattingText from "./FormattingText";

import { DateRangePicker, CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import koKR from 'rsuite/locales/ko_KR';

import '../css/Analysis.css';

import TotalReport from "../images/menu_totalReport.png"; 
import MediaReport from "../images/menu_media.png"; 

import WebLogo from "../images/web_logo.png";
import GoalImage from "../images/icon_03.png";
import CostIamge from "../images/icon_04.png";
import ClickImage from "../images/icon_05.png";
import ImpImage from "../images/icon_06.png";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

const Analysis = () => {
    const [file, setfile] = useState(null);
    const [keywordFile, setKeywordFile] = useState(null);
    
    const [results, setResults] = useState({});
    const [menu, setMenu] = useState(null);
    
    const keywordMenuList = {
        "청약": GoalImage, 
        "CPA": GoalImage, 
        "광고비": CostIamge,
        "CPC": CostIamge, 
        "노출": ImpImage, 
        "클릭": ClickImage,
    }

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const [standardDates, setStandardDates] = useState([today, today]);
    const [compareDates, setCompareDates] = useState([sevenDaysAgo, sevenDaysAgo]);

    const [onProcess, setOnProcess] = useState(false);

    const setFile = (e) => {
        setfile(e.target.files[0]);
    };

    const setKeyword = (e) => {
        setKeywordFile(e.target.files[0]);
    };

    const selectMenu = (e) => {
        setMenu(e);
    };

    const convertDay = (date) => {
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`
    }

    const DatePick = ({ days, setDays }) => {
        let holder;

        if (days[0] === days[1]) {
            holder = convertDay(days[0])

        } else {
            const start = convertDay(days[0]);
            const end = convertDay(days[1]);

            holder = `${start} ~ ${end}`;
        }

        const handleDays = (newDays) => {
            if (newDays === null){
                setDays(null);
            } else {
                setDays(newDays);
            }
        }

        return (  
            <CustomProvider locale={koKR}>
                <DateRangePicker
                    showOneCalendar={true}
                    placeholder={holder}
                    cleanable={false}
                    onChange={handleDays}
                    format="yyyy-MM-dd"
                />
            </CustomProvider>
        );
    }

    const StartAnalysis = async() => {
        try{
            setOnProcess(true);
            setResults({}); // 재 분석 시 결과 초기화

            if (file){
                const formData = new FormData();
                file && formData.append("file", file);
                formData.append("standard", JSON.stringify(standardDates));
                formData.append("compare", JSON.stringify(compareDates));

                const response = await axios.post(`${endPoint}/analysis/report`, formData);
                setResults((prevResults) => ({...prevResults, ...response.data}));
            };

            if (keywordFile){
                const keywordFormData = new FormData();
                keywordFile && keywordFormData.append("file", keywordFile);
                keywordFormData.append("standard", JSON.stringify(standardDates));
                keywordFormData.append("compare", JSON.stringify(compareDates));

                const keywordResponse = await axios.post(`${endPoint}/analysis/keyword`, keywordFormData);
                
                setResults((prevResults) => ({...prevResults, ...keywordResponse.data}));
            };

            const sampleKey = Object.keys(results)[0];
            setMenu(sampleKey);

            setOnProcess(false);
            
        } catch (e) {
            setOnProcess(false);
            console.log(e);
        }
    };

    const menuTitle = {
        display: "flex", alignItems:"center", justifyContent:"left", height: "35px",
        padding: "10px", color: "#5986ED",
        fontSize: "18px", fontWeight: "500", borderBottom: "3px solid #ECEEF4"
    };

    const notSelecetedStyle = {
        display: "flex", padding: "10px",
        paddingLeft: "40px", color: "#A8A8A8", fontSize : "16px", fontWeight: "500",
        backgroundColor: 'white'
    };

    const selecetedStyle = {
        display: "flex", padding: "10px",
        paddingLeft: "40px", color: "#A8A8A8", fontSize : "16px", fontWeight: "500",
        backgroundColor: '#ECEEF4'
    };

    const fileSelectBox = {display : "flex", flexDirection: "column", width: "40%", height: "100%", 
        marginLeft: "20px", justifyContent: "center", alignItems: "center", fontSize: "14px"};
        
    const fileSelectBtn = {marginLeft: "auto", marginRight: "10px", cursor: "pointer", width: "20%", height: "60%", 
        display:"flex", alignItems:"center", justifyContent:"center", color: "white", backgroundColor: "#C4CAD7", fontSize: "12px", borderRadius: "10px"};
            
    const dateSelectBox = {display : "flex", flexDirection: "column", width: "30%", height: "100%", 
        marginLeft: "20px", justifyContent: "center", alignItems: "center", fontSize: "14px"};

    const contentContainerBox = {
        display:"flex", alignItems: "center", marginRight: "auto", width: "90%", height: "60%", backgroundColor: "white", borderRadius: "5px"
    }

    return (
        <Container className="mainArea" style={{display : "flex", flexDirection: "column", height: "100vh"}}>

            <Container className="logoArea" style={{display: "flex", alignItems:"center", backgroundColor: "#5986ED", height: "7%"}}>
                <Image src={WebLogo} style={{marginLeft: "30px"}}/> 
            </Container>

            <Container className="bodyArea" style={{display: "flex", flexDirection: "row", height: "100%", flexGrow: 1}}>
                <Container style={{display: "flex", flexDirection: "column", width:"13%", textAlign:"center", padding: "5px"}}>
                    
                    <Container className="totalReportMenu">
                        <Container style={menuTitle} > 
                            리포트
                        </Container>

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
                    </Container>
                    
                    <Container className="keywordReportMenu">
                        <Container style={menuTitle}> 
                            키워드 리포트
                        </Container>

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

                    </Container>

                </Container>

                <Container style={{display: "flex", flexDirection: "column", backgroundColor: "##4373e2", flexGrow: 1}}>

                    <Container style={{display: "flex", justifyContent: "center", alignItems: "center", 
                        height: "10%", margin: "30px", padding: "10px", backgroundColor: "#4373E2"}}>

                        <Container style={fileSelectBox}>
                            <span style={{color: "white", marginRight: "auto", marginBottom: "3px"}}> 리포트 파일 </span>
                            <Container style={contentContainerBox}>

                                <span style={{marginLeft: "5px"}}> {file ? file.name : <span style={{color: "#A8A8A8"}}> 선택된 파일 없음 </span>} </span>
                                <label className="fileUploadBtn" htmlFor="fileInput" style={fileSelectBtn}>
                                    파일 선택
                                </label>
                                <input id="fileInput" type="file" onChange={setFile} style={{display: "none"}}/>
                            </Container>
                        </Container>

                        <Container style={fileSelectBox}>
                            <span style={{color: "white", marginRight: "auto", marginBottom: "3px"}}> 키워드 리포트 파일 </span>
                            <Container style={contentContainerBox}>

                                <span style={{marginLeft: "10px"}}> {keywordFile ?  keywordFile.name : <span style={{color: "#A8A8A8"}}> 선택된 파일 없음 </span> } </span>
                                <label className="fileUploadBtn" htmlFor="keywordFileInput" style={fileSelectBtn}>
                                    파일 선택
                                </label>
                                <input id="keywordFileInput" type="file" onChange={setKeyword} style={{display: "none"}}/>
                            </Container>
                        </Container>

                        <Container style={dateSelectBox}>
                            <span style={{color: "white", marginRight: "auto", marginBottom: "3px"}}> 분석 기간 </span>
                            <Container style={contentContainerBox}>
                                
                                <DatePick days={standardDates} setDays={setStandardDates}/>
                            </Container>
                        </Container>

                        <Container style={dateSelectBox}>
                            <span style={{color: "white", marginRight: "auto", marginBottom: "3px"}}> 비교 기간 </span>
                            <Container style={contentContainerBox}>
                                <DatePick days={compareDates} setDays={setCompareDates}/>
                            </Container>
                        </Container>

                        <Button disabled={!file && !keywordFile} onClick={StartAnalysis}
                            style={{height: "60%", width: "15%", marginTop: "25px", marginRight: "10px",
                            color: "white", borderRadius: "40px", backgroundColor: !file && !keywordFile ? "#8D93A0" : "#143788", border:"none"}}>
                            { onProcess ? "분석중" : "분석 요청" }
                        </Button>

                    </Container>

                    <Container style={{marginBottom: "30px", marginRight: "30px", marginLeft: "30px", padding: "30px",
                        backgroundColor: "white",  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", flexGrow: 1, maxHeight: "65vh", maxWidth: "80vw"}}>


                        <FormattingText allResult={results} menu={menu} onProcess={onProcess}/>
                    </Container>

                </Container>
            </Container>

        </Container>

    )
}

export default Analysis