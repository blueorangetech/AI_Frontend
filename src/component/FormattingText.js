import { useEffect, useState } from "react";
import { Image, Container } from "react-bootstrap";

import MainImage from '../images/p_main.png'
import RoadingImage from '../images/p_loading.png';
import NoResult from "../images/p_error.png";

const FormattingText = ({ allResult, menu, onProcess }) => {
    // 분석 완료 & 데이터 존재
    const keyCounts = Object.keys(allResult).length;
    const result = allResult[menu];
    
    const [counter, setCounter] = useState(1);

    const alarmMsgStyle = {color: "#A8A8A8", fontWeight: "500"}

    useEffect(() => {
        if (onProcess) {
            const interval = setInterval(() => {
                setCounter((prevCounter) => (prevCounter) % 4 + 1);
            }, 1000);

            // 컴포넌트 언마운트 또는 onProcess가 false로 변경될 때 interval을 정리
            return () => clearInterval(interval);
        }
    }, [onProcess]);

    if (keyCounts === 0 && onProcess === false) {
        return (
            <Container style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <Image src={MainImage} style={{height: "90%"}}/>
            </Container>
        )
    };

    if (result){
        return (
            <>  
                <iframe srcDoc={result} 
                    style={{height: "100%", width: "100%", padding: "0", border: "none"}}/> 
                {/* {result.split('\n').map((line, index) => (
                    line === "" || line.includes("-") ? (
                        <p key={index} style={{fontSize: "14px"}}> {line} </p>
                        ) : (
                        <p key={index} style={{fontWeight: "bold"}}> ● {line} </p>
                        )
                    ))} */}
            </>
        )
    };

    if (onProcess){
        return (
            <Container style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <Image className="spinner" src={RoadingImage} style={{width: "20%", marginBottom: "30px"}}/>
                <p style={alarmMsgStyle}> {`데이터를 분석 중입니다${".".repeat(counter)}`} </p>
                <p style={alarmMsgStyle}> 이 작업은 최대 10분 소요됩니다. </p>
            </Container>
        )
    } else {
        return (
            <Container style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <Image src={NoResult}/>
            </Container>
        )
    }
}

export default FormattingText;