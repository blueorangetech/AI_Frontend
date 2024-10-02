import { Container, Image, Card, Button, Row, Col } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import MainImage from '../images/robot.jpg';
import { useCallback, useState } from "react";
import axios from "axios";
import '../css/Analysis.css'

const Analysis = () => {
    const [file, setfile] = useState();
    const [keywordFile, setKeywordFile] = useState();
    const [onProcess, setOnProcess] = useState(false);
    const [result, setResult] = useState();

    const [keywordResult, setKeywordResult] = useState();

    const onDrop = useCallback((fileContent) => {
        setfile(fileContent);
    }, []);

    const dropKeywordFile = useCallback((fileContent) => {
        setKeywordFile(fileContent);
    }, []);

    const StartAnalysis = async() => {
        
        try{
            setOnProcess(true);

            if (file && file.length > 0){
                const formData = new FormData();
                file && formData.append("file", file[0]);
                const response = await axios.post('http://127.0.0.1:8000/analysis/report', formData);
                
                setResult(response.data);
            };

            if (keywordFile && keywordFile.length > 0){
                const keywordFormData = new FormData();
                keywordFile && keywordFormData.append("file", keywordFile[0]);
                const keywordResponse = await axios.post('http://127.0.0.1:8000/analysis/keyword', keywordFormData);
                
                setKeywordResult(keywordResponse.data);
            };

            setOnProcess(false);

        } catch (e) {
            console.log(e);
        }
    }

    const formattingText = ({ result }) => {
        return (
            <div className="resultArea">
                {result.split('\n').map((line, index) => (
                    <p key={index}> {line} </p>
                ))}
            </div>
        )
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });

    const {getRootProps: getKeywordFile, 
        getInputProps: getInputKeywordFile, 
        isDragActive: isDragKeywordFile} = useDropzone({ onDrop: dropKeywordFile });

    return (
        <Container className="mainArea">
            <Row className="headArea">
                <p> Blue Orange's AI Data Analyst </p>
                <Image className="imageArea" src={MainImage}/>

                <Container className="fileUploadArea" style={{display : "flex", justifyContent: "center"}}>
                    <Card {...getRootProps()} style={{border: "3px solid black"}}>
                        <input {...getInputProps()}/>
                        {
                            isDragActive ?
                            <p> 파일이 업로드 되었습니다.</p>:
                            file ? file[0].name : <p> 파일을 업로드 하세요 </p>
                        }
                    </Card>

                    <Card {...getKeywordFile()} style={{border: "3px solid black"}}>
                        <input {...getInputKeywordFile()}/>
                        {
                            isDragKeywordFile ?
                            <p> 파일이 업로드 되었습니다.</p>:
                            keywordFile ? keywordFile[0].name : <p> 파일을 업로드 하세요 </p>
                        }
                    </Card>
                </Container>
                { onProcess ? 
                    <div>
                        <Button className="spinner"/>
                        <p> 분석 중 </p>

                    </div>
                    :<Button onClick={StartAnalysis} disabled={!file && !keywordFile}> 
                        분석 시작하기 
                    </Button>
                }

            </Row>
            <Row className="results" style={{display: "flex", justifyContent: "center", 
                 fontSize: "14px"}}>
                <Col>
                    {result ? formattingText({result}) : 'Total Report Area'}
                </Col>
                <Col>
                    {keywordResult ? formattingText({result : keywordResult}) : 'Keyword Report Area'}
                </Col>
            </Row>
        </Container>

    )
}

export default Analysis