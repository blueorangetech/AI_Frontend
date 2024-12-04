import { useState } from "react";
import { Image } from "react-bootstrap";
import RoadingImage from '../images/p_loading.png';

const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{display: 'flex', flexDirection: 'column', 
                  flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
      
      {isLoading && (
        <div style={{display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', alignItems: 'center',
            width: "100%", height: "100%"}}>

          <Image className="spinner" src={RoadingImage} style={{height: "60%", marginBottom: 30}}/>
          <span> Looker Studio 연결 중 </span>

        </div>
      )}

      <iframe
        src="https://lookerstudio.google.com/embed/reporting/9c26a53b-1476-44a5-a986-50026b73c83d/page/8dmXE"
        title="Looker Studio Report"
        style={{ height: '90%', width: '80%', border: "none"}}
        onLoad={() => setIsLoading(false)}/>
      

    </div>
  )
};

export default DashBoard;