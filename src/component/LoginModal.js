import { useState } from "react";
import { Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import '../css/LoginModal.css';

const endPoint = process.env.REACT_APP_API_ENDPOINT;

const LoginModal = ({customerInfo}) => {
  const cookie = new Cookies();
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const InputPassword = (event) => {
    setPassword(event.target.value);
  };

  const AccessCheck = async() => {
    try {
      setLoading(true);

      const body = {name: customerInfo.name, password: password };
      const response = await axios.post(`${endPoint}/auth${customerInfo.url}`, body);

      cookie.set("token", response.data.token, {"path": "/"});
      navi(`${customerInfo.url}`);

    } catch(error) {
      alert(error.response.data.detail);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection:"column", alignItems:"center",
      justifyContent: "center", width: "30%", height: "40%",
      position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)", 
      backgroundColor: "white", border: "1px solid black",
      borderRadius: 20}}>
      
      <div style={{textAlign: "center"}}>
        <Image src= {customerInfo.logo} style={{width: "80%", objectFit: "contain"}}/>
      </div>
      {
        loading ? 
        <>
          <div className="loadingSpinner"></div>
          <span> 로그인 중 </span>
        </>
        :(
          <>
            <input type="password" value={password} onChange={InputPassword}
              style={{width: "50%", marginBottom: "30px", border: "2px solid gray", borderRadius: 5, outline: "none"}}/>
            <button onClick={AccessCheck}
              style={{width: "40%", height: "50px", fontSize: 18,
              backgroundColor: "#4373E2", color: "white"}}>
              로그인
            </button>
          </>
        )
      }
    </div>
  )
};

export default LoginModal;