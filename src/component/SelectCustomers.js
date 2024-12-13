import { Image } from "react-bootstrap";
import Header from "./Header";

import LoginModal from "./LoginModal";
import '../css/SelectCustomers.css';
import { useState } from "react";

const SelectCustomers = ({customerList}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState('');

  const SelectLogic = (customer) => {
    setModalVisible(true);
    setSelect(customerList[customer]);
  }

  return (
    <div className="mainArea" style={{ height: "100vh", width: "100%" }}>

      <Header/>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className="imageContainer" 
          style={{display: "flex", justifyContent: "center", flexWrap: "wrap", width: "60%"}}>
          {Object.keys(customerList).map((item, index) => {
            return (
              <Image className="logo" key={index} src={customerList[item].logo} 
                onClick={() => SelectLogic(item)}
                style={{ width: "30%", objectFit: 'contain', 
                  cursor:"pointer", padding: 10}}/>
              );
            })
          }
          { modalVisible ? <LoginModal customerInfo={select}/> : null}
        </div>
      </div>
    </div>
  );
}

export default SelectCustomers;