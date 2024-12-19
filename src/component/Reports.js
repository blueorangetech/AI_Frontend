import { useState, useEffect } from "react";
import { DateRangePicker, CustomProvider } from 'rsuite';
import koKR from 'rsuite/locales/ko_KR';

import axios from "axios";

import FormattingText from "./FormattingText";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

const Reports = ({menu, setMenu, customer, token}) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [file, setfile] = useState(null);
  const [keywordFile, setKeywordFile] = useState(null);

  const [standardDates, setStandardDates] = useState([today, today]);
  const [compareDates, setCompareDates] = useState([sevenDaysAgo, sevenDaysAgo]);

  const [results, setResults] = useState({});

  const [onProcess, setOnProcess] = useState(false);

  const fileSelectBox = {display : "flex", flexDirection: "column", width: "40%", height: "100%", 
    marginLeft: "20px", justifyContent: "center", alignItems: "center", fontSize: "14px"};
      
  const fileSelectBtn = {marginLeft: "auto", marginRight: "10px", cursor: "pointer", width: "20%", height: "60%", 
    display:"flex", alignItems:"center", justifyContent:"center", color: "white", backgroundColor: "#C4CAD7", fontSize: "12px", borderRadius: "10px"};
          
  const dateSelectBox = {display : "flex", flexDirection: "column", width: "30%", height: "100%", 
    marginLeft: "20px", justifyContent: "center", alignItems: "center", fontSize: "14px"};

  const contentdivBox = {display:"flex", alignItems: "center", marginRight: "auto", 
    width: "90%", height: "60%", backgroundColor: "white", borderRadius: "5px"
  }

  const setFile = (e) => {
    setfile(e.target.files[0]);
  };

  const setKeyword = (e) => {
    setKeywordFile(e.target.files[0]);
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
  
  useEffect(() => {
    const GetCachedData = async() => {
      const headers = {"Authorization" : token}
      const cachedData = await axios.get(`${endPoint}/analysis/cached`, { headers });
      setResults(cachedData.data);
    }

    GetCachedData();
  }, [token])

  useEffect(() => {
    if (results && Object.keys(results).length > 0) {
      const sampleKey = Object.keys(results)[0];
      setMenu(sampleKey);
    }
  }, [results, setMenu]);


  const StartAnalysis = async() => {
    try{
      setOnProcess(true);
      setResults({}); // 재 분석 시 결과 초기화
      const headers = {"Authorization" : token}

      if (file){
        const formData = new FormData();
        file && formData.append("file", file);

        formData.append("standard", JSON.stringify(standardDates));
        formData.append("compare", JSON.stringify(compareDates));
        formData.append("formula", JSON.stringify(customer.formula));
        formData.append("depth", JSON.stringify(customer.depth));

        const response = await axios.post(`${endPoint}/analysis/report`, formData, { headers });
        setResults((prevResults) => ({...prevResults, ...response.data}));
      };

      if (keywordFile){
        const keywordFormData = new FormData();
        keywordFile && keywordFormData.append("file", keywordFile);

        keywordFormData.append("standard", JSON.stringify(standardDates));
        keywordFormData.append("compare", JSON.stringify(compareDates));
        keywordFormData.append("keyword_formula", JSON.stringify(customer.keywordFormula));
        keywordFormData.append("depth", JSON.stringify(customer.depth));

        const keywordResponse = await axios.post(`${endPoint}/analysis/keyword`, keywordFormData, { headers });
        
        setResults((prevResults) => ({...prevResults, ...keywordResponse.data}));
      };

      setOnProcess(false);
      
    } catch (e) {
      setOnProcess(false);
      alert(e.response.data.detail);
    }
  };

  return (
    <div style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", 
            height: "10%", margin: "30px", padding: "10px", backgroundColor: "#4373E2"}}>

            <div style={fileSelectBox}>
                <span style={{color: "white", marginRight: "auto", marginBottom: "3px"}}> 리포트 파일 </span>
                <div style={contentdivBox}>

                    <span style={{marginLeft: "5px"}}> {file ? file.name : <span style={{color: "#A8A8A8"}}> 선택된 파일 없음 </span>} </span>
                    <label className="fileUploadBtn" htmlFor="fileInput" style={fileSelectBtn}>
                        파일 선택
                    </label>
                    <input id="fileInput" type="file" onChange={setFile} style={{display: "none"}}/>
                </div>
            </div>

            <div style={fileSelectBox}>
                <span style={{color: "white", marginRight: "auto", marginBottom: "3px"}}> 키워드 리포트 파일 </span>
                <div style={contentdivBox}>

                    <span style={{marginLeft: "10px"}}> {keywordFile ?  keywordFile.name : <span style={{color: "#A8A8A8"}}> 선택된 파일 없음 </span> } </span>
                    <label className="fileUploadBtn" htmlFor="keywordFileInput" style={fileSelectBtn}>
                        파일 선택
                    </label>
                    <input id="keywordFileInput" type="file" onChange={setKeyword} style={{display: "none"}}/>
                </div>
            </div>

            <div style={dateSelectBox}>
                <span style={{color: "white", marginRight: "auto", marginBottom: "3px"}}> 분석 기간 </span>
                <div style={contentdivBox}>
                    
                    <DatePick days={standardDates} setDays={setStandardDates}/>
                </div>
            </div>

            <div style={dateSelectBox}>
                <span style={{color: "white", marginRight: "auto", marginBottom: "3px"}}> 비교 기간 </span>
                <div style={contentdivBox}>
                    <DatePick days={compareDates} setDays={setCompareDates}/>
                </div>
            </div>

            <button disabled={!file && !keywordFile} onClick={StartAnalysis}
                style={{height: "60%", width: "15%", marginTop: "25px", marginRight: "10px",
                color: "white", borderRadius: "40px", backgroundColor: !file && !keywordFile ? "#8D93A0" : "#143788", border:"none"}}>
                { onProcess ? "분석중" : "분석 요청" }
            </button>

        </div>

        <div style={{marginBottom: "30px", marginRight: "30px", marginLeft: "30px", padding: "30px",
            backgroundColor: "white",  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", flexGrow: 1, maxHeight: "75vh", maxWidth: "90vw"}}>

            <FormattingText allResult={results} menu={menu} onProcess={onProcess}/>
        </div>
    </div>

  )
};

export default Reports;