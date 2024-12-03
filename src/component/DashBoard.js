import { Container } from "react-bootstrap";

const DashBoard = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
      <iframe
        src="https://lookerstudio.google.com/embed/reporting/9c26a53b-1476-44a5-a986-50026b73c83d/page/8dmXE"
        title="Looker Studio Report"
        style={{ height: '90%', width: '80%', border: "none"}}/>
      

    </div>
  )
};

export default DashBoard;